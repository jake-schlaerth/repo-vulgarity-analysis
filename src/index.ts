import { PrismaClient } from "@prisma/client";
import Redis from "ioredis";
import simpleGit from "simple-git";
import Filter from "bad-words";

const prisma = new PrismaClient();
const redis = new Redis(process.env.REDIS_URL!);
const filter = new Filter();

async function analyzeRepository(repoUrl: string) {
  const git = simpleGit();
  const repoName = repoUrl.split("/").pop()?.replace(".git", "") || "unknown";

  try {
    await git.clone(repoUrl, `./repos/${repoName}`);
    const branches = await git.cwd(`./repos/${repoName}`).branch(["-a"]);

    for (const branch of branches.all) {
      const commits = await git.cwd(`./repos/${repoName}`).log([branch]);

      for (const commit of commits.all) {
        const cacheKey = `${repoName}:${branch}:${commit.hash}`;
        const cached = await redis.get(cacheKey);

        if (cached) {
          console.log(`Skipping cached commit ${commit.hash}`);
          continue;
        }

        const profanity = filter.isProfane(commit.message)
          ? filter
              .clean(commit.message)
              .split(" ")
              .filter((word) => filter.isProfane(word))
          : [];

        await prisma.commitAnalysis.create({
          data: {
            repository: repoUrl,
            branch,
            commitHash: commit.hash,
            commitMessage: commit.message,
            profanity,
          },
        });

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
