import React, {useState, useEffect} from "react";
import Moviebox from "../components/Moviebox.jsx";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Error from "./Error.jsx";
import {useRecoilValue} from "recoil";
import {IsLoginState} from "../recoil/RecoilState.js";
import {
    axiosDeleteMovie,
    axiosGetMovieEndList,
    axiosGetMovieList,
    axiosGetMyMovies,
    axiosGetOneMovie
} from "../api/axios.js";
import {deleteMovie} from "../components/DeleteMovie.js";
import {calcDay, calcPer} from "../components/CalcDayAndPer.js";


const MovieProject = ({showType}) => {
    const [movies, setMovies] = useState([]);
    const [noContent, setNoContent] = useState(false)
    const [isError, setError] = useState(false)
    const navigate = useNavigate();

    const fetchMovie = async () => {
        try {
            const response = await axiosGetMyMovies();
            if (response.status === 200) {
                setMovies(response.data.data);
            } else if (response.status === 204) {
                setNoContent(true);
            }
        } catch (e) {
            if (e.response.status === 401) navigate("/login");
            else alert(e.response.statusText + "\n" + e.response.data);
        }
    };

    useEffect(() => {
        fetchMovie()
    }, []);

    if (!isError) {
        return (
            <div className="max-w-[1440px] w-full">
                <p className="text-3xl font-medium my-12 text-center">내 프로젝트 관리</p>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-center">
                        <thead>
                        <tr>
                            <th className="min-w-[40px]">순번</th>
                            <th className="min-w-[300px]">영화</th>
                            <th className="min-w-[120px]">펀딩 현황</th>
                            <th className="min-w-[120px]">작업</th>
                        </tr>
                        </thead>
                        <tbody>
                        {noContent ? (
                            <tr>
                                <td colSpan="4" className="text-center font-semibold">등록한 콘텐츠가 없습니다!</td>
                            </tr>
                        ) : (
                            movies.map((movie, idx) => (
                                <tr key={idx}>
                                    <td className="text-center">{idx + 1}</td>
                                    <td className="flex items-center">
                                        <img
                                            src={movie.thumbnailImage}
                                            className="object-contain w-[96px] h-24"
                                        />
                                        <Link to={"/funding/detail/" + movie.id} className="ml-4 text-start">
                                            {movie.title}
                                        </Link>
                                    </td>
                                    <td>
                                        <div className="flex justify-center items-center">
                                            <div className="me-2">
                                                <p>{movie.status === 2 ? "모집종료" : `D-${calcDay(movie.endDate)}`}</p>
                                                <p>{calcPer(movie.targetCredit, movie.totalFunding)}% 달성</p>
                                            </div>
                                            <div>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="">
                                        <Link to={"/funding/edit/" + movie.id}>
                                            <button
                                                className="btn btn-outline btn-primary me-3 btn-sm focus:outline-none">
                                                수정
                                            </button>
                                        </Link>
                                        <button
                                            className="btn btn-outline btn-error btn-sm focus:outline-none"
                                            onClick={(e) => deleteMovie(movie.id)}
                                        >
                                            삭제
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

        );
    } else {
        return <Error error={errorDetail}/>

    }
};

export default MovieProject;