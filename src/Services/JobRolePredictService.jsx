import axios from 'axios';
const API_URL = `${import.meta.env.VITE_APP_Base_API_URL}JobPrediction/predict-with-confidence`;


export const getJobRolePrediction = async (skills) => {
    try {
        const response = await axios.post(API_URL, { skills });
        return response.data;
    } catch (error) {
        console.error("Error fetching skill predictions", error);
        return null;
    }
};