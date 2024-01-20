import React from "react";
import "./componentsStyle/title.css";
import { DATABASEURI } from "../utils/Url";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Image = ({ id, imageName }) => {
    return (
        <Link to="viewmenu">
            <img
                src={`${DATABASEURI}/product/getimage/${id}`}
                alt={imageName}
            />
        </Link>
    );
};

const DivBg = ({ id, imageName, addClassName, item }) => {
    const navigate = useNavigate();
    return (
        <div
            className={`image ${addClassName}`}
            style={{
                backgroundImage: `url("${DATABASEURI}/product/getimage/${id}")`,
            }}
            title={imageName}
            onClick={() => navigate("/viewmenu", { state: id })}
        ></div>
    );
};
export { Image, DivBg };
