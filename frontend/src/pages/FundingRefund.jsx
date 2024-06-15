import {Link, useNavigate, useParams} from "react-router-dom";
import {axiosFundingDetail, axiosFundingRefund} from "../api/axios.js";
import React, {useEffect, useState} from "react";
import {formattedDate} from "../components/formattedData.js";
import Error from "./Error.jsx";

export const FundingRefund = () => {
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    const [reason, setReason] = useState("");

    const fetchData = async () => {
        try {
            const result = await axiosFundingDetail(id)
            setData(result.data.data);
            setLoading(false);
        } catch (e) {
            alert(e.response.data.message);
            setError(true)
            setLoading(false)
        }
    }

    const refund = async () => {
        if (!confirm("정말 취소요청을 하시겠습니까?")) return;

        try {
            const result = await axiosFundingRefund(id, reason);
            if (result.status === 200) {
                alert("취소가 완료되어 크래딧이 환불되었습니다.");
                navigate("/mypage")
            }

        } catch (e) {
            console.log(e)
            if (e.response.data.httpStatus === "BAD_REQUEST") {
                alert(e.response.data.message + "\n" + e.response.data.data.reason);
            } else {
                alert(e.response.data.message);
            }

        }
    }

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, [id]);

    if (error) return <Error/>

    return (
        <div className="container max-w-[1440px] mx-auto my-12 px-4 text-center">
            <div className="">
                <p className="text-3xl font-semibold my-2">😢 이 투자에 대한 취소가 필요하신가요?</p>
                <p>투자에 대한 취소는 펀딩 종료일까지만 가능합니다.</p>
                <p>회원님의 투자가 창작자에겐 큰 기회가 됩니다. 정말 이 투자를 취소하시겠습니까?</p>
                <p>아래의 투자 상세정보를 확인하신 후 진행하시기 바랍니다.</p>
            </div>
            {loading ? <div className="flex justify-center">
                    <span className="loading loading-spinner loading-md"></span>
                </div> :
                <div className="my-10">
                    <p className="text-2xl font-semibold my-2">투자 상세내역</p>
                    {data.fundingDetail && data.fundingDetail.refundOrno === 1 ?
                        <p className="text-xl my-4">이미 취소된 투자입니다.</p> : (data.fundingDetail.movieStatus !== 1 ?
                                <p className="text-xl my-4">이미 종료된 투자입니다.</p> :
                                <div>
                                    <div className="border rounded-2xl w-[36rem] max-w-full mx-auto text-start p-5">
                                        <p className="">거래 ID #{data.fundingDetail.id}</p>
                                        <div className="my-2">
                                            영화 제목
                                            <Link
                                                to={"/funding/detail/" + data.fundingDetail.movieId}><p
                                                className="text-xl font-semibold">{data.fundingDetail.movieTitle}</p>
                                            </Link>
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
                                                                    <span
                                                                        className="text-red-700 font-medium">사용</span> :
                                                                    <span
                                                                        className="text-green-700 font-medium">환불됨</span>)}</td>
                                                            <td>{formattedDate(creditItem.transactionDate)}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="my-6">
                                        <p>취소 요청 사유를 작성해주세요.</p>
                                        <input className="input input-bordered m-2 w-[30rem] max-w-full" type="text"
                                               onChange={(e) => setReason(e.target.value)}/>

                                        <button className="btn mx-1" onClick={() => refund()}>취소 요청</button>
                                    </div>
                                </div>
                        )}
                </div>
            }
        </div>
    )
}