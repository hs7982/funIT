import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {axiosDeleteMovie, axiosGetOneMovie} from "../api/axios.js";
import DOMPurify from 'dompurify';

const MovieDetail = () => {
    const params = useParams();
    const [movie, setMovie] = useState(null);
    const [noContent, setNoContent] = useState(false);

    const fetchMovie = async (movieId) => {
        const response = await axiosGetOneMovie(movieId);
        if (response.status === 200) {
            setMovie(response.data.data);
        } else if (response.status === 204) {
            setNoContent(true);
        }

    };

    const deleteMovie = async () => {
        const movieId = params.id;
        if (!confirm("삭제하시겠습니까?")) return
        try {
            const response = await axiosDeleteMovie(movieId);
            if (response.status === 200) {
                alert("삭제되었습니다.")
            }
        } catch (e) {
            alert("오류가 발생하였습니다.\n" + e);
        }
    }


    useEffect(() => {
        const movieId = params.id;
        fetchMovie(movieId);
    }, []);

    const formattedDate = (dateStr) => {
        const date = new Date(dateStr);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();

        return `${year}년 ${month}월 ${day}일 ${hour}시${minute}분`;
    }

    const calcPer = (target, total) => {
        return (total / target * 100).toFixed(1);
    }

    const calcDay = (endDate) => {
        const today = new Date();
        const date = new Date(endDate);
        const timeGap = date - today;
        return Math.ceil(timeGap / (1000 * 60 * 60 * 24))
    }

    if (noContent) {
        return <div className="container p-6">
            <div className="flex flex-col items-center w-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="w-8 h-8 my-2">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
                </svg>
                <p className="text-xl font-semibold">찾는 콘텐츠가 삭제되었거나 없습니다!</p>
            </div>
        </div>
    }

    if (!movie) {
        return <span className="loading loading-spinner loading-md"></span>;
    }

    return (
        <div className="container p-8">
            {/* 영화 이미지 */}
            <div className="flex">
                <div className="max-w-[17rem] max-h-[16rem] mb-5">
                    <img src={movie.thumbnailImage} alt={movie.title}
                         className="object-contain rounded-lg shadow-lg w-full h-full"/>
                </div>
                <div className="p-3"></div>
                {/* 영화 정보 */}
                <div className="movie-info-container grow">
                    <h1 className="flex-none movie-title flex items-center mb-1">
                        {movie.title}
                    </h1>
                    {movie.genres.map(genre => (
                        <div key={genre.id} className="badge badge-outline me-1.5">{genre.name}</div>
                    ))}
                    <p className="movie-description text-gray-600">{movie.description}</p>
                    <div className="mt-3">
                        <button className="btn btn-outline btn-primary me-3 btn-sm">수정</button>
                        <button className="btn btn-outline btn-error btn-sm" onClick={deleteMovie}>삭제</button>
                    </div>
                    <button className="btn bg-fuchsia-300 mt-5 btn-lg">투자하기</button>
                </div>
                <div className="p-3"></div>
                {/* 모집현황 */}
                <div className="recruitment-status mt-4 p-4 bg-white rounded-lg border border-black w-70 h-60">
                    <h2 className="text-lg font-bold mb-2">모집현황</h2>
                    <p className="text-2xl font-semibold">{calcPer(movie.targetCredit, movie.totalFunding)}%</p>
                    <progress className="progress w-56" value={calcPer(movie.targetCredit, movie.totalFunding)}
                              max="100"></progress>
                    <p>목표 금액</p>
                    <p className="text-xl font-semibold">{movie.targetCredit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                    <p>현재 모인 금액</p>
                    <p className="text-xl font-semibold">{movie.totalFunding.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                </div>
            </div>
            {/* 상세내용 */}
            <div className="details mt-4 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-lg font-bold mb-2">상세내용</h2>
                <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(movie.detail)}}></div>
                <small>작성자:{movie.user.name}</small>
            </div>
            {/* 일정 */}
            <div className="schedule mt-4 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-lg font-bold mb-2">일정</h2>
                <div className="mb-2">
                    <p className="font-semibold text-2xl mb-2">D-{calcDay(movie.endDate)}일 남음</p>
                    <p className="font-semibold text-lg">등록일</p>
                    <p> {formattedDate(movie.createDate)}</p>
                </div>
                <p className="font-semibold text-lg">마감일</p>
                <p> {formattedDate(movie.endDate)}</p>
            </div>
        </div>
    );
};

export default MovieDetail;
