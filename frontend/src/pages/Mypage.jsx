import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {IsLoginState} from "../recoil/RecoilState.js";
import Error from "./Error.jsx";

const Mypage = () => {
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [errorDetail, setErrorDetail] = useState();
    const [recentInvestments, setRecentInvestments] = useState([]);
    const isLogin = useRecoilValue(IsLoginState);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            const response = await axios.get('/api/users/mypage');
            setUserInfo(response.data.data);
            setLoading(false); // 데이터 불러오기 완료 시 로딩 상태 변경
        } catch (error) {
            if (error.code === "ERR_BAD_REQUEST") {
                navigate("/login");
            }
            console.error("Error fetching:", error);
            setError(true);
            setErrorDetail(error);
            setLoading(false);
        }
    };

    const fetchRecentInvestments = async () => {
        try {
            const response = await axios.get('/api/users/recent-investments'); // 최근 투자한 영화 API 엔드포인트
            setRecentInvestments(response.data.data);
        } catch (error) {
            console.error("Error fetching recent investments:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchRecentInvestments();
    }, []);

    if (!isError) {
        return (
            <div className="w-full p-6 bg-gray-50 min-h-screen">
                <div className="container mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold my-8 text-gray-800">마이페이지</h1>
                        <hr className="w-1/2 mx-auto border-t border-gray-300 mb-8"/>
                    </div>
                    {loading ? (
                        <div className="flex justify-center">
                            <span className="loading loading-spinner loading-md"></span>
                        </div>
                    ) : (
                        <div
                            className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
                            <div className="w-full md:w-1/2 bg-white p-8 rounded-xl shadow-lg">
                                <div className="flex items-center mb-8">
                                    <div className="rounded-full w-24 h-24 overflow-hidden mr-6 shadow-lg">
                                        <img
                                            alt="프로필 사진"
                                            src="/default-profile.png"
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold text-gray-800">{userInfo.name}</p>
                                        <p className="text-gray-500">{userInfo.email}</p>
                                    </div>
                                </div>
                                <div
                                    className="flex flex-col border rounded-3xl h-40 p-6 my-8 shadow-lg text-white bg-gradient-to-r from-rose-400 to-sky-300">
                                    <p className="text-lg font-medium">보유 크레딧</p>
                                    <p className="my-auto text-4xl font-medium">
                                        {userInfo.credit
                                            ? userInfo.credit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                            : 0}{" "}
                                        크레딧
                                    </p>
                                </div>
                                <ul className="menu w-full rounded-box text-lg">
                                    <li>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                            개인 정보
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor"
                                                 className="w-6 h-6">
                                              <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"/>
                                            </svg>
                                            비밀번호 변경
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor"
                                                 className="w-6 h-6">
                                              <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                            </svg>
                                            프로필사진
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full md:w-1/2">
                                <h2 className="text-2xl font-medium text-gray-800 mb-4">최근 투자한 영화</h2>
                                <div className="flex flex-col space-y-4">
                                    {recentInvestments.length > 0 ? (
                                        recentInvestments.map((investment, index) => (
                                            <div key={index}
                                                 className="p-4 border rounded-lg shadow-lg bg-white flex items-center">
                                                <div className="mr-4">
                                                    <i className="fas fa-film text-indigo-500 text-2xl"></i>
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-medium text-lg text-gray-800">{investment.movieTitle}</p>
                                                    <p className="text-gray-500">투자
                                                        금액: {investment.amount.toLocaleString()} 크레딧</p>
                                                    <p className="text-gray-500">투자
                                                        날짜: {new Date(investment.date).toLocaleDateString()}</p>
                                                </div>
                                                <Link
                                                    to={`/movies/${investment.movieId}`}
                                                    className="text-indigo-500 hover:underline ml-4"
                                                >
                                                    상세보기
                                                </Link>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">최근 투자한 영화가 없습니다.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    } else {
        return <Error error={errorDetail}/>;
    }
};

export default Mypage;
