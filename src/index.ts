import { PrismaClient } from "@prisma/client";
import Redis from "ioredis";
import simpleGit from "simple-git";
import Filter from "bad-words";
import fs from "fs";

const prisma = new PrismaClient();
const redis = new Redis(process.env.REDIS_URL!);
const filter = new Filter();

async function analyzeRepository(repoUrl: string) {
  const git = simpleGit();
  const repoName = repoUrl.split("/").pop()?.replace(".git", "") || "unknown";
  const repoPath = `./repos/${repoName}`;

  try {
    if (!fs.existsSync(repoPath) || !fs.statSync(repoPath).isDirectory()) {
      await git.clone(repoUrl, repoPath);
      console.log(`Cloning repository ${repoUrl} to ${repoPath}`);
    } else {
      console.log(`Using existing repository at ${repoPath}`);
    }

    const branches = await git.cwd(repoPath).branch(["-a"]);
    console.log(`Analyzing ${branches.all.length} branches`);

    for (const branch of branches.all) {
      const commits = await git.cwd(repoPath).log([branch]);

      for (const commit of commits.all) {
        const cacheKey = `${repoName}:${branch}:${commit.hash}`;
        const cached = await redis.get(cacheKey);

        if (cached) {
          console.log(`Skipping cached commit ${commit.hash}`);
          continue;
        }

        if (filter.isProfane(commit.message)) {
          await prisma.commitAnalysis.create({
            data: {
              repository: repoUrl,
              branch,
              commitHash: commit.hash,
              commitMessage: commit.message,
            },
          });
          console.log(
            `Stored profane commit ${commit.hash} on branch ${branch}`
          );
        }

        await redis.set(cacheKey, "1", "EX", 86400);
        console.log(`Analyzed commit ${commit.hash} on branch ${branch}`);
      }
    }
  } catch (error) {
    console.error(`Error analyzing repository ${repoUrl}:`, error);
  }
}

async function main() {
  const repoUrl = process.argv[2];

  if (!repoUrl) {
    console.error("Please provide a repository URL");
    process.exit(1);
  }

  await analyzeRepository(repoUrl);
  await prisma.$disconnect();
  await redis.quit();
}

main().catch(console.error);
