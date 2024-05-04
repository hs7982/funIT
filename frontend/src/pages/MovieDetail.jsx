import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const MovieDetail = () => {
    const params = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const movieId = params.id;
        // 영화 정보를 가져오는 비동기 함수
        const fetchMovie = async () => {
            // 여기서는 예시 데이터를 사용하겠습니다.
            const exampleMovie = {
                id: 1,
                title: "파묘",
                image: "https://entertainimg.kbsmedia.co.kr/cms/uploads/BBSIMAGE_20240202201030_e56e9797d86c5c57fc3e3325befc74d1.jpg",
                description: "인도네시아, 베트남 등 해외에서도 인기",
                recruitmentStatus: "모집중",
                gallery: [
                    "https://image1.com",
                    "https://image2.com",
                    "https://image3.com"
                ],
                details: "상세 내용을 여기에 작성하세요.",
                schedule: "2024년 5월 15일 - 2024년 6월 15일"
            };
            setMovie(exampleMovie);
        };

        // 컴포넌트가 마운트될 때 영화 정보 가져오기
        fetchMovie();
    }, []);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="movie-detail-container p-8">
            {/* 영화 이미지 */}
            <div className="movie-image-container mb-6">
                <img src={movie.image} alt={movie.title} className="rounded-lg shadow-lg"/>
            </div>
            {/* 영화 정보 */}
            <div className="movie-info-container">
                <h1 className="movie-title flex items-center mb-4">
                    <div className="badge badge-outline mr-2 bg-gray-500 text-white">오컬트</div>
                    {movie.title}
                </h1>
                <p className="movie-description text-gray-600">{movie.description}</p>
                <button className="btn btn-sm bg-fuchsia-300 mt-4">{movie.recruitmentStatus}</button>
                {/* 모집현황 */}
                <div className="recruitment-status mt-4 p-4 bg-gray-100 rounded-lg">
                    <h2 className="text-lg font-bold mb-2">모집현황</h2>
                    <p>여기에 모집현황 내용을 작성하세요.</p>
                </div>
                {/* 갤러리 */}
                <div className="gallery mt-4 p-4 bg-gray-100 rounded-lg">
                    <h2 className="text-lg font-bold mb-2">갤러리</h2>
                    <div className="flex">
                        {movie.gallery.map((image, index) => (
                            <img key={index} src={image} alt={`Image ${index}`} className="mr-2 rounded-lg shadow"/>
                        ))}
                    </div>
                </div>
                {/* 상세내용 */}
                <div className="details mt-4 p-4 bg-gray-100 rounded-lg">
                    <h2 className="text-lg font-bold mb-2">상세내용</h2>
                    <p>{movie.details}</p>
                </div>
                {/* 일정 */}
                <div className="schedule mt-4 p-4 bg-gray-100 rounded-lg">
                    <h2 className="text-lg font-bold mb-2">일정</h2>
                    <p>{movie.schedule}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
