/*
  Warnings:

  - A unique constraint covering the columns `[commit_message]` on the table `commit_analysis` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "commit_analysis_commit_message_key" ON "commit_analysis"("commit_message");
