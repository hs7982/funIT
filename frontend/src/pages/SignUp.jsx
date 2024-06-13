import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {axiosSignup} from "../api/axios.js";

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_second, setPassword_second] = useState('');
    const [name, setName] = useState('');
    const [tel, setTel] = useState('');
    const [gender, setGender] = useState('');

    const signup = async (event) => {
        event.preventDefault();
        if (!email || !password || !name || !tel || !gender) {
            alert("모든 필드를 입력해주세요!");
        } else if (password !== password_second) {
            alert("비밀번호가 일치하지 않습니다!");
        } else {
            const data = {
                email: email,
                password: password,
                name: name,
                tel: tel,
                gender: gender
            }
            await axiosSignup(data).then((data) => {
                if (data.status === 201) {
                    alert("회원가입 성공")
                    navigate("/login"); // 회원가입 성공 시 홈 페이지로 이동
                }
            }).catch((error) => {
                console.error("회원가입 실패:", error);
                const errorMessage = JSON.stringify(error.response.data.data) || "회원가입 중 오류가 발생했습니다.";
                alert(errorMessage);
            });
        }
    }


    return (
        <div className="container m-auto p-4">
            <div className="card mx-auto shrink-0 w-full max-w-2xl shadow-2xl bg-slate-100 dark:bg-slate-900">
                <form className="card-body">
                    <div className="text-center text-3xl font-semibold my-4">회원가입</div>
                    <div className="relative">
                        <input type="email" id="email"
                               className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        <label htmlFor="email"
                               className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                        >이메일</label>
                    </div>
                    <div className="relative">
                        <input type="password" id="password"
                               className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" " value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        <label htmlFor="password"
                               className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                        >비밀번호</label>
                    </div>
                    <div className="relative">
                        <input type="password" id="rePassword"
                               className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" " value={password_second}
                               onChange={(e) => setPassword_second(e.target.value)} required/>
                        <label htmlFor="rePassword"
                               className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                        >비밀번호 확인</label>
                    </div>
                    <div className="relative">
                        <input type="text" id="name"
                               className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" " value={name} onChange={(e) => setName(e.target.value)} required/>
                        <label htmlFor="name"
                               className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                        >이름</label>
                    </div>
                    <div className="relative">
                        <input type="text" id="tel"
                               className="block rounded-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" " value={tel} onChange={(e) => setTel(e.target.value)} required/>
                        <label htmlFor="tel"
                               className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                        >전화번호</label>
                    </div>
                    <div className="form-controls">
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">남</span>
                                <input
                                    type="radio"
                                    name="gender"
                                    className="radio checked:bg-blue-500"
                                    checked={gender === '남'}
                                    onChange={() => setGender('남')} // 선택된 값으로 gender 상태 업데이트
                                /></label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">여</span>
                                <input type="radio"
                                       name="gender"
                                       className="radio checked:bg-red-500"
                                       checked={gender === '여'}
                                       onChange={() => setGender('여')} // 선택된 값으로 gender 상태 업데이트
                                /></label>
                        </div>
                    </div>
                    <div className="form-control mt-3">
                        <button className="btn text-lg btn-primary focus:outline-none" onClick={(e) => signup(e)}>회원가입
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default SignUp;
