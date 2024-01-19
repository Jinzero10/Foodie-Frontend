import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./userStyle/user.css";
import Address from "../../Components/Address";

const VeiwUserDetails = () => {
    const { state } = useLocation();

    const [address] = useState(state.address || "");
    const [zipcode] = useState(state.zipcode || "");

    return (
        <section className="user__details">
            <nav className="user_detail_nav">
                <Link to=".." relative="path">
                    <p>go back</p>
                </Link>
            </nav>
            <div className="user__biography">
                <div className="user__photo">
                    <div className="proxy_user_photo"></div>
                </div>
                <div className="user__information">
                    <div>
                        <p>
                            Name: <span>{state.name}</span>
                        </p>
                        <p>
                            Email: <span>{state.email}</span>
                        </p>
                        <p>
                            PhoneNumber: <span>{state.phoneNumber}</span>
                        </p>
                    </div>
                    <Address
                        addressProps={{ address, zipcode }}
                        setAddressProps={"readonly"}
                    />
                </div>
            </div>
            <div className="user__status">
                <p>{state.role === 101 ? "Admin" : "User"}</p>
                <div>
                    <label htmlFor="active">Active:</label>
                </div>
                <input
                    name="active"
                    defaultChecked={state.active}
                    type="checkbox"
                />
            </div>
        </section>
    );
};

export default VeiwUserDetails;
