import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {axiosMyCreditList, axiosMyLike} from "../api/axios.js";

const MyLike = () => {
    const [like, setLike] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [errorDetail, setErrorDetail] = useState();
    const navigate = useNavigate();

    const fetchLikeData = async () => {
        try {
            const response = await axiosMyLike();
            setLike(response.data.data);
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
    }

    useEffect(() => {
        fetchLikeData();
    }, []);

    return (
        <div>
            <p className="text-3xl font-medium my-12 text-center">좋아요 목록</p>
            {loading && <div className="flex justify-center">
                <span className="loading loading-spinner loading-md"></span>
            </div>}
            {isError && <p>{errorDetail?.message}: {errorDetail?.response?.data.message}</p>}
            <div className="overflow-x-auto">
                <table className="table text-md text-center w-full mt-4">
                    <thead>
                    <tr>
                        <th>순번</th>
                        <th>영화명</th>
                        <th>링크</th>
                    </tr>
                    </thead>
                    <tbody>
                    {like.map((likeItem, index) => (
                        <tr key={index} className="hover">
                            <th>{index + 1}</th>
                            <td className="truncate ...">{likeItem.movieTitle}</td>
                            <td><Link
                                to={"/funding/detail/" + likeItem.movieId}><button>보기</button></Link></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default MyLike;
