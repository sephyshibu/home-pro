import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Routes, Route } from 'react-router';
import LoginTech from '../../components/Technician/Login/login';
import Dashboard from '../../components/Technician/Dashboard/Dashboard';
import TechnicianLayout from '../../components/Technician/Layouts/TechLayout';
import '../../App.css';
import MyProfilePage from '../../components/Technician/Profile/Myacc';
import ChangePasswords from '../../components/Technician/Profile/Passswordchange';
import MyServicesPage from '../../components/Technician/Profile/Services';
import WalletPage from '../../components/Technician/Profile/Wallet';
import { Toaster } from 'react-hot-toast';
const TechRouter = () => {
    return (_jsxs(_Fragment, { children: [_jsx(Toaster, {}), _jsxs(Routes, { children: [_jsx(Route, { path: '/', element: _jsx(LoginTech, {}) }), _jsx(Route, { path: '/techdashboard', element: _jsx(Dashboard, {}) }), _jsxs(Route, { path: '/myprofile', element: _jsx(TechnicianLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(MyProfilePage, {}) }), _jsx(Route, { path: '/myprofile/password', element: _jsx(ChangePasswords, {}) }), _jsx(Route, { path: '/myprofile/services', element: _jsx(MyServicesPage, {}) }), _jsx(Route, { path: '/myprofile/wallet', element: _jsx(WalletPage, {}) })] })] })] }));
};
export default TechRouter;
