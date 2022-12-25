import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "../boot/axios";
import { Notify } from "quasar";

export const useUserStore = defineStore("user", () => {
  const authenticated = ref(null);

  // const checkAuthentication = async () => {
  //   try {
  //     const response = await api.get("/api/isAuthenticated");
  //     authenticated.value = response.data.authenticated;
  //     console.log(response.data.authenticated);
  //     return response.data.authenticated;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  function getCookie(name) {
    let cookie = null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      cookie = parts.pop().split(";").shift();
    }
    return cookie;
  }

  const login = async (email, password) => {
    try {
      const response = await api.post("/api/login", {
        email: email,
        mot_de_passe: password,
      });
      Notify.create({
        type: "positive",
        position: "top-right",
        message: "Connexion réussie",
      });
      console.log(response.data);
    } catch (error) {
      Notify.create({
        type: "negative",
        position: "top-right",
        message: "Connexion échouée",
      });
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      const response = await api.post("/api/logout", {});
      Notify.create({
        type: "positive",
        position: "top-right",
        message: "Déonnexion réussie",
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = async (email, password, number, name, firstname, tel) => {
    try {
      const response = await api.post("/api/architects", {
        email: email,
        mot_de_passe: password,
        numero_national: number,
        nom: name,
        prenom: firstname,
        telephone: tel,
      });
      Notify.create({
        type: "positive",
        position: "top-right",
        message: "Compte créé avec succés",
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
  return {
    authenticated,
    getCookie,
    createUser,
    getAllUsers,
    login,
    logout,
  };
});
