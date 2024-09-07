import axios from "axios";
import refreshToken from "./refreshToken";

const BASE_URL = "http://localhost:3000"

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials:true
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
});

let sent = false;

axiosPrivate.interceptors.response.use(
    request => request,
    async (error) => {
        if (error?.response?.status === 401 && !sent) {
            sent = true;
            try {
                const response = await refreshToken();
                error.config.headers["Authorization"] = `Bearer ${response.data.newAccessToken}`;
                sent = false;
                return axiosPrivate(error.config)
            } catch (err) {
                sent = false;
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
)

export default instance;
