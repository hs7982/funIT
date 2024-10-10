import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import Error from "./Error.jsx";
import {axiosGetMyMovies} from "../api/axios.js";
import {deleteMovie} from "../components/DeleteMovie.js";
import {calcDay, calcPer} from "../components/CalcDayAndPer.js";


const MyMovies = () => {
    const [movies, setMovies] = useState([]);
    const [noContent, setNoContent] = useState(false)
    const [isError, setError] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate();

    const fetchMovie = async () => {
        setLoading(true);
        try {
            const response = await axiosGetMyMovies();
            if (response.status === 200) {
                setMovies(response.data.data);
            } else if (response.status === 204) {
                setNoContent(true);
            }
            setLoading(false)
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
                <div className="overflow-x-auto my-4">
                    {isLoading ? <div className="flex justify-center"><span
                            className="loading loading-spinner loading-md"></span>
                        </div> :
                        <table className="table table-auto w-full text-center">
                            <thead>
                            <tr>
                                <th className="min-w-[40px]">순번</th>
                                <th className="min-w-[280px]">영화</th>
                                <th className="min-w-[120px]">펀딩 현황</th>
                                <th className="min-w-[150px]">작업</th>
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

                                            <div className="">
                                                <p>{movie.status === 2 ? "모집종료" : `D-${calcDay(movie.endDate)}`}</p>
                                                <p>{calcPer(movie.targetCredit, movie.totalFunding)}% 달성</p>
                                                <Link to={"/funding/mymovies/" + movie.id}>
                                                    <button className="btn btn-primary btn-outline btn-sm mt-1">상세보기
                                                    </button>
                                                </Link>
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
                        </table>}
                </div>
            </div>

        );
    } else {
        return <Error error={errorDetail}/>

    }
};

export default MyMovies;