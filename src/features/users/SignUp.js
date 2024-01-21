import React, { useEffect, useRef, useState } from "react";
import "./userStyle/signup.css";
import { useDispatch } from "react-redux";

import { useRegisterMutation } from "./userApiSlice";
import { setCredentials } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import Address from "../../Components/Address";
import Title from "../../Components/Title";
import { ZipCode } from "../../utils/Zipcode";

const USER_REGEX = /^[a-zA-Z][a-zA-Z]{3,23}$/;
const EMAIL_REGEX = /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
//const PNUMBER_CODE = /^\D*([+]\d(?:\D*\d){1})/g;

const SignUp = ({ showSignUp, setShowSignUp, open, setOpen }) => {
    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState("");
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [address, setAddress] = useState("");
    const [zipcode, setZipcode] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    //const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (showSignUp) {
            userRef.current.focus();
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(name);

        setValidName(result);
    }, [name]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = PWD_REGEX.test(password);

        setValidPassword(result);

        const match = password === matchPwd;

        setValidMatch(match);
    }, [password, matchPwd]);

    useEffect(() => {
        setErrMsg("");
    }, [name, email, password, matchPwd]);

    const dispatch = useDispatch();

    const [signup] = useRegisterMutation();
    const { id } = useAuth();

    useEffect(() => {
        if (id) {
            navigate("/");
        }
    }, [navigate, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const zipcodeArr = ZipCode.find(({ id }) => id === Number(zipcode));
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(password);

        if (!v1 || !v2) {
            setErrMsg("Invalid entry");
            return;
        }
        if (!zipcodeArr) {
            setErrMsg("ZipCode is not Valid");
            return;
        }
        if (password !== matchPwd) {
            console.log("password do not match");
        } else {
            try {
                const res = await signup({
                    name,
                    phoneNumber,
                    address,
                    zipcode,
                    email,
                    password,
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                setShowSignUp(false);
                setZipcode("");
                setAddress("");
                toast.success("Success", {
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
                if (!err) {
                    setErrMsg("No Server Response");
                } else if (err.status === 404) {
                    setErrMsg(err.data.message);
                } else if (err.status === 400) {
                    setErrMsg(err.data.message);
                } else {
                    setErrMsg("Registration Failed");
                }
                errRef.current.focus();
            }
        }
    };
    function handleAddressChange(propName, value) {
        if (propName === "address") setAddress(value);
        if (propName === "zipcode") setZipcode(value);
    }
    return (
        <>
            <main
                className="signup__container"
                onClick={() => setShowSignUp(false)}
            >
                <section
                    className="signup__wrapper"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="signup__title">
                        <Title mainTitle="Sign Up" />
                    </div>
                    <p
                        ref={errRef}
                        className={errMsg ? "errmsg" : " offscreen"}
                        aria-live="assertive"
                    >
                        {errMsg}
                    </p>
                    <form onSubmit={handleSubmit} className="signup__form">
                        <div className="signup_form_wrapper">
                            <div>
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        className={
                                            validName || !name
                                                ? "valid"
                                                : "invalid"
                                        }
                                        id="name"
                                        type="text"
                                        ref={userRef}
                                        autoComplete="off"
                                        placeholder="Name"
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        required
                                        aria-invalid={
                                            validName ? "false" : "true"
                                        }
                                        aria-describedby="uidnote"
                                        onFocus={() => setNameFocus(true)}
                                        onBlur={() => setNameFocus(false)}
                                    />
                                    <p
                                        id="uidnote"
                                        className={
                                            nameFocus && name && !validName
                                                ? "instruction"
                                                : "offscreen"
                                        }
                                    >
                                        4 to 24 character. letters is only
                                        allowed.
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="number">Phone Number</label>
                                    <input
                                        id="number"
                                        type="number"
                                        placeholder="Phone Number"
                                        onChange={(e) =>
                                            setPhoneNumber(e.target.value)
                                        }
                                        required
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
                                        placeholder="Email Address"
                                        autoComplete="off"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                        aria-invalid={
                                            validEmail ? "false" : "true"
                                        }
                                        aria-describedby="emailnote"
                                        onFocus={() => setEmailFocus(true)}
                                        onBlur={() => setEmailFocus(false)}
                                    />
                                    <p
                                        id="emailnote"
                                        className={
                                            emailFocus && email && !validEmail
                                                ? "instruction"
                                                : "offscreen"
                                        }
                                    >
                                        4 to 24 character. letters is only
                                        allowed.
                                    </p>
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
                                        placeholder="Password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                        aria-invalid={
                                            validPassword ? "false" : "true"
                                        }
                                        aria-describedby="pwdnote"
                                        onFocus={() => setPasswordFocus(true)}
                                        onBlur={() => setPasswordFocus(false)}
                                    />
                                    <p
                                        id="pwdnote"
                                        className={
                                            passwordFocus &&
                                            password &&
                                            !validPassword
                                                ? "instruction"
                                                : "offscreen"
                                        }
                                    >
                                        8 to 24 character. Must include
                                        upprecase and lower case , a number and
                                        a special character. allowed special
                                        cahracter:
                                        <span aria-label="exclamation mark">
                                            !
                                        </span>
                                        <span aria-label="at symbol">@</span>
                                        <span aria-label="hashtag">#</span>
                                        <span aria-label="dollar sign">$</span>
                                        <span aria-label="percent">%</span>
                                    </p>
                                </div>
                                <div>
                                    <label htmlFor="Cpassword">
                                        Confirm Password
                                    </label>
                                    <input
                                        className={
                                            validMatch || !matchPwd
                                                ? "valid"
                                                : "invalid"
                                        }
                                        id="Cpassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                        onChange={(e) =>
                                            setMatchPwd(e.target.value)
                                        }
                                        required
                                        aria-invalid={
                                            validMatch ? "false" : "true"
                                        }
                                        aria-describedby="confirmnote"
                                        onFocus={() => setMatchFocus(true)}
                                        onBlur={() => setMatchFocus(false)}
                                    />
                                    <p
                                        id="pwdnote"
                                        className={
                                            matchFocus &&
                                            matchPwd &&
                                            !validMatch
                                                ? "instruction"
                                                : "offscreen"
                                        }
                                    >
                                        Must match the password field
                                    </p>
                                </div>
                            </div>
                            <Address
                                addressProps={{ address, zipcode }}
                                setAddressProps={handleAddressChange}
                            />
                        </div>
                        <button
                            disabled={
                                !validName ||
                                !validEmail ||
                                !validPassword ||
                                !validMatch
                                    ? true
                                    : false
                            }
                            className="sign__btn"
                        >
                            Sign Up
                        </button>
                        <div className="signup__footer">
                            I have read and accepted the &nbsp;
                            <span className="terms">terms of agreement</span>
                        </div>
                        <div className="signup__footer">
                            Have Account already? &nbsp;
                            <span
                                className="terms"
                                onClick={() => setOpen(!open)}
                            >
                                Sign In
                            </span>
                        </div>
                    </form>
                </section>
            </main>
        </>
    );
};

export default SignUp;
