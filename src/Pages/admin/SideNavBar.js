import React, { useState } from "react";
import "../../Styles/adminCss/sidenav.css";
import { Link, useNavigate } from "react-router-dom";
import {
    BiSolidDashboard,
    BiSolidCartAdd,
    BiSolidCategory,
    BiSolidRightArrow,
    BiSolidLeftArrow,
} from "react-icons/bi";
import { CiLogin } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import { AiFillFolderAdd } from "react-icons/ai";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import { logOut } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const SideNavBar = () => {
    const { name } = useAuth();
    const navigate = useNavigate();
    const [arrow, setArrow] = useState(false);
    const dispatch = useDispatch();

    const [logout] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logout().unwrap();
            dispatch(logOut());
            navigate("/");
            toast.success("Logout", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (err) {
            toast.error(err);
            console.log("error in logout");
        }
    };
    const SideData = [
        {
            title: "Dashboard",
            icon: <BiSolidDashboard />,
            path: "/admin",
            cName: "side__link",
        },
        {
            title: "Products",
            icon: <AiFillFolderAdd />,
            path: "product",
            cName: "side__link",
        },
        {
            title: "Orders",
            icon: <BiSolidCartAdd />,
            path: "orders",
            cName: "side__link",
        },
        {
            title: "Users",
            icon: <FaUser />,
            path: "userlist",
            cName: "side__link",
        },
        {
            title: "Category",
            icon: <BiSolidCategory />,
            path: "category",
            cName: "side__link",
        },
    ];

    return (
        <aside
            className={
                arrow ? "sidebar__container close" : "sidebar__container"
            }
        >
            <div className="sidebar__logo">
                <span>F</span>
                <h1>Foodie</h1>
            </div>
            <div className="arrow" onClick={() => setArrow(!arrow)}>
                <h2>{arrow ? <BiSolidLeftArrow /> : <BiSolidRightArrow />}</h2>
            </div>
            <ul className="sidebar__wrapper">
                {SideData.map((item, id) => {
                    return (
                        <li
                            key={id}
                            className={item.cName}
                            onClick={() => navigate(item.path)}
                        >
                            <span>{item.icon}</span>
                            <Link to={item.path}>{item.title}</Link>
                        </li>
                    );
                })}
            </ul>
            <div className="sidebar__footer">
                <p>
                    <span>
                        <CgProfile />
                    </span>
                    {name}
                </p>
                <button type="button" onClick={logoutHandler}>
                    <span>
                        <CiLogin />
                    </span>
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default SideNavBar;
