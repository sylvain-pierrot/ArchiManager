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
    } catch (error) {
      Notify.create({
        type: "negative",
        position: "top-right",
        message: "Phase erreur création",
      });
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
    } catch (error) {
      console.error(error);
    }
  };

  const updateProgressStage = async (project_id, stage_id, progress) => {
    try {
      const response = await api.patch(
        `/api/projects/${project_id}/stages/${stage_id}/progress`,
        progress
      );
      Notify.create({
        type: "positive",
        position: "top-right",
        message: "Progression modifiée",
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updatePaidStage = async (project_id, stage_id, paid) => {
    try {
      const response = await api.patch(
        `/api/projects/${project_id}/stages/${stage_id}/paid`,
        paid
      );
      Notify.create({
        type: "positive",
        position: "top-right",
        message: "Honoraires payés modifiées",
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateFeesStage = async (project_id, stage_id, fees) => {
    try {
      const response = await api.patch(
        `/api/projects/${project_id}/stages/${stage_id}/fees`,
        fees
      );
      Notify.create({
        type: "positive",
        position: "top-right",
        message: "Honoraires modifiées",
      });
      return response.data;
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

  const getAllFees = async (id) => {
    try {
      const response = await api.get(`/api/projects/${id}/stages/fees`);
      return response.data.sum;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    createStage,
    getAllStages,
    getAllFees,
    updateProgressStage,
    updatePaidStage,
    updateFeesStage,
    deleteStage,
  };
});
