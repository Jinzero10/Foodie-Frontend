import React from "react";
import "./componentsStyle/hero.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();
    return (
        <section className="hero">
            {/* <div className="hero__image">
                <img src={pizza} alt="pizza" />
            </div> */}

            <div className="hero__text">
                <div>
                    <h1>Foodie</h1>
                </div>
                <div>
                    <p>Foods that worth dying for</p>
                    <p>
                        diabetes and cholesterol <span>For Free!</span>
                    </p>
                </div>
                <button
                    className="order__btn"
                    onClick={() => navigate("/menu")}
                >
                    Order Now
                </button>
            </div>
        </section>
    );
};

export default Hero;
