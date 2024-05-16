import React, {useState, useEffect} from "react";
import Moviebox from "../components/Moviebox.jsx";
import axios from "axios";
import {Link} from "react-router-dom";
import Error from "./Error.jsx";
import {useRecoilValue} from "recoil";
import {IsLoginState} from "../recoil/RecoilState.js";

const Mypage = () => {
    const [userInfo, setUserInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [errorDetail, setErrorDetail] = useState();
    const isLogin = useRecoilValue(IsLoginState);

    const fetchMovies = async () => {
        try {
            const response = await axios.get('/api/users/mypage');
            setUserInfo(response.data.data);
            setLoading(false); // 데이터 불러오기 완료 시 로딩 상태 변경
        } catch (error) {
            console.error("Error fetching movies:", error);
            setError(true);
            setErrorDetail(error)
            setLoading(false); // 에러 발생 시에도 로딩 상태 변경
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
                    <div className="flex flex-wrap justify-evenly gap-8">
                        <div>
                        {userInfo.name}
                        </div>
                        <div>
                        {userInfo.email}
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