import { defineStore } from "pinia";
import { api } from "../boot/axios";
import { Notify } from "quasar";

export const useTagsProjectsStore = defineStore("tagsProjects", () => {
  const addTagProject = async (project_id, tag_id) => {
    try {
      const response = await api.post(`/api/projects/${project_id}/tags`, {
        tag_id: tag_id,
      });
      Notify.create({
        type: "positive",
        position: "top-right",
        message: `Tag ajouté au projet ${project_id} avec succés`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getAllTagsProject = async (project_id) => {
    try {
      const response = await api.get(`/api/projects/${project_id}/tags`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAllTagsProject = async (project_id) => {
    try {
      const response = await api.delete(`/api/projects/${project_id}/tags`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    addTagProject,
    getAllTagsProject,
    deleteAllTagsProject,
  };
});
