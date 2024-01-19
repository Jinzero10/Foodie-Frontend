import React, { useEffect, useRef, useState } from "react";
import "./menustyle/menu.css";
import { useProductQuery } from "../../features/product/productApiSlice";
import { IoSearch } from "react-icons/io5";
import { useCategoriesQuery } from "../../features/category/categoryApiSlice";
import MenuCard from "./MenuCard";
import Title from "../../Components/Title";
import { HashLink } from "react-router-hash-link";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Menu = () => {
    const [categories, setCategories] = useState([]);
    const [menus, setMenus] = useState([]);
    const [dropCategory, setDropCategory] = useState(false);
    const [search, setSearch] = useState("");

    const { data: getMenus, isSuccess } = useProductQuery();

    const searchResult = getMenus?.filter((item) =>
        item.name.toLowerCase().includes(search.toLocaleLowerCase())
    );
    useEffect(() => {
        if (search) {
            setMenus(searchResult);
        } else {
            setMenus(getMenus);
        }
        // eslint-disable-next-line
    }, [search]);
    useEffect(() => {
        if (isSuccess) {
            setMenus(getMenus);
        }
        // eslint-disable-next-line
    }, [getMenus, isSuccess]);

    // get all category
    const { data: categoryList, isSuccess: isFetched } = useCategoriesQuery();

    useEffect(() => {
        if (isFetched) {
            setCategories(categoryList);
        }
        // eslint-disable-next-line
    }, [isFetched]);

    let categoryRef = useRef();

    useEffect(() => {
        let handler = (event) => {
            if (!categoryRef?.current?.contains(event.target)) {
                setDropCategory(false);
            }
        };
        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });
    return (
        <main className="menu__container">
            <section className="menu_title">
                <Title mainTitle="Our Menu" />
            </section>
            <section className="menu__category__wrapper">
                <div
                    ref={categoryRef}
                    className={`dropdown__category ${
                        dropCategory ? "active" : "inactive"
                    }`}
                    onClick={() => setDropCategory(!dropCategory)}
                >
                    <ul className="category_list_wrapper">
                        <li className="category__label">
                            Category
                            {dropCategory ? (
                                <IoIosArrowUp size={22} />
                            ) : (
                                <IoIosArrowDown size={22} />
                            )}
                        </li>
                        {categories.map((c, i) => (
                            <li key={i} className="list">
                                <HashLink
                                    to={`#${c.name}`}
                                    scroll={(el) =>
                                        el.scrollIntoView({
                                            behavior: "smooth",
                                        })
                                    }
                                >
                                    {c.name}
                                </HashLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="searchbar">
                    <input
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <span>
                        <IoSearch size={30} />
                    </span>
                </div>
            </section>
            <section className="menus">
                {search ? (
                    <>
                        {searchResult.length > 0 ? (
                            <div className="menucard__wrapper">
                                {menus.map((item) => (
                                    <div key={item._id}>
                                        {isSuccess && <MenuCard {...item} />}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no__menu">
                                <p>No menu found</p>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {categories?.length > 0 &&
                            categories.map((c) => (
                                <div key={c._id} id={c.name}>
                                    <div className="menu_items_title">
                                        <Title mainTitle={c.name} />
                                    </div>
                                    <div className="menucard__wrapper">
                                        {menus
                                            ?.filter(
                                                (item) =>
                                                    item.category._id === c._id
                                            )
                                            .map((item) => (
                                                <div key={item._id}>
                                                    {isSuccess && (
                                                        <MenuCard {...item} />
                                                    )}
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                    </>
                )}
            </section>
        </main>
    );
};

export default Menu;
