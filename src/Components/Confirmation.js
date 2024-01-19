import React from "react";
import "./componentsStyle/confirmation.css";

const Confirmation = ({ confirmationProps, handling }) => {
    const { setShowConfirmation, wantTodo } = confirmationProps;

    const { id, handle } = handling;

    return (
        <div
            className="confirmation__container"
            onClick={() => setShowConfirmation(false)}
        >
            <div
                className="confirmation__card"
                onClick={(e) => e.stopPropagation()}
            >
                <div>
                    <span onClick={() => setShowConfirmation(false)}>X</span>
                </div>
                <div className="confirmation__content">
                    <div>
                        <p>{`Are you sure you want to ${wantTodo.msg} ?`}</p>
                    </div>
                    <div className="confirmation_btn_holder">
                        <button type="button" onClick={() => handle(id)}>
                            {wantTodo.btn}
                        </button>
                        <button
                            type="button"
                            className="confirmation_cancel_btn"
                            onClick={() => setShowConfirmation(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
