import {useEffect, useRef, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {
    axiosDeleteMovie,
    axiosGetCommentByMovie,
    axiosGetOneMovie, axiosLikeMovie,
    axiosLikeStatus,
    axiosPostComment, axiosUnLikeMovie
} from "../api/axios.js";
import DOMPurify from 'dompurify';
import {useRecoilValue} from "recoil";
import {IsLoginState} from "../recoil/RecoilState.js";
import MovieComment from "../components/MovieComment.jsx";
import {formattedDate} from "../components/formattedData.js";
import Funding from "./Funding.jsx";

const MovieDetail = () => {
    const params = useParams();
    const movieId = params.id;
    const [movie, setMovie] = useState(null);
    const [noContent, setNoContent] = useState(false);
    const [likeStatus, setLikeStatus] = useState(false);
    const [isFundingModalOpen, setIsFundingModalOpen] = useState(false);
    const isLogin = useRecoilValue(IsLoginState);

    const fetchMovie = async (movieId) => {
        try {
            const response = await axiosGetOneMovie(movieId);
            if (response.status === 200) {
                setMovie(response.data.data);
            } else if (response.status === 204) {
                setNoContent(true);
            }
        } catch (e) {
            alert(e.response.data.message);
        }

    };

    const deleteMovie = async () => {
        const movieId = params.id;
        if (!confirm("정말 해당 프로젝트를 삭제하시겠습니까?\n진행된 펀딩이 존재한다면 해당 펀딩건은 사용자에게 금액이 자동으로 환불처리되며, 복구가 불가능합니다.")) return
        try {
            const response = await axiosDeleteMovie(movieId);
            if (response.status === 200) {
                alert("삭제되었습니다.")
                window.location.reload();
            }
        } catch (e) {
            alert("오류가 발생하였습니다.\n" + e.response.data.message);
        }
    }

    const fetchLikeStatus = async (movieId) => {
        try {
            const response = await axiosLikeStatus(movieId);
            if (response.status === 200 && response.data.data === true) {
                setLikeStatus(true);
            } else {
                setLikeStatus(false);
            }
        } catch (e) {

        }

    }

    const clickHeart = () => {
        if (likeStatus) {
            axiosUnLikeMovie(movieId);
            movie.likeCount -= 1;
        } else {
            axiosLikeMovie(movieId);
            movie.likeCount += 1;
        }

        setTimeout(() => {
            fetchLikeStatus(movieId);
        }, 300);
    }


    useEffect(() => {
        fetchMovie(movieId);
        fetchLikeStatus(movieId);
    }, []);

    const calcPer = (target, total) => {
        return (total / target * 100).toFixed(1);
    }

    const calcDay = (endDate) => {
        const today = new Date();
        const date = new Date(endDate);
        const timeGap = date - today;
        const dayGap = Math.ceil(timeGap / (1000 * 60 * 60 * 24));
        return dayGap < 0 ? -1 : dayGap;
    }

    const tab1Ref = useRef(null);
    const tab2Ref = useRef(null);
    const tab3Ref = useRef(null);

    const onTab1Click = () => {
        tab1Ref.current?.scrollIntoView({behavior: "smooth"});
    }
    const onTab2Click = () => {
        tab2Ref.current?.scrollIntoView({behavior: "smooth"});
    }
    const onTab3Click = () => {
        tab3Ref.current?.scrollIntoView({behavior: "smooth"});
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
        <div className="container max-w-[1440px] mx-auto p-4">
            {/* 영화 이미지 */}
            <div className="flex flex-wrap lg:flex-nowrap">
                <div className="max-h-96 md:max-w-[20rem] md:max-h-[16rem] mb-5">
                    <img src={movie.thumbnailImage} alt={movie.title}
                         className="object-contain w-full h-full"/>
                </div>
                {/* 영화 정보 */}
                <div className="movie-info-container grow lg:mx-6">
                    <h1 className="flex-none movie-title flex items-center mb-1 text-pretty">
                        {movie.title}
                    </h1>
                    {movie.genres.map(genre => (
                        <div key={genre.id} className="badge badge-outline me-1.5">{genre.name}</div>
                    ))}
                    <p className="movie-description text-gray-600">{movie.description}</p>
                    {isLogin &&
                        <div className="mt-3">
                            <Link to={"/funding/edit/" + movie.id}>
                                <button className="btn btn-outline btn-primary me-3 btn-sm focus:outline-none">수정
                                </button>
                            </Link>
                            <button className="btn btn-outline btn-error btn-sm focus:outline-none"
                                    onClick={deleteMovie}>삭제
                            </button>
                        </div>
                    }
                    <div className="flex mt-5">
                        {movie.status === 1 ?
                            <Funding isOpen={isFundingModalOpen} onClose={() => setIsFundingModalOpen(false)}/>
                            :
                            <button className="btn bg-fuchsia-300  btn-md" disabled>종료됨</button>
                        }


                        <button className="btn btn-md ms-2 focus:outline-none" onClick={() => clickHeart()}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 fill={likeStatus ? "currentColor" : "none"} viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor" className={!likeStatus ? "size-6" : "size-6 text-red-600"}>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
                            </svg>
                            {movie.likeCount}


                        </button>


                    </div>


                </div>
                {/* 모집현황 */}
                <div
                    className="mt-4 p-4 bg-white rounded-xl border border-gray-300 shadow-md min-w-64 w-full lg:w-72 h-60 ">
                    <h2 className="text-lg font-bold mb-2">모집현황</h2>
                    <p className="text-2xl font-semibold">{calcPer(movie.targetCredit, movie.totalFunding)}%</p>
                    <progress className="progress w-full" value={calcPer(movie.targetCredit, movie.totalFunding)}
                              max="100"></progress>
                    <p>목표 금액</p>
                    <p className="text-xl font-semibold">{movie.targetCredit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                    <p>현재 모인 금액</p>
                    <p className="text-xl font-semibold">{movie.totalFunding.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 <small>({movie.fundingCount}건)</small>
                    </p>
                </div>
            </div>
            {/*바로가기 탭*/}
            <div role="tablist" className="tabs tabs-boxed my-5 py-2">
                <a role="tab" className="tab" onClick={onTab1Click}>상세내용</a>
                <a role="tab" className="tab" onClick={onTab2Click}>일정</a>
                <a role="tab" className="tab" onClick={onTab3Click}>댓글</a>
            </div>
            {/* 상세내용 */}
            <div className="details mt-4 p-4 bg-gray-100 rounded-lg" ref={tab1Ref}>
                <h2 className="text-lg font-bold mb-4">상세내용</h2>
                <div id="htmlViewer" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(movie.detail)}}></div>
                <small>작성자:{movie.user.name}</small>
            </div>
            {/* 유의사항 */}
            <div className="details mt-4 p-4 bg-gray-100 rounded-lg">
                <h2 className="text-lg font-bold mb-4">안내사항</h2>
                <p className="font-medium text-lg">✨ 크라우드 펀딩에 대한 안내</p>
                <div className="my-2">
                    <p className="font-medium text-lg">🤝 후원은 구매가 아닌 창의적인 계획에 자금을 지원하는 일입니다.</p>
                    <p className="ms-8">전자상거래법상 통신판매는 소비자의 청약 전 규격, 제조연월일 등 구체적인 상품정보가 제공 가능한 것을 대상으로 합니다. <br/>따라서 후원은
                        통신판매에 해당하지 않고,
                        전자상거래법 및 소비자보호규정(수령 후 7일 내 청약철회 등)이 적용되지 않습니다.</p>
                </div>
                <div className="my-2">
                    <p className="font-medium text-lg">✏️ 프로젝트는 계획과 달리 진행될 수 있습니다.</p>
                    <p className="ms-8">예상을 뛰어넘는 멋진 결과가 나올 수 있지만 진행 과정에서 계획이 지연, 변경되거나 무산될 수도 있습니다. 본 프로젝트를 완수할 책임과 권리는
                        창작자에게 있습니다.</p>
                </div>
            </div>
            {/* 일정 */}
            <div className="schedule mt-4 p-4 bg-gray-100 rounded-lg" ref={tab2Ref}>
                <h2 className="text-lg font-bold mb-4">일정</h2>
                <div className="mb-2">
                    <p className="font-semibold text-2xl mb-2">{movie.status === 1 ? `D-${calcDay(movie.endDate)}일 남음` : "모집종료"}</p>
                    <p className="font-semibold text-lg">등록일</p>
                    <p> {formattedDate(movie.createDate)}</p>
                </div>
                <p className="font-semibold text-lg">마감일</p>
                <p> {formattedDate(movie.endDate)}</p>
            </div>
            <div className="schedule mt-4 p-4 bg-gray-100 rounded-lg" ref={tab3Ref}>
                <h2 className="text-lg font-bold mb-4">댓글</h2>
                <MovieComment movieId={movieId}/>
            </div>
        </div>
    );
};

export default MovieDetail;