import { useState, useEffect } from "react";
import axios from "axios";

const PhotoUpload = ({ userId }) => {
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState("");
    const [existingPhoto, setExistingPhoto] = useState("");

    useEffect(() => {
        // Fetch existing photo
        axios.get(`https://localhost:7050/api/ResumePhoto/${userId}`)
            .then(response => {
                setPreview(response.data.photoUrl);
                setExistingPhoto(response.data.photoUrl);
            })
            .catch(() => setPreview(""));
    }, [userId]);

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
        const url = URL.createObjectURL(e.target.files[0]);
        setPreview(url);
    };

    const handleUpload = async () => {
        if (!photo) {
            alert("Please select a photo.");
            return;
        }

        const formData = new FormData();
        formData.append("file", photo);
        formData.append("userId", userId);

        try {
            const response = await axios.post("https://localhost:7050/api/ResumePhoto/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setPreview(response.data.photoUrl);
            setExistingPhoto(response.data.photoUrl);
            alert("Photo uploaded successfully!");
        } catch (error) {
            console.error("Upload failed", error);
            alert("Photo upload failed.");
        }
    };

    return (
        <div>
            {preview && <img src={preview} alt="Uploaded" width="150" height="150" />}
            <input type="file" onChange={handleFileChange} accept="image/*" />
            <button onClick={handleUpload} disabled={preview === existingPhoto}>Upload</button>
        </div>
    );
};

export default PhotoUpload;
