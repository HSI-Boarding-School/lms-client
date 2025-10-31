import { Route, Routes } from "react-router";
import AppContent from "./pages/dashboards/AppContent";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import ForbiddenPage from "./pages/auth/ForbiddenPage";
// import { useAuthStore } from "./store/authStore";
// import { useEffect } from "react";

function App() {

  // const loadUserFromStorage = useAuthStore((s) => s.loadUserFromStorage);

  // useEffect(() => {
  //   loadUserFromStorage();
  // }, [loadUserFromStorage]);
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/403" element={<ForbiddenPage />} />


      <Route path="/*" element={<AppContent />} />
    </Routes>
  );
}

export default App;
