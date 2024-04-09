import "./App.css";
import Menu from "./Menu.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App; 
