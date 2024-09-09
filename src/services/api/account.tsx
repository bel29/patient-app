import axios from "axios";

const API_URL = import.meta.env.VITE__API__URL;

export const getPatientRecords = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching patient records:", error);
    throw error;
  }
};
