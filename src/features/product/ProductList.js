import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./productStyle/product.css";
import { useDeleteProductMutation, useProductQuery } from "./productApiSlice";
import { toast } from "react-toastify";
import { BiSolidEditAlt, BiSolidTrash } from "react-icons/bi";
import { formatCurrency } from "../../utils/currency";
import Confirmation from "../../Components/Confirmation";
import { LargeLoading, SmallLoading } from "../../Components/Loading";

const ProductList = () => {
    const navigate = useNavigate();

    const [menus, setMenus] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [wantTodo, setWantTodo] = useState("");
    const [deleteId, setDeleteId] = useState(null);

    const {
        data: getProducts,
        isLoading,
        isSuccess,
    } = useProductQuery(undefined, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });
    const [deleteProduct, { isLoading: isDeleting }] =
        useDeleteProductMutation();

    useEffect(() => {
        if (isSuccess) {
            setMenus(getProducts);
        }
    }, [isSuccess, getProducts]);

    const handleCLickDelete = (id) => {
        setShowConfirmation(true);
        setDeleteId(id);
        setWantTodo({
            msg: "delete this product",
            btn: "Delete",
        });
    };

    const handleDelete = async (id) => {
        if (id) {
            await deleteProduct({ id }).unwrap();
            setShowConfirmation(false);
            toast.success("Successfully Eliminated", {
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
            console.log("error while deleting product");
        }
    };

    return (
        <main className="product__container">
            <section>
                <nav className="add_btn_container">
                    <button
                        className="add__btn"
                        onClick={() => navigate("addProduct")}
                    >
                        + Add Product
                    </button>
                </nav>
                <div className="product__wrapper">
                    <div className="productlist__header">
                        <ul>
                            <li>Name</li>
                            <li>Category</li>
                            <li>Description</li>
                            <li>Price</li>
                            <li>Popular</li>
                            <li>Actions</li>
                        </ul>
                    </div>
                    <div className="productlist__content">
                        {isLoading ? (
                            <LargeLoading />
                        ) : (
                            <>
                                {menus.map((item) => {
                                    return (
                                        <ul key={item._id}>
                                            <li>{item.name}</li>
                                            <li>{item?.category?.name}</li>
                                            <li className="productlist__description">
                                                {item.description ? (
                                                    item.description
                                                ) : (
                                                    <p> No description</p>
                                                )}
                                            </li>
                                            <li>
                                                {formatCurrency(item.price)}
                                            </li>

                                            <li>
                                                <input
                                                    defaultChecked={
                                                        item.popular
                                                    }
                                                    type="checkbox"
                                                />
                                            </li>
                                            <li>
                                                <button
                                                    onClick={(e) =>
                                                        navigate(
                                                            "updateproduct",
                                                            {
                                                                state: item,
                                                            }
                                                        )
                                                    }
                                                    className="edit__btn"
                                                >
                                                    <BiSolidEditAlt />
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
                                            </li>
                                        </ul>
                                    );
                                })}
                            </>
                        )}
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
        </main>
    );
};
export default ProductList;
