import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {axiosLogin} from "../api/axios.js";
import {Modal} from "../components/Modal.jsx";
import {useRecoilState, useSetRecoilState} from "recoil";
import {IsLoginState} from "../recoil/RecoilState.js";

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState("");
    const [isOpenModal, setOpenModal] = useState(false);
    const [isLogin, setIsLogin] = useRecoilState(IsLoginState);

    const login = async (event) => {
        event.preventDefault();
        if (!email && !password) {
            alert("이메일과 비밀번호를 입력해주세요!");
        } else {
            try {
                const response = await axiosLogin(email, password);
                if (response.status === 200) {
                    setIsLogin(true);
                    navigate("/");
                }
            } catch (error) {
                console.log(error)
                if (axios.isAxiosError(error)) {
                    if (error.response.status === 401) setLoginError(error.response.data);
                    else setLoginError(error.message)
                    setOpenModal(true);
                    console.log(loginError);
                }
            }
        }
    }

    const closeModal = () => {
        setOpenModal(false)
    }

    useEffect(() => {
        if (isLogin === true)
            navigate("/");
    }, []);

    return (
        <div className="container m-auto p-4">
            <Modal title="로그인에 실패하였습니다." message={loginError} isOpenModal={isOpenModal} closeModal={closeModal}/>

            <div className="card mx-auto shrink-0 w-full max-w-lg shadow-2xl bg-slate-100">
                <div className="card-body">
                    <div className="text-center text-3xl font-semibold my-4">로그인</div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">이메일</span>
                        </label>
                        <input type="email" placeholder="이메일" className="input input-bordered" onChange={(e) => {
                            setEmail(e.target.value)
                        }} required/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">비밀번호</span>
                        </label>
                        <input type="password" placeholder="비밀번호" className="input input-bordered" onChange={(e) => {
                            setPassword(e.target.value)
                        }} required/>
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">비밀번호를 잊어버렸다면?</a>
                            <a href="/signup" className="label-text-alt link link-hover">회원가입</a>
                        </label>
                    </div>
                    <div className="flex justify-between">
                        <div/>
                        <button className=" btn btn-sm">구</button>
                        <button className="btn btn-sm">카</button>
                        <button className="btn btn-sm">네</button>
                        <div/>
                    </div>
                    <div className="form-control mt-3">
                        <button className="btn text-lg btn-primary" onClick={(e) => login(e)}>로그인</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SignIn;
