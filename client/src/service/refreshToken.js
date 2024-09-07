import { axiosPrivate } from "./api";

const refreshToken = async () => {
    const response = await axiosPrivate.get("/refresh");
    return response;
}

export default refreshToken;