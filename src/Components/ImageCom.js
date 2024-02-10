import React, { useEffect, useState } from "react";
import "./componentsStyle/title.css";
import DATABASEURI from "../utils/Url";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Image = ({ id, imageName }) => {
    const [imageSrc, setImageSrc] = useState("");

    useEffect(() => {
        // Function to fetch image data from backend
        const fetchImage = async () => {
            try {
                const response = await fetch(
                    `${DATABASEURI}/product/getimage/${id}`
                );
                if (!response.ok) {
                    toast.error("Failed to fetch image");
                }
                // Convert response to Blob object
                const blob = await response.blob();
                // Convert Blob to data URL
                const src = URL.createObjectURL(blob);
                setImageSrc(src);
            } catch (error) {
                console.error(error);
            }
        };

        fetchImage();

        // Cleanup function to revoke data URL
        return () => {
            if (imageSrc) {
                URL.revokeObjectURL(imageSrc);
            }
        };
        // eslint-disable-next-line
    }, [id]);
    return (
        <Link to="viewmenu">
            <img src={imageSrc} alt={imageName} />
        </Link>
    );
};

const DivBg = ({ id, imageName, addClassName }) => {
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState("");

    useEffect(() => {
        // Function to fetch image data from backend
        const fetchImage = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/product/getimage/${id}`
                );
                console.log(response);
                if (!response.ok) {
                    toast.error("Failed to fetch image");
                }
                // Convert response to Blob object
                const blob = await response.blob();
                // Convert Blob to data URL
                console.log(blob);
                const src = URL.createObjectURL(blob);
                console.log(src);
                setImageSrc(src);
            } catch (error) {
                console.error(error);
            }
        };

        fetchImage();

        // Cleanup function to revoke data URL
        return () => {
            if (imageSrc) {
                URL.revokeObjectURL(imageSrc);
            }
        };
        // eslint-disable-next-line
    }, [id]);
    return (
        <div
            className={`image ${addClassName}`}
            style={{
                backgroundImage: `url(${imageSrc})`,
            }}
            title={imageName}
            onClick={() => navigate("/viewmenu", { state: id })}
        ></div>
    );
};
export { Image, DivBg };
