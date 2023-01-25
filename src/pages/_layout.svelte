<script>
  import Navbar from "../components/Navbar.svelte";
  import { auth } from "../store/auth";
</script>

<div>
  <Navbar />

  <slot />
</div>
