<script lang="ts">
import { Router, Link, Route } from "svelte-routing";
import Navigation from "./components/Navigation.svelte";
import Search from "./pages/Search.svelte";
import Favorites from "./pages/Favorites.svelte";

export let url = "";
</script>

<Router {url}>
  <div class="min-h-screen bg-gray-900 text-gray-400 font-['Courier_New']">
    <Navigation />
    <main>
      <Route path="/" component={Search} />
      <Route path="/favorites" component={Favorites} />
    </main>
  </div>
</Router>

<style>
  main {
    padding: 1em;
    margin: 0 auto;
  }
</style>