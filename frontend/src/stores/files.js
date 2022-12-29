import { defineStore } from "pinia";
import { api } from "../boot/axios";
import { Notify } from "quasar";

export const useFilesStore = defineStore("files", () => {
  const upload = async (id, file) => {
    const formData = new FormData();
    formData.append("file", file.data[0]);

    console.log(formData);
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
  // const deleteStage = async (project_id, stage_id) => {
  //   try {
  //     const response = await api.delete(
  //       `/api/projects/${project_id}/stages/${stage_id}`
  //     );
  //     Notify.create({
  //       type: "positive",
  //       position: "top-right",
  //       message: "Phase supprimée avec succés",
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // deleteStage;
  // const getAllStages = async (id) => {
  //   try {
  //     const response = await api.get(`/api/projects/${id}/stages`);
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return {
    upload,
    getAllFiles,
    // getAllStages,
    // deleteStage,
  };
});
