import { defineStore } from "pinia";
import { api } from "../boot/axios";
import { Notify } from "quasar";

export const useClientsStore = defineStore("clients", () => {
  const createClient = async (
    clientName,
    clientNameContact,
    email,
    address,
    city,
    phone,
    notes
  ) => {
    try {
      const response = await api.post("/api/clients", {
        nom: clientName,
        nom_contact: clientNameContact,
        email: email,
        adresse: address,
        ville: city,
        telephone: phone,
        notes: notes,
      });
      Notify.create({
        type: "positive",
        position: "top-right",
        message: "Client créé avec succés",
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllClients = async () => {
    try {
      const response = await api.get("/api/clients");
      console.log(response.data);
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
