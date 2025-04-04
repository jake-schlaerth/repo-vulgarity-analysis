<script lang="ts">
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher<{
  search: { query: string };
}>();

let searchQuery = '';
let isLoading = false;

function handleSubmit() {
  dispatch('search', { query: searchQuery });
}
</script>

<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4 max-w-md mx-auto">
  <input
    type="text"
    bind:value={searchQuery}
    placeholder="enter search term"
    class="p-2 border rounded bg-gray-800 text-gray-300 border-gray-700 placeholder-gray-500"
  />
  <button
    type="submit"
    class="text-lg py-2 px-4 bg-[#ff3e00] text-gray-200 rounded cursor-pointer hover:bg-[#ff6340] disabled:opacity-50"
    disabled={isLoading}
  >
    {isLoading ? 'searching...' : 'search'}
  </button>
</form> 