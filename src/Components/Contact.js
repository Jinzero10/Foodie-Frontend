import React, { useState } from "react";
import Title from "./Title";
import "./componentsStyle/contact.css";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState();
    return (
        <section className="contact" id="contact">
            <Title subTitle="Don't hesitate" mainTitle="Contact us" />
            <div className="contact__report">
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        name="name"
                        type="text"
                        value={name}
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        type="text"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="report">Report</label>
                    <textarea name="report" rows="5" />
                </div>
                <button type="button">Submit</button>
            </div>
        </section>
    );
};

export default Contact;
