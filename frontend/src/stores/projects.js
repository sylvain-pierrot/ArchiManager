import { defineStore } from "pinia";
import { api } from "../boot/axios";
import { Notify } from "quasar";

export const useProjectsStore = defineStore("projects", () => {
  const createProject = async (
    email,
    password,
    number,
    name,
    firstname,
    tel
  ) => {
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

  const updateStatusId = async (id, value) => {
    try {
      const response = await api.put(`/api/projects/${id}/status`, {
        statut_id: value,
      });
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
