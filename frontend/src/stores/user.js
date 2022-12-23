import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "../boot/axios";

export const useUserStore = defineStore("user", () => {
  const authenticated = ref(null);

  async function checkAuthentication() {
    try {
      const response = await api.get("/api/isAuthenticated");
      authenticated.value = response.data.authenticated;
      console.log(response.data.authenticated);
      return response.data.authenticated;
    } catch (error) {
      console.error(error);
    }
  }

  return { authenticated, checkAuthentication };
});
