import React, {useEffect, useState} from "react";
import {axiosFundingDetail} from "../api/axios.js";
import {Link} from "react-router-dom";
import {formattedDate} from "./formattedData.js";

export const FundingDetail = ({selectID}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const result = await axiosFundingDetail(selectID)
            setData(result.data.data);
            setLoading(false);
        } catch (e) {

        }

    }

    useEffect(() => {

        setLoading(true);
        if (selectID !== 0) {
            fetchData();
        }

    }, [selectID]);


    return (
        <div className="drawer drawer-end">
            <input id="fdrawer" type="checkbox" className="drawer-toggle"/>
            <div className="drawer-side z-10">
                <label htmlFor="fdrawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="menu p-8 w-full md:w-1/3 min-h-full bg-base-200 text-base-content text-lg">
                    <p className="text-3xl font-semibold text-center my-4">투자 상세내역</p>
                    {loading ? <div className="flex justify-center">
                        <span className="loading loading-spinner loading-md"></span>
                    </div> : <div>
                        <p className="my-2">ID #{data.fundingDetail.id}</p>
                        <p>투자금액</p>
                        <p className="text-2xl font-semibold">
                            {data.fundingDetail.fundingAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 크레딧
                            {data.fundingDetail.refundOrno === 1 &&
                                <div className="badge badge-outline badge-error mx-2">환불됨</div>}
                        </p>
                        {data.fundingDetail.refundOrno === 1 &&
                            <div className="my-4">환불사유<p>{data.fundingDetail.refundReason}</p></div>}
                        <div className="my-4">
                            영화 제목
                            <Link
                                to={"/funding/detail/" + data.fundingDetail.movieId}><p
                                className="text-xl font-semibold">{data.fundingDetail.movieTitle}</p>
                            </Link>
                        </div>
                        <div className="my-4">
                            관련 거래내역
                            <table className="table text-md text-center w-full mt-4">
                                <thead>
                                <tr>
                                    <th>순번</th>
                                    <th>거래 금액</th>
                                    <th>거래 종류</th>
                                    <th>거래일</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.credits.map((creditItem, index) => (
                                    <tr key={index} className="hover">
                                        <th>{index + 1}</th>
                                        <td>{creditItem.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                        <td>{creditItem.transactionType === 1 ?
                                            <span
                                                className="text-blue-700 font-medium">지급</span> : (creditItem.transactionType === 2 ?
                                                <span className="text-red-700 font-medium">사용</span> :
                                                <span className="text-green-700 font-medium">환불됨</span>)}</td>
                                        <td>{formattedDate(creditItem.transactionDate)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>}
                    <div className="mt-auto text-sm">안내사항
                        {!loading &&
                            <p>거래와 관련해 환불을 요청하려면 <Link to={"/funding/refund/" + data.fundingDetail.id}>여기</Link>를
                                확인해주세요.
                            </p>}
                        <label className="btn btn-primary w-full mt-2" htmlFor="fdrawer"
                               aria-label="close sidebar">닫기
                        </label>
                    </div>
                </div>

            </div>
        </div>
    );
}