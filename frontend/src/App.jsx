import Navbar from "./components/Navbar.jsx";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx";
import LogIn from "./pages/LogIn.jsx";
import NotFound from "./pages/NotFound.jsx";
import NewMovieProject from "./pages/NewMovieProject.jsx";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/funding/new" element={<NewMovieProject/>}/>

                {/*찾는 페이지 없을때 (NotFound는 항상 최하단 위치!)*/}
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </>
    );
}

export default App;
