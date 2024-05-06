import axios from "axios";

const instance = axios.create({
    baseURL: "/api",
    withCredentials: true,
    timeout: 15000
});


/**
 * axios api 로그인 요청
 * @param email
 * @param password
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const axiosLogin = async (email, password) => {
    try {
        const response = await instance.post("/users/login", {
            email,
            password,
        });
        return response;
    } catch (error) {
        throw error;
    }

}

export const axiosMe = async () => {
    try {
        const response = await instance.get("/users/me");
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosLogout = async () => {
    try {
        const response = await instance.get("/users/logout");
        return response;
    } catch (error) {
        throw error;
    }
}


/**
 * axios api 하나의 영화 프로젝트 정보 요청
 * @param movieId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const axiosGetOneMovie = async (movieId) => {
    try {
        const response = await instance.get("/movies/" + movieId,);
        return response;
    } catch (error) {
        throw error;
    }

}