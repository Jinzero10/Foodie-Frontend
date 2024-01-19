import React from "react";
import { useDeleteUserMutation, useGetUsersQuery } from "./userApiSlice";
import "./userStyle/user.css";
import { toast } from "react-toastify";
import { BiSolidEditAlt, BiSolidTrash } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LargeLoading } from "../../Components/Loading";

const UserList = () => {
    const navigate = useNavigate();
    const {
        data: getUsers,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetUsersQuery();

    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

    //delete user
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure to delete the user")) {
            const res = await deleteUser(id).unwrap();

            toast.success(res.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    //get all user
    let content;
    if (isLoading) {
        content = <LargeLoading />;
    } else if (isSuccess) {
        content = getUsers.map((user) => {
            return (
                <ul key={user._id}>
                    <li>{user.name}</li>
                    <li>{user.email}</li>
                    <li>{user.phoneNumber}</li>
                    <li>{user.role === 101 ? "Admin" : "User"}</li>
                    <li>
                        <input defaultChecked={user.active} type="checkbox" />
                    </li>
                    <li className="userlist_action_btn">
                        <button
                            onClick={(e) =>
                                navigate("veiwuser", { state: user })
                            }
                            className="view__btn"
                        >
                            <FaEye />
                        </button>
                        <button onClick={(e) => {}} className="edit__btn">
                            <BiSolidEditAlt />
                        </button>
                        {isDeleting && <p>...Deleting</p>}
                        <button
                            onClick={(e) => {
                                handleDelete({
                                    id: user._id,
                                });
                            }}
                            className="delete__btn"
                        >
                            <BiSolidTrash />
                        </button>
                    </li>
                </ul>
            );
        });
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <section className="user__container">
            <div className="user__wrapper">
                <div className="userlist__header">
                    <ul>
                        <li>Name</li>
                        <li>Email</li>
                        <li>PhoneNumber</li>
                        <li>Role</li>
                        <li>Active</li>
                        <li>Actions</li>
                    </ul>
                </div>
                <div className="userlist__content">{content}</div>
            </div>
        </section>
    );
};

export default UserList;
