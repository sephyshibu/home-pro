import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { fetchTechById } from "../../../api/UserApi/fetchtechbyid";
import { fetchaddress } from "../../../api/UserApi/Address/fetchaddress";
import { addaddress } from "../../../api/UserApi/Address/addaddress";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { toast } from "react-hot-toast";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import GeoSearch from './GeoSearch';
import "leaflet-control-geocoder";
import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import axiosInstanceuser from "../../../Axios/UserAxios/axios";
import { persistor } from '../../../app/store';
const PaymentPage = () => {
    const [selectedMethod, setSelectedMethod] = useState("RazorPay");
    const [addresses, setAddresses] = useState([]);
    const [errors, setErrors] = useState({});
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const [technician, settechnician] = useState({
        _id: '',
        name: '',
        email: '',
        phone: '',
        rateperhour: 0,
        serviceablepincode: [],
        noofworks: 0,
        profileimgurl: '',
        consulationFee: 0,
        categoryid: {
            _id: "",
            name: "",
            description: ""
        }
    });
    const [form, setForm] = useState({
        types: "",
        addressname: "",
        street: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
    });
    const { techid, bookingdetails } = location.state || {};
    console.log("booking details", bookingdetails);
    if (!techid || !bookingdetails) {
        return _jsx("div", { className: "text-center py-20", children: "Missing details" });
    }
    useEffect(() => {
        const fetchtech = async () => {
            try {
                const response = await fetchTechById(techid);
                settechnician(response);
            }
            catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchtech();
    }, []);
    useEffect(() => {
        const getAddresses = async () => {
            if (!userId)
                return;
            try {
                const res = await fetchaddress(userId);
                setAddresses(res);
            }
            catch (error) {
                console.error("Error fetching addresses", error);
            }
        };
        getAddresses();
    }, []);
    const handleLoginLogout = async () => {
        if (userId) {
            localStorage.removeItem('userId');
            await persistor.purge();
            navigate('/');
        }
        else {
            navigate('/login');
        }
    };
    const validateForm = () => {
        const newErrors = {};
        const onlyNumbers = /^\d+$/;
        const onlySpecialChars = /^[^\w\s]+$/;
        const validateField = (key, label) => {
            const value = form[key].trim();
            if (!value) {
                newErrors[key] = `${label} is required`;
            }
            else if (onlyNumbers.test(value)) {
                newErrors[key] = `${label} cannot be only numbers`;
            }
            else if (onlySpecialChars.test(value)) {
                newErrors[key] = `${label} cannot be only special characters`;
            }
        };
        if (!form.types)
            newErrors.types = "Type is required";
        validateField("addressname", "Address name");
        validateField("street", "Street");
        validateField("city", "City");
        validateField("state", "State");
        validateField("country", "Country");
        if (!form.pincode.trim()) {
            newErrors.pincode = "PIN code is required";
        }
        else if (!/^\d{6}$/.test(form.pincode)) {
            newErrors.pincode = "PIN code must be exactly 6 digits";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleAddAddress = async () => {
        if (!userId)
            return;
        if (!validateForm())
            return;
        try {
            const res = await addaddress(userId, form);
            toast.success("Address added successfully");
            setIsModalOpen(false);
            setForm({
                types: "",
                addressname: "",
                street: "",
                city: "",
                state: "",
                country: "",
                pincode: "",
            });
            // Re-fetch addresses
            const updated = await fetchaddress(userId);
            setAddresses(updated);
        }
        catch (error) {
            toast.error("Error adding address");
            console.error(error);
        }
    };
    const LocationSelector = ({ setLocation }) => {
        useMapEvents({
            click(e) {
                setLocation(e.latlng);
            },
        });
        return null;
    };
    const handlePayment = async () => {
        if (!selectedLocation || !selectedMethod || !selectedAddressId) {
            toast.error("Please select all required fields");
            return;
        }
        if (selectedMethod === "RazorPay") {
            try {
                const res = await axiosInstanceuser.post(`/create-order/${userId}`, {
                    amount: technician.consulationFee
                });
                const options = {
                    key: "rzp_test_qp0MD1b9oAJB0i",
                    amount: res.data.amount,
                    currency: "INR",
                    name: "HomePro",
                    order_id: res.data.id,
                    handler: async (response) => {
                        await axiosInstanceuser.post("/confirm-payment", {
                            userId,
                            techid,
                            addressId: selectedAddressId,
                            location: selectedLocation,
                            date: bookingdetails.date,
                            amount: technician.consulationFee,
                            razorpay_payment_id: response.razorpay_payment_id,
                        });
                        toast.success("Payment successful!");
                        navigate('/thankyou');
                    },
                    prefill: {
                        name: "admin HonePro",
                        email: "admin@example.com",
                        contact: "9999999999",
                    },
                    modal: {
                        ondismiss: function () {
                            toast("Payment window closed.");
                            // Optional: redirect or just stay on the page
                            navigate('/myaccount/services'); // Or show retry options
                        }
                    }
                };
                const rzp = new window.Razorpay(options);
                rzp.open();
                // Add payment failed handler
                rzp.on("payment.failed", async (response) => {
                    await axiosInstanceuser.post("/payment-failed", {
                        userId,
                        techid,
                        addressId: selectedAddressId,
                        location: selectedLocation,
                        date: bookingdetails.date,
                        rateperhour: technician.rateperhour, // ✅ add this line
                        amount: technician.consulationFee,
                        error: response.error,
                    });
                    toast.error("Payment failed. Please try again.");
                    // ✅ Wrap in setTimeout to ensure reliable navigation
                    setTimeout(() => {
                        navigate('/myaccount/services');
                    }, 0);
                });
            }
            catch (error) {
                toast.error("Error initiating payment");
                console.error(error);
            }
        }
        else {
            if (selectedMethod == "Wallet") {
                try {
                    if (!userId)
                        return;
                    const res = await axiosInstanceuser.post("/walletpayment", {
                        userId,
                        techid,
                        addressId: selectedAddressId,
                        location: selectedLocation,
                        date: bookingdetails.date,
                        rateperhour: technician.rateperhour,
                        amount: technician.consulationFee
                    });
                    toast.success(res.data.message);
                    navigate('/myaccount/services');
                }
                catch (error) {
                    toast.error(error.response.data.message);
                    console.error(error);
                }
            }
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-100", children: [_jsxs("div", { className: "bg-white shadow-md p-4 flex justify-between items-center", children: [_jsx(NavLink, { to: "/", className: "text-lg font-semibold text-sky-600 hover:underline", children: "\uD83C\uDFE0 Home" }), _jsx("button", { onClick: handleLoginLogout, className: "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium", children: "Logout" })] }), _jsxs("div", { className: "p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-white p-6 rounded shadow col-span-1", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Payment" }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "font-medium block", children: "Pay With:" }), _jsx("div", { className: "flex gap-4", children: ["RazorPay", "Wallet"].map((method) => (_jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "radio", name: "payment", value: method, checked: selectedMethod === method, onChange: () => setSelectedMethod(method) }), method] }, method))) }), _jsx("button", { className: "bg-green-600 hover:bg-green-700 text-white py-2 w-full rounded", children: "Payment" })] })] }), _jsxs("div", { className: "bg-white p-6 rounded shadow col-span-1 space-y-4", children: [_jsx("h2", { className: "text-xl font-bold", children: "Order Details" }), _jsxs("div", { className: "space-y-1", children: [_jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Name:" }), technician.name] }), _jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Phone Number:" }), technician.phone] }), _jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Consultation Fee:" }), " \u20B9 ", technician.consulationFee] }), _jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Rate per Hour:" }), " \u20B9 ", technician.rateperhour, " / hr"] })] }), _jsxs("div", { className: "space-y-1", children: [_jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Total Payment Amount:" }), " \u20B9 ", technician.consulationFee] }), _jsxs("p", { children: [_jsx("span", { className: "font-medium", children: "Scheduled Date:" }), bookingdetails.date] })] }), _jsx("button", { className: "bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded", onClick: handlePayment, children: "Proceed to Payment" })] }), _jsxs("div", { className: "bg-white p-6 rounded shadow col-span-1 space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h2", { className: "text-xl font-bold", children: "Select Address" }), _jsx("button", { onClick: () => setIsModalOpen(true), className: "text-blue-600 underline", children: "+ Add New" })] }), addresses.length > 0 ? (addresses.map((addr) => (_jsxs("div", { className: `border rounded p-3 cursor-pointer ${selectedAddressId === addr._id ? "bg-blue-100 border-blue-600" : "bg-gray-100"}`, onClick: () => setSelectedAddressId(addr._id), children: [_jsxs("p", { className: "font-semibold", children: [addr.types, " - ", addr.addressname] }), _jsxs("p", { children: [addr.street, ", ", addr.city, ", ", addr.state, ", ", addr.country, " - ", addr.pincode] })] }, addr._id)))) : (_jsx("p", { className: "text-sm text-gray-500", children: "No addresses found." }))] })] }), _jsxs("div", { className: "h-64 mt-4", children: [_jsxs(MapContainer, { center: [10.8505, 76.2711], zoom: 13, className: "h-full w-full rounded", children: [_jsx(TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }), _jsx(GeoSearch, {}), _jsx(LocationSelector, { setLocation: setSelectedLocation }), selectedLocation && _jsx(Marker, { position: selectedLocation })] }), selectedLocation && (_jsxs("p", { className: "text-sm mt-2", children: ["Selected Location: ", selectedLocation.lat.toFixed(5), ", ", selectedLocation.lng.toFixed(5)] }))] }), _jsxs(Dialog, { open: isModalOpen, onClose: () => setIsModalOpen(false), className: "relative z-[999]", children: [_jsx("div", { className: "fixed inset-0 bg-black/30 z-[999]", "aria-hidden": "true" }), _jsx("div", { className: "fixed inset-0 z-[999] flex items-center justify-center p-4 overflow-y-auto", children: _jsxs(DialogPanel, { className: "w-full max-w-md rounded-2xl bg-white p-6 shadow-xl  z-[1001]", children: [_jsx(DialogTitle, { className: "text-lg font-bold mb-4", children: "Add New Address" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("select", { name: "types", value: form.types, onChange: handleChange, className: "w-full border px-3 py-2 rounded", children: [_jsx("option", { value: "", children: "Select Type" }), _jsx("option", { value: "Home", children: "Home" }), _jsx("option", { value: "Work", children: "Work" })] }), errors.types && _jsx("p", { className: "text-red-500 text-sm", children: errors.types }), _jsx("input", { name: "addressname", value: form.addressname, onChange: handleChange, placeholder: "Address name", className: "w-full border px-3 py-2 rounded" }), errors.addressname && _jsx("p", { className: "text-red-500 text-sm", children: errors.addressname }), _jsx("input", { name: "street", value: form.street, onChange: handleChange, placeholder: "Street", className: "w-full border px-3 py-2 rounded" }), errors.street && _jsx("p", { className: "text-red-500 text-sm", children: errors.street }), _jsx("input", { name: "city", value: form.city, onChange: handleChange, placeholder: "City", className: "w-full border px-3 py-2 rounded" }), errors.city && _jsx("p", { className: "text-red-500 text-sm", children: errors.city }), _jsx("input", { name: "state", value: form.state, onChange: handleChange, placeholder: "State", className: "w-full border px-3 py-2 rounded" }), errors.state && _jsx("p", { className: "text-red-500 text-sm", children: errors.state }), _jsx("input", { name: "country", value: form.country, onChange: handleChange, placeholder: "Country", className: "w-full border px-3 py-2 rounded" }), errors.country && _jsx("p", { className: "text-red-500 text-sm", children: errors.country }), _jsx("input", { name: "pincode", value: form.pincode, onChange: handleChange, placeholder: "PIN Code", className: "w-full border px-3 py-2 rounded" }), errors.pincode && _jsx("p", { className: "text-red-500 text-sm", children: errors.pincode }), _jsx("button", { onClick: handleAddAddress, className: "w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded", children: "Save Address" })] })] }) })] }), _jsxs("footer", { className: "bg-blue-900 text-white mt-10 p-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center", children: [_jsx("div", { className: "text-xl font-bold", children: "HomePro" }), _jsxs("div", { className: "flex gap-4 text-sm mt-2 md:mt-0", children: [_jsx("a", { href: "#", className: "hover:underline", children: "About Us" }), _jsx("a", { href: "#", className: "hover:underline", children: "Privacy Policy" }), _jsx("a", { href: "#", className: "hover:underline", children: "Terms of Service" })] })] }), _jsx("p", { className: "text-center text-xs mt-4", children: "\u00A9 2025 HomePro" })] })] }));
};
export default PaymentPage;
