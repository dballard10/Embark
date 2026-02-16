import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { GachaProvider } from "./contexts/GachaContext";
import { ErrorBoundary } from "./components/ErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <GachaProvider>
          <App />
        </GachaProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
