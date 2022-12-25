import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "../boot/axios";
import { Notify } from "quasar";

export const useStagesStore = defineStore("stages", () => {
  const createStage = async (email, password, number, name, firstname, tel) => {
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

  const getAllStages = async (id) => {
    try {
      const response = await api.get(`/api/projects/${id}/stages`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  return {
    createStage,
    getAllStages,
  };
});
