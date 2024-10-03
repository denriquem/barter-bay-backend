import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const getToken = async () => {
    try {
        const response = await axios.post(
            "https://dev-m0wut2s6duzmzyqq.eu.auth0.com/oauth/token",
            {
                client_id: process.env.API_CLIENT_ID,
                client_secret: process.env.API_CLIENT_SECRET,
                audience: "https://barter-bay-api/",
                grant_type: "client_credentials",
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data.access_token;
    } catch (error) {
        console.error("Error fetching token:", error);
        throw error;
    }
};
