// src/lib/cloudinaryUpload.ts
export const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Home procategory"); // from cloudinary
    formData.append("cloud_name", "dwhpwlk5m");
    try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dwhpwlk5m/image/upload", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        return data.secure_url; // this is the public image URL
    }
    catch (err) {
        console.error("Cloudinary upload error:", err);
        return null;
    }
};
