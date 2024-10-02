import React, {useState, useEffect} from "react";
import Moviebox from "../components/Moviebox.jsx";
import axios from "axios";
import {Link} from "react-router-dom";
import Error from "./Error.jsx";
import {useRecoilValue} from "recoil";
import {IsLoginState} from "../recoil/RecoilState.js";
import {axiosGetMovieEndList, axiosGetMovieList} from "../api/axios.js";

/**
 * 영화 목록을 표시하는 페이지
 * @param showType - 1:진행중, 2:종료
 * @returns {Element}
 * @constructor
 */
const MovieProject = ({showType}) => {
    const [isError, setError] = useState(false)

    if (!isError) {
        return (
            <div>
                <p className="text-3xl font-medium my-12 text-center">내 프로젝트 관리</p>
                <p></p>
            </div>
        );
    } else {
        return <Error error={errorDetail}/>

    }
};

export default MovieProject;