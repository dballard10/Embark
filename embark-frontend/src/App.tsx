import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import QuestDetailsPage from "./pages/QuestDetailsPage";
import QuestsPage from "./pages/QuestsPage";
import VaultPage from "./pages/VaultPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import ShopPage from "./pages/ShopPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/quests" element={<QuestsPage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/vault" element={<VaultPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/quest/:id" element={<QuestDetailsPage />} />
      <Route path="/item/:id" element={<ItemDetailsPage />} />
    </Routes>
  );
}

export default App;
