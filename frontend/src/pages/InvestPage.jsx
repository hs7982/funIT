import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosGetOneMovie } from "../api/axios.js";

const MIN_AMOUNT = 500000;
const MAX_AMOUNT = 5000000;

const calcPer = (targetCredit, totalFunding) => {
    if (targetCredit === 0) return 0;
    return ((totalFunding / targetCredit) * 100).toFixed(2);
};

const InvestPage = () => {
    const params = useParams();
    const [movie, setMovie] = useState(null);
    const [noContent, setNoContent] = useState(false);
    const [investmentAmount, setInvestmentAmount] = useState(0);

    const fetchMovie = async (movieId) => {
        const response = await axiosGetOneMovie(movieId);
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

    const handleInvestmentChange = (e) => {
        const amount = Number(e.target.value) || 0;
        setInvestmentAmount(amount);
    };

    const invest = () => {
        if (investmentAmount < MIN_AMOUNT) {
            alert("최소 투자 금액은 500,000원입니다.");
            return;
        } else if (investmentAmount > MAX_AMOUNT) {
            alert("최대 투자 금액은 5,000,000원입니다.");
            return;
        }

        const confirmInvestment = window.confirm(
            `${investmentAmount.toLocaleString()}원을 투자하시겠습니까?`
        );

        if (confirmInvestment) {
            alert("투자가 완료되었습니다!");
            setInvestmentAmount(0);
        }
    };

    if (noContent) {
        return (
            <div className="container p-6">
                <div className="flex flex-col items-center w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 my-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
                    </svg>
                    <p className="text-xl font-semibold">찾는 콘텐츠가 삭제되었거나 없습니다!</p>
                </div>
            </div>
        );
    }

    if (!movie) {
        return <span className="loading loading-spinner loading-md"></span>;
    }

    return (
        <div className="container p-8">
            {/* 투자하기 */}
            <div className="bg-black p-6 rounded-lg">
                <h1 className="text-2xl font-bold mb-4 text-white">영화 투자하기</h1>
                <div className="flex items-center mb-4">
                    <label htmlFor="investmentAmount" className="mr-2 text-white">
                        투자 금액:
                    </label>
                    <input
                        type="number"
                        id="investmentAmount"
                        className="border rounded p-2"
                        value={investmentAmount}
                        onChange={handleInvestmentChange}
                    />
                    원
                </div>
                <p className="text-white mb-2">보유 크레딧 : {movie.targetCredit}원</p>
                <button className="btn bg-pink-300" onClick={invest}>
                    투자하기
                </button>
            </div>



            {/* 모집현황 */}
            <div className="flex mt-8">
                <div className="max-w-[17rem] max-h-[16rem] mb-5">
                    <img src={movie.thumbnailImage} alt={movie.title}
                         className="object-contain rounded-lg shadow-lg w-full h-full"/>
                </div>
                <div className="movie-info-container grow">
                    <h1 className="flex-none movie-title flex items-center mb-1">
                        {movie.title}</h1>
                </div>
                <div className="recruitment-status ml-8 mt-4 p-4 bg-white rounded-lg border border-black w-70 h-60">
                    <h2 className="text-lg font-bold mb-2">모집현황</h2>
                    <p className="text-2xl font-semibold">{calcPer(movie.targetCredit, movie.totalFunding)}%</p>
                    <progress className="progress w-56" value={calcPer(movie.targetCredit, movie.totalFunding)} max="100"></progress>
                    <p>목표 금액</p>
                    <p className="text-xl font-semibold">{movie.targetCredit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                    <p>현재 모인 금액</p>
                    <p className="text-xl font-semibold">{movie.totalFunding.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
                </div>
            </div>
        </div>
    );
};

export default InvestPage;
