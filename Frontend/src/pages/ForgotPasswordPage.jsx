import { useState } from "react";
import axios from "axios";

function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/auth/forgot-password", { email });
            setMessage(res.data.message || "Reset link sent to your email.");
        } catch (err) {
            setMessage(err.response?.data?.message || "Something went wrong.");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "auto", paddingTop: "2rem" }}>
            <h2>Forgot Password</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <button type="submit" style={{ marginTop: "1rem" }}>
                    Send Reset Link
                </button>
            </form>
        </div>
    );
}

export default ForgotPasswordPage;
