import React, {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import Error from "./Error.jsx";
import {axiosGetMovieTotal, axiosGetMyMovies, axiosGetMyMoviesDetail} from "../api/axios.js";
import {deleteMovie} from "../components/DeleteMovie.js";
import {calcDay, calcPer} from "../components/CalcDayAndPer.js";
import {Modal} from "../components/ModalHTML.jsx";


const MyMoviesDetail = () => {
    const params = useParams();
    const id = params.id;

    const [fundings, setFundings] = useState([]);
    const [total, setTotal] = useState(0);
    const [noContent, setNoContent] = useState(false)
    const [isError, setError] = useState(false)
    const [isLoading, setLoding] = useState(false)
    const [noPermission, setNoPermission] = useState(false)

    const navigate = useNavigate();

    const fetchMovie = async () => {
        try {
            setLoding(true);
            const response = await axiosGetMyMoviesDetail(id);
            if (response.status === 200) {
                setFundings(response.data.data);
            } else if (response.status === 204) {
                setNoContent(true);
            }
            const totalRes = await axiosGetMovieTotal(id);
            if (totalRes.status === 200) {
                setTotal(totalRes.data.data.fundingTotalAmount);
            }
            setLoding(false)
        } catch (e) {
            setLoding(false)
            if (e.response.status === 401) navigate("/login");
            else if (e.response.status === 403) setNoPermission(true);
            else alert(e.response.statusText + "\n" + e.response.data.message);
        }
    };

    useEffect(() => {
        fetchMovie()
    }, []);

    const [userInfo, setUserInfo] = useState("");
    const [isOpenModal, setOpenModal] = useState(false);

    const openModal = (img, name, email, tel) => {
        setUserInfo(`<div class="flex"><div class="avatar">
                                        <div class="w-10 rounded-full">
                                            <img src=${img} alt="프로필사진"/>
                                        </div>
                                    </div><span class="text-lg font-medium my-auto ms-2 text-black">${name}</span></div>이메일: ${email}<br/>연락처: ${tel}`)
        setOpenModal(true)
    }

    const closeModal = () => {
        setOpenModal(false);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center"><span
                className="loading loading-spinner loading-md"></span>
            </div>
        )
    } else if (isError) return <Error error={errorDetail}/>
    else if (noPermission) return <div>해당 정보를 볼 권한이 없습니다.</div>
    else {
        return (
            <div className="max-w-[1440px] w-full">
                <Modal title="투자자 정보" message={userInfo} isOpenModal={isOpenModal} closeModal={closeModal}/>
                <p className="text-3xl font-medium my-12 text-center">투자 상세내역</p>
                <div className="text-xl font-medium text-center my-6">🎉
                    지금까지 {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 크래딧"}을 투자
                    받았어요!
                </div>
                <div className="overflow-x-auto my-4">
                    {
                        noContent ? <div>투자 내역이 없습니다.</div> :
                            <table className="table table-auto w-full text-center">
                                <thead>
                                <tr>
                                    <th className="min-w-[50px]">순번</th>
                                    <th className="min-w-[50px]">투자 번호</th>
                                    <th className="min-w-[120px]">투자자 성명</th>
                                    <th className="min-w-[150px]">금액</th>
                                    <th className="min-w-[100px]">상태</th>
                                    <th className="min-w-[150px]">환불 사유</th>
                                </tr>
                                </thead>
                                <tbody>
                                {noContent ? (
                                    <tr>
                                        <td colSpan="4" className="text-center font-semibold">등록한 콘텐츠가 없습니다!</td>
                                    </tr>
                                ) : (
                                    fundings.map((funding, idx) => (
                                        <tr key={idx} className="hover">
                                            <td className="text-center">{idx + 1}</td>
                                            <td>#{funding.fundingDetail.id}</td>
                                            <td className="items-center">
                                                <button className="btn-ghost text-primary"
                                                        onClick={() => openModal(funding.userProfileImage, funding.userName, funding.userEmail, funding.userTel)}>{funding.userName}</button>
                                            </td>
                                            <td><span
                                                className={funding.fundingDetail.refundOrno === 0 ? "" : "line-through"}>{funding.fundingDetail.fundingAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 크래딧"}</span>
                                            </td>
                                            <td>{funding.fundingDetail.refundOrno === 0 ?
                                                funding.fundingDetail.movieStatus === 1 ? <span>진행중</span> :
                                                    <span>확정</span> :
                                                <span className="text-red-600 font-semibold">환불됨</span>}
                                            </td>
                                            <td>
                                                {funding.fundingDetail.refundReason}
                                            </td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                    }
                </div>
            </div>

        );
    }
};

export default MyMoviesDetail;