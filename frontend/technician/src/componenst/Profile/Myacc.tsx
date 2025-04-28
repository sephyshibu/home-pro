import { useEffect, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import axiosInstanceuser from '../../axios';
import { useNavigate } from 'react-router';
import { uploadImageToCloudinary } from '../../lib/CloudinaryUpload';

interface Technician {
  // name?: string;
  email: string;
  phone: string;
  rateperhour: number;
  serviceablepincode: string[];
  noofworks: number;
  profileimageurl: string;
  consulationFee: number;
  workphotos: string[];
}
interface TechnicianErrors {
  email?: string;
  phone?: string;
  rateperhour?: string;
  serviceablepincode?: string;
  noofworks?: string;
  profileimageurl?: string;
  consulationFee?: string;
  workphotos?: string;
}

const MyProfilePage = () => {
  const [technician, setTechnician] = useState<Technician>({
    // name: '',
    email: '',
    phone: '',
    rateperhour: 0,
    serviceablepincode: [],
    noofworks: 0,
    profileimageurl: '',
    consulationFee: 0,
    workphotos: [],
  });

  

  const [editData, setEditData] = useState<Technician>({ ...technician });
  const [errors, setErrors] = useState<Partial<TechnicianErrors>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const techId = localStorage.getItem('techId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTechnician = async (techId: string | null) => {
      if (!techId) {
        navigate('/login');
        return;
      }
      try {
        const response = await axiosInstanceuser.get(`/fetchtechprofile/${techId}`);
        setTechnician(response.data.tech);
      } catch (error) {
        console.error('Failed to fetch technician:', error);
      }
    };
    fetchTechnician(techId);
  }, []);

  const openModal = () => {
    setEditData(technician);
    setIsOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: name === 'rateperhour' || name === 'consulationFee' ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const validateForm = () => {
    let formErrors: Partial<TechnicianErrors> = {};
    let isValid = true;

    // if (!editData.name?.trim()) {
    //   formErrors.name = 'Name is required';
    //   isValid = false;
    // }

    if (!editData.email.trim()) {
      formErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(editData.email)) {
      formErrors.email = 'Enter a valid email';
      isValid = false;
    }

    if (!editData.phone.trim()) {
      formErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(editData.phone)) {
      formErrors.phone = 'Phone number must be exactly 10 digits';
      isValid = false;
    }

    if (editData.rateperhour <= 0) {
      formErrors.rateperhour = 'Rate per hour must be greater than 0';
      isValid = false;
    }

    if (editData.consulationFee <= 0) {
      formErrors.consulationFee = 'Consultation fee must be greater than 0';
      isValid = false;
    }

    if (!editData.serviceablepincode.length) {
      formErrors.serviceablepincode = 'At least one serviceable pincode required';
      isValid = false;
    }

    if (!editData.profileimageurl && !imageFile) {
      formErrors.profileimageurl = 'Profile image is required';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      let imageurl = editData.profileimageurl;

      if (imageFile) {
        const uploadedUrl = await uploadImageToCloudinary(imageFile);
        if (!uploadedUrl) {
          console.error('Image upload failed');
          return;
        }
        imageurl = uploadedUrl;
      }

      const updatedData = { ...editData, profileimageurl: imageurl };

      const response = await axiosInstanceuser.put(`/updatetech/${techId}`, updatedData);
      setTechnician(updatedData);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to update technician:', error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6">My Profile</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={technician.name}
            readOnly
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div> */}

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={technician.email}
            readOnly
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="tel"
            value={technician.phone}
            readOnly
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Rate Per Hour</label>
          <input
            type="number"
            value={technician.rateperhour}
            readOnly
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Consultation Fee</label>
          <input
            type="number"
            value={technician.consulationFee}
            readOnly
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Profile Image</label>
          {technician.profileimageurl && (
            <img
              src={technician.profileimageurl}
              alt="Profile"
              className="w-24 h-24 object-cover rounded-full"
            />
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Serviceable Pincodes</label>
          <div className="border p-2 rounded">
            {technician.serviceablepincode.join(', ')}
          </div>
        </div>
      </div>

      <div className="mt-6 text-right">
        <button
          className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-lg"
          onClick={openModal}
        >
          Edit Profile
        </button>
      </div>

      {/* Modal for Edit */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <DialogTitle className="text-lg font-bold mb-4">Edit Profile</DialogTitle>

            <div className="space-y-4">
              {/* <input
                name="name"
                value={editData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>} */}

              <input
                name="email"
                value={editData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

              <input
                name="phone"
                value={editData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}

              <input
                name="rateperhour"
                type="number"
                value={editData.rateperhour.toString()}
                onChange={handleChange}
                placeholder="Rate per Hour"
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
              {errors.rateperhour && <p className="text-red-500 text-xs">{errors.rateperhour}</p>}

              <input
                name="consulationFee"
                type="number"
                value={editData.consulationFee.toString()}
                onChange={handleChange}
                placeholder="Consultation Fee"
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
              {errors.consulationFee && <p className="text-red-500 text-xs">{errors.consulationFee}</p>}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
              {errors.profileimageurl && <p className="text-red-500 text-xs">{errors.profileimageurl}</p>}
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default MyProfilePage;
