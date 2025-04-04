ALTER TABLE commit_analysis 
ADD COLUMN text_search_vector tsvector 
GENERATED ALWAYS AS (to_tsvector('english', commit_message)) STORED;

CREATE INDEX idx_commit_analysis_tsv
ON commit_analysis
USING GIN (text_search_vector);