import React, {useState, useEffect} from "react";
import Moviebox from "../components/Moviebox.jsx";
import axios from "axios";
import {Link} from "react-router-dom";
import Error from "./Error.jsx";

const MovieProject = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [errorDetail, setErrorDetail] = useState();

    const fetchMovies = async () => {
        try {
            const response = await axios.get('/api/movies');
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
    }, []);

    if (!isError) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex">
                    <div className="text-3xl font-medium my-8">진행중인 펀딩</div>
                    <Link className="me-0 ms-auto my-auto" to="/funding/new">
                        <button className="btn btn-m bg-fuchsia-300 rounded-full text-lg">프로젝트 생성</button>
                    </Link>
                </div>
                <hr style={{paddingBottom: '35px'}}/>
                {loading ? ( // 로딩 중인 동안 로딩 표시
                    <div className="text-lg text-center">불러오는 중...</div>
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