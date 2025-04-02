# Repository Vulgarity Analysis

A tool that analyzes commit messages across all branches of a Git repository for profanity.

## Prerequisites

- Docker
- Docker Compose

## Setup

1. Clone this repository
2. Run the following commands:

```bash
docker compose up -d
docker compose exec bun bun install
docker compose exec bun bunx prisma generate
docker compose exec bun bunx prisma db push
```

## Usage

To analyze a repository, run:

```bash
docker compose exec bun bun run src/index.ts <repository-url>
```

For example:

```bash
docker compose exec bun bun run src/index.ts https://github.com/username/repo.git
```

The tool will:

1. Clone the repository
2. Scan all branches
3. Analyze commit messages for profanity
4. Store results in PostgreSQL
5. Cache results in Redis to avoid re-analyzing the same commits

## Results

The analysis results are stored in the PostgreSQL database in the `CommitAnalysis` table with the following fields:

- repository: The URL of the analyzed repository
- branch: The branch name
- commitHash: The commit hash
- commitMessage: The full commit message
- profanity: Array of profane words found
- createdAt: Timestamp of when the analysis was performed
- updatedAt: Timestamp of when the record was last updated
