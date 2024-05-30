import React, {useState, useEffect} from "react";
import Moviebox from "../components/Moviebox.jsx";
import axios from "axios";
import {Link} from "react-router-dom";
import Error from "./Error.jsx";
import {useRecoilValue} from "recoil";
import {IsLoginState} from "../recoil/RecoilState.js";
import {axiosGetMovieEndList, axiosGetMovieList} from "../api/axios.js";

const EndMovieProject = () => {
    const [movies, setMoviesEnd] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [errorDetail, setErrorDetail] = useState();
    const isLogin = useRecoilValue(IsLoginState);

    const fetchMoviesEnd = async () => {
        try {
            const response = await axiosGetMovieEndList();
            setMoviesEnd(response.data.data);
            setLoading(false); // 데이터 불러오기 완료 시 로딩 상태 변경
        } catch (error) {
            console.error("Error fetching movies:", error);
            setError(true);
            setErrorDetail(error)
            setLoading(false); // 에러 발생 시에도 로딩 상태 변경
        }
    };

    useEffect(() => {
        fetchMoviesEnd();
    }, []);

    if (!isError) {
        return (
            <div className="container max-w-[1440px] mx-auto my-8">
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

export default EndMovieProject;