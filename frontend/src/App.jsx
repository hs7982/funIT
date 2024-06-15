import Navbar from "./components/Navbar.jsx";
import {Routes, Route} from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import NewMovieProject from "./pages/NewMovieProject.jsx";
import EditMovieProject from "./pages/EditMovieProject.jsx";
import MovieProject from "./pages/MovieProject.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import Search from "./pages/Search.jsx";
import {UpdateUserInfo} from "./api/auth.js";
import Mypage from "./pages/Mypage.jsx";
import ChangePassword from "./components/ChangePassword.jsx";
import Funding from "./pages/Funding.jsx";
import Footer from "./components/Footer.jsx";
import {FundingRefund} from "./pages/FundingRefund.jsx";
import ScrollToTopButton from "./components/ScrollToTopButton.jsx";

function App() {
    return (
        <>
            <UpdateUserInfo/>
            <Navbar/>
            <ScrollToTopButton/>
            <Routes>
                <Route path="/" element={<MovieProject showType={1}/>}/>
                <Route path="/end" element={<MovieProject showType={2}/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/funding/new" element={<NewMovieProject/>}/>
                <Route path="/funding/edit/:id" element={<EditMovieProject/>}/>
                <Route path="/funding/detail/:id" element={<MovieDetail/>}/>
                <Route path="/funding/refund/:id" element={<FundingRefund/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/mypage" element={<Mypage/>}/>
                <Route path="/mypage/changepassword" element={<ChangePassword/>}/>
                <Route path="/funding/prgrs/:id" element={<Funding/>}/>
                {/* 찾는 페이지 없을때 (NotFound는 항상 최하단 위치!) */}
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <Footer/>
        </>
    );
}

export default App;
