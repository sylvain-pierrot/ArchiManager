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

  const createUser = async (email, password, number, name, firstname, tel) => {
    console.log(email);
    try {
      const response = await api.post("/api/architects", {
        email: email,
        mot_de_passe: password,
        numero_national: number,
        nom: name,
        prenom: firstname,
        telephone: tel,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await api.get("/api/architects");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  return { authenticated, checkAuthentication, createUser, getAllUsers };
});
