CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX idx_commit_analysis_trgm
ON commit_analysis
USING GIN (commit_message gin_trgm_ops);