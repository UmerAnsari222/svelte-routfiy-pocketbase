<script>
  import { client } from "../context/pocketbase";
  import { auth } from "../store/auth";

  let title = "";
  let shortDescription = "";
  let description = "";
  let file = "";

  const handleSubmit = async () => {
    // console.log(file[0]);
    // console.log({ title, shortDescription, description });

    let formData = new FormData();

    formData.append("title", title);
    formData.append("description", shortDescription);
    formData.append("content", description);
    formData.append("file", file[0]);
    formData.append("createdBy", $auth.user.id);

    await client.records.create("post", formData);
    title = "";
    description = "";
    shortDescription = "";
    file = "";
  };
</script>

<div class="container mx-auto mt-10">
  <div class="w-1/2 bg-white px-4 py-5 shadow-lg mx-auto rounded-lg">
    <h1 class="text-2xl uppercase font-bold text-center">Create your post</h1>
    <form
      enctype="multipart/form-data"
      class="mt-5"
      on:submit|preventDefault={handleSubmit}
    >
      <div class="mt-2">
        <label for="title" class="leading-7 text-sm text-gray-600"
          >Post Title</label
        >
        <input
          bind:value={title}
          type="text"
          id="title"
          name="title"
          class="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div class="mt-2">
        <label for="shortDescription" class="leading-7 text-sm text-gray-600">
          Post Description
        </label>
        <input
          bind:value={shortDescription}
          type="text"
          id="shortDescription"
          name="shortDescription"
          class="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div class="mt-2">
        <label for="description" class="leading-7 text-sm text-gray-600">
          Post Content
        </label>
        <textarea
          bind:value={description}
          placeholder="Please enter a description here..."
          id="description"
          name="description"
          class="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
        />
      </div>

      <div class="flex justify-center items-center w-full mt-2">
        <label
          for="dropzone-file"
          class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div class="flex flex-col justify-center items-center pt-5 pb-6 ">
            <svg
              aria-hidden="true"
              class="mb-3 w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            bind:files={file}
            id="dropzone-file"
            type="file"
            class="hidden"
          />
        </label>
      </div>

      <button
        class="mt-2 uppercase text-white w-full bg-purple-800 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg"
      >
        Add Post
      </button>
    </form>
  </div>
</div>
