import React, { useEffect, useState } from "react";
import "./orderStyle/order.css";
import { toast } from "react-toastify";
import {
    useChangeOrderStatusMutation,
    useDeleteOrderMutation,
    useGetAllOrderQuery,
    useGetAllOrderStatusQuery,
} from "./orderApiSlice";
import { BiSolidTrash } from "react-icons/bi";
import { FcCancel } from "react-icons/fc";
import { CiEdit } from "react-icons/ci";
import { FaEye, FaCheck } from "react-icons/fa";
import { formatCurrency } from "../../utils/currency";
import Confirmation from "../../Components/Confirmation";
import { SmallLoading } from "../../Components/Loading";
import ViewOrder from "../../Components/ViewOrder";

const OrderList = () => {
    const [order, setOrder] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [wantTodo, setWantTodo] = useState("");
    const [deleteId, setDeleteId] = useState(null);
    const [changeStatus, setChangeStatus] = useState("");
    const [showViewOrders, setShowViewOrders] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const [vieworder, setViewOrder] = useState("");
    const [status, setStatus] = useState([]);

    const { data: getOrders, isSuccess } = useGetAllOrderQuery(undefined, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });
    const { data: getStatus, isSuccess: isFetched } =
        useGetAllOrderStatusQuery();
    const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();
    const [orderStatus] = useChangeOrderStatusMutation();

    useEffect(() => {
        if (isSuccess && isFetched) {
            setOrder(getOrders);
            setStatus(...getStatus);
        }
        // eslint-disable-next-line
    }, [isSuccess, getOrders, isFetched]);

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
            toast.success(res.message);
        } else {
            toast.error("Error while deleting order");
        }
    };
    const handleViewOrder = (item) => {
        setShowViewOrders(true);
        setViewOrder(item);
    };

    const changeOrderStatus = async (id) => {
        if (id) {
            const res = await orderStatus({ id, selectedItem }).unwrap();
            setChangeStatus("");
            toast.success(res.message);
        } else {
            toast.error("Error while changing order status");
        }
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
                                    <li className="orderStatus">
                                        {changeStatus === item._id ? (
                                            <>
                                                <select
                                                    value={selectedItem}
                                                    onChange={(e) =>
                                                        setSelectedItem(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    {Object.values(status).map(
                                                        (item) => (
                                                            <option
                                                                key={item}
                                                                value={item}
                                                            >
                                                                {item}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </>
                                        ) : (
                                            item.status
                                        )}
                                    </li>
                                    <li>{item.delivery}</li>
                                    <li>{item.totalQuantity}</li>
                                    <li>{formatCurrency(item.totalPrice)}</li>
                                    <li className="action">
                                        {changeStatus === item._id ? (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        changeOrderStatus(
                                                            item._id
                                                        )
                                                    }
                                                    className="edit__btn"
                                                >
                                                    <FaCheck />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setChangeStatus("")
                                                    }
                                                    className="delete__btn"
                                                >
                                                    <FcCancel />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        setChangeStatus(
                                                            item._id
                                                        )
                                                    }
                                                    className="edit__btn"
                                                >
                                                    <CiEdit />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleViewOrder(
                                                            item.items
                                                        )
                                                    }
                                                    className="eye__btn"
                                                >
                                                    <FaEye />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleCLickDelete(
                                                            item._id
                                                        )
                                                    }
                                                    className="delete__btn"
                                                >
                                                    {isDeleting ? (
                                                        <SmallLoading />
                                                    ) : (
                                                        <BiSolidTrash />
                                                    )}
                                                </button>
                                            </>
                                        )}
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
