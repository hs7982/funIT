import { useEffect, useState } from "react";
import TabContent from "../components/TabContent";

const MovieDetailPage = () => {
    const [movie, setMovie] = useState(null);
    const [activeTab, setActiveTab] = useState("모집현황"); // 초기 값으로 "모집현황"을 설정합니다.

    useEffect(() => {
        // 영화 정보를 가져오는 비동기 함수
        const fetchMovie = async () => {
            // 여기서는 예시 데이터를 사용하겠습니다.
            const exampleMovie = {
                id: 1,
                title: "파묘",
                image: "https://entertainimg.kbsmedia.co.kr/cms/uploads/BBSIMAGE_20240202201030_e56e9797d86c5c57fc3e3325befc74d1.jpg",
                description: "인도네시아, 베트남 등 해외에서도 인기"
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
                <button className="btn btn-sm bg-fuchsia-300 mt-4">모집종료</button>
            </div>
            <div role="tablist" className="tabs tabs-lifted mt-6">
                <a role="tab" className={`tab ${activeTab === "모집현황" ? "tab-active" : ""}`} onClick={() => setActiveTab("모집현황")}>모집현황</a>
                <a role="tab" className={`tab ${activeTab === "갤러리" ? "tab-active" : ""}`} onClick={() => setActiveTab("갤러리")}>갤러리</a>
                <a role="tab" className={`tab ${activeTab === "상세내용" ? "tab-active" : ""}`} onClick={() => setActiveTab("상세내용")}>상세내용</a>
                <a role="tab" className={`tab ${activeTab === "일정" ? "tab-active" : ""}`} onClick={() => setActiveTab("일정")}>일정</a>
            </div>
            {/* 탭 컨텐츠 */}
            <TabContent activeTab={activeTab} />
        </div>
    );
};

export default MovieDetailPage;
