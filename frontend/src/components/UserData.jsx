import React, {useState, useEffect} from "react";
import axios from "axios";

const UserData = () => {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/users/mypage');
                setUserData(response.data.data);
                setLoading(false); // 데이터 불러오기 완료 시 로딩 상태 변경
            } catch (error) {
                console.error("Error fetching:", error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <div className="flex justify-center">
            <span className="loading loading-spinner loading-md"></span>
        </div>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="user-data">
                <p className="text-3xl font-medium my-12 text-center">개인정보 수정</p>
                <div className="mx-auto max-w-6xl">
                    <label className="form-control w-full my-2">
                        <div className="label">
                            <span className="text-lg">이름</span>
                        </div>
                        <input type="text" className="input input-bordered w-full" placeholder={userData.name}
                               onChange={(e) => setTitle(e.target.value)}/>
                    </label>
                    <label className="form-control w-full my-2">
                        <div className="label">
                            <span className="text-lg">이메일</span>
                        </div>
                        <input type="text" className="input input-bordered w-full" placeholder={userData.email}
                               onChange={(e) => setTitle(e.target.value)}/>
                    </label>
                    <label className="form-control w-full my-2">
                        <div className="label">
                            <span className="text-lg">전화번호</span>
                        </div>
                        <input type="text" className="input input-bordered w-full" placeholder={userData.tel}
                               onChange={(e) => setTitle(e.target.value)}/>
                    </label>
                    <div className="flex items-center justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            개인정보 수정
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UserData;
