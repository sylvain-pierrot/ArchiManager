import { defineStore } from "pinia";
import { api } from "../boot/axios";
import { Notify } from "quasar";

export const useFilesStore = defineStore("files", () => {
  const upload = async (id, file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post(`/api/projects/${id}/files`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Notify.create({
        type: "positive",
        position: "top-right",
        message: "Fichier ajouté avec succés",
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllFiles = async (id) => {
    try {
      const response = await api.get(`/api/projects/${id}/files`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const deleteFile = async (project_id, file_id) => {
    try {
      const response = await api.delete(
        `/api/projects/${project_id}/files/${file_id}`
      );
      Notify.create({
        type: "positive",
        position: "top-right",
        message: "Fichier supprimé",
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    upload,
    getAllFiles,
    deleteFile,
  };
});
