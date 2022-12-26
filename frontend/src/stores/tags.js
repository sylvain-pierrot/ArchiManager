import { defineStore } from "pinia";
import { api } from "../boot/axios";
import { Notify } from "quasar";

export const useTagsStore = defineStore("tags", () => {
  const createTag = async (label, color) => {
    try {
      const response = await api.post("/api/tags", {
        label: label,
        color: color,
      });
      Notify.create({
        type: "positive",
        position: "top-right",
        message: "Tag créé avec succés",
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
