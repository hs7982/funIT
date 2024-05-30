import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosGetOneMovie } from "../api/axios.js";
import axios from "axios";

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
    const [money, setMoney] = useState(0);

    const fetchMovie = async (movieId) => {
        try {
            const response = await axiosGetOneMovie(movieId);
            if (response.status === 200) {
                setMovie(response.data.data);
            } else if (response.status === 204) {
                setNoContent(true);
            }
        } catch (error) {
            console.error("Failed to fetch movie:", error);
            setNoContent(true);
        }
    };

    const fetchMoney = async () => {
        try {
            const response = await axios.get("/api/credits/balance")
            setMoney(response.data.data);
        } catch (error) {
            alert("돈 못가져옴")
        }
    }

    useEffect(() => {
        const movieId = params.id;
        fetchMovie(movieId);
        fetchMoney();
    }, [params.id]);

    const handleInvestmentChange = (e) => {
        const amount = Math.max(0, Number(e.target.value) || 0);
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-8 h-8 my-2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
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
        <div className="container p-24 flex">
            {/* 왼쪽 섹션: 영화 정보 */}
            <div className="left-section flex-grow mr-4 flex flex-col p-4">
                <div className="max-w-[20rem] max-h-[30rem] mb-4">
                    <img src={movie.thumbnailImage} alt={movie.title} className="object-contain rounded-lg shadow-lg"
                         style={{ width: "20rem", height: "30rem" }} />
                </div>
                <div className="movie-info-container">
                    <h1 className="text-4xl font-bold mb-2 break-words">{movie.title}</h1>
                    <p className="text-lg">{movie.description}</p>
                </div>
            </div>

            {/* 오른쪽 섹션: 영화 투자하기 */}
            <div className="right-section w-96 flex flex-col p-4 mr-4">
                <div className="bg-rose-300 p-6 rounded-lg mb-4">
                    <h1 className="text-2xl font-bold mb-4 text-white">영화 투자하기</h1>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <label htmlFor="investmentAmount" className="mr-2 text-white">
                                투자 금액:
                            </label>
                            <input
                                type="number"
                                id="investmentAmount"
                                className="border rounded p-2"
                                value={investmentAmount}
                                onChange={handleInvestmentChange}
                                min={MIN_AMOUNT}
                                max={MAX_AMOUNT}
                            />
                            <span className="text-white"> 크레딧</span>
                        </div>
                    </div>
                    <p className="text-white mb-2">보유 크레딧 : {money}</p>
                    <div className="flex justify-between">
                        <button className="btn bg-pink-300" onClick={invest}>
                            투자하기
                        </button>
                        <div className="text-xs text-gray-500">
                            최소금액: {MIN_AMOUNT.toLocaleString()}원,<br/>
                            최대금액: {MAX_AMOUNT.toLocaleString()}원
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default InvestPage;
