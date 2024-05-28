import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Error from "./Error";
import { axiosMyPage } from "../api/axios";

const ChangePassword = () => {
    const [loading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [errorDetail, setErrorDetail] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            const response = await axiosMyPage();
            setUserInfo(response.data.data);
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

    if (isError) {
        return <Error error={errorDetail} />;
    }

    return (
        <div className="w-full p-6 bg-gray-50 min-h-screen">
            <div className="max-w-[1440px] mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold my-8 text-gray-800">비밀번호 변경</h1>
                    <hr className="mx-auto border-t border-gray-300 mb-8" />
                </div>
                {loading ? (
                    <div className="flex justify-center">
                        <span className="loading loading-spinner loading-md"></span>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
                        <div className="w-full mx-auto md:w-1/2 bg-white p-8 rounded-xl shadow-lg">
                            <form>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
                                        현재 비밀번호
                                    </label>
                                    <input
                                        type="password"
                                        id="currentPassword"
                                        name="currentPassword"
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
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                                        새 비밀번호 확인
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
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

