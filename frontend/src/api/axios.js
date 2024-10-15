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

/**
 * axios 크래딧 사용 내역 요청
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const axiosMyCreditList = async () => {
    try {
        const response = await instance.get("/credits");
        return response;
    } catch (error) {
        throw error;
    }
}

/**
 * axios 회원가입 요청
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
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
 * axios 펀딩이 종료된 영화 목록 요청
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const axiosGetMovieEndList = async () => {
    try {
        const response = await instance.get("/movies/end");
        return response;
    } catch (error) {
        throw error;
    }

}

/**
 * axios 내가 등록한 영화 정보 요청
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const axiosGetMyMovies = async () => {
    try {
        const response = await instance.get("/movies/my");
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosGetMyMoviesDetail = async (id) => {
    try {
        const response = await instance.get("/fundings/detail/" + id);
        return response;
    } catch (error) {
        throw error;
    }
}


export const axiosGetMovieTotal = async (id) => {
    try {
        const response = await instance.get("/fundings/total/" + id);
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

/**
 * axios 새로운 프로필사진 등록 요청
 * @param formData
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
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

/**
 * 영화 id에 대한 댓글 리스트 요청
 * @param movieId
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const axiosGetCommentByMovie = async (movieId) => {
    try {
        const response = await instance.get("/comments/" + movieId);
        return response;
    } catch (error) {
        throw error;
    }
}

/**
 * axios 댓글 작성 요청
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const axiosPostComment = async (data) => {
    try {
        const response = await instance.post("/comments", data);
        return response;
    } catch (error) {
        throw error;
    }
}

/**
 * axios 댓글 삭제 요청
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const axiosDeleteComment = async (id) => {
    try {
        const response = await instance.delete("/comments/" + id);
        return response;
    } catch (error) {
        throw error;
    }
}

/**
 * axios 투자하기 요청
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const axiosPostFunding = async (data) => {
    try {
        const response = await instance.post("/fundings", data);
        return response;
    } catch (error) {
        throw error;
    }
}

/**
 * axios 투자취소 요청
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const axiosFundingRefund = async (id, reason) => {
    try {
        const response = await instance.post("/fundings/refund/" + id, {reason});
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

export const axiosLikeMovie = async (movieId) => {
    try {
        const response = await instance.post("/likes/" + movieId);
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosUnLikeMovie = async (movieId) => {
    try {
        const response = await instance.delete("/likes/" + movieId);
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosLikeStatus = async (movieId) => {
    try {
        const response = await instance.get("/likes/" + movieId);
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosMyLike = async () => {
    try {
        const response = await instance.get("/likes/my");
        return response;
    } catch (error) {
        throw error;
    }
}

export const axiosFundingDetail = async (fundingId) => {
    try {
        const response = await instance.get("/fundings/" + fundingId);
        return response;
    } catch (error) {
        throw error;
    }
}