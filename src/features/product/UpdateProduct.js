import React, { useEffect, useState } from "react";
import { useEditProductMutation } from "./productApiSlice";

import { AiFillHome } from "react-icons/ai";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCategoriesQuery } from "../category/categoryApiSlice";
import ProductExtra from "../../Components/ProductExtra";
import Title from "../../Components/Title";

const UpdateProduct = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [id] = useState(state._id);
    const [name, setName] = useState(state.name);
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [popular, setPopular] = useState(state.popular || false);
    const [price, setPrice] = useState(state.price);
    const [description, setDescription] = useState(state.description);
    const [sizes, setSizes] = useState(state.sizes);
    const [ingredients, setIngredients] = useState(state.ingredients);

    const [updateProduct, { isLoading: isUpdating }] = useEditProductMutation();
    const { data: categoryList, isSuccess } = useCategoriesQuery();
    //get all category
    useEffect(() => {
        if (isSuccess) {
            setCategories(categoryList);
        }
        // eslint-disable-next-line
    }, [isSuccess]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("sizes", JSON.stringify(sizes));
            productData.append("ingredients", JSON.stringify(ingredients));
            productData.append("price", price);
            productData.append("popular", popular);
            image && productData.append("image", image);
            category && productData.append("category", category);

            await updateProduct({ id, productData }).unwrap();

            navigate("..", { relative: "path" });
            toast.success("Profile Updated Successfully", {
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
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <section className="add__product">
            <div className="addproduct__header">
                <div className="home__icon">
                    <Link to=".." relative="path">
                        <AiFillHome size={33} color="gray" />
                    </Link>
                </div>
                <div className="addproduct__title">
                    <Title mainTitle="Update Product" />
                </div>
            </div>
            <div>
                <form onSubmit={handleUpdate} className="add_product_form">
                    <div className="product__details">
                        <div className="product__data">
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    minLength={3}
                                    maxLength={20}
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
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>
                            <div className="price__holder">
                                <div>
                                    <label htmlFor="price">Price</label>

                                    <input
                                        id="price"
                                        type="number"
                                        placeholder="Price"
                                        value={price}
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Popular</label>
                                    <input
                                        checked={popular}
                                        type="checkbox"
                                        onChange={(e) =>
                                            setPopular(e.target.checked)
                                        }
                                    />
                                </div>
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
                        <div className="add_image_wrapper update">
                            <div>
                                {image ? (
                                    <>
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt="product name"
                                            height={"200px"}
                                            className="product__image"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <img
                                            src={`http://127.0.0.1:5000/product/getimage/${id}`}
                                            alt="product name"
                                            height={"200px"}
                                            className="product__image"
                                        />
                                    </>
                                )}
                            </div>
                            <label htmlFor="image" title={image.name}>
                                {image ? image.name : "Upload Image"}
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                id="image"
                                title={image.name}
                                name="image"
                                onChange={(e) => setImage(e.target.files[0])}
                                hidden
                            />
                        </div>
                    </div>
                    {isUpdating && <h2>Loading...</h2>}
                    <div className="add_container_btns">
                        <button type="submit" className="add__btn">
                            Update Product
                        </button>
                        <button
                            className="cancel__btn"
                            onClick={() => navigate("..", { relative: "path" })}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default UpdateProduct;
