import React from "react";
import "./componentsStyle/title.css";

const Title = ({ mainTitle, subTitle }) => {
    return (
        <>
            <h5 className="sub_title">{subTitle}</h5>
            <h2 className="main_title">{mainTitle}</h2>
        </>
    );
};

export default Title;
