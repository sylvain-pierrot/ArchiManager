import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "../boot/axios";
import { Notify } from "quasar";

export const useUserStore = defineStore("user", () => {
  const isAdmin = async () => {
    try {
      const response = await api.get("/api/architects/isAdmin");
      return response.data[0];
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (email, password) => {
    try {
      await api.post("/api/login", {
        email: email,
        mot_de_passe: password,
      });
      Notify.create({
        type: "positive",
        position: "top-right",
        message: "Connexion réussie",
      });
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
    createUser,
    getAllUsers,
    login,
    logout,
    isAdmin,
  };
});
