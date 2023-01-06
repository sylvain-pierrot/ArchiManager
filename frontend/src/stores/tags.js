import { defineStore } from "pinia";
import { api } from "../boot/axios";
import { Notify } from "quasar";

export const useTagsStore = defineStore("tags", () => {
  const createTag = async (tag) => {
    try {
      const response = await api.post("/api/tags", tag);
      Notify.create({
        type: "positive",
        position: "top-right",
        message: "Tag créé avec succés",
      });
    } catch (error) {
      Notify.create({
        type: "negative",
        position: "top-right",
        message: "Tag erreur cration",
      });
      console.error(error);
    }
  };

  const getAllTags = async () => {
    try {
      const response = await api.get("/api/tags");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateLabelTag = async (tag) => {
    try {
      const response = await api.patch(`/api/tags/${tag.id}/label`, {
        label: tag.label,
      });
      Notify.create({
        type: "positive",
        position: "top-right",
        message: "Label tag modifié avec succés",
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const totalProjectsByTag = async (tag_id) => {
    try {
      const response = await api.get(`/api/tags/${tag_id}/sumProjects`);
      return response.data[0].count;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    createTag,
    getAllTags,
    updateLabelTag,
    totalProjectsByTag,
  };
});
