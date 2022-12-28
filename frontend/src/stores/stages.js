import { defineStore } from "pinia";
import { api } from "../boot/axios";
import { Notify } from "quasar";

export const useStagesStore = defineStore("stages", () => {
  const createStage = async (id, stage) => {
    try {
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

  const deleteStage = async (project_id, stage_id) => {
    try {
      const response = await api.delete(
        `/api/projects/${project_id}/stages/${stage_id}`
      );
      Notify.create({
        type: "positive",
        position: "top-right",
        message: "Phase supprimée avec succés",
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  deleteStage;
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
    deleteStage,
  };
});
