import "./App.css";
// import Landing from "./pages/Landing";
// import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/Landing";
import Home from "./Pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Routes path="/" element={LandingPage}/>
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
