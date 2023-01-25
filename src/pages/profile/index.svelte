<script>
  import { goto } from "@roxi/routify";
  import { onMount } from "svelte";
  import { client } from "../../context/pocketbase";
  import { auth } from "../../store/auth";

  let user = {
    name: "",
    profession: "",
    file: "",
  };

  onMount(async () => {
    if ($auth.user != null) {
      user.name = $auth.user.profile.name;
      user.profession = $auth.user.profile.profession;
    }
  });

  const handelSubmit = async () => {
    let formData = new FormData();

    formData.append("name", user.name);
    formData.append("profession", user.profession);
    formData.append("avatar", user.file[0]);

    console.log(user.file[0]);

    let response = await client.records.update(
      "profiles",
      $auth.user.profile.id,
      formData
    );

    $auth.user.profile = response;

    localStorage.setItem(
      "pocketbase_user_auth",
      JSON.stringify({
        token: $auth.token,
        user: $auth.user,
      })
    );

    // console.log(response);
  };
</script>

{#if $auth.user}
  <div class="container mx-auto">
    <div class="bg-white mt-8 rounded-lg w-[80%] mx-auto py-4">
      {#if $auth.user.profile.avatar}
        <img
          class="w-32 h-32 mx-auto rounded-full bg-cover"
          src={`http://127.0.0.1:8090/api/files/profiles/${$auth.user.profile.id}/${$auth.user.profile.avatar}`}
          alt=""
        />
      {:else}
        <img
          class="w-32 h-32 mx-auto rounded-full"
          src="/public/images/user-svgrepo-com.svg"
          alt=""
        />
      {/if}

      <div
        class="flex justify-center w-full px-5 md:px-0 flex-col space-y-1 md:w-[50%] mx-auto mb-4"
      >
        <label class="block" for="">Email</label>
        <input
          bind:value={$auth.user.email}
          readonly
          disabled
          type="email"
          class="shadow-xl bg-gray-100 outline-none border-2 border-purple-500 px-3 rounded-md h-10"
        />
      </div>

      <div
        class="flex justify-center flex-col space-y-1 w-full px-5 md:px-0 md:w-[50%] mx-auto mb-4"
      >
        <label class="block" for="">Username</label>
        <input
          bind:value={user.name}
          type="text"
          class="shadow-xl outline-none border-2 border-purple-500 px-3 rounded-md h-10"
        />
      </div>

      <div
        class="flex justify-center flex-col space-y-1 w-full px-5 md:px-0 md:w-[50%] mx-auto mb-4"
      >
        <label class="block" for="">Profession</label>
        <input
          bind:value={user.profession}
          type="text"
          class="shadow-xl outline-none border-2 border-purple-500 px-3 rounded-md h-10"
        />
      </div>

      <div
        class="{user.file[0]
          ? 'bg-green-500 text-white'
          : ''} cursor-pointer flex items-center space-y-1 w-[90%]  md:px-0 md:w-[50%] mx-auto mb-4 shadow-xl border-2 border-purple-500  outline-none rounded-md h-12"
      >
        <img
          class="h-5 w-8 font-bold"
          src="/public/images/clouds-cloud-svgrepo-com.svg"
          alt=""
        />
        <div>
          {#if user.file && user.file[0]}
            <label class="block text-sm" for="avatarImage">
              Your pictue is selected
            </label>
          {:else}
            <label class="block text-sm" for="avatarImage">
              Select your Profile Picture
            </label>
          {/if}

          <input
            bind:files={user.file}
            type="file"
            id="avatarImage"
            class="hidden"
          />
        </div>
      </div>

      <div class="text-center">
        <button
          on:click={handelSubmit}
          class="bg-purple-900 h-10 hover:bg-purple-700 font-bold uppercase rounded-md text-white w-[50%] text-center"
        >
          SUMBIT
        </button>
      </div>
    </div>
  </div>
{/if}
