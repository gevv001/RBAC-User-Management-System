import { useAuth } from "../contexts/AuthContext";

function PublicRoute({ children }) {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default PublicRoute;
