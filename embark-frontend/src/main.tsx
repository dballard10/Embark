import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import { ItemsProvider } from "./contexts/ItemsContext";
import { QuestsProvider } from "./contexts/QuestsContext";
import { AchievementsProvider } from "./contexts/AchievementsContext";
import { CelebrationOverlayProvider } from "./contexts/CelebrationOverlayContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <ItemsProvider>
            <QuestsProvider>
              <AchievementsProvider>
                <CelebrationOverlayProvider>
                  <App />
                </CelebrationOverlayProvider>
              </AchievementsProvider>
            </QuestsProvider>
          </ItemsProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
