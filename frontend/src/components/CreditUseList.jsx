import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
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

    useEffect(() => {
        fetchCreditData();
    }, []);

    return (
        <div>
            <h2>크래딧 거래 내역</h2>
            {loading && <p>Loading...</p>}
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
                    {credit.map((creditItem, index) => (
                        <tr key={index} className="hover">
                            <th>{index}</th>
                            <td>{creditItem.amount}</td>
                            <td>{creditItem.transactionType === 1 ?
                                <span className="text-blue-700">지급</span> :
                                <span className="text-red-700">사용</span>}</td>
                            <td>{Date(creditItem.transactionDate)}</td>
                            <td>{creditItem.movieTitle}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default CreditUseList;
