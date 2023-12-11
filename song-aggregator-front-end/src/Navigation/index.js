import React, { useEffect, useState } from "react";
import { RiDashboard3Line } from "react-icons/ri";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaHome, FaSearch, FaSignInAlt } from "react-icons/fa";

import "./index.css"
import { Link, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as client from '../GlobalClient';

function NavBar() {
    const { pathname } = useLocation();
    const [user, setUser] = useState(null);
    const fetchAccount = async () => {
        const usr = await client.account();
        setUser(usr);
    };
    
    useEffect(() => {
        fetchAccount();
    }, [user]);

    const profileLink = (user == null ? "AllUsers" : "Profile/" + user._id);


    const associatedLinks = {
        "Login": ["Login", "signup"] ,
        "Profile": ["AllUsers", "Profile"],
        "Home": ["Home"],
        "Search": ["Details", "Results", "Search"]
    }

    const links = [
        "Home", 
        "Profile",
        "Search", 
        "Login"
    ];

    const pathNameContainsLink = (association) => {
        for (const link of associatedLinks[association]) {
            if (pathname.includes(link)) {
                return true;
            }
        }
        return false;
    }

    const linksToIconsMap = {
        Home: <FaHome className="fs-1 text" />,
        Profile: <MdOutlineAccountCircle className="fs-1 text" />,
        Dashboard: <RiDashboard3Line className="fs-1 text" />,
        Search: <FaSearch className="fs-1 text" />,
        Login: <FaSignInAlt className="fs-1 text" />,
      };
    

    const ICON_URL = "https://us.123rf.com/450wm/soloviivka/soloviivka1606/soloviivka160600001/59688426-music-note-vector-icon-white-on-black-background.jpg";


    return (
        <div className="side-bar">
            <img src={ICON_URL}
                className="card-img-top" alt="..."></img>
            {links.map((link, index) => (
                <Link
                    key={index}
                    
                    to={`/${link === "Profile" ? profileLink : link}`}
                    className={`text-decoration-none text-center text-info ${
                        pathNameContainsLink(link) && "active"
                    }`}
                    onClick={fetchAccount}
                >
                    <div className={` ${pathNameContainsLink(link) && "active"}`}>
                        {linksToIconsMap[link]}
                        <span className={`${pathNameContainsLink(link) && "active"}`}>
                            {" " + link}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default NavBar;