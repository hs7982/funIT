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
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [errorDetail, setErrorDetail] = useState();
    const isLogin = useRecoilValue(IsLoginState);

    const fetchMovies = async () => {
        setLoading(true);
        try {
            let response
            if (showType === 1)
                response = await axiosGetMovieList();
            else if (showType === 2)
                response = await axiosGetMovieEndList();
            else alert('불러올 영화목록 타입이 지정되지 않았습니다!')
            setMovies(response.data.data);
            setLoading(false); // 데이터 불러오기 완료 시 로딩 상태 변경
        } catch (error) {
            console.error("Error fetching movies:", error);
            setError(true);
            setErrorDetail(error)
            setLoading(false); // 에러 발생 시에도 로딩 상태 변경
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [showType]);

    if (!isError) {
        return (
            <div className="container max-w-[1440px] mx-auto my-8">
                <h2 className="mb-8 ms-2 text-3xl font-semibold">
                    {showType === 1 ?
                        "✨ 진행중인 펀딩 " + movies.length + "개" : "✨ 종료된 펀딩"
                    }
                </h2>

                {loading ? ( // 로딩 중인 동안 로딩 표시
                    <div className="flex justify-center"><span
                        className="loading loading-spinner loading-md"></span>
                    </div>

                ) : (
                    <div className="flex flex-wrap justify-evenly gap-8">
                        {movies.map(movie => (
                            <Moviebox key={movie.id} movie={movie}/> // key 추가
                        ))}
                    </div>
                )}
            </div>
        );
    } else {
        return <Error error={errorDetail}/>

    }
};

export default MovieProject;