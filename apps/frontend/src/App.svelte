<script lang="ts">
  interface SearchResult {
    repositoryName: string;
    commitMessage: string;
    commitHash: string;    
  }

  let searchQuery = '';
  let searchResults: SearchResult[] = [];
  let isLoading = false;
  let error: string | null = null;

  async function handleSearch() {
    isLoading = true;
    error = null;
    
    const url = new URL('/commit-analysis/search', 'http://localhost:3000');
    url.searchParams.set('profanity', searchQuery);
    
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

<main class="text-center p-4 mx-auto">
  <h1 class="text-[#ff3e00] uppercase text-6xl font-thin leading-tight my-8">
    Commit Analysis
  </h1>
  
  <div class="p-8">
    <form on:submit|preventDefault={handleSearch} class="flex flex-col gap-4 max-w-md mx-auto">
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Enter search term"
        class="p-2 border rounded"
      />
      <button
        type="submit"
        class="text-lg py-2 px-4 bg-[#ff3e00] text-white rounded cursor-pointer hover:bg-[#ff6340] disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>

    {#if error}
      <p class="text-red-500 mt-4">{error}</p>
    {/if}

    {#if searchResults.length > 0}
      <div class="mt-8">
        <h2 class="text-2xl mb-4">Search Results</h2>
        <ul class="list-none">
          {#each searchResults as result}
            <li class="mb-4 p-4 border rounded text-left">
              <pre class="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
            </li>
          {/each}
        </ul>
      </div>
    {:else if !isLoading && !error && searchResults.length === 0}
      <p class="mt-4 text-gray-600">No results found</p>
    {/if}
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
  }
</style> 