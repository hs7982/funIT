import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {IsLoginState} from "../recoil/RecoilState.js";
import NewMovie from "../components/NewMovie.jsx";
import UserData from "../components/UserData.jsx";
import ChangePassword from "./ChangePassword.jsx";
import {axiosMyCreditList, axiosMyPage, axiosPostNewProfileImage} from "../api/axios.js";
import Error from "./Error.jsx";
import CreditUseList from "../components/CreditUseList.jsx";

const Mypage = () => {
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [errorDetail, setErrorDetail] = useState();
    const [recentInvestments, setRecentInvestments] = useState([]);
    const [activeTab, setActiveTab] = useState('newMovie'); // 기본값을 'newMovie'로 설정
    const isLogin = useRecoilValue(IsLoginState);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            const response = await axiosMyPage();
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

    const imageInput = useRef(null);

    const changeProfileImg = async (e) => {
        const img = e.target.files[0];
        const data = new FormData();
        data.append("image", img);
        try {
            const response = await axiosPostNewProfileImage(data);
            if (response.status === 200) {
                window.location.reload();
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    const renderContent = () => {
        switch (activeTab) {
            case 'creditTransaction':
                return <CreditUseList/>;
            case 'UserData':
                return <UserData/>;
            case 'changePassword':
                return <ChangePassword/>;
            default:
                return null;
        }
    };

    if (!isError) {
        return (
            <div className="w-full p-6 bg-gray-50 min-h-screen">
                <div className="max-w-[1440px] mx-auto">
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
                                        className="relative btn btn-ghost btn-circle avatar rounded-full w-24 h-24 overflow-hidden mr-6 shadow-lg"
                                        onClick={() => imageInput.current?.click()}
                                    >
                                        <img
                                            alt="프로필 사진"
                                            src={userInfo.profileImage}
                                            className="object-cover w-full h-full"
                                        />
                                        <div
                                            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                                            <div className="flex flex-col items-center justify-center h-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor"
                                                     className="w-6 h-6 mb-1 text-white">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"/>
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"/>
                                                </svg>
                                                <span className="text-white text-sm">프로필 변경</span>
                                            </div>
                                        </div>
                                        <input type="file" accept="image/*" className="hidden" ref={imageInput}
                                               onChange={(e) => changeProfileImg(e)}/>
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
                                        <span onClick={() => setActiveTab('creditTransaction')}
                                              style={{cursor: 'pointer'}}>
                                            {/* 클릭 가능한 손가락 커서를 표시하도록 스타일 추가 */}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                            </svg>
                                            크래딧 거래 내역
                                        </span>
                                    </li>
                                    <li>
                                        <span onClick={() => setActiveTab('UserData')} style={{cursor: 'pointer'}}>
                                            {/* 클릭 가능한 손가락 커서를 표시하도록 스타일 추가 */}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                            개인 정보
                                        </span>
                                    </li>
                                    <li>
                                        <span onClick={() => setActiveTab('changePassword')}
                                              style={{cursor: 'pointer'}}>
                                            {/* 클릭 가능한 손가락 커서를 표시하도록 스타일 추가 */}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"/>
                                            </svg>
                                            비밀번호 변경
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full md:w-1/2">
                                {renderContent()}
                                {/* 현재 활성화된 탭에 따라 콘텐츠를 렌더링 */}
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
