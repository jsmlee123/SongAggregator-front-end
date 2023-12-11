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
    const [likedSongs, setLikedSongs] = useState([]);
    const [artistSongs, setArtistSongs] = useState([]);

    const getCurrentUser = async (userId) => {
        const cu = await client.findUserById(userId);
        setCurrentUser(cu);
        fetchFollowing(userId);
        fetchLikedSongs(userId);
        fetchArtistSongs(userId);
        console.log(artistSongs);
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

    const fetchLikedSongs = async (userId) => {
        const liked = await client.findSongsLikedByUser(userId);
        setLikedSongs(liked);
    }

    const fetchArtistSongs = async (userId) => {
        const songs = await client.findAllSongsByArtist(userId);
        setArtistSongs(songs);
        console.log(songs);
    }

    useEffect(() => {
        fetchAccount();
        getCurrentUser(userId);
    }, [userId]);

    const date = currentUser && currentUser.dob ? currentUser.dob.substring(0, 10) : "unknown";
    const editProfile = currentUser && user && currentUser._id == user._id;
    const editProfileLink = "/EditProfile/" + userId;
    const isListener = currentUser && currentUser.role == "LISTENER";

    return (
        <div className="content-container-profile">
            <div id="account-options">
                <div className="profile-header">
                    <h3> <FaGripLines className='text-light' />{currentUser && currentUser.username}'s Profile </h3>
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
                    <div>
                        <ul>
                            {following.map((follows) => (
                                <li key={follows._id}>
                                    <Link
                                        key={follows._id}
                                        className="list-group-item"
                                        to={`/Profile/${follows._id}`}
                                    >
                                        {follows.firstName} {follows.lastName}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        {isListener ? <div>
                            <h4>Liked Songs</h4>
                            <ul>
                                {likedSongs.map((song) => {
                                    <li>
                                    <Link
                                        key={song._id}
                                        className="list-group-item"
                                        to={`Details/${song.ArtistName}/${song.SongName}`}
                                    >
                                        {song.SongName} by {song.ArtistName}
                                    </Link>
                                    </li>
                                    })}
                            </ul>
                        </div>
                            : <div>
                                <h4>Songs</h4>
                                <ul>
                                    {artistSongs.map((song) => (
                                    <li key={song._id}>
                                    <Link
                                        key={song._id}
                                        className="list-group-item"
                                        to={`/Details/${song.ArtistName}/${song.SongName}`}
                                    >
                                        {song.SongName}
                                    </Link>
                                    </li>
                                    ))}
                                </ul>
                            </div>}
                    </div>
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