<script>
  import { client } from "../context/pocketbase";
  import { SvelteToast, toast } from "@zerodevx/svelte-toast";

  let email = "";
  let password = "";
  let confirmPassword = "";

  const handleSubmit = async () => {
    // console.log({ email, password, confirmPassword });
    if (email == "" || password == "" || confirmPassword == "") {
      toast.push("All fileds are required!!", {
        theme: {
          "--toastColor": "white",
          "--toastBackground": "rgba(255,0,0,1)",
          "--toastBarBackground": "rgb(176, 30, 30)",
        },
      });
      return;
    }
    try {
      const user = await client.users.create({
        email: email,
        password: password,
        passwordConfirm: confirmPassword,
      });

      // console.log(user);

      localStorage.setItem();

      toast.push("Your Accont has been created successfully", {
        theme: {
          "--toastColor": "black",
          "--toastBackground": "rgba(0,255,0,1)",
          "--toastBarBackground": "rgb(10, 81, 10)",
        },
      });

      toast.push("We sent a verication link on your email", {
        theme: {
          "--toastColor": "white",
          "--toastBackground": "orange",
          "--toastBarBackground": "rgb(182, 52, 5)",
        },
      });
      email = "";
      password = "";
      confirmPassword = "";
    } catch (error) {
      // console.log(error.message);
      toast.push("Something went wrong!!", {
        theme: {
          "--toastColor": "white",
          "--toastBackground": "rgba(255,0,0,1)",
          "--toastBarBackground": "rgb(176, 30, 30)",
        },
      });
    }
  };
</script>

<section class="h-screen">
  <SvelteToast />
  <div class="container px-6 py-12 h-full">
    <div
      class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800"
    >
      <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          class="w-full"
          alt="Phone image"
        />
      </div>
      <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
        <form on:submit|preventDefault={handleSubmit}>
          <!-- Email input -->
          <div class="mb-6">
            <input
              bind:value={email}
              type="email"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Email address"
            />
          </div>

          <!-- Password input -->
          <div class="mb-6">
            <input
              bind:value={password}
              type="password"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Password"
            />
          </div>

          <!-- Confirm Password input -->
          <div class="mb-6">
            <input
              bind:value={confirmPassword}
              type="password"
              class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Confirm Password"
            />
          </div>

          <div class="flex justify-end items-center mb-6">
            <a
              href="#!"
              class="text-purple-600 hover:text-purple-700 focus:text-purple-700 active:text-purple-800 duration-200 transition ease-in-out"
            >
              Forgot password?
            </a>
          </div>

          <!-- Submit button -->
          <button
            type="submit"
            class="inline-block px-7 py-3 bg-purple-700 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-600 hover:shadow-lg focus:bg-purple-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-900 active:shadow-lg transition duration-150 ease-in-out w-full"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
          >
            Sign Up
          </button>

          <div
            class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
          >
            <p class="text-center font-semibold mx-4 mb-0">OR</p>
          </div>
          <div class="text-center">
            <a href="/login">
              Already have an account? <strong>Login</strong>
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
