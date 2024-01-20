import React, { useEffect, useState } from "react";
import "./userStyle/profile.css";
import { useUpdateUserMutation } from "./userApiSlice";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import Title from "../../Components/Title";
import Address from "../../Components/Address";
import { ZipCode } from "../../utils/Zipcode";
import useProfile from "../../hooks/useProfile";
import { FaArrowLeft } from "react-icons/fa";
import { SmallLoading } from "../../Components/Loading";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[a-zA-Z][a-zA-Z]{3,23}$/;
const EMAIL_REGEX = /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Profile = () => {
    const { id } = useAuth();
    const { name, email, address, phoneNumber, zipcode } = useProfile();
    const navigate = useNavigate();

    const [profileName, setProfileName] = useState("");
    const [validName, setValidName] = useState(false);

    const [profileEmail, setProfileEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);

    const [profileAddress, setProfileAddress] = useState("");
    const [profileZipcode, setProfileZipcode] = useState("");

    const [profilePhoneNumber, setProfilePhoneNumber] = useState("");

    useEffect(() => {
        if (name || email || address || phoneNumber || zipcode) {
            setProfileName(name);
            setProfileEmail(email);
            setProfileAddress(address);
            setProfileZipcode(zipcode);
            setProfilePhoneNumber(phoneNumber);
        }
    }, [name, email, address, phoneNumber, zipcode]);
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [validMatch, setValidMatch] = useState(false);

    const [message, setMessage] = useState("");

    const [updateProfile, { isLoading: isUpdating }] = useUpdateUserMutation();

    useEffect(() => {
        const result = USER_REGEX.test(profileName);
        setValidName(result);
    }, [profileName]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(profileEmail);
        setValidEmail(result);
    }, [profileEmail]);

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPassword(result);
        const match = password === confirmPassword;
        setValidMatch(match);
    }, [password, confirmPassword]);

    useEffect(() => {
        setMessage("");
    }, [profileName, profileEmail, password, confirmPassword, profileZipcode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const zipcodeArr = ZipCode.find(
            ({ id }) => id === Number(profileZipcode)
        );

        if (!zipcodeArr) {
            setMessage("Zipcode is not valid");
            return;
        }
        if (!validEmail) {
            setMessage("Invalid Email");
            return;
        }
        if (!validPassword) {
            setMessage(
                "Password must include upprecase and lower case ,a number and a special character such as(!, @, #, $, %)"
            );
            return;
        }

        if (confirmPassword.length > 0) {
            if (password !== confirmPassword) {
                setMessage("Password do not match");
                return;
            }
        }

        try {
            await updateProfile({
                id,
                name: profileName,
                phoneNumber: profilePhoneNumber,
                address: profileAddress,
                zipcode: profileZipcode,
                email: profileEmail,
                password,
            }).unwrap();
            toast.success("Profile Updated Successfully", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                pauseOnFocusLoss: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    function handleAddressChange(propName, value) {
        console.log(value);
        if (propName === "address") setProfileAddress(value);
        if (propName === "zipcode") setProfileZipcode(value);
    }
    return (
        <main className="profile__container">
            <section className="profile__wrapper">
                <div className="profile__title">
                    <Title mainTitle="Update Profile" />
                </div>
                <p className={message && "profile__message"}>{message}</p>

                <form onSubmit={handleSubmit} className="profile__form">
                    <div className="profile_form_wrapper">
                        <div className="user__info">
                            <div
                                className="profile__back"
                                onClick={() => navigate(-1)}
                            >
                                <FaArrowLeft /> <span>Go Back</span>
                            </div>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    className={
                                        validName || !profileName
                                            ? "valid"
                                            : "invalid"
                                    }
                                    id="name"
                                    type="text"
                                    value={profileName}
                                    onChange={(e) =>
                                        setProfileName(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="number">Phone Number</label>
                                <input
                                    id="number"
                                    type="number"
                                    value={profilePhoneNumber}
                                    onChange={(e) =>
                                        setProfilePhoneNumber(e.target.value)
                                    }
                                    min={11}
                                    max={12}
                                />
                            </div>

                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    className={
                                        validEmail || !email
                                            ? "valid"
                                            : "invalid"
                                    }
                                    id="email"
                                    type="email"
                                    value={profileEmail}
                                    onChange={(e) =>
                                        setProfileEmail(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    className={
                                        validPassword || !password
                                            ? "valid"
                                            : "invalid"
                                    }
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    minLength={4}
                                    maxLength={24}
                                />
                            </div>
                            <div>
                                <label htmlFor="Cpassword">
                                    Confirm Password
                                </label>
                                <input
                                    className={
                                        validMatch || !confirmPassword
                                            ? "valid"
                                            : "invalid"
                                    }
                                    id="Cpassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <Address
                            addressProps={{
                                address: profileAddress,
                                zipcode: profileZipcode,
                            }}
                            setAddressProps={handleAddressChange}
                        />
                    </div>
                    <div className="profile__btn">
                        <button type="submit" className="sign__btn">
                            {isUpdating ? <SmallLoading /> : "Update"}
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default Profile;
