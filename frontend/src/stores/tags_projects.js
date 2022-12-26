import { defineStore } from "pinia";
import { api } from "../boot/axios";
import { Notify } from "quasar";

export const useTagsProjectsStore = defineStore("tagsProjects", () => {
  const createTag = async (email, password, number, name, firstname, tel) => {
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

  const getAllTags = async () => {
    try {
      const response = await api.get("/api/tags");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    createTag,
    getAllTags,
  };
});
