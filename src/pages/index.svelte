<script>
  import { metatags } from "@roxi/routify";
  import { onMount } from "svelte";
  import { client } from "../context/pocketbase";
  import { auth } from "../store/auth";

  metatags.title = "Blog One | Home Page";
  metatags.description = "blog one home page";

  let response = [];

  onMount(async () => {
    await client.admins.authViaEmail("umar@gmail.com", "S9NuV3VrwxszYWP");
    response = await client.records.getFullList("post", 200, {
      sort: "-created",
    });

    // auth.subscribe((value) => {
    //   console.log(value);
    // });

    // console.log("RESPONSE ALL POST:  ", response);
  });
</script>

<section>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 space-x-4 space-y-4 mx-auto">
      <div class="flex flex-wrap -m-4">
        {#if response.length > 0}
          {#each response as post}
            <div
              class="p-4 md:w-1/3 hover:shadow-lg rounded-md hover:bg-white transition  cursor-pointer"
            >
              <div class="h-full  overflow-hidden">
                <img
                  class="lg:h-48 md:h-36 w-full object-contain rounded-lg"
                  src="http://127.0.0.1:8090/api/files/post/{post.id}/{post.file}?thumb=100x250"
                  alt="blog"
                />
                <div class="p-6">
                  <h1
                    class="title-font text-lg font-medium capitalize text-gray-900 mb-3"
                  >
                    {post.title}
                  </h1>
                  <p class="leading-relaxed mb-3">
                    {post.description}
                  </p>
                  <div class="flex items-center flex-wrap ">
                    <a
                      href="/blog/{post.id}"
                      class="text-purple-500 inline-flex items-center md:mb-2 lg:mb-0"
                    >
                      Learn More
                      <svg
                        class="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </a>

                    <span
                      class="text-gray-400  ml-auto inline-flex items-center leading-none text-sm"
                    >
                      <svg
                        class="w-4 h-4 mr-1"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                        />
                      </svg>6
                    </span>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </section>
</section>
