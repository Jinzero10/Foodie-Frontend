import React, { useEffect, useState } from "react";
import "./cart.css";
import { FaMinus, FaPlus, FaArrowLeft, FaRegTrashAlt } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import Title from "../../Components/Title";
import Address from "../../Components/Address";
import useProfile from "../../hooks/useProfile";
import { formatCurrency } from "../../utils/currency";
import { useNavigate } from "react-router-dom";
import { useAddOrderMutation } from "../orders/orderApiSlice";
import { toast } from "react-toastify";
import { DivBg } from "../../Components/ImageCom";

const Cart = () => {
    const { id } = useAuth();
    const { name, userAddress, userZipcode, userPhoneNumber } = useProfile();
    const navigate = useNavigate();

    const {
        cart,
        removeFromCart,
        changeQuantity,
        incrementQuantity,
        decrementQuantity,
        cartMenuPrice,
        clearCart,
    } = useCart();

    const [addOrder] = useAddOrderMutation();
    const [address, setAddress] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [deliver, setDeliver] = useState("pick up");
    const [total, setTotal] = useState(cart.totalPrice || "");

    const handleChange = (item, e) => {
        const value = e.target.value;

        if (!value || value === "0") {
            removeFromCart(item.food._id);
        } else {
            changeQuantity(item, value);
        }
    };
    const handleDecrement = (item, itemQuantity) => {
        if (itemQuantity === 1) {
            removeFromCart(item.food._id);
        } else {
            decrementQuantity(item, itemQuantity, Number(1));
        }
    };

    function handleAddressChange(propName, value) {
        if (propName === "address") setAddress(value);
        if (propName === "zipcode") setZipcode(value);
    }
    useEffect(() => {
        if (userAddress || userZipcode || userPhoneNumber) {
            setAddress(userAddress);
            setZipcode(userZipcode);
            setPhoneNumber(userPhoneNumber);
        }
    }, [userAddress, userZipcode, userPhoneNumber]);
    useEffect(() => {
        if (total && deliver === "cash on delivery") {
            const result = total + 50;
            setTotal(result);
        } else {
            setTotal(cart.totalPrice);
        }
        // eslint-disable-next-line
    }, [deliver, cart.totalPrice]);

    const payOrders = async (e) => {
        e.preventDefault();

        try {
            await addOrder({
                name,
                phoneNumber: phoneNumber,
                address: address,
                zipcode: zipcode,
                items: cart.items,
                totalPrice: total,
                totalQuantity: cart.totalCount,
                delivery: deliver,
                user: id,
            }).unwrap();
            clearCart();
            navigate("/userorder");
            toast.success("Foods have been Ordered.", {
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
            toast.error(err.data.message);
        }
    };

    return (
        <main className="cart_container">
            <section className="cart_title">
                <Title mainTitle="Cart" />
            </section>
            <section className="item_container">
                <div className="cartItem">
                    <nav className="cart__nav">
                        <div
                            className="cart_to_menu"
                            onClick={() => navigate("/menu")}
                        >
                            <FaArrowLeft />
                            <span>Back to Menu</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => navigate("/userorder")}
                        >
                            order
                        </button>
                    </nav>
                    <div className="cart_item_wrapper">
                        {cart.items.length === 0 ? (
                            <h4>Cart Is Empty!</h4>
                        ) : (
                            <>
                                {cart.items.map((item) => {
                                    return (
                                        <div
                                            className="cart_item_details"
                                            key={item.food._id}
                                        >
                                            <DivBg
                                                id={item.food._id}
                                                imageName={item.food.name}
                                                addClassName={"cart_image"}
                                            />

                                            <div className="cart__subtitle">
                                                <h3>{item.food.name}</h3>
                                                {item.size && (
                                                    <div className="cart__extra">
                                                        <p>
                                                            <span className="extra__name">
                                                                {item.size.name}
                                                            </span>
                                                            <span>
                                                                {formatCurrency(
                                                                    item.size
                                                                        .price
                                                                )}
                                                            </span>
                                                        </p>
                                                    </div>
                                                )}
                                                {item.extras.length > 0 && (
                                                    <div>
                                                        <h6>Extras:</h6>
                                                        <div className="cart__extra">
                                                            {item.extras.map(
                                                                (ext) => {
                                                                    return (
                                                                        <p
                                                                            key={
                                                                                ext._id
                                                                            }
                                                                        >
                                                                            <span>
                                                                                {
                                                                                    ext.name
                                                                                }
                                                                            </span>
                                                                            <span>
                                                                                {formatCurrency(
                                                                                    ext.price
                                                                                )}
                                                                            </span>
                                                                        </p>
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="cart__quantity">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDecrement(
                                                            item,
                                                            item.quantity
                                                        )
                                                    }
                                                >
                                                    <FaMinus
                                                        color="white"
                                                        size={18}
                                                    />
                                                </button>
                                                <input
                                                    name="quantity"
                                                    value={item.quantity}
                                                    type="number"
                                                    onChange={(e) =>
                                                        handleChange(item, e)
                                                    }
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        incrementQuantity(
                                                            item,
                                                            item.quantity,

                                                            1
                                                        )
                                                    }
                                                >
                                                    <FaPlus
                                                        color="white"
                                                        size={18}
                                                    />
                                                </button>
                                            </div>
                                            <div className="menu__price">
                                                <p>
                                                    {formatCurrency(
                                                        cartMenuPrice(item)
                                                    )}
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeFromCart(
                                                        item.food._id
                                                    )
                                                }
                                            >
                                                <FaRegTrashAlt size={23} />
                                            </button>
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </div>
                    <div className="subtotal">
                        <p>{`Total: ${formatCurrency(cart.totalPrice)}`}</p>
                    </div>
                </div>
                <div className="checkOut">
                    <div>
                        <label>Phone number</label>
                        <input
                            type="number"
                            value={phoneNumber}
                            placeholder="phone number"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <Address
                        addressProps={{ address, zipcode }}
                        setAddressProps={handleAddressChange}
                    />
                    <div className="checkout__info">
                        <p>{`Items: ${cart.totalCount}`}</p>
                        <div className="deliver__wrapper">
                            <label htmlFor="delivery">Delivery</label>
                            <select
                                name="delivery"
                                onChange={(e) => setDeliver(e.target.value)}
                                value={deliver}
                            >
                                <option value="pickup">Pick Up</option>
                                <option value="cash on delivery">
                                    Cash on Delivery (₱50)
                                </option>
                            </select>
                        </div>
                    </div>
                    {/* put loading in payment */}
                    <button type="button" onClick={payOrders}>
                        Pay ({formatCurrency(total)})
                    </button>
                </div>
            </section>
        </main>
    );
};
export default Cart;
