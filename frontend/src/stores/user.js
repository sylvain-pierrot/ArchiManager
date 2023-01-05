import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "../boot/axios";
import { Notify } from "quasar";

export const useUserStore = defineStore("user", () => {
  const isAdmin = ref(false);

  const checkIsAdmin = async () => {
    try {
      const response = await api.get("/api/architects/isAdmin");
      if (response.data[0].role_id === 1) {
        isAdmin.value = true;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isUniqueEmail = async (email) => {
    try {
      const response = await api.post("/api/architects/emailIsUnique", email);
      console.log(response.data);
      return response.data;
    } catch (error) {
      Notify.create({
        type: "negative",
        position: "top-right",
        message: "Email déjà utilisé",
      });
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
        message: "Connexion",
      });
    } catch (error) {
      Notify.create({
        type: "negative",
        position: "top-right",
        message: "Connexion",
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
        message: "Déonnexion",
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
        message: "Compte créé",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await api.delete(`/api/architects/${id}`);
      Notify.create({
        type: "positive",
        position: "top-right",
        message: "Utilsateur supprimé",
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await api.get("/api/architects");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  return {
    createUser,
    deleteUser,
    isUniqueEmail,
    getAllUsers,
    login,
    logout,
    checkIsAdmin,
    isAdmin,
  };
});
