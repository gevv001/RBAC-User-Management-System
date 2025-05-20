import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DashboardPage() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("http://localhost:3000/users", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    params: {
                        page: 1,
                        limit: 100,
                    },
                });
                setUsers(res.data.users);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch users");
            }
        };

        fetchUsers();
    }, [user]);

    return (
        <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
            <h1>Dashboard</h1>

            <div style={{ marginBottom: "1.5rem" }}>
                <p><strong>Name:</strong> {user?.fullName}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Role:</strong> {user?.role}</p>
            </div>


            <h2>All Users</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <table style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "1rem"
            }}>
                <thead>
                    <tr style={{ backgroundColor: "#f2f2f2" }}>
                        <th style={thStyle}>Name</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u._id} style={{ borderBottom: "1px solid #ccc" }}>
                            <td style={tdStyle}>{u.fullName}</td>
                            <td style={tdStyle}>{u.email}</td>
                            <td style={tdStyle}>{u.role}</td>
                            {user.role === 'admin' &&
                                <td style={tdStyle}>
                                    <button onClick={() => navigate(`/users/${u._id}/edit`)}>Edit</button>
                                </td>
                            }

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const thStyle = {
    textAlign: "left",
    padding: "10px",
    paddingLeft: "0px",
    borderBottom: "2px solid #ddd"
};

const tdStyle = {
    padding: "10px"
};

export default DashboardPage;
