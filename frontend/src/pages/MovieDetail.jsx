import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {axiosGetOneMovie} from "../api/axios.js";
import DOMPurify from 'dompurify';

const MovieDetail = () => {
    const params = useParams();
    const [movie, setMovie] = useState(null);
    const [noContent, setNoContent] = useState(false);

    const fetchMovie = async (movieId) => {
        const response = await axiosGetOneMovie(movieId);
        console.log(response)
        if (response.status === 200) {
            setMovie(response.data.data);
        } else if (response.status === 204) {
            setNoContent(true);
        }

    };

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

    if (noContent) {
        return <div className="container p-6">
            <div className="flex flex-col items-center">
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
            <div className="flex flex-wrap">
                <div className="max-w-60 mb-6">
                    <img src={movie.thumbnailImage} alt={movie.title} className="rounded-lg shadow-lg"/>
                </div>
                <div className="p-3"></div>
                {/* 영화 정보 */}
                <div className="movie-info-container">
                    <h1 className="movie-title flex items-center mb-1">
                        {movie.title}
                    </h1>
                    {movie.genres.map(genre => (
                        <div key={genre.id} className="badge badge-outline me-1">{genre.name}</div>
                    ))}
                    <p className="movie-description text-gray-600">{movie.description}</p>
                    <button className="btn btn-sm bg-fuchsia-300 mt-4">{movie.recruitmentStatus}</button>
                </div>
            </div>
            {/* 모집현황 */}
            <div className="recruitment-status mt-4 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-lg font-bold mb-2">모집현황</h2>
                <p>목표 금액</p>
                <p className="text-xl font-semibold">{movie.targetCredit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
            </div>
            {/* 갤러리 */}
            <div className="gallery mt-4 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-lg font-bold mb-2">갤러리</h2>
                <div className="flex">
                    {/*{movie.gallery.map((image, index) => (*/}
                    {/*    <img key={index} src={image} alt={`Image ${index}`} className="mr-2 rounded-lg shadow"/>*/}
                    {/*))}*/}
                </div>
            </div>
            {/* 상세내용 */}
            <div className="details mt-4 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-lg font-bold mb-2">상세내용</h2>
                <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(movie.detail)}}></div>

            </div>
            {/* 일정 */}
            <div className="schedule mt-4 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-lg font-bold mb-2">일정</h2>
                <p>등록일: {formattedDate(movie.createDate)}</p>
                <p>마감일: {formattedDate(movie.endDate)}</p>
            </div>
        </div>
    );
};

export default MovieDetail;
