import React, { useState, useEffect } from "react";
import * as client from "./client";
import { Link } from "react-router-dom";
import { BsTrash3Fill, BsFillCheckCircleFill, BsPencil, BsPlusCircleFill }
    from "react-icons/bs";


function AllUsers() {
    const [users, setUsers] = useState([]);
    const [text, setText] = useState("");
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };
    useEffect(() => { 
        fetchUsers(); 
    }, []);
    return (
        <div className="d-flex flex-column align-items-center justify-content-center search-bar-container">
            <div className="d-flex flex-column align-items-left justify-content-center all-users-card rounded-5">
                <h1>All Users</h1>
                <input 
                    value={text}  
                    placeholder="Enter username or name..."
                    className="form-control w-100 rounded-5"
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="flex-grow-1 all_users_view_card overflow-auto rounded-5 mt-3">
                    {users
                        .filter((user) => (
                            user.username.startsWith(text) || 
                            (user.firstName + " " + user.lastName).startsWith(text)))
                        .map((user) => (
                        <div className="mb-2" key={`div_link_${user._id}`}>
                            <Link
                                key={`profile_link_${user._id}`}
                                to={`/Profile/${user._id}`}
                                className="text-decoration-none text-secondary"
                            >
                                <span className="text-dark">
                                    User: {user.username + " "}
                                </span>
                                
                                <span>
                                     {user.firstName} {user.lastName}
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
export default AllUsers;