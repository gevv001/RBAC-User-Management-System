import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    if (!user) return null;

    return (
        <nav>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                {user.role === 'admin' && (<li><Link to="/invite">Invite</Link></li>)
                }
                <li><Link to="/profile">Profile</Link></li>
                <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
