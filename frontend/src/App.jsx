import Navbar from "./components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
