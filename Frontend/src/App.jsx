// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import EditUserPage from "./pages/EditUserPage";
import InvitePage from "./pages/InvitePage";
import ProfilePage from "./pages/ProfilePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import CompleteRegistrationPage from "./pages/CompleteRegistrationPage";
import { useAuth } from "./contexts/AuthContext";
import ProtectedLayout from "./components/ProtectedLayout";
import PublicLayout from "./components/PublicLayout";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
      />

      <Route element={<PublicLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      </Route>

      <Route
        element={user ? <ProtectedLayout /> : <Navigate to="/login" replace />}
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/users/:id/edit" element={<EditUserPage />} />
        <Route path="/invite" element={<InvitePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="/complete-registration/:token" element={<CompleteRegistrationPage />} />

    </Routes>
  );
}

export default App;
