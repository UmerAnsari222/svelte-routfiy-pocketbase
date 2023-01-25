<script>
  import { goto, url } from "@roxi/routify";
  import { client } from "../context/pocketbase";
  import { auth } from "../store/auth";

  // const links = [
  //   ["./index", "Home"], //add index if you don't want siblings to be considered children
  //   ["./create_blog", "Create Blog"],
  //   ["./about", "About"],
  // ];

  const handelLogout = () => {
    // console.log("Hello");
    $goto("/");
    client.authStore.clear();
    $auth.user = null;
    $auth.token = null;
    $auth.authenticate = false;
    localStorage.clear();
  };
</script>

<header class="text-gray-600 body-font bg-purple-800">
  <div
    class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center"
  >
    <a
      href={$url("/")}
      class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        class="w-10 h-10 text-white p-2 bg-purple-500 rounded-full"
        viewBox="0 0 24 24"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
      <span class="ml-3 text-xl text-white uppercase">OneBlog</span>
    </a>
    <nav
      class="md:ml-auto flex flex-wrap items-center text-base justify-center"
    >
      <!-- {#each links as [path, name]} -->
      <!-- Svelte magic. If isActive is true, the "active" class is applied. -->
      <!-- <li class="list-none">
          <a
            class="mr-5 hover:text-gray-300 transition-all uppercase text-white"
            href={$url(path)}
          >
            {name}
          </a>
        </li> -->
      <!-- {/each} -->
      <li class="list-none">
        <a
          class="mr-5 hover:text-gray-300 transition-all uppercase text-white"
          href={$url("/")}
        >
          Home
        </a>
      </li>
      <li class="list-none">
        <a
          class="mr-5 hover:text-gray-300 transition-all uppercase text-white"
          href={$url("/create_blog")}
        >
          Create Post
        </a>
      </li>
      <li class="list-none">
        <a
          class="mr-5 hover:text-gray-300 transition-all uppercase text-white"
          href={$url("/about")}
        >
          About
        </a>
      </li>
    </nav>
    {#if $auth.authenticate}
      <div class="flex items-center space-x-2 mt-2 md:mt-0">
        <button
          on:click={handelLogout}
          class="inline-flex items-center uppercase bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base  md:mt-0"
        >
          Logout
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        {#if $auth.user.profile.avatar}
          <a href="/profile/" class="inline-block">
            <img
              class="w-8 h-8 md:w-10 md:h-10 rounded-full cursor-pointer"
              src={`http://127.0.0.1:8090/api/files/profiles/${$auth.user.profile.id}/${$auth.user.profile.avatar}`}
              alt=""
            />
          </a>
        {:else}
          <a href="/profile/">
            <img
              class="w-10 h-10 rounded-full cursor-pointer"
              src="/public/images/user-svgrepo-com.svg"
              alt=""
            />
          </a>
        {/if}
      </div>
    {:else}
      <a
        href={$url("/login")}
        class="inline-flex items-center uppercase bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
      >
        Login
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-4 h-4 ml-1"
          viewBox="0 0 24 24"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    {/if}
  </div>
</header>

<!-- a99rjsBS3P6VQeq -->
