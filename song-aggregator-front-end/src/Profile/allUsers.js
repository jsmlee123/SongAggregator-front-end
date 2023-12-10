import React, { useState, useEffect } from "react";
import * as client from "./client";
import { Link } from "react-router-dom";
import { BsTrash3Fill, BsFillCheckCircleFill, BsPencil, BsPlusCircleFill }
    from "react-icons/bs";
function AllUsers() {
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
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
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.role}</td>
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