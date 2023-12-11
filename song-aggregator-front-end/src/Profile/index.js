import 'bootstrap/dist/css/bootstrap.min.css';
import './/index.css'
import react, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { FaGripLines, FaUserCircle, FaLink, FaExternalLinkSquareAlt, FaPencilAlt, FaSearch } from "react-icons/fa";
import * as client from '../GlobalClient';

function Profile() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    const [following, setFollowing] = useState([]);

    const getCurrentUser = async (userId) => {
        const cu = await client.findUserById(userId);
        setCurrentUser(cu);
        fetchFollowing(userId);
    };

    const follow = async () => {
        await client.createUserFollowsUser(user._id, currentUser._id);
    };
    const fetchFollowing = async (userId) => {
        const following = await client.findUsersFollowedByUser(userId);
        setFollowing(following);
    };
    const unfollow = async () => {
        await client.deleteUserFollowsUser(user._id, currentUser._id);
    };

    const fetchAccount = async () => {
        const usr = await client.account();
        setUser(usr);
    };

    useEffect(() => {
        fetchAccount();
        getCurrentUser(userId);
    }, []);

    const date = currentUser && currentUser.dob ? currentUser.dob.substring(0, 10) : "unknown";
    const editProfile = currentUser && user && currentUser._id == user._id;
    const editProfileLink = "/EditProfile/" + userId;

    return (
        <div className="content-container-profile">
            <div id="account-options">
                <div className="profile-header">
                    <h3> <FaGripLines className='text-light' />{currentUser && currentUser.firstName + " " + currentUser.lastName}'s Profile </h3>
                </div>
                <hr className="hr-line" />
            </div>
            <div>
                <div id="profile-section">
                    <FaUserCircle className="fs-1" />
                    <h3>{currentUser && currentUser.firstName + " " + currentUser.lastName}</h3>
                    {user
                        ? (<div>
                            <h4>Contact</h4>
                            <p>Email: {currentUser && currentUser.email}</p>
                            <h4>Biography</h4>
                            <p>Born on: {date}</p>
                            <p>Role: {currentUser && currentUser.role}</p>
                        </div>)
                        : (<div className='warning'>
                            <h4> WARNING!</h4>
                            <p>Must be signed in to see private/sensitive info.</p>
                        </div>)}
                    <h4>Following</h4>
                    {/* <div className="list-group">
                        {following.map((follows) => (
                            <Link
                                key={follows.followed._id}
                                className="list-group-item"
                                to={`/project/users/${follows.followed._id}`}
                            >
                                {follows.followed.firstName} {follows.followed.lastName} (@
                                {follows.followed.username})
                            </Link>
                        ))}
                    </div> */}
                    <h4>Liked Songs</h4>
                    <ul>
                        <li>
                            <FaLink />
                            <a href="https://www.youtube.com/webdevtv">Youtube</a>
                            <FaExternalLinkSquareAlt />
                        </li>
                    </ul>
                </div>
                <div className="edit-profile-button">
                    {user && (<button className="btn btn-success" onClick={follow}>
                        Follow
                    </button>)}
                    {user && (<button className="btn btn-danger" onClick={unfollow}>
                        Unfollow
                    </button>)}
                    {editProfile && (<Link to={editProfileLink} className="btn btn-secondary">
                        <FaPencilAlt className='fa-rotate-270' />
                        Edit Profile</Link>)}
                    <Link to="/AllUsers" className="btn btn-info">
                        <FaSearch />
                        Show All Users</Link>
                </div>
            </div>
        </div>
    )
}
export default Profile;