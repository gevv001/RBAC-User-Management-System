import { Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import EditUserPage from "./pages/EditUserPage";
import InvitePage from "./pages/InvitePage";
import ProfilePage from "./pages/ProfilePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={user ? "/dashboard" : "/login"} replace />
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/:id/edit"
          element={
            <EditUserPage />
          }
        />

        <Route
          path="/invite"
          element={
            <ProtectedRoute requiredRole="admin">
              <InvitePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <ForgotPasswordPage />
          }
        />

        <Route
          path="/reset-password/:token"
          element={
            <ResetPasswordPage />
          }
        />
      </Routes>
    </>

  )
}

export default App
