<script lang="ts">
import Header from '../components/Header.svelte';
import SearchResults from '../components/SearchResults.svelte';

interface SearchResult {
  repositoryName: string;
  commitMessage: string;
  commitHash: string;    
}

// This would typically come from a backend API or local storage
// For now, we'll use a static array as an example
let favoriteResults: SearchResult[] = [
  {
    repositoryName: "example/repo",
    commitMessage: "sample favorite commit",
    commitHash: "abc123"
  }
];
</script>

<div class="text-center p-4 mx-auto">
  <Header />
  
  <div class="p-8">
    <h2 class="text-2xl font-semibold mb-6 text-gray-300">my favorite results</h2>
    <SearchResults results={favoriteResults} error={null} isLoading={false} />
  </div>
</div> 