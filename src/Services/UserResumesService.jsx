const API_URL = `${import.meta.env.VITE_APP_Base_API_URL}UserResume`;

const UserResumesService = {
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

  getByUserId: async (userId) => {
    try {
      const response = await fetch(`${API_URL}/byuser/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      console.log("Data in service:", data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  insert: async (data) => {
    console.log(data);
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

  update: async (id, data) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update data");
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  updateResumeImage : async (resumeId, resumeImageId) => {
    try {
      console.log("Sending Request:", resumeId, resumeImageId);
      const response = await fetch(`${API_URL}/update-resume-image/${resumeId}/${resumeImageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
  
      const rawText = await response.text();
      console.log("Raw Server Response:", rawText);
  
      if (!response.ok) throw new Error(rawText);
  
      return JSON.parse(rawText);
    } catch (error) {
      console.error("Error updating resume image:", error);
      throw error;
    }
  },
  
  


  delete: async (id) => {
    console.log(id);
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete data");
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default UserResumesService;
