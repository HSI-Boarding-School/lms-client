import { Route, Routes } from "react-router";
import AppContent from "./components/dashboards/AppContent";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      <Route path="/*" element={<AppContent />} />
    </Routes>
  );
}

export default App;
