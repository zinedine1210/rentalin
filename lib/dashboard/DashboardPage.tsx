"use client";
import { uploadFile } from "@@/src/hooks/CollectionAPI";
import { useState } from "react";

export default function FileUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            setMessage("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.set("file", file);

        try {
            const response = await uploadFile(formData)
            console.log(response)
        } catch (error) {
            console.error("Upload error:", error);
            setMessage("An error occurred during file upload.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
