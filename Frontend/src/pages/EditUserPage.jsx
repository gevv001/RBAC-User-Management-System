import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

function EditUserPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`http://localhost:3000/users/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const { fullName, email } = res.data.user;
                setFormData({ fullName, email });
                setLoading(false);
            } catch (err) {
                setError("Failed to load user data");
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const token = localStorage.getItem("token");

        const updateData = {};
        for (const key in formData) {
            if (formData[key].trim() !== "") {
                updateData[key] = formData[key].trim();
            }
        }

        if (Object.keys(updateData).length === 0) {
            return setError("No changes to update.");
        }

        try {
            const res = await axios.patch(`http://localhost:3000/users/${id}`, updateData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setSuccess("User updated successfully.");
        } catch (err) {
            setError(err.response?.data?.message || "Update failed");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            const token = localStorage.getItem("token");

            await axios.delete(`http://localhost:3000/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            navigate("/dashboard"); 
        } catch (err) {
            setError("Failed to delete user.");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div style={{ maxWidth: "500px", margin: "auto", padding: "2rem" }}>
            <h2>Edit User</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name</label><br />
                    <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter full name"
                    />
                </div>
                <div>
                    <label>Email</label><br />
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                    />
                </div>
                <br />
                <button type="submit">Update</button>
                <button
                    type="button"
                    style={{ marginLeft: "1rem", color: "red" }}
                    onClick={handleDelete}
                >
                    Delete User
                </button>
            </form>
        </div>
    );
}

export default EditUserPage;
