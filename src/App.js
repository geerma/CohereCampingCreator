import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage.js";
import Weatherpage from "./Weatherpage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/weather" element={<Weatherpage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
