import Home from "./components/Home/Home.jsx";
import Listing from "./components/Listing/Listing.jsx";
import Create from "./components/Create/Create.jsx";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbars from "./components/NavBar/Navbar";
import Detail from "./components/Detail/Detail";

function App() {
  return (
    <div className="App">
      <Navbars />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<Listing />} />
        <Route path="/create" element={<Create />} />
        <Route path="/pokemon/:name" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
