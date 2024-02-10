import React from "react";
import "./componentsStyle/vieworder.css";
// import { useLocation } from "react-router-dom";
// import DateTime from "./DateTime";
import { formatCurrency } from "../utils/currency";
import { DivBg } from "./ImageCom";

export function cartMenuPrice(cartMenu) {
    let price = cartMenu.price;

    if (cartMenu.size) {
        price = cartMenu.size.price;
    }
    if (cartMenu.extras?.length > 0) {
        for (const extra of cartMenu.extras) {
            price += extra.price;
        }
    }
    return price * cartMenu.quantity;
}
const ViewOrder = ({ viewOrderProps }) => {
    const { setShowViewOrders, vieworder } = viewOrderProps;

    return (
        <div
            className="vieworder__container"
            onClick={() => setShowViewOrders(false)}
        >
            <div
                className="vieworder__wrapper"
                onClick={(e) => e.stopPropagation()}
            >
                {vieworder?.map((order) => {
                    return (
                        <div key={order._id} className="vieworder__card">
                            <DivBg
                                id={order.food._id}
                                addClassName={"vieworder__image"}
                                imageName={order.food.name}
                            />

                            <div className="vieworder__subtitle">
                                <h3>{order.food.name}</h3>
                                {order.size && (
                                    <div className="vieworder__extra">
                                        <p>
                                            <span className="extra__name">
                                                {order.size.name}
                                            </span>
                                            <span>
                                                {formatCurrency(
                                                    order.size.price
                                                )}
                                            </span>
                                        </p>
                                    </div>
                                )}
                                {order.extras?.length > 0 && (
                                    <div>
                                        <h6>Extras:</h6>
                                        <div className="vieworder__extra">
                                            {order.extras.map((ext, i) => {
                                                return (
                                                    <p key={i}>
                                                        <span className="extra__name">
                                                            {ext.name}
                                                        </span>
                                                        <span>
                                                            {formatCurrency(
                                                                ext.price
                                                            )}
                                                        </span>
                                                    </p>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="vieworder_quantity_price">
                                <p>quantity: {order.quantity}</p>
                                <p>
                                    Price:
                                    {formatCurrency(cartMenuPrice(order))}
                                </p>
                            </div>
                        </div>
                    );
                })}
                <div>
                    <button
                        type="button"
                        onClick={() => setShowViewOrders(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewOrder;
