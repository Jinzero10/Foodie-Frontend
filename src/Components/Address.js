import React from "react";
import "./componentsStyle/address.css";
import { ZipCode } from "../utils/Zipcode";
import { useEffect } from "react";
import { useState } from "react";
import Title from "./Title";

const Address = ({ addressProps, setAddressProps }) => {
    const { address, zipcode } = addressProps;
    const [readOnly, setReadOnly] = useState(false);

    const [municipality, setMunicipality] = useState("");
    useEffect(() => {
        if (setAddressProps === "readonly") {
            setReadOnly(true);
        } else {
            setReadOnly(false);
        }
    }, [setAddressProps]);
    useEffect(() => {
        const zipArr = ZipCode.find(({ id }) => id === Number(zipcode));
        if (zipArr) {
            setMunicipality(zipArr.municipality);
        }
    }, [zipcode]);
    return (
        <div className="address__container">
            <div className="address__title">
                <Title subTitle="Address" />
            </div>
            <div>
                <label htmlFor="address">Barangay/Street</label>
                <input
                    id="address"
                    type="text"
                    placeholder="Address"
                    defaultValue={address || ""}
                    onChange={(e) => setAddressProps("address", e.target.value)}
                    required
                    readOnly={readOnly}
                />
            </div>
            <div className="address__extra">
                <div>
                    <label htmlFor="city">City</label>
                    <input
                        id="city"
                        type="text"
                        defaultValue="Cebu City"
                        readOnly
                    />
                </div>
                <div>
                    <label htmlFor="zipcode">ZipCode</label>
                    <input
                        id="zipcode"
                        type="text"
                        placeholder="zipcode"
                        defaultValue={zipcode || ""}
                        onChange={(e) =>
                            setAddressProps("zipcode", e.target.value)
                        }
                        min={4}
                        max={5}
                        required
                        readOnly={readOnly}
                    />
                </div>
            </div>

            <div className="address__extra">
                <div>
                    <label htmlFor="municipality">Municipality</label>
                    <input
                        id="municipality"
                        type="text"
                        defaultValue={municipality || ""}
                        readOnly
                    />
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input
                        id="country"
                        type="text"
                        defaultValue="Philippines"
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
};

export default Address;
