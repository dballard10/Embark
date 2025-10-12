import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DevTestPage from "./pages/DevTestPage";
import QuestDetailsPage from "./pages/QuestDetailsPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dev" element={<DevTestPage />} />
      <Route path="/quest/:id" element={<QuestDetailsPage />} />
    </Routes>
  );
}

export default App;
