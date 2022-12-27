import { defineStore } from "pinia";
import { api } from "../boot/axios";
import { Notify } from "quasar";

export const useClientsStore = defineStore("clients", () => {
  const createClient = async (client) => {
    try {
      const response = await api.post("/api/clients", client);
      Notify.create({
        type: "positive",
        position: "top-right",
        message: "Client créé avec succés",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getAllClients = async () => {
    try {
      const response = await api.get("/api/clients");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  return {
    createClient,
    getAllClients,
  };
});
