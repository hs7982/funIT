import axios from "axios";

const instance = axios.create({
    baseURL: "/api",
    withCredentials: true,
});


const axiosLoginUrl = "/users/login"
/**
 * axios api 로그인 요청
 * @param email
 * @param password
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const axiosLogin = async (email, password) => {
    try {
        const response = await instance.post(axiosLoginUrl, {
            email,
            password,
        });
        return response;
    } catch (error) {
        throw error;
    }

}