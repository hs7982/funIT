import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {IsLoginState} from "../recoil/RecoilState.js";
import Error from "./Error.jsx";
import NewMovie from "../components/NewMovie.jsx";
import UserData from "../components/UserData.jsx";

const Mypage = () => {
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [errorDetail, setErrorDetail] = useState();
    const [recentInvestments, setRecentInvestments] = useState([]);
    const [showUserData, setShowUserData] = useState(false);
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
                                    <div
                                        className="btn btn-ghost btn-circle avatar rounded-full w-24 h-24 overflow-hidden mr-6 shadow-lg">
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
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"/>
                                            </svg>
                                            최근 투자한 영화
                                        </span>
                                    </li>
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
                                </ul>
                            </div>
                            <div className="w-full md:w-1/2">
                                <UserData/>
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
