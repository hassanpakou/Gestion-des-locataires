import axios from "axios";

const API_URL = "http://localhost:5000";

export const obtenirDossier = async (patientId) => {
    const response = await axios.get(`${API_URL}/patients/${patientId}/dossier`);
    return response.data;
};
