import { defineStore } from "pinia";
import { api } from "../boot/axios";
import { Notify } from "quasar";

export const useProjectsStore = defineStore("projects", () => {
  const createProject = async (project) => {
    try {
      const response = await api.post("/api/projects", project);
      Notify.create({
        type: "positive",
        position: "top-right",
        message: "Projet créé avec succés",
      });
      console.log(response.data);
      return response.data.id;
    } catch (error) {
      console.error(error);
    }
  };

  const getAllProjects = async () => {
    try {
      const response = await api.get("/api/projects");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getTotalFees = async () => {
    try {
      const response = await api.get("/api/projects/fees");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getTotalFeesCollected = async () => {
    try {
      const response = await api.get("/api/projects/feesCollected");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatusId = async (id, status) => {
    try {
      const response = await api.put(`/api/projects/${id}/status`, status);
      Notify.create({
        type: "positive",
        position: "top-right",
        message: "Projet modifié avec succés",
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    createProject,
    getAllProjects,
    getTotalFees,
    getTotalFeesCollected,
    updateStatusId,
  };
});
