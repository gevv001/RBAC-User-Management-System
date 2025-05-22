import { useState } from "react";
import axios from "axios";

function UploadAvatarForm({ userId, currentAvatarUrl, onUploadSuccess }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(currentAvatarUrl || null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("avatar", selectedFile);

        try {
            const token = localStorage.getItem("token");

            const uploadRes = await axios.post("http://localhost:3000/photos", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            });

            const photoId = uploadRes.data.id;

            console.log(uploadRes);
            

            await axios.patch(`http://localhost:3000/users/me`, {
                avatar: photoId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            onUploadSuccess?.(photoId);
        } catch (err) {
            setError(err.response?.data?.message || "Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ marginTop: "1rem" }}>
            <h3>Upload Avatar</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {previewUrl && (
                <img
                    src={previewUrl}
                    alt="Preview"
                    style={{ width: 100, height: 100, objectFit: "cover", borderRadius: "50%" }}
                />
            )}
            <div>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button onClick={handleUpload} disabled={loading}>
                    {loading ? "Uploading..." : "Upload Avatar"}
                </button>
            </div>
        </div>
    );
}

export default UploadAvatarForm;
