const API_URL = `${import.meta.env.VITE_APP_Base_API_URL}ResumeCertification`;

const ResumeCertificationsService = {
  getAll: async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getByResumeId: async (resumeId) => {
    try {
      const response = await fetch(`${API_URL}/resume/${resumeId}`);
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  insert: async (data) => {
    console.log(data)
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to insert data");
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  update: async (data) => {
    console.log(data)
    try {
      const response = await fetch(`${API_URL}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update data");
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete data");
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default ResumeCertificationsService;
