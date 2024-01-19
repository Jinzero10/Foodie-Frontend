import React, { useEffect, useState } from "react";
import "./homeStyle/home.css";
import Hero from "../../Components/Hero";
import Title from "../../Components/Title";
import { useProductQuery } from "../../features/product/productApiSlice";
import MenuCard from "../Menu/MenuCard";
import Contact from "../../Components/Contact";

const Home = () => {
    const [menus, setMenus] = useState([]);
    const { data: getMenus, isSuccess } = useProductQuery();

    useEffect(() => {
        if (isSuccess) {
            setMenus(getMenus);
        }
        // eslint-disable-next-line
    }, [getMenus, isSuccess]);
    return (
        <main className="home__container">
            <Hero />
            <section className="home__section">
                <Title subTitle="Check out" mainTitle="Popular Menu" />
                <div className="menus_popular_wrapper">
                    {menus
                        .filter(
                            (item, index) => item.popular === true && index < 8
                        )
                        .map((item) => (
                            <div key={item._id}>
                                <MenuCard {...item} />
                            </div>
                        ))}
                </div>
            </section>
            <section className="about" id="about">
                <Title subTitle="our story" mainTitle="About us" />
                <div className="about_text_holder">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptas exercitationem maxime earum quia nulla velit
                        pariatur a animi vel est explicabo, qui aut minima,
                        repellat nostrum, nesciunt illo quaerat asperiores.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptas exercitationem maxime earum quia nulla velit
                        pariatur a animi vel est explicabo, qui aut minima,
                        repellat nostrum, nesciunt illo quaerat asperiores.
                    </p>
                </div>
            </section>
            <Contact />
        </main>
    );
};

export default Home;
