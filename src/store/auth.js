import { writable } from "svelte/store";

export const auth = writable({
  user: null,
  token: null,
  authenticate: false,
});
