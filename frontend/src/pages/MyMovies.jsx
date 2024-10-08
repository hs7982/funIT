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
                <p></p>
                <div>
                    <table className="table w-full">
                        <thead>
                        <tr>
                            <th className="w-fit">순번</th>
                            <th colSpan="2">영화</th>
                            <th>펀딩 현황</th>
                            <th>작업</th>
                        </tr>
                        </thead>
                        <tbody>
                        {noContent ? <tr>
                                <td colSpan="5" className="text-center font-semibold">등록한 콘텐츠가 없습니다!</td>
                            </tr> :
                            movies.map((movie, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td className=""><img src={movie.thumbnailImage}
                                                          className="h-24"></img></td>
                                    <td>{movie.title}</td>
                                    <td>
                                        <p>{movie.status === 2 ? "모집종료" : `D-${calcDay(movie.endDate)}`}</p>
                                        <p>{calcPer(movie.targetCredit, movie.totalFunding)}% 달성</p>
                                    </td>
                                    <td>
                                        <Link to={"/funding/edit/" + movie.id}>
                                            <button
                                                className="btn btn-outline btn-primary me-3 btn-sm focus:outline-none">수정
                                            </button>
                                        </Link>
                                        <button className="btn btn-outline btn-error btn-sm focus:outline-none"
                                                onClick={(e) => deleteMovie(movie.id)}>삭제
                                        </button>
                                    </td>
                                </tr>))
                        }
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