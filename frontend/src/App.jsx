import Navbar from "./components/Navbar.jsx";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
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
import InvestPage from "./pages/InvestPage.jsx";
import Footer from "./components/Footer.jsx";


function App() {
    return (
        <>
            <UpdateUserInfo/>
            <Navbar/>
            <Routes>
                <Route path="/" element={<MovieProject/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/funding/new" element={<NewMovieProject/>}/>
                <Route path="/funding/edit" element={<EditMovieProject/>}/>
                <Route path="/funding" element={<MovieProject/>}/>
                <Route path="/funding/detail/:id" element={<MovieDetail/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/mypage" element={<Mypage/>}/>
                <Route path="/funding/invest/:id" element={<InvestPage/>}/>
                {/*찾는 페이지 없을때 (NotFound는 항상 최하단 위치!)*/}
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </>
    );
}

export default App;
