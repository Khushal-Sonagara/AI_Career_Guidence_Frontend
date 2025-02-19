const API_URL = `${import.meta.env.VITE_APP_Base_API_URL}ResumeData`;

const ResumeDataService = {
  getByResumeId: async (id) => {
    try {
      const response = await fetch(`${API_URL}/GetByResumeId/${id}`);
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },


  deleteByResumeId: async (id) => {
    console.log("Deleting Resume ID:", id);
    try {
      const response = await fetch(`${API_URL}/DeleteByResumeId/${id}`, {
        method: "DELETE",
      });

      if (response.status === 404) {
        console.warn(`Resume ID ${id} not found.`);
        return { success: false, message: "Resume not found." };
      }

      if (response.status === 204) {
        return { success: true };
      }

      if (!response.ok) throw new Error("Failed to delete data");

      return { success: true };
    } catch (error) {
      console.error("Error deleting resume:", error);
      return { success: false, message: error.message };
    }
  }
};

export default ResumeDataService;
