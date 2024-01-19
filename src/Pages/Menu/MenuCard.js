import React, { useState } from "react";
import { useCart } from "../../hooks/useCart";
import "./menustyle/menu.css";
import { formatCurrency } from "../../utils/currency";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

import { Image, DivBg } from "../../Components/ImageCom";

const MenuCard = (item) => {
    const { role } = useAuth();

    const { name, price, description, _id, sizes, ingredients } = item;

    const { addToCart } = useCart();

    const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
    const [selectedExtras, setSelectedExtras] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);

    const handleAddToCart = (food) => {
        if (!role) {
            toast.error("Please Signin/Login first", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (sizes.length === 0 && ingredients.length === 0) {
            addToCart(food);
        } else {
            setShowPopUp(true);
        }
    };
    const handlePopUpAddToCart = (food) => {
        addToCart(food, selectedSize, selectedExtras);
        setShowPopUp(false);
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

    let selectedPrice = price;

    if (selectedSize) {
        selectedPrice = selectedSize.price;
    }
    if (selectedExtras?.length > 0) {
        for (const extra of selectedExtras) {
            selectedPrice += extra.price;
        }
    }

    function truncate(str, num) {
        if (str.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    }

    return (
        <>
            {showPopUp && (
                <div
                    className="popup__container"
                    onClick={() => setShowPopUp(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="popup__holder"
                    >
                        <div
                            className="popup__wrapper"
                            style={{ maxHeight: "calc(100vh - 100px)" }}
                        >
                            <Image id={_id} imageName={name} />

                            <h2 className="popup__title">{name}</h2>
                            <p className="popup__description">{description}</p>
                            {sizes?.length > 0 && (
                                <div>
                                    <h3>Pick a Size</h3>
                                    {sizes.map((size) => (
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
                            )}
                            {ingredients?.length > 0 && (
                                <div>
                                    <h3>Any extras?</h3>
                                    {ingredients.map((extra) => (
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
                            )}
                            <button
                                type="button"
                                className="popup_addtocart_btn"
                                onClick={() => handlePopUpAddToCart(item)}
                            >
                                Add to Cart {formatCurrency(selectedPrice)}
                            </button>
                            <button
                                className="cancel__btn"
                                onClick={() => setShowPopUp(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="menu__card">
                <div className="image__holder">
                    <DivBg id={_id} imageName={name} />
                </div>
                <div className="product-info">
                    <h2>{name}</h2>
                    <p>{truncate(description, 90)}</p>
                </div>
                <button
                    className="addtocart"
                    type="button"
                    onClick={() => handleAddToCart(item)}
                >
                    Add to Cart <span>({formatCurrency(price)})</span>
                </button>
            </div>
        </>
    );
};

export default MenuCard;
