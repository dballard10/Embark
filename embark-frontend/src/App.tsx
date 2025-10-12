import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DevTestPage from "./pages/DevTestPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dev" element={<DevTestPage />} />
    </Routes>
  );
}

export default App;
