import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "database";

@Injectable()
export class CommitAnalysisRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCommitAnalysis(commitAnalysis: Prisma.commitAnalysisCreateInput) {
    return this.prisma.commitAnalysis.create({
      data: commitAnalysis,
    });
  }

  async searchCommitAnalysisByProfanity(
    profanity: string,
    limit: number = 100,
    offset: number = 0
  ) {
    const query = Prisma.sql`
      SELECT commit_message, commit_hash, repository FROM commit_analysis
      WHERE text_search_vector @@ plainto_tsquery('english', ${profanity})
      ORDER BY updated_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    return this.prisma.$queryRaw(query);
  }
}
