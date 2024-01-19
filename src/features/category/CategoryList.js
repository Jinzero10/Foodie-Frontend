import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BiSolidEditAlt, BiSolidTrash } from "react-icons/bi";
import "./categoryStyle/category.css";
import {
    useAddCategoryMutation,
    useCategoriesQuery,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
} from "./categoryApiSlice";
import Title from "../../Components/Title";
import Confirmation from "../../Components/Confirmation";
import {
    LargeLoading,
    MediumLoading,
    SmallLoading,
} from "../../Components/Loading";

const CategoryList = () => {
    const {
        data: categories,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useCategoriesQuery();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [wantTodo, setWantTodo] = useState("");
    const [deleteId, setDeleteId] = useState(null);

    const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation();
    const [updateCategory, { isLoading: isUpdating }] =
        useUpdateCategoryMutation();

    const [deleteCategory, { isLoading: isDeleting }] =
        useDeleteCategoryMutation();

    const [name, setName] = useState("");
    const [updateModal, setUpdateModal] = useState(false);
    const [updatedName, setUpdatedName] = useState("");
    const [id, setId] = useState(null);

    //add category
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (name) {
                await addCategory({ name }).unwrap();
                setName("");
                toast.success("Category has been added.", {
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
                toast.error("Name is required");
            }
        } catch (err) {
            console.log(err);
            toast.error("Something Went Wrong while adding Category");
        }
    };

    //update category
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCategory({
                id,
                name: updatedName,
            }).unwrap();
            setUpdateModal(false);
            toast.success("Category has been Updated.", {
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
            toast.error(`new Category ${err.data.message}`);
        }
    };
    const handleCLickDelete = (id) => {
        setShowConfirmation(true);
        setDeleteId(id);
        setWantTodo({
            msg: "delete this category",
            btn: "Delete",
        });
    };

    //delete category
    const handleDeleteSubmit = async (id) => {
        try {
            if (id) {
                await deleteCategory({
                    id,
                }).unwrap();
                setShowConfirmation(false);
                toast.success("Category has been deleted.", {
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
        } catch (err) {
            console.log(err);
            toast.error("Something Went Wrong while deleting Category");
        }
    };

    useEffect(() => {});
    //get all category
    let content;

    if (isLoading) {
        content = <LargeLoading />;
    } else if (isSuccess) {
        content = categories.map((item) => {
            return (
                <ul key={item._id}>
                    <li>{item.name}</li>
                    <li className="category__icon">
                        <button
                            className="edit__btn"
                            onClick={(e) => {
                                setUpdateModal(true);
                                setUpdatedName(item.name);
                                setId(item._id);
                            }}
                        >
                            <BiSolidEditAlt />
                        </button>

                        <button
                            className="delete__btn"
                            onClick={() => {
                                handleCLickDelete(item._id);
                            }}
                        >
                            {isDeleting ? <SmallLoading /> : <BiSolidTrash />}
                        </button>
                    </li>
                </ul>
            );
        });
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <section className="category__container">
            <div className="category__header">
                <Title mainTitle="Manage Category" />
            </div>
            <div className="category__content">
                {updateModal ? (
                    <form
                        onSubmit={handleUpdateSubmit}
                        className="category__form"
                        encType="application/json"
                    >
                        <div>
                            <label htmlFor="addcategory">Update Category</label>
                            <input
                                type="text"
                                id="addcategory"
                                name="addcategory"
                                placeholder="Update Category"
                                value={updatedName}
                                onChange={(e) => setUpdatedName(e.target.value)}
                            />
                        </div>
                        <div className="update__btn">
                            <button type="submit" className="category_btn">
                                {isUpdating ? <MediumLoading /> : "Update"}
                            </button>

                            <button
                                type="submit"
                                className="category_btn cancel_btn"
                                onClick={() => setUpdateModal(!updateModal)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit} className="category__form">
                        <div>
                            <label htmlFor="addcategory">Add Category</label>
                            <input
                                type="text"
                                id="addcategory"
                                name="addcategory"
                                placeholder="Add Category"
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="update__btn">
                            <button type="submit" className="category_btn">
                                {isAdding ? <MediumLoading /> : "Add"}
                            </button>
                        </div>
                    </form>
                )}
                <div className="category__wrapper">
                    <div className="categorylist__header">
                        <ul>
                            <li>Name</li>
                            <li>Actions</li>
                        </ul>
                    </div>
                    <div className="categorylist__content">{content}</div>
                </div>
            </div>
            {showConfirmation && (
                <Confirmation
                    confirmationProps={{
                        setShowConfirmation,
                        wantTodo,
                    }}
                    handling={{ id: deleteId, handle: handleDeleteSubmit }}
                />
            )}
        </section>
    );
};

export default CategoryList;
