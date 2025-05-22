import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import UploadAvatarForm from "../components/UploadAvatarForm";
import UserAvatar from "../components/UserAvatar";
import axios from "axios";

function ProfilePage() {
    const { user, setUser } = useAuth();
    const [email, setEmail] = useState(user?.email || "");
    const [fullName, setFullName] = useState(user?.fullName || "");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");


    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            const res = await axios.patch(
                `http://localhost:3000/users/me`,
                {
                    email,
                    fullName,
                    ...(password && { password })
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setUser(res.data.user);
            setMessage("Profile updated successfully.");
        } catch (err) {
            setMessage(err.response?.data?.message || "Update failed.");
        }

    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.patch(
                "http://localhost:3000/auth/change-password",
                { email, currentPassword, newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setPasswordMessage("Password changed successfully");
            setCurrentPassword("");
            setNewPassword("");
        } catch (err) {
            setPasswordMessage(err.response?.data?.message || "Password change failed");
        }
    };
    console.log(user.avatar);
    
    return (
        <div style={{ maxWidth: 400, margin: "auto", paddingTop: "2rem" }}>
            <h2>My Profile</h2>
            {message && <p>{message}</p>}
            <UserAvatar avatarId={user.avatar} size={120} />

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Full Name</label>
                    <input
                        type="text"
                        value={fullName}
                        required
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <br />
                <button type="submit">Save Changes</button>
            </form>
            <UploadAvatarForm
                userId={user._id}
                currentAvatarUrl={`http://localhost:3000/photos/${user.avatar}`}
                onUploadSuccess={() => window.location.reload()}
            />

            <h3>Change Password</h3>
            {passwordMessage && <p>{passwordMessage}</p>}
            <form onSubmit={handlePasswordChange}>
                <div>
                    <label>Current Password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <br />
                <button type="submit">Change Password</button>
            </form>
        </div>


    );
}

export default ProfilePage;
