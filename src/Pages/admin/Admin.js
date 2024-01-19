import React from "react";
import "../../Styles/adminCss/admin.css";
import { Outlet, useNavigate } from "react-router-dom";
import SideNavBar from "./SideNavBar";

const Admin = () => {
    const navigate = useNavigate();
    return (
        <main className="admin__main">
            <nav className="go_to_menu">
                <button onClick={() => navigate("/menu")}>Go to Store</button>
            </nav>
            <SideNavBar />
            <Outlet />
        </main>
    );
};

export default Admin;
/*<SideNavBar /> <Outlet />*/
