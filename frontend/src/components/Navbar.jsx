import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {useRecoilValue} from "recoil";
import {IsLoginState, UserState} from "../recoil/RecoilState.js";
import {axiosLogout} from "../api/axios.js";

const Navbar = () => {
    const [showInput, setShowInput] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("")
    const user = useRecoilValue(UserState);
    const isLogin = useRecoilValue(IsLoginState);
    const navigate = useNavigate();

    const enter = (e) => {
        if (e.key === 'Enter')
            navigate("/search?keyword=" + searchKeyword);
    }

    const logout = () => {
        axiosLogout();
        window.location.reload();
    }

    const closeSearchInput = () => {
        setShowInput(false);
    }

    useEffect(() => {
        if (location.pathname !== "/search")
            closeSearchInput();
    }, [location.pathname]);

    return (
        <div className="p-2 w-full">
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <Link className="btn btn-ghost text-3xl mx-4" to={"/"}>
                        <span className="text-rose-300">Fun</span>
                        <span className="text-sky-300">IT</span>
                    </Link>
                    <Link className="btn btn-ghost text-xl mx-4" to={"/funding"}>
                        <div className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.3"
                                 stroke="currentColor" className="w-5 h-5 my-auto me-1.5">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"/>
                            </svg>
                            펀딩
                        </div>
                    </Link>
                </div>
                <div className="flex-none">
                    <button className="btn btn-ghost btn-circle" onClick={() => setShowInput(!showInput)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </button>
                    {showInput && (
                        <div className="form-control">
                            <input type="text" placeholder="검색"
                                   onChange={(e) => setSearchKeyword(e.target.value)}
                                   onKeyDown={e => enter(e)}
                                   className="input input-bordered w-24 md:w-auto"/>
                        </div>
                    )}
                    <div className="dropdown dropdown-end">
                        <div className="flex items-center">
                            <div role="button" tabIndex={0} className="mx-2">{user.name ? user.name :
                                <span className="text-sm">로그인해주세요</span>}</div>

                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="프로필 사진"
                                        src="/default-profile.png"
                                    />
                                </div>
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            {isLogin &&
                                <li>
                                    <Link to="/mypage">마이페이지</Link>
                                </li>
                            }
                            {!isLogin &&
                                <li>
                                    <Link to="/signin">로그인</Link>
                                </li>
                            }
                            {!isLogin &&
                                <li>
                                    <Link to="/signup">회원가입</Link>
                                </li>
                            }
                            {isLogin &&
                                <li>
                                    <Link to="#" onClick={logout}>로그아웃</Link>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
