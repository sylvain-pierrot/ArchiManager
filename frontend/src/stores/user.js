import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "../boot/axios";
import { Notify } from "quasar";

export const useUserStore = defineStore("user", () => {
  const authenticated = ref(false);
  const user = ref(null);
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

  const getMe = async () => {
    try {
      const response = await api.get("/api/architects/me");
      user.value = response.data[0];
    } catch (error) {
      console.error(error);
    }
  };

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
      authenticated.value = true;
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
      authenticated.value = false;
      user.value = null;
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = async (user) => {
    try {
      const response = await api.post("/api/architects", user);
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
    user,
    getCookie,
    createUser,
    getAllUsers,
    login,
    logout,
    getMe,
  };
});
