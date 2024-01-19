import React, { useState } from "react";
import SignIn from "../features/auth/SignIn";
import SignUp from "../features/users/SignUp";
import { useEffect } from "react";

const Authentication = () => {
    const [openSignUp, setOpenSignUp] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    useEffect(() => {
        if (openSignUp) {
            setShowLogin(!showLogin);
            setShowSignUp(!showSignUp);
        }
        setOpenSignUp(false);
        // eslint-disable-next-line
    }, [openSignUp]);

    useEffect(() => {
        if (openLogin) {
            setShowLogin(!showLogin);
            setShowSignUp(!showSignUp);
        }
        setOpenLogin(false);
        // eslint-disable-next-line
    }, [openLogin]);

    return (
        <>
            <button
                type="button"
                className="signin__btn"
                onClick={() => setShowLogin(true)}
            >
                Sign In
            </button>
            <button
                type="button"
                className="signup__btn"
                onClick={() => setShowSignUp(true)}
            >
                Sign Up
            </button>
            {showLogin && (
                <SignIn
                    showLogin={showLogin}
                    setShowLogin={setShowLogin}
                    open={openSignUp}
                    setOpen={setOpenSignUp}
                />
            )}

            {showSignUp && (
                <SignUp
                    showSignUp={showSignUp}
                    setShowSignUp={setShowSignUp}
                    open={openLogin}
                    setOpen={setOpenLogin}
                />
            )}
        </>
    );
};

export default Authentication;
