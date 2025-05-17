import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Routes, Route } from 'react-router';
import '../../App.css';
import Dashboard from '../../components/Admin/DashBoard/Dashboard';
import Login from '../../components/Admin/Login/Login';
import EditCategory from '../../components/Admin/DashBoard/Editcategory';
import { Toaster } from 'react-hot-toast';
const AdminRouter = () => {
    return (_jsxs(_Fragment, { children: [_jsx(Toaster, {}), _jsxs(Routes, { children: [_jsx(Route, { path: '/', element: _jsx(Login, {}) }), _jsx(Route, { path: '/admindashboard', element: _jsx(Dashboard, {}) }), _jsx(Route, { path: '/editcategory/:catid', element: _jsx(EditCategory, {}) })] })] }));
};
export default AdminRouter;
