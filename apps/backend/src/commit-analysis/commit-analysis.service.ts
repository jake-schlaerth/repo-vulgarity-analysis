import { Injectable } from "@nestjs/common";
import { CommitAnalysisRepository } from "../database/commit-analysis.repository";

@Injectable()
export class CommitAnalysisService {
  constructor(
    private readonly commitAnalysisRepository: CommitAnalysisRepository
  ) {}

  async searchByProfanity(profanity: string, limit?: number, offset?: number) {
    return this.commitAnalysisRepository.searchCommitAnalysisByProfanity(
      profanity,
      limit,
      offset
    );
  }
}
