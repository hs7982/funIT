import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios"; // axios를 임포트합니다.
import Error from "./Error";
import {axiosMyPage} from "../api/axios";
import {Modal} from "../components/Modal.jsx";

const ChangePassword = () => {
    const [loading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [errorDetail, setErrorDetail] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isOpenModal, setOpenModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            const response = await axiosMyPage();
            setLoading(false);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                navigate("/login");
            }
            console.error("Error fetching:", error);
            setError(true);
            setErrorDetail(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setOpenModal(true);
            setModalMessage("새로운 비밀번호가 일치하지 않습니다");
        }
        try {
            const response = await axios.post('/api/users/change-pw', {
                oriPassword: currentPassword,
                newPassword,
            });
            setModalMessage('비밀번호 변경 되었습니다.');
            setOpenModal(true);
            setCurrentPassword("");
            setNewPassword("")
            setConfirmPassword("");
        } catch (error) {
            if (error.response.status === 401) {
                setModalMessage(error.response.data.message);
            } else if (error.response.status === 400) {
                setModalMessage(JSON.stringify(error.response.data.data));
            } else {
                setModalMessage("오류가 발생했습니다.")
            }
            setOpenModal(true);
        }
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    if (isError && !isOpenModal) {
        return <Error error={errorDetail}/>;
    }

    return (
        <div className="w-full p-6 bg-gray-50 min-h-screen">
            <Modal title="비밀번호 변경" message={modalMessage} isOpenModal={isOpenModal} closeModal={closeModal}/>
            <div className="max-w-[1440px] mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold my-8 text-gray-800">비밀번호 변경</h1>
                </div>
                {loading ? (
                    <div className="flex justify-center">
                        <span className="loading loading-spinner loading-md"></span>
                    </div>
                ) : (
                    <div
                        className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
                        <div className="w-full mx-auto bg-white p-8 rounded-xl shadow-lg">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2"
                                           htmlFor="currentPassword">
                                        현재 비밀번호
                                    </label>
                                    <input
                                        type="password"
                                        id="currentPassword"
                                        name="currentPassword"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                                        새 비밀번호
                                    </label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2"
                                           htmlFor="confirmPassword">
                                        새 비밀번호 확인
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="flex items-center justify-end">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        비밀번호 변경
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChangePassword;
