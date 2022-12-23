import { defineStore } from "pinia";

export const userStore = defineStore("user", () => {
  const authenticated = ref(false);

  async function checkAuthentication() {
    try {
      const response = await axios.get("/isAuthenticated");
      console.log(response.data.authenticated);
      return response.data.authenticated;
    } catch (error) {
      console.error(error);
    }
  }

  return { authenticated, checkAuthentication };
});
