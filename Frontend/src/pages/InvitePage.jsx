import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function InvitePage() {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const res = await axios.post(
                "http://localhost:3000/auth/invite",
                { email, role },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage("Invitation sent successfully!");
            setError("");
            setEmail("");
            setRole("user");
        } catch (err) {
            setError(err.response?.data?.message || "Invite failed.");
            setMessage("");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "auto", paddingTop: "5rem" }}>
            <h2>Invite User</h2>
            {message && <p style={{ color: "green" }}>{message}</p>}
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
                    <label>Role</label><br />
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <br />
                <button type="submit">Send Invite</button>
            </form>
        </div>
    );
}

export default InvitePage;
