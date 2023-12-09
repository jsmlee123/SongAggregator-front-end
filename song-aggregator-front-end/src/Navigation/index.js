import React, { useEffect, useState } from "react";
import { RiDashboard3Line } from "react-icons/ri";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaHome, FaSearch, FaSignInAlt } from "react-icons/fa";

import "./index.css"
import { Link, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
    const links = [
        "Home", 
        "Profile",
        "Search", 
        "Login"
    ];

    const linksToIconsMap = {
        Home: <FaHome className="fs-1 text" />,
        Profile: <MdOutlineAccountCircle className="fs-1 text" />,
        Dashboard: <RiDashboard3Line className="fs-1 text" />,
        Search: <FaSearch className="fs-1 text" />,
        Login: <FaSignInAlt className="fs-1 text" />,
      };
    const { pathname } = useLocation();

    const ICON_URL = "https://us.123rf.com/450wm/soloviivka/soloviivka1606/soloviivka160600001/59688426-music-note-vector-icon-white-on-black-background.jpg";
    
    const isActive = (link) => {
        return pathname.includes(link) 
            || (pathname.includes("Results") && link === "Search");
    }
    return (
        <div className="side-bar">
            <img src={ICON_URL}
                className="card-img-top" alt="..."></img>
            {links.map((link, index) => (
                <Link
                    key={index}
                    to={`/${link}`}
                    className={`text-decoration-none text-center text-info ${
                        pathname.includes(link) && "active"
                    }`}
                >
                    <div className={` ${isActive(link) && "active"}`}>
                        {linksToIconsMap[link]}
                        <span className={`${isActive(link) && "active"}`}>
                            {" " + link}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default NavBar;