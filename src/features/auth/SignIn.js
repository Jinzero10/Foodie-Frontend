import React, { useEffect, useRef, useState } from "react";
import "./authStyle/signin.css";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import Title from "../../Components/Title";

const SignIn = ({ showLogin, setShowLogin, setOpen, open }) => {
    const emailRef = useRef();
    const errRef = useRef();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login] = useLoginMutation();

    const { name } = useAuth();

    useEffect(() => {
        if (showLogin) {
            emailRef.current.focus();
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [email, password]);

    useEffect(() => {
        if (name) {
            navigate("/");
        }
    }, [navigate, name]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            setShowLogin(false);

            toast.success("Successfully Login", {
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
            console.log(err);
            if (!err) {
                setErrMsg("No Server Respond");
            } else if (err.status === 400) {
                setErrMsg(err.data.message);
            } else if (err.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }
            errRef.current.focus();
        }
    };

    return (
        <>
            <main
                className="login_container"
                onClick={() => setShowLogin(false)}
            >
                <section
                    className="login_wrapper"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="signin_title">
                        <Title mainTitle="Sign in" />
                    </div>
                    <p
                        ref={errRef}
                        className={errMsg ? "errmsg" : " offscreen"}
                        aria-live="assertive"
                    >
                        {errMsg}
                    </p>
                    <form onSubmit={handleSubmit} className="signin_form">
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                ref={emailRef}
                                autoComplete="off"
                                placeholder="Email Address"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="forgot__password">Forgot password?</div>
                        <button type="submit" className="sign__btn">
                            Sign In
                        </button>
                        <div className="tosingup">
                            Don't have an account? &nbsp;
                            <span onClick={() => setOpen(!open)}>Sign Up</span>
                        </div>
                    </form>
                </section>
            </main>
        </>
    );
};

export default SignIn;
