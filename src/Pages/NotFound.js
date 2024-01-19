import React from "react";
import "../Styles/notfound.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <main className="notfound__container">
            <section className="notfound__wrapper">
                <h1>404</h1>
                <h2>OOPS page Not Found</h2>
                <p>
                    The page you are looking for might have been removed, had
                    its name changed or is temporary unavailable
                </p>
                <button type="button" onClick={() => navigate("/")}>
                    Go back Home
                </button>
            </section>
        </main>
    );
};

export default NotFound;
