import React, { useEffect, useState } from "react";
import "./orderStyle/order.css";
import { toast } from "react-toastify";
import { useDeleteOrderMutation, useGetAllOrderQuery } from "./orderApiSlice";
import { BiSolidTrash } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { formatCurrency } from "../../utils/currency";
import Confirmation from "../../Components/Confirmation";
import { SmallLoading } from "../../Components/Loading";
import ViewOrder from "../../Components/ViewOrder";

const OrderList = () => {
    const [order, setOrder] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [wantTodo, setWantTodo] = useState("");
    const [deleteId, setDeleteId] = useState(null);
    const [showViewOrders, setShowViewOrders] = useState(false);
    const [vieworder, setViewOrder] = useState("");

    const { data: getOrders, isSuccess } = useGetAllOrderQuery(undefined, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });
    const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

    useEffect(() => {
        if (isSuccess) {
            setOrder(getOrders);
        }
    }, [isSuccess, getOrders]);
    const handleCLickDelete = (id) => {
        setShowConfirmation(true);
        setDeleteId(id);
        setWantTodo({
            msg: "delete this order",
            btn: "Delete",
        });
    };
    const handleDelete = async (id) => {
        if (id) {
            const res = await deleteOrder({ id }).unwrap();
            setShowConfirmation(false);
            toast.success(res.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast.error("Error while deleting order", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };
    const handleViewOrder = (item) => {
        setShowViewOrders(true);
        setViewOrder(item);
    };
    return (
        <main className="order__container">
            <section>
                <div className="order__wrapper">
                    <div className="orderlist__header">
                        <ul>
                            <li>Name</li>
                            <li>Address</li>
                            <li>PhoneNumber</li>
                            <li>zipcode</li>
                            <li>Status</li>
                            <li>Delivery</li>
                            <li>Quantity</li>
                            <li>Total</li>
                            <li>Action</li>
                        </ul>
                    </div>
                    <div className="orderlist__content">
                        {order.map((item) => {
                            return (
                                <ul key={item._id}>
                                    <li>{item.name}</li>
                                    <li>{item.address}</li>
                                    <li>{item.phoneNumber}</li>
                                    <li>{item.zipcode}</li>
                                    <li>{item.status}</li>
                                    <li>{item.delivery}</li>
                                    <li>{item.totalQuantity}</li>
                                    <li>{formatCurrency(item.totalPrice)}</li>
                                    <li>
                                        <button
                                            onClick={() =>
                                                handleViewOrder(item.items)
                                            }
                                            className="eye__btn"
                                        >
                                            <FaEye />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleCLickDelete(item._id)
                                            }
                                            className="delete__btn"
                                        >
                                            {isDeleting ? (
                                                <SmallLoading />
                                            ) : (
                                                <BiSolidTrash />
                                            )}
                                        </button>
                                    </li>
                                </ul>
                            );
                        })}
                    </div>
                </div>
            </section>
            {showConfirmation && (
                <Confirmation
                    confirmationProps={{
                        setShowConfirmation,
                        wantTodo,
                    }}
                    handling={{ id: deleteId, handle: handleDelete }}
                />
            )}
            {showViewOrders && (
                <ViewOrder
                    viewOrderProps={{
                        setShowViewOrders,
                        vieworder,
                    }}
                />
            )}
        </main>
    );
};
export default OrderList;
