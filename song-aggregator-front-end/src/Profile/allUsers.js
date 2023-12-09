import React, { useState, useEffect } from "react";
import * as client from "./client";
import { Link } from "react-router-dom";
import { BsTrash3Fill, BsFillCheckCircleFill, BsPencil, BsPlusCircleFill }
    from "react-icons/bs";
function AllUsers() {
    const [users, setUsers] = useState([]);
    const deleteUser = async (user) => {
        try {
            await client.deleteUser(user);
            setUsers(users.filter((u) => u._id !== user._id));
        } catch (err) {
            console.log(err);
        }
    };

    const [user, setUser] = useState({ username: "", password: "", role: "USER" });
    const createUser = async () => {
        try {
            const newUser = await client.createUser(user);
            setUsers([newUser, ...users]);
        } catch (err) {
            console.log(err);
        }
    };
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };
    const selectUser = async (user) => {
        try {
            const u = await client.findUserById(user._id);
            setUser(u);
        } catch (err) {
            console.log(err);
        }
    };
    const updateUser = async () => {
        try {
            const status = await client.updateUser(user);
            setUsers(users.map((u) => (u._id === user._id ? user : u)));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => { fetchUsers(); }, []);
    return (
        <div className="content-container-profile">
            <h1>All Users</h1>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>
                                <button className="btn btn-info">
                                    <Link to="/Profile">
                                    <BsPencil />
                                    </Link>
                                </button>
                            </td>
                        </tr>))}
                </tbody>
            </table>
        </div>
    );
}
export default AllUsers;