<script lang="ts">
import Header from '../components/Header.svelte';
import SearchForm from '../components/SearchForm.svelte';
import SearchResults from '../components/SearchResults.svelte';

interface SearchResult {
  repositoryName: string;
  commitMessage: string;
  commitHash: string;    
}

let searchResults: SearchResult[] = [];
let isLoading = false;
let error: string | null = null;

async function handleSearch(event: CustomEvent<{ query: string }>) {
  const { query } = event.detail;
  isLoading = true;
  error = null;
  
  const url = new URL('/commit-analysis/search', 'http://localhost:3000');
  url.searchParams.set('profanity', query);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Search failed');
    searchResults = await response.json() as SearchResult[];
  } catch (e: unknown) {
    if (e instanceof Error) {
      error = e.message;
    } else {
      error = 'An unknown error occurred';
    }
  } finally {
    isLoading = false;
  }
}
</script>

<div class="text-center p-4 mx-auto">
  <Header />
  
  <div class="p-8">
    <SearchForm on:search={handleSearch} />
    <SearchResults results={searchResults} {error} {isLoading} />
  </div>
</div> 