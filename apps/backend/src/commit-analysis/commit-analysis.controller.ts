import { Controller, Get, Query } from "@nestjs/common";
import { CommitAnalysisRepository } from "../database/commit-analysis.repository";

@Controller("commit-analysis")
export class CommitAnalysisController {
  constructor(
    private readonly commitAnalysisRepository: CommitAnalysisRepository
  ) {}

  @Get("search")
  async searchByProfanity(
    @Query("profanity") profanity: string,
    @Query("limit") limit?: number,
    @Query("offset") offset?: number
  ) {
    return this.commitAnalysisRepository.searchCommitAnalysisByProfanity(
      profanity,
      limit,
      offset
    );
  }
}
