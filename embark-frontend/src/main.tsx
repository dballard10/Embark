import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { UserProvider } from "./contexts/UserContext";
import { ItemsProvider } from "./contexts/ItemsContext";
import { QuestsProvider } from "./contexts/QuestsContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ItemsProvider>
          <QuestsProvider>
            <App />
          </QuestsProvider>
        </ItemsProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
