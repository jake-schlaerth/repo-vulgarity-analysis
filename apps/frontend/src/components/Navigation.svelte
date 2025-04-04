<script lang="ts">
import { Link } from "svelte-routing";
</script>

<nav class="bg-gray-800 text-gray-400 p-4 border-b border-gray-700">
  <div class="container mx-auto flex gap-6">
    <Link to="/" class="hover:text-[#ff3e00]">search</Link>
    <Link to="/favorites" class="hover:text-[#ff3e00]">favorites</Link>
  </div>
</nav> 