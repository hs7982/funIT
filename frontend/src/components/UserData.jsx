import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "../pages/Error.jsx";
import { axiosMyPage } from "../api/axios.js";
import { Modal } from "./Modal.jsx";

const UserData = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        tel: '',
    });
    const [loading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [errorDetail, setErrorDetail] = useState(null);
    const [isOpenModal, setOpenModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            const response = await axios.get('/api/users/mypage');
            setUserData(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching:", error);
            setError(true);
            setErrorDetail(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/change-user', userData);
            setModalMessage('개인정보가 성공적으로 수정되었습니다.');
            setOpenModal(true);

        } catch (error) {
            if (error.response && error.response.status === 400) {
                setModalMessage('잘못된 요청입니다: ' + JSON.stringify(error.response.data));
            } else {
                setModalMessage("오류가 발생했습니다! : " + error.message);
            }
            setOpenModal(true);
        }
    };

    const closeModal = () => {
        setOpenModal(false);
        window.location.reload(); // 페이지 새로고침
    };

    if (loading) {
        return (
            <div className="flex justify-center">
                <span className="loading loading-spinner loading-md"></span>
            </div>
        );
    }

    if (isError && !isOpenModal) {
        return <Error error={errorDetail} />;
    }

    return (
        <div className="w-full p-6 bg-gray-50">
            <Modal title="개인정보 수정" message={modalMessage} isOpenModal={isOpenModal} closeModal={closeModal} />
            <div className="max-w-[1440px] mx-auto">
                <div className="text-center mb-8">
                    <p className="text-3xl font-medium my-12 text-center">개인정보 수정</p>
                </div>
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
                    <div className="w-full mx-auto bg-white p-8 rounded-xl shadow-lg">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    이름
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="input input-bordered w-full" placeholder={userData.name}
                                    onChange={handleChange}
                                    />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    이메일
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    className="input input-bordered w-full" placeholder={userData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tel">
                                    전화번호
                                </label>
                                <input
                                    type="text"
                                    id="tel"
                                    name="tel"
                                    className="input input-bordered w-full" placeholder={userData.tel}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex items-center justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    개인정보 수정
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserData;
