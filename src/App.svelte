<script>
  import { Router } from "@roxi/routify";
  import { routes } from "../.routify/routes";
  import { onMount } from "svelte";
  import { auth } from "./store/auth";

  onMount(() => {
    let pocketbase_user_auth = JSON.parse(
      localStorage.getItem("pocketbase_user_auth")
    );

    // console.log("pocketbase__user_auth ", pocketbase_user_auth);
    if (pocketbase_user_auth != null) {
      $auth.user = pocketbase_user_auth.user;
      $auth.toke = pocketbase_user_auth.token;
      $auth.authenticate = true;

      localStorage.setItem(
        "pocketbase_user_auth",
        JSON.stringify({
          token: $auth.token,
          user: $auth.user,
        })
      );
    }
  });
</script>

<Router {routes} />
