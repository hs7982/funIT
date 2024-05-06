import {axiosMe} from "./axios.js";
import axios from "axios";
import {useRecoilState, useSetRecoilState} from "recoil";
import {IsLoginState, UserState} from "../recoil/RecoilState.js";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";

export const UpdateUserInfo = () => {
    const [isLogin, setIsLogin] = useRecoilState(IsLoginState);
    const [userInfo, setUserInfo] = useRecoilState(UserState);
    const location = useLocation();
    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await axiosMe();
                setIsLogin(true);
                const {email, id, name, profileImage} = response.data.data
                setUserInfo({email, id, name, profileImage})

            } catch (e) {
                setIsLogin(false);
                setUserInfo({email: null, id: null, name: null, profileImage: null})
            }
        }
        loadUser();
    }, [location.pathname]);

}