<script>
  import { onMount } from "svelte";
  import { client } from "../../context/pocketbase";
  import moment from "moment";

  export let id;
  let post;

  onMount(async () => {
    post = await client.records.getOne("post", id);
  });
</script>

<section class="text-gray-600 body-font">
  {#if post}
    <div
      class="container mx-auto flex px-5 py-24 items-center justify-center flex-col"
    >
      <img
        class="lg:w-full h-72 md:w-3/6 w-5/6 mb-10 object-contain rounded"
        alt="hero"
        src="http://127.0.0.1:8090/api/files/post/{post.id}/{post.file}?thumb=100x250"
      />
      <div class="text-center lg:w-2/3 w-full">
        <h1 class="mb-4">
          Created At : <span class="font-bold ml-3">
            {moment(post.created).format("dddd, MMMM Do YYYY")}</span
          >
        </h1>
        <h1
          class="title-font capitalize sm:text-4xl text-3xl mb-4 font-medium text-gray-900"
        >
          {post.title}
        </h1>
        <p class="mb-8 leading-relaxed">
          {post.content}
        </p>
        <div class="flex justify-center">
          <a
            href="/"
            class="uppercase inline-flex text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg"
          >
            Go back
          </a>
        </div>
      </div>
    </div>
  {/if}
</section>
