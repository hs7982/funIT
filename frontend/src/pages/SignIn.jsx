import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = (event) => {
        event.preventDefault();
        if (!email && !password) {
            alert("이메일과 비밀번호를 입력해주세요!");
        } else {
            axios({
                url: "/api/users/login",
                method: "POST",
                withCredentials: true,
                timeout: 10000,
                data: {
                    email: email,
                    password: password,
                }
            }).then((data) => {
                if (data.status === 200) {
                    alert("로그인 성공")
                    navigate("/")
                }
            }).catch((e) => {
                alert(e.response.data)
            })
        }
    }
    return (
        <div className="container m-auto p-4">
            <div className="card mx-auto shrink-0 w-full max-w-lg shadow-2xl bg-slate-100">
                <form className="card-body">
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
                </form>
            </div>
        </div>
    );
}
export default SignIn;
