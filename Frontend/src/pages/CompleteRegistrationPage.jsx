import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function CompleteRegistrationPage() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const res = await axios.post("http://localhost:3000/auth/complete-registration", {
                token,
                fullName,
                password
            });

            setMessage("Registration complete. You can now log in.");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong.");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "auto", paddingTop: "2rem" }}>
            <h2>Complete Registration</h2>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <br />
                <button type="submit">Complete Registration</button>
            </form>
        </div>
    );
}

export default CompleteRegistrationPage;
