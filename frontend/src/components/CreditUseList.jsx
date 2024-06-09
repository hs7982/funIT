import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {axiosMyCreditList} from "../api/axios.js";
import {FundingDetail} from "./FundingDetail.jsx";
import {formattedDate} from "./formattedData.js";

const CreditUseList = () => {
    const [credit, setCredit] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [errorDetail, setErrorDetail] = useState();
    const [selectId, setSelectId] = useState(0);
    const navigate = useNavigate();

    const fetchCreditData = async () => {
        try {
            const response = await axiosMyCreditList();
            setCredit((response.data.data).reverse());
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

    const selectDetail = (id) => {
        setSelectId(id);
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
            {isError && <p>{errorDetail?.message}: {errorDetail?.response?.data.message}</p>}
            <FundingDetail selectID={selectId}/>
            <div className="overflow-x-auto">
                <table className="table text-md text-center w-full mt-4">
                    <thead>
                    <tr>
                        <th>순번</th>
                        <th>거래 금액</th>
                        <th>거래 종류</th>
                        <th>거래일</th>
                        <th>투자 영화</th>
                        <th>상세보기</th>
                    </tr>
                    </thead>
                    <tbody>
                    {credit.map((creditItem, index) => (
                        <tr key={index} className="hover">
                            <th>{index + 1}</th>
                            <td>{creditItem.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                            <td>{creditItem.transactionType === 1 ?
                                <span
                                    className="text-blue-700 font-medium">지급</span> : (creditItem.transactionType === 2 ?
                                    <span className="text-red-700 font-medium">사용</span> :
                                    <span className="text-green-700 font-medium">환불됨</span>)}</td>
                            <td>{formattedDate(creditItem.transactionDate)}</td>
                            <td className="truncate ..."><Link
                                to={"/funding/detail/" + creditItem.movieId}>{creditItem.movieTitle}</Link></td>
                            <td>
                                {creditItem.fundingId !== 0 &&
                                    <label htmlFor="fdrawer" onClick={() => selectDetail(creditItem.fundingId)}
                                           className="btn btn-ghost btn-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/>
                                        </svg>
                                    </label>}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default CreditUseList;
