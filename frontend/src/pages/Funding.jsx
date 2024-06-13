import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {axiosGetOneMovie, axiosPostFunding} from "../api/axios.js";
import axios from "axios";
import {useRecoilValue} from "recoil";
import {IsLoginState} from "../recoil/RecoilState.js";
import {Modal} from "../components/Modal";

const MIN_AMOUNT = 100;
const MAX_AMOUNT = 5000000;

const Funding = () => {
    const params = useParams();
    const [movie, setMovie] = useState(null);
    const [noContent, setNoContent] = useState(false);
    const [investmentAmount, setInvestmentAmount] = useState(null);
    const [hasCredit, setHasCredit] = useState(null);
    const [isOpen, setIsOpen] = useState(false); // Modal 상태 추가
    const navigate = useNavigate();
    const isLogin = useRecoilValue(IsLoginState);

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
            const response = await axios.get("/api/credits/balance");
            setHasCredit(response.data.data);
        } catch (error) {
            alert("보유 크레딧 정보 가져오기에 실패하였습니다.");
        }
    };

    useEffect(() => {
        const movieId = params.id;
        if (isLogin === true) {
            fetchMovie(movieId);
            fetchMoney();
        } else setMovie(true)
    }, [params.id, isLogin, navigate]);

    const handleInvestmentChange = (e) => {
        const amount = Math.max(0, Number(e.target.value) || 0);
        setInvestmentAmount(amount);
    };

    const invest = async () => {
        if (investmentAmount < MIN_AMOUNT) {
            alert("최소 펀딩 금액은 100원입니다.");
            return;
        } else if (investmentAmount > MAX_AMOUNT) {
            alert("최대 펀딩 금액은 5,000,000원입니다.");
            return;
        }

        if (!confirm(`${investmentAmount.toLocaleString()}원을 펀딩하시겠습니까?`)) return;

        const data = {
            movie: {
                id: movie.id
            },
            fundingMoney: investmentAmount,
        };

        try {
            const response = await axiosPostFunding(data);
            if (response.status === 200) {
                alert("펀딩이 완료되었습니다!");
                navigate("/funding/detail/" + movie.id);
                closeModal()
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("펀딩에 실패하였습니다!\n" + error.response.data.data);
            }
        }
    };

    const openModal = () => {
        if (isLogin !== true) {
            alert("로그인 후 이용 가능한 서비스입니다.");
            navigate("/login");
        } else {
            setIsOpen(true);
        }

    }  // Modal 열기 함수 추가
    const closeModal = () => setIsOpen(false); // Modal 닫기 함수 추가

    if (noContent) {
        return (
            <div className="container p-6">
                <div className="flex flex-col items-center w-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-8 h-8 my-2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                        />
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
        <>
            <button onClick={openModal} className="btn bg-blue-500 text-white">
                펀딩하기
            </button>
            <Modal
                isOpenModal={isOpen}
                closeModal={closeModal}
                title=""
                message={
                    <div className="flex flex-col border rounded-3xl h-40 p-6 my-6 shadow-lg text-white bg-gradient-to-r from-rose-400 to-sky-300">
                        <h1 className="text-2xl font-bold mb-4">펀딩하기</h1>
                        <div className="flex items-center justify-between mb-4">
                            <div className="input-container">
                                <label htmlFor="investmentAmount" className="mr-2">
                                    펀딩 금액:
                                </label>
                                <input
                                    type="number"
                                    id="investmentAmount"
                                    className="border rounded p-2"
                                    style={{color: 'black'}}
                                    value={investmentAmount}
                                    onChange={handleInvestmentChange}
                                    min={MIN_AMOUNT}
                                    max={MAX_AMOUNT}
                                    step={100}
                                />
                                <span>&nbsp;원</span>
                            </div>
                        </div>
                        <p className="mb-2">보유 크레딧 : {hasCredit && hasCredit.toLocaleString()} 원</p>
                        <div className="flex justify-between items-center">
                            <button className="btn bg-sky-300" onClick={invest}>
                                펀딩하기
                            </button>
                            <div className="text-xs text-gray-500">
                                최소금액: {MIN_AMOUNT.toLocaleString()}원<br/>
                                최대금액: {MAX_AMOUNT.toLocaleString()}원
                            </div>
                        </div>
                    </div>
                }
            />
        </>
    );
};

export default Funding;
