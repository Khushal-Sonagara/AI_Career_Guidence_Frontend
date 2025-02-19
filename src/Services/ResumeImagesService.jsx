const API_URL =`${import.meta.env.VITE_APP_Base_API_URL}ResumeImages`;

const ResumeImagesService = {
  getAllImages: async () => {
    try {
      const response = await fetch(`${API_URL}/all`);
      if (!response.ok) throw new Error("Failed to fetch images.");
      const data=await response.json();
      console.log(data);
      return await data; // Returns an array of { imageId, imageURL }
    } catch (error) {
      console.error("Error fetching resume images:", error);
      return [];
    }
  },
};

export default ResumeImagesService;
