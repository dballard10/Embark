import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PullPage from "./pages/PullPage";
import CollectionPage from "./pages/CollectionPage";
import ShopPage from "./pages/ShopPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pull" element={<PullPage />} />
      <Route path="/collection" element={<CollectionPage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
