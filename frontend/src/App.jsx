import Navbar from "./components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import MoviePage from "./MoviePage.jsx";
import LogIn from "./pages/LogIn.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/moviepage" element={<MoviePage />} />
          <Route path="/login" element={<LogIn />} />
      </Routes>
    </>
  );
}

export default App;
