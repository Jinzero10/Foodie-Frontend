import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./menustyle/menu.css";

import { useProductQuery } from "../../features/product/productApiSlice";

//react icon
import { FaArrowLeft } from "react-icons/fa";
import { DivBg } from "../../Components/ImageCom";
import { useCart } from "../../hooks/useCart";
import { formatCurrency } from "../../utils/currency";

const ViewMenu = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { data: getMenus, isSuccess } = useProductQuery();
    const [menus, setMenus] = useState([]);

    const { addToCart } = useCart();

    const [selectedSize, setSelectedSize] = useState(menus?.sizes?.[1] || null);
    const [selectedExtras, setSelectedExtras] = useState([]);

    useEffect(() => {
        if (isSuccess) {
            const filteredData = getMenus.filter((item) => item._id === state);
            setMenus(...filteredData);
        }
        // eslint-disable-next-line
    }, [getMenus, isSuccess]);

    const handlePopUpAddToCart = (food) => {
        addToCart(food, selectedSize, selectedExtras);
    };

    const handleIngredients = (e, extra) => {
        const checked = e.target.checked;
        if (checked) {
            setSelectedExtras((prev) => [...prev, extra]);
        } else {
            setSelectedExtras((prev) => {
                return prev.filter((e) => e.name !== extra.name);
            });
        }
    };

    let selectedPrice = menus.price;

    if (selectedSize) {
        selectedPrice = selectedSize.price;
    }
    if (selectedExtras?.length > 0) {
        for (const extra of selectedExtras) {
            selectedPrice += extra.price;
        }
    }

    return (
        <main className="viewmenu__container">
            <section className="viewmenu__card">
                <nav>
                    <div
                        className="viewmenu__back"
                        onClick={() => navigate(-1)}
                    >
                        <FaArrowLeft />
                        <span>Go Back</span>
                    </div>
                </nav>
                <div className="viewmenu__content">
                    <DivBg
                        id={state}
                        imageName={menus.name}
                        addClassName={"viewmenu__image"}
                    />
                    <div className="viewmenu__details">
                        <h2 className="popup__title">{menus.name}</h2>
                        <p className="popup__description">
                            {menus.description}
                        </p>
                        {menus?.sizes?.length > 0 && (
                            <div>
                                <h3>Pick a Size</h3>
                                <div className="viewmenu__extra">
                                    {menus?.sizes.map((size) => (
                                        <label
                                            key={size._id}
                                            className="extra__label"
                                        >
                                            <input
                                                type="radio"
                                                onChange={() =>
                                                    setSelectedSize(size)
                                                }
                                                checked={
                                                    selectedSize?.name ===
                                                    size.name
                                                }
                                                name="size"
                                            />
                                            {size.name}
                                            <span>
                                                {formatCurrency(size.price)}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                        {menus?.ingredients?.length > 0 && (
                            <div>
                                <h3>Any extras?</h3>
                                <div className="viewmenu__extra">
                                    {menus?.ingredients.map((extra) => (
                                        <label
                                            key={extra._id}
                                            className="extra__label"
                                        >
                                            <input
                                                type="checkbox"
                                                onChange={(e) =>
                                                    handleIngredients(e, extra)
                                                }
                                                checked={selectedExtras
                                                    .map((e) => e._id)
                                                    .includes(extra._id)}
                                                name={extra.name}
                                            />
                                            {extra.name}
                                            <span>
                                                {formatCurrency(extra.price)}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                        <button
                            type="button"
                            className="popup_addtocart_btn"
                            onClick={() => handlePopUpAddToCart(menus)}
                        >
                            Add to Cart {formatCurrency(selectedPrice)}
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ViewMenu;
