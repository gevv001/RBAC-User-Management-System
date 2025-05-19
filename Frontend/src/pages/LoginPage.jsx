import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/auth/login", {
                email,
                password,
            });

            console.log(res);


            setUser(res.data.user);
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard", { replace: true });
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "auto", paddingTop: "10rem" }}>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label><br />
                    <input
                        type="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label><br />
                    <input
                        type="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <br />
                <button type="submit">Login</button>
                <br />
                <p>
                    <Link to="/forgot-password">Forgot Password?</Link>
                </p>

            </form>
        </div>
    );
}

export default LoginPage;
