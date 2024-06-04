import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {axiosMyCreditList} from "../api/axios.js";

const CreditUseList = () => {
    const [credit, setCredit] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [errorDetail, setErrorDetail] = useState();
    const navigate = useNavigate();

    const fetchCreditData = async () => {
        try {
            const response = await axiosMyCreditList();
            console.log(response);
            setCredit(response.data.data);
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

    const formattedDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();

        return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
    }

    useEffect(() => {
        fetchCreditData();
    }, []);

    return (
        <div>
            <p className="text-3xl font-medium my-12 text-center">크래딧 거래 내역</p>
            {loading && <div className="flex justify-center">
                <span className="loading loading-spinner loading-md"></span>
            </div>}
            {isError && <p>Error: {errorDetail?.message}</p>}
            <div className="overflow-x-auto">
                <table className="table text-md text-center w-full mt-4">
                    <thead>
                    <tr>
                        <th>순번</th>
                        <th>거래 금액</th>
                        <th>거래 종류</th>
                        <th>거래일</th>
                        <th>투자 영화</th>
                    </tr>
                    </thead>
                    <tbody>
                    {credit.reverse().map((creditItem, index) => (
                        <tr key={index} className="hover">
                            <th>{index + 1}</th>
                            <td>{creditItem.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                            <td>{creditItem.transactionType === 1 ?
                                <span className="text-blue-700 font-medium">지급</span> :
                                <span className="text-red-700 font-medium">사용</span>}</td>
                            <td>{formattedDate(creditItem.transactionDate)}</td>
                            <td className="truncate ..."><Link
                                to={"/funding/detail/" + creditItem.movieId}>{creditItem.movieTitle}</Link></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default CreditUseList;
