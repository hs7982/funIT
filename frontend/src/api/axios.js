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

/**
 * axios api 현재 로그인 세션 정보 요청
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const axiosMe = async () => {
    try {
        const response = await instance.get("/users/me");
        return response;
    } catch (error) {
        throw error;
    }
}

/**
 * axios api 로그인 사용자의 마이페이지 요청
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const axiosMyPage = async () => {
    try {
        const response = await instance.get("/users/mypage");
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosSignup = async (data) => {
    try {
        const response = await instance.post("/users/signup", data)
        return response;
    } catch (error) {
        throw error;
    }
}

/**
 * axios api 로그아웃 요청
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const axiosLogout = async () => {
    try {
        const response = await instance.get("/users/logout");
        return response;
    } catch (error) {
        throw error;
    }
}

/**
 * axios api 전체 영화 목록 리스트 요청
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const axiosGetMovieList = async () => {
    try {
        const response = await instance.get("/movies");
        return response;
    } catch (error) {
        throw error;
    }

}

/**
 * axios api 새로운 영화 프로젝트 등록 요청
 * @param formData
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const axiosPostNewMovie = async (formData) => {
    try {
        const response = await instance.post("/movies/new", formData, {
            timeout: 30000,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response;
    } catch (error) {
        throw error;
    }

}

export const axiosPostNewProfileImage = async (formData) => {
    try {
        const response = await instance.post("/users/change-profileImage", formData, {
            timeout: 30000,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response;
    } catch (error) {
        throw error;
    }

}

/**
 * axios api 새로운 이미지 등록 요청
 * @param formData
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const axiosPostNewImage = async (formData) => {
    try {
        const response = await instance.post("/image", formData, {
            timeout: 30000,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
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
        const response = await instance.get("/movies/" + movieId);
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosGetCommentByMovie = async (movieId) => {
    try {
        const response = await instance.get("/comments/" + movieId);
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosPostComment = async (data) => {
    try {
        const response = await instance.post("/comments", data);
        return response;
    } catch (error) {
        throw error;
    }
}

/**
 * 영화 프로젝트 삭제 요청
 * @param movieId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const axiosDeleteMovie = async (movieId) => {
    try {
        const response = await instance.delete("/movies/" + movieId,);
        return response;
    } catch (error) {
        throw error;
    }
}

/**
 * axios api 영화 검색 요청
 * @param keyword
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const axiosSearchMovie = async (keyword) => {
    try {
        const response = await instance.get("/movies/search?keyword=" + keyword);
        return response;
    } catch (error) {
        throw error;
    }
}