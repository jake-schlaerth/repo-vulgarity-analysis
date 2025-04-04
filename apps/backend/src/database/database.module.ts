import { Module, Global } from "@nestjs/common";
import { CommitAnalysisRepository } from "./commit-analysis.repository";

@Global()
@Module({
  providers: [CommitAnalysisRepository],
  exports: [CommitAnalysisRepository],
})
export class DatabaseModule {}
