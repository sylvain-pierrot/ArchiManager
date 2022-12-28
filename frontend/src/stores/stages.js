import { defineStore } from "pinia";
import { api } from "../boot/axios";
import { Notify } from "quasar";

export const useStagesStore = defineStore("stages", () => {
  const createStage = async (id, stage) => {
    try {
      console.log(id, stage);
      const response = await api.post(`/api/projects/${id}/stages`, stage);
      Notify.create({
        type: "positive",
        position: "top-right",
        message: "Phase créée avec succés",
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllStages = async (id) => {
    try {
      const response = await api.get(`/api/projects/${id}/stages`);
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
