import Navbar from "./components/Navbar.jsx";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import NewMovieProject from "./pages/NewMovieProject.jsx";
import MovieProject from "./pages/MovieProject.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import Search from "./pages/Search.jsx";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/funding/new" element={<NewMovieProject/>}/>
                <Route path="/funding" element={<MovieProject/>}/>
                <Route path="/funding/detail/:id" element={<MovieDetail/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/search" element={<Search/>}/>

                {/*찾는 페이지 없을때 (NotFound는 항상 최하단 위치!)*/}
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </>
    );
}

export default App;
