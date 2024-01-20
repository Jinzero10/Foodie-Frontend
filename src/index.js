import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./features/app/store";
import { Provider } from "react-redux";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartProvider from "./hooks/useCart";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <CartProvider>
                    <Routes>
                        <Route path="/*" element={<App />} />
                    </Routes>
                </CartProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
