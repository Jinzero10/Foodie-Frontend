import React, { useState } from "react";
import { FaAngleDown, FaAngleUp, FaRegTrashAlt } from "react-icons/fa";
import "./componentsStyle/productextra.css";

const ProductExtra = ({ props, setProps, addButton, name }) => {
    const [openModal, setOpenModal] = useState(false);

    const addExtra = () => {
        setProps((oldProps) => {
            return [...oldProps, { name: "", price: 0 }];
        });
    };
    const editExtra = (e, i, prop) => {
        const value = e.target.value;
        setProps((prevSizes) => {
            const newSizes = [...prevSizes];
            newSizes[i][prop] = value;
            return newSizes;
        });
    };

    const removeExtra = (i) => {
        setProps((prev) => prev.filter((v, index) => index !== i));
    };
    return (
        <div className="extra">
            <div
                className="extra__header"
                onClick={() => setOpenModal(!openModal)}
            >
                <div className="extra__dropdown">
                    {openModal ? <FaAngleUp /> : <FaAngleDown />}
                    <span>{name}</span>
                    <span>({props.length})</span>
                </div>
            </div>
            {openModal && (
                <div>
                    {props.length > 0 &&
                        props.map((prop, i) => (
                            <div className="extra__form" key={i}>
                                <div>
                                    <label>name</label>
                                    <input
                                        type="text"
                                        placeholder="name"
                                        value={prop.name}
                                        onChange={(e) =>
                                            editExtra(e, i, "name")
                                        }
                                    />
                                </div>
                                <div>
                                    <label>price</label>
                                    <input
                                        type="number"
                                        placeholder="price"
                                        value={prop.price}
                                        onChange={(e) =>
                                            editExtra(e, i, "price")
                                        }
                                    />
                                </div>
                                <div className="trash">
                                    <button
                                        type="button"
                                        onClick={() => removeExtra(i)}
                                    >
                                        <FaRegTrashAlt />
                                    </button>
                                </div>
                            </div>
                        ))}
                    <button
                        className="extra__btn"
                        type="button"
                        onClick={addExtra}
                    >
                        {addButton}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductExtra;
