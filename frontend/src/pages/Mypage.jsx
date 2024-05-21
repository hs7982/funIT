import React, {useState, useEffect, Fragment} from "react";
import Moviebox from "../components/Moviebox.jsx";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Error from "./Error.jsx";
import {useRecoilValue} from "recoil";
import {IsLoginState} from "../recoil/RecoilState.js";

const Mypage = () => {
    const [userInfo, setUserInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [errorDetail, setErrorDetail] = useState();
    const isLogin = useRecoilValue(IsLoginState);
    const navigate = useNavigate()

    const fetchMovies = async () => {
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
            setErrorDetail(error)
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    if (!isError) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex">
                    <div className="text-3xl font-medium my-8">마이페이지</div>
                </div>
                <hr className="mb-8"/>
                {loading ? ( // 로딩 중인 동안 로딩 표시
                    <div className="flex justify-center"><span
                        className="loading loading-spinner loading-md"></span>
                    </div>

                ) : (
                    <div className="flex flex-row">
                        <div className="basis-1/2 pe-12 border-e">
                            <div className="flex">
                                <div className="rounded-full size-24 overflow-hidden me-3.5 shadow-lg">
                                    <img
                                        alt="프로필 사진"
                                        src="/default-profile.png"
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="my-auto">
                                    <p className="text-4xl font-bold">{userInfo.name}</p>
                                    <p>{userInfo.email}</p>
                                </div>
                            </div>
                            <div
                                className="flex flex-col border rounded-3xl h-40 p-6 my-8 shadow-lg text-white bg-gradient-to-r from-rose-400 to-sky-300">
                                <p className="text-lg font-medium">보유 크레딧</p>
                                <p className="my-auto text-4xl font-medium">0원</p>
                            </div>
                        </div>
                        <div className="basis-1/2 ps-12">
                            ddd
                        </div>

                    </div>
                )}
            </div>
        );
    } else {
        return <Error error={errorDetail}/>

    }
};

export default Mypage;