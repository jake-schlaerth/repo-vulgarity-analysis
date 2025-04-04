<script lang="ts">
interface SearchResult {
  repositoryName: string;
  commitMessage: string;
  commitHash: string;
}

export let results: SearchResult[] = [];
export let error: string | null = null;
export let isLoading = false;
</script>

{#if error}
  <p class="text-red-500 mt-4">{error}</p>
{/if}

{#if results.length > 0}
  <div class="mt-8">
    <h2 class="text-2xl mb-4 text-gray-300">search results</h2>
    <ul class="list-none">
      {#each results as result}
        <li class="mb-4 p-4 border rounded text-left bg-gray-800 border-gray-700">
          <pre class="whitespace-pre-wrap text-gray-300">{JSON.stringify(result, null, 2)}</pre>
        </li>
      {/each}
    </ul>
  </div>
{:else if !isLoading && !error && results.length === 0}
  <p class="mt-4 text-gray-500">no results found</p>
{/if} 