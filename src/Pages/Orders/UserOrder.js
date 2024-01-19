import React, { useEffect, useState } from "react";
import "./userorder/userorder.css";
import Title from "../../Components/Title";
import {
    useGetAllOrderStatusQuery,
    useGetUserOrderQuery,
} from "../../features/orders/orderApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DateTime from "../../Components/DateTime";
import { formatCurrency } from "../../utils/currency";
import ViewOrder from "../../Components/ViewOrder";
import { LargeLoading } from "../../Components/Loading";
import { DivBg } from "../../Components/ImageCom";

const UserOrder = () => {
    const { filter } = useParams();

    const navigate = useNavigate();

    const { data: userOrder, isLoading, isSuccess } = useGetUserOrderQuery();
    const { data: getStatus, isSuccess: isFetched } =
        useGetAllOrderStatusQuery();

    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState([]);
    const [showViewOrders, setShowViewOrders] = useState(false);
    const [vieworder, setViewOrder] = useState("");

    useEffect(() => {
        if (isSuccess && isFetched) {
            setOrders(userOrder.order);
            setStatus(...getStatus);
        }
        // eslint-disable-next-line
    }, [isSuccess, isFetched]);

    useEffect(() => {
        let orderFiltered = userOrder?.order?.filter(
            (order) => order.status === filter
        );

        if (orderFiltered) {
            setOrders(orderFiltered);
        }
        if (!filter) {
            setOrders(userOrder?.order);
        }
        // eslint-disable-next-line
    }, [filter]);

    const handleViewOrder = (item) => {
        setShowViewOrders(true);
        setViewOrder(item);
    };

    return (
        <main className="order__container">
            <section className="order__title">
                <Title mainTitle="Orders" />
            </section>
            <section>
                {status && (
                    <ul className="status__link">
                        <Link
                            to="/userorder"
                            className={`status_link_btn ${
                                !filter && "selected"
                            }`}
                        >
                            ALL
                        </Link>
                        {Object.values(status).map((state, index) => (
                            <Link
                                key={index}
                                className={`status_link_btn ${
                                    state === filter && "selected"
                                }`}
                                to={`/userorder/${state}`}
                            >
                                {state}
                            </Link>
                        ))}
                    </ul>
                )}
            </section>
            <section className="order_content_container">
                {orders?.length === 0 && (
                    <div className="order__notfound">
                        <p>Nothing found!</p>
                        <button
                            className={`status_link_btn ${
                                !filter && "selected"
                            }`}
                            onClick={() => navigate("/userorder")}
                        >
                            Show All
                        </button>
                    </div>
                )}

                {isLoading ? (
                    <LargeLoading />
                ) : (
                    orders?.map((order) => (
                        <div key={order._id} className="order_content_wrapper">
                            <div className="order_card_header">
                                <span>{order._id}</span>
                                <span>
                                    <DateTime date={order.createdAt} />
                                </span>
                                <span>{order.status}</span>
                            </div>
                            <div className="order_content_holder">
                                {order?.items?.map((item, i) => (
                                    // put navigate to view order
                                    <div key={i} className="order_holder">
                                        <DivBg
                                            id={item.food._id}
                                            addClassName={"image__holder"}
                                            imageName={item.food.name}
                                        />
                                        <div className="order__name">
                                            <p>{item.food.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="order_card_footer">
                                <div>
                                    <p
                                        onClick={() =>
                                            handleViewOrder(order.items)
                                        }
                                    >
                                        Show Order
                                    </p>
                                </div>
                                <div>
                                    <span>{order.delivery}</span>
                                </div>
                                <div>
                                    <span className="orderprice">
                                        {formatCurrency(order.totalPrice)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                {showViewOrders && (
                    <ViewOrder
                        viewOrderProps={{
                            setShowViewOrders,
                            vieworder,
                        }}
                    />
                )}
            </section>
        </main>
    );
};

export default UserOrder;
