-- CreateTable
CREATE TABLE "commit_analysis" (
    "id" TEXT NOT NULL,
    "repository" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "commit_hash" TEXT NOT NULL,
    "commit_message" TEXT NOT NULL,
    "profanity" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "commit_analysis_pkey" PRIMARY KEY ("id")
);
