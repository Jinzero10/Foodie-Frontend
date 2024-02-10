import "./Styles/App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./Components/Layout";
import PrivateRoutes from "./Components/PrivateRoutes";

import Home from "./Pages/home/Home";
import Menu from "./Pages/Menu/Menu";
import Profile from "./features/users/Profile";
import Cart from "./features/cart/Cart";
import ViewMenu from "./Pages/Menu/ViewMenu";

import UsersLayout from "./features/users/UsersLayout";
import UserList from "./features/users/UserList";
import UserOrder from "./Pages/Orders/UserOrder";
import VeiwUserDetails from "./features/users/VeiwUserDetails";

import CategoryList from "./features/category/CategoryList";

import ProductsLayout from "./features/product/ProductsLayout";
import ProductList from "./features/product/ProductList";
import AddProduct from "./features/product/AddProduct";
import UpdateProduct from "./features/product/UpdateProduct";

import OrderList from "./features/orders/OrderList";

import Admin from "./Pages/admin/Admin";
import Dashboard from "./Pages/admin/Dashboard";

import NotFound from "./Pages/NotFound";

function App() {
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                closeOnClick={true}
                pauseOnHover={false}
                draggable={true}
                progress={undefined}
                theme="light"
                pauseOnFocusLoss={false}
            />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="menu" element={<Menu />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="viewmenu" element={<ViewMenu />} />
                    <Route path="userorder/:filter?" element={<UserOrder />} />

                    {/* Protected private Routes  for user profile*/}
                    <Route
                        path="profile"
                        element={<PrivateRoutes allowedRoles={[100, 101]} />}
                    >
                        <Route index element={<Profile />} />
                    </Route>

                    {/*admin route */}
                    <Route element={<PrivateRoutes allowedRoles={[101]} />}>
                        <Route path="admin" element={<Admin />}>
                            <Route index element={<Dashboard />} />

                            <Route path="product" element={<ProductsLayout />}>
                                <Route index element={<ProductList />} />
                                <Route
                                    path="addproduct"
                                    element={<AddProduct />}
                                />
                                <Route
                                    path="updateproduct"
                                    element={<UpdateProduct />}
                                />
                            </Route>

                            <Route path="orders" element={<OrderList />} />

                            <Route path="category" element={<CategoryList />} />

                            <Route path="userlist" element={<UsersLayout />}>
                                <Route index element={<UserList />} />
                                <Route
                                    path="veiwuser"
                                    element={<VeiwUserDetails />}
                                />
                            </Route>
                        </Route>
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
