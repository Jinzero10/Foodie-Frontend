import React, { useEffect, useState } from "react";
import { useAddProductMutation } from "./productApiSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { useCategoriesQuery } from "../category/categoryApiSlice";
import ProductExtra from "../../Components/ProductExtra";
import Title from "../../Components/Title";
import { MediumLoading } from "../../Components/Loading";

const AddProduct = () => {
    const navigate = useNavigate();

    const [addProduct, { isLoading: isAdding }] = useAddProductMutation();

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const [sizes, setSizes] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    const submitProduct = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("image", image);
            productData.append("price", price);
            productData.append("sizes", JSON.stringify(sizes));
            productData.append("description", description);
            productData.append("ingredients", JSON.stringify(ingredients));
            category && productData.append("category", category);

            const res = await addProduct(productData).unwrap();

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
            navigate("/admin/product");
        } catch (err) {
            if (!err?.response) {
                toast.error(err?.data?.message || err.error, {
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
                toast.error("Add product Failed", {
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
        }
    };

    //get all category
    const { data: categoryList, isSuccess } = useCategoriesQuery();
    useEffect(() => {
        if (isSuccess) {
            setCategories(categoryList);
        }
        // eslint-disable-next-line
    }, [isSuccess]);

    return (
        <section className="add__product">
            <div className="addproduct__header">
                <div className="home__icon">
                    <Link to=".." relative="path">
                        <AiFillHome size={33} color="gray" />
                    </Link>
                </div>
                <div className="addproduct__title">
                    <Title mainTitle="Add Product" />
                </div>
            </div>
            <div>
                <form
                    onSubmit={submitProduct}
                    className="add_product_form"
                    encType="multipart/form-data"
                >
                    <div className="product__details">
                        <div className="product__data">
                            <div>
                                <label htmlFor="name">Name</label>

                                <input
                                    id="name"
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Name"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    minLength={3}
                                    maxLength={16}
                                />
                            </div>

                            <div>
                                <label htmlFor="category">Category</label>

                                <select
                                    name="categry"
                                    id="category"
                                    className="select__category"
                                    placeholder="Select a Category"
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                    }}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((item) => {
                                        return (
                                            <option
                                                key={item._id}
                                                value={item._id}
                                            >
                                                {item.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className="add__product_description">
                                <label htmlFor="description">Description</label>

                                <textarea
                                    id="description"
                                    type="number"
                                    maxLength={255}
                                    placeholder="Description"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="price">Price</label>

                                <input
                                    id="price"
                                    type="number"
                                    placeholder="Price"
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </div>
                            <ProductExtra
                                props={sizes}
                                name="Sizes"
                                addButton="Add Sizes"
                                setProps={setSizes}
                            />
                            <ProductExtra
                                props={ingredients}
                                name="Extra Ingredients"
                                addButton="Add extra ingredients"
                                setProps={setIngredients}
                            />
                        </div>
                        <div className="add_image_wrapper">
                            <div className="image__viewer">
                                {image && (
                                    <>
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt="product"
                                            height={"200px"}
                                            className="product__image"
                                        />
                                    </>
                                )}
                            </div>
                            <label htmlFor="image">
                                {image ? image.name : "Upload Image"}
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                id="image"
                                name="image"
                                onChange={(e) => setImage(e.target.files[0])}
                                required
                                hidden
                            />
                        </div>
                    </div>
                    <div className="add_container_btns">
                        <button type="submit" className="add__btn">
                            {isAdding ? <MediumLoading /> : "Add Product"}
                        </button>
                        <button
                            onClick={(e) => navigate("/admin/product")}
                            className="cancel__btn"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddProduct;
