import React, { useEffect, useRef, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAuth from "../hooks/useAuth";
import { useLogoutMutation } from "../features/auth/authApiSlice";
import { logOut } from "../features/auth/authSlice";
import { SideBar } from "./SideBar";
import "./componentsStyle/header.css";
import { BsCart3 } from "react-icons/bs";
import { toast } from "react-toastify";
import Title from "./Title";
import { useCart } from "../hooks/useCart";
import Authentication from "./Authentication";

const Header = () => {
    const { name, role } = useAuth();
    const { cart } = useCart();

    const [sidebar, setSideBar] = useState(false);
    const [drop, setDrop] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    let menuRef = useRef();
    useEffect(() => {
        let handler = (event) => {
            if (!menuRef?.current?.contains(event.target)) {
                setDrop(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });
    return (
        <header className="main__header">
            <div
                className={sidebar ? "menu__bar shownav" : "menu__bar"}
                onClick={() => setSideBar(!sidebar)}
            >
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            {sidebar && <div style={{ width: "25px" }}></div>}
            <div className="logo_container">
                <Title mainTitle="Foodie" />
            </div>
            <nav className="navbar">
                <div
                    className={
                        sidebar ? "nav__wrapper shownav" : "nav__wrapper"
                    }
                >
                    {SideBar.map((item, i) => {
                        return (
                            <HashLink
                                to={item.path}
                                key={i}
                                scroll={(el) =>
                                    el.scrollIntoView({ behavior: "smooth" })
                                }
                            >
                                {item.title}
                            </HashLink>
                        );
                    })}
                </div>

                <div className="nav__btn">
                    {!name ? (
                        <div className="header_btn_wrapper">
                            <Authentication />
                        </div>
                    ) : (
                        <div className="online__btn">
                            <div
                                ref={menuRef}
                                className="userprofile__info"
                                onClick={() => setDrop(!drop)}
                            >
                                <p className="user__name">Hello, {name}</p>
                                <div
                                    className={`dropdown ${
                                        drop ? "active" : "inactive"
                                    }`}
                                >
                                    <button
                                        onClick={(e) => navigate("/profile")}
                                    >
                                        Profile
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => navigate("/userorder")}
                                    >
                                        order
                                    </button>
                                    {role === 101 && (
                                        <button
                                            onClick={() => navigate("/admin")}
                                        >
                                            Dashboard
                                        </button>
                                    )}
                                    <button
                                        className="logout__btn_mobile"
                                        type="button"
                                        onClick={logoutHandler}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                            <button
                                className="logout__btn"
                                type="button"
                                onClick={logoutHandler}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                    {(name || role) && (
                        <div
                            className="cart__wrapper"
                            onClick={() => navigate("cart")}
                        >
                            {cart.totalCount > 0 && (
                                <p className="cart__count">{cart.totalCount}</p>
                            )}
                            <button type="submit" className="cart">
                                <BsCart3 />
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
