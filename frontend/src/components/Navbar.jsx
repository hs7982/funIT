import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {useRecoilValue} from "recoil";
import {IsLoginState, UserState} from "../recoil/RecoilState.js";
import {axiosLogout} from "../api/axios.js";

const Navbar = () => {
    const [showInput, setShowInput] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);  // 메뉴 열림 상태
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
            <div className="navbar bg-base-100 flex-col md:flex-row">
                <div className="flex w-full md:w-fit">
                    <Link className="md:flex-1 btn btn-ghost text-3xl mx-4" to={"/"}>
                        <span className="text-rose-300">Fun</span>
                        <span className="text-sky-300">IT</span>
                    </Link>
                    <div className="md:hidden flex-1"></div>
                    <button className="md:hidden btn btn-outline" onClick={() => setMenuOpen(!menuOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                        </svg>

                    </button>
                </div>
                <div className="flex-1">
                    <div className={`md:flex ${menuOpen ? 'block' : 'hidden'} flex-col md:flex-row`}>
                        <Link className="btn btn-ghost text-xl mx-4" to={"/"}>
                            <div className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.3"
                                     stroke="currentColor" className="size-5 my-auto me-1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0 3 3 0 0 1-6 0Z"/>
                                </svg>
                                메인
                            </div>
                        </Link>
                        <Link className="btn btn-ghost text-xl mx-4" to={"/end"}>
                            <div className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className="size-5 my-auto me-1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/>
                                </svg>
                                종료된 펀딩
                            </div>
                        </Link>
                    </div>
                </div>
                <div className={`flex md:flex ${menuOpen ? 'block' : 'hidden'}  items-center `}>
                    <button className="btn btn-ghost btn-circle no-outline focus:outline-none"
                            onClick={() => setShowInput(!showInput)}>
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
                                   className="input input-bordered w-auto"/>
                        </div>
                    )}
                    <div className="dropdown dropdown-end">
                        <div className="flex items-center">
                            <div role="button" tabIndex={0} className="mx-2">{isLogin ? user.name :
                                <span className="text-sm">로그인해주세요</span>}</div>

                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="프로필 사진"
                                        src={user.profileImage == null ? "/default-profile.png" : user.profileImage}
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
                                    <Link to="/funding/new">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                        </svg>
                                        새 프로젝트 등록</Link>
                                </li>
                            }

                            {isLogin &&
                                <li>
                                    <Link to="/mypage">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                        </svg>
                                        마이페이지</Link>
                                </li>
                            }
                            {!isLogin &&
                                <li>
                                    <Link to="/login">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/>
                                        </svg>
                                        로그인</Link>
                                </li>
                            }
                            {!isLogin &&
                                <li>
                                    <Link to="/signup">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"/>
                                        </svg>
                                        회원가입</Link>
                                </li>
                            }
                            {isLogin &&
                                <li>
                                    <Link to="#" onClick={logout}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/>
                                        </svg>
                                        로그아웃</Link>
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
