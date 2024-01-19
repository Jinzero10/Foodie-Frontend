import React from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    const { pathname } = useLocation();

    return (
        <>
            {pathname.includes("/admin") ? null : <Header />}
            {/*removes header in admin page*/}
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;
