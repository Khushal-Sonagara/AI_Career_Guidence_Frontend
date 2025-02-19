import axios from "axios";
const API_URL = `${import.meta.env.VITE_APP_Base_API_URL}ResumePhoto`;


const PhotoUploadService = {
    // getPhoto: async (userId) => {
    //     try {
    //         const response = await axios.get(`${API_URL}/${userId}`);
    //         return response.data;
    //     } catch (error) {
    //         console.error("Error fetching photo:", error);
    //         return null;
    //     }
    // },

    uploadPhoto: async (userId, file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("userId", userId);

            const response = await axios.post(`${API_URL}/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            return response.data;
        } catch (error) {
            console.error("Photo upload failed:", error);
            throw error;
        }
    }
};

export default PhotoUploadService;
