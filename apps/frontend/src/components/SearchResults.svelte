<script lang="ts">
interface SearchResult {
  repository: string;
  commitMessage: string;
  commitHash: string;
}

export let results: SearchResult[] = [];
export let error: string | null = null;
export let isLoading = false;

function getRepoPath(repoUrl: string): string {
  const url = repoUrl.replace('https://github.com/', '').replace('.git', '');
  return url;
}

function getRepoName(repoUrl: string): string {
  const path = getRepoPath(repoUrl);
  return path.split('/').pop() || '';
}
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
          <div class="flex flex-col gap-3">
            <div>
              <span class="text-gray-500 text-sm tracking-wide">repo</span>
              <div class="text-gray-300 font-medium">{getRepoName(result.repository)}</div>
            </div>
            <div>
              <span class="text-gray-500 text-sm tracking-wide">commit message</span>
              <div class="text-gray-300 mt-1">{result.commitMessage}</div>
            </div>
            <a 
              href="https://github.com/{getRepoPath(result.repository)}/commit/{result.commitHash}"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-400 hover:text-blue-300 underline text-sm mt-1"
            >
              view commit
            </a>
          </div>
        </li>
      {/each}
    </ul>
  </div>
{:else if !isLoading && !error && results.length === 0}
  <p class="mt-4 text-gray-500">no results found</p>
{/if} 