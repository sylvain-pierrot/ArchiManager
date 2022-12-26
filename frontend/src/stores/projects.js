import { defineStore } from "pinia";
import { api } from "../boot/axios";
import { Notify } from "quasar";

export const useProjectsStore = defineStore("projects", () => {
  const createProject = async (
    title,
    landSurface,
    indicativeSurface,
    city,
    address,
    startDate,
    endDate,
    description,
    mission_id,
    designation_id,
    client_id
  ) => {
    try {
      console.log(
        title,
        landSurface,
        indicativeSurface,
        city,
        address,
        startDate,
        endDate,
        description,
        mission_id,
        designation_id,
        client_id
      );
      const response = await api.post("/api/projects", {
        titre: title,
        surface_fonciere: landSurface,
        surface_indicative: indicativeSurface,
        ville: city,
        adresse: address,
        date_debut: startDate,
        date_fin: endDate,
        description: description,
        statut_id: 1,
        mission_id: mission_id,
        designation_id: designation_id,
        client_id: client_id,
      });
      Notify.create({
        type: "positive",
        position: "top-right",
        message: "Projet créé avec succés",
      });
      console.log(response.data);
    } catch (error) {
      Notify.create({
        type: "negative",
        position: "top-right",
        message: "Erreur: la création a échoué",
      });
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
