import { Module } from "@nestjs/common";
import { CommitAnalysisController } from "./commit-analysis.controller";

@Module({
  imports: [],
  controllers: [CommitAnalysisController],
})
export class CommitAnalysisModule {}
