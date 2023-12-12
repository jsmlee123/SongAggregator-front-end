import 'bootstrap/dist/css/bootstrap.min.css';
import './/index.css'
import react, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { FaGripLines, FaUserCircle, FaPlus, FaPencilAlt, FaSearch } from "react-icons/fa";
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
    }

    useEffect(() => {
        fetchAccount();
        getCurrentUser(userId);
    }, [userId]);

    const date = currentUser && currentUser.dob ? currentUser.dob.substring(0, 10) : "unknown";
    const myProfile = currentUser && user && currentUser._id == user._id;
    const editProfileLink = "/EditProfile/" + userId;
    const addSongLink = "/AddSong/" + userId;
    const isListener = currentUser && currentUser.role == "LISTENER";

    return (
        <div className="d-flex flex-column align-items-center justify-content-center profile-container ">
            <div className="d-flex flex-column align-items-left justify-content-center profile-card rounded-5 overflow-auto">
                <div id="account-options">
                    <div className="profile-header">
                        <h3>{currentUser && currentUser.username}'s Profile </h3>
                    </div>
                    <hr className="hr-line" />
                </div>
                <div>
                    <div id="profile-section">
                        <FaUserCircle className="fs-1" />
                        <h3 className='mt-3'>{currentUser && currentUser.firstName + " " + currentUser.lastName}</h3>
                        {user
                            ? (<div>
                                <h4 className='mt-3'>Contact</h4>
                                <p>Email: {currentUser && currentUser.email}</p>
                                <h4>Biography</h4>
                                <p>Born on: {date}</p>
                                <p>Role: {currentUser && (currentUser.role === "ARTIST" ? "Artist" : "Listener")}</p>
                            </div>)
                            : (<div className='warning'>
                                <h4> WARNING!</h4>
                                <p>Must be signed in to see private/sensitive info.</p>
                            </div>)}
                        <h4 >Following</h4>
                        <div>
                            <div className='likes-card overflow-auto rounded-5 w-50 overflow-auto h-100'>
                                {following.map((follows) => (
                                    <Link
                                        key={follows._id}
                                        className="list-group-item"
                                        to={`/Profile/${follows._id}`}
                                    >
                                        <span className='text-dark'>{follows.username + " "}</span>
                                        <span className='text-secondary'>{follows.firstName} {follows.lastName}</span>
                                    </Link>
                                ))}
                            </div>
                       
                            {isListener ? <div className='mt-3'>
                                <h4 >Liked Songs</h4>
                                <div className='likes-card overflow-auto rounded-5 w-50 overflow-auto h-100'>
                                    {likedSongs.map((song) => (
                                        <Link
                                            key={song._id}
                                            className="list-group-item"
                                            to={`/Details/${song.ArtistName}/${song.SongName}`}
                                        >
                                            {song.SongName} by {song.ArtistName}
                                        </Link>
                                    ))}
                                </div>
  
                            </div>
                                : <div className='mt-3'>
                                    <h4>Songs</h4>
                                    <div className='likes-card overflow-auto rounded-5 w-50 h-100'>
                                        {artistSongs.map((song) => (
                                            <Link
                                                key={song._id}
                                                className="list-group-item"
                                                to={`/Details/${song.ArtistName}/${song.SongName}`}
                                            >
                                                {song.SongName}
                                            </Link>
                                        ))}
                                    </div>
                                </div>}
                        </div>
                    </div>
                    <div className="edit-profile-button">
                        {myProfile && (<Link to={editProfileLink} className="btn btn-secondary">
                            <FaPencilAlt className='fa-rotate-270' />
                            Edit Profile</Link>)}
                        {myProfile && (<Link to={addSongLink} className="btn btn-secondary ms-2">
                            <FaPlus />
                            Add Song</Link>)}    
                        {user && (<button className="btn btn-success ms-2" onClick={follow}>
                            Follow
                        </button>)}
                        {user && (<button className="btn btn-danger ms-2" onClick={unfollow}>
                            Unfollow
                        </button>)}
                        <Link to="/AllUsers" className="btn btn-info ms-2">
                            <FaSearch />
                            Show All Users</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile;