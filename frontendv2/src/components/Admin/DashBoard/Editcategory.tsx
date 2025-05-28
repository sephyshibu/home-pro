import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstanceadmin from "../../../Axios/AdminAxios/axios";
import toast from "react-hot-toast";
import { uploadImageToCloudinary } from "../../../utils/cloudinaryUpload"; // <-- Make sure this exists

interface Category {
  name: string;
  description: string;
  image: string;
}

const EditCategory: React.FC = () => {
  const { catid } = useParams<{ catid: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Category>({
    name: "",
    description: "",
    image: ""
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!catid) return;
      try {
        const res = await axiosInstanceadmin.get(`/api/category/${catid}`);
        setFormData(res.data.category);
      } catch (error) {
        toast.error("Failed to load category data");
      }
    };

    fetchCategory();
  }, [catid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!catid) return;
    setLoading(true);
    try {
      let imageUrl = formData.image;

      if (imageFile) {
        const uploaded = await uploadImageToCloudinary(imageFile);
        if (!uploaded) {
          toast.error("Image upload failed");
          setLoading(false);
          return;
        }
        imageUrl = uploaded;
      }

      await axiosInstanceadmin.patch(`/api/editcategory/${catid}`, {
        name: formData.name.trim().toLowerCase(),
        description: formData.description.trim(),
        image: imageUrl
      });

      toast.success("Category updated successfully");
      navigate("/admin/admindashboard");
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Category</h2>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-2 mb-4 rounded"
        placeholder="Name"
      />

      <input
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 mb-4 rounded"
        placeholder="Description"
      />

      {formData.image && !imageFile && (
        <img src={formData.image} alt="Current" className="mb-4 w-full h-48 object-cover rounded" />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        className="w-full border p-2 mb-4 rounded"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default EditCategory;
