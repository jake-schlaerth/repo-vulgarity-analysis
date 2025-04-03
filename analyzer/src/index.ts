import { PrismaClient } from "@prisma/client";
import simpleGit from "simple-git";
import Filter from "bad-words";
import fs from "fs";

const prisma = new PrismaClient();
const filter = new Filter();

function convertToSSHUrl(httpsUrl: string): string {
  if (httpsUrl.startsWith("https://github.com/")) {
    return httpsUrl.replace("https://github.com/", "git@github.com:");
  }
  return httpsUrl;
}

async function analyzeRepository(repoUrl: string) {
  const git = simpleGit();
  const repoName = repoUrl.split("/").pop()?.replace(".git", "") || "unknown";
  const repoPath = `./repos/${repoName}`;

  try {
    if (!fs.existsSync(repoPath) || !fs.statSync(repoPath).isDirectory()) {
      const sshUrl = convertToSSHUrl(repoUrl);
      console.log(`Attempting to clone repository using SSH URL: ${sshUrl}`);

      try {
        await git.clone(sshUrl, repoPath);
        console.log(`Cloning repository ${sshUrl} to ${repoPath}`);
      } catch (cloneError: any) {
        console.error(`Failed to clone with SSH URL: ${cloneError.message}`);
        console.log(`Falling back to HTTPS URL: ${repoUrl}`);
        console.log("Note: You may be prompted for GitHub credentials.");
        console.log(
          "To avoid this in the future, set up SSH keys or use a personal access token."
        );
        await git.clone(repoUrl, repoPath);
        console.log(`Cloning repository ${repoUrl} to ${repoPath}`);
      }
    } else {
      console.log(`Using existing repository at ${repoPath}`);
    }

    const branches = await git.cwd(repoPath).branch(["-a"]);
    console.log(`Analyzing ${branches.all.length} branches`);

    for (const branch of branches.all) {
      const commits = await git.cwd(repoPath).log([branch]);

      for (const commit of commits.all) {
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
}

main().catch(console.error);
