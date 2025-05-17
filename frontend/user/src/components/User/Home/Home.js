import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import FAQ from "./FAQ";
import Header from "./Header";
import CallAction from "./CallAction";
import Works from "./Works";
import Gaurentee from "./Gaurentee";
import Services from "./Services";
import Hero from "./Hero";
// import Footer from "./Footer";
import AboutSection from "./About";
const App = () => {
    return (_jsxs("div", { className: "font-sans", children: [_jsx(Header, {}), _jsx("section", { children: _jsx(Hero, {}) }), _jsxs("div", { className: "px-4 md:px-10 lg:px-20 py-8 space-y-16", children: [_jsx("section", { children: _jsx(AboutSection, {}) }), _jsx("section", { children: _jsx(Services, {}) }), _jsx("section", { children: _jsx(Gaurentee, {}) }), _jsx("section", { children: _jsx(Works, {}) }), _jsx("section", { children: _jsx(FAQ, {}) }), _jsx("section", { children: _jsx(CallAction, {}) })] })] }));
};
export default App;
