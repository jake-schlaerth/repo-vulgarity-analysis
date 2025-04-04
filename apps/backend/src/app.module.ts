import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { CommitAnalysisModule } from "./commit-analysis/commit-analysis.module";
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [PrismaModule, DatabaseModule, CommitAnalysisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
