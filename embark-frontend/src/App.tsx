import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DevTestPage from "./pages/DevTestPage";
import QuestDetailsPage from "./pages/QuestDetailsPage";
import QuestsPage from "./pages/QuestsPage";
import VaultPage from "./pages/VaultPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/quests" element={<QuestsPage />} />
      <Route path="/vault" element={<VaultPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/dev" element={<DevTestPage />} />
      <Route path="/quest/:id" element={<QuestDetailsPage />} />
      <Route path="/item/:id" element={<ItemDetailsPage />} />
    </Routes>
  );
}

export default App;
