import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import './App.css';
import "leaflet/dist/leaflet.css";
import 'leaflet-geosearch/dist/geosearch.css';
import UserRouter from '../src/Routes/UserRouter/userRouter';
import AdminRouter from '../src/Routes/AdminRouter/adminRouter';
import TechRouter from '../src/Routes/TechRouter/techRouter';
import { Toaster } from 'react-hot-toast';
function App() {
    return (_jsxs(_Fragment, { children: [_jsx(Toaster, {}), _jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: '/*', element: _jsx(UserRouter, {}) }), _jsx(Route, { path: '/admin/*', element: _jsx(AdminRouter, {}) }), _jsx(Route, { path: '/tech/*', element: _jsx(TechRouter, {}) })] }) })] }));
}
export default App;
