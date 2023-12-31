import 'bootstrap/dist/css/bootstrap.min.css';
import '../global.css'
import react, { useState, useEffect } from "react";
import { FaPencilAlt, FaUserCircle,  } from "react-icons/fa";
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as client from '../GlobalClient';

function AddSong() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [ currentUser, setCurrentUser ] = useState(null);
    const [song, setSong] = useState(null);

      const getCurrentUser = async (userId) => {
        const cu = await client.findUserById(userId);
        setCurrentUser(cu);
        const artistName = cu && cu.username;
        const artistId = cu && cu._id;
        setSong({ ...song, ArtistName: artistName, ArtistId: artistId });
      };

    const [user, setUser] = useState(null);

    const addSong = async () => {
        await client.addSong(song);
        navigate(profileLink);
      };

    const fetchAccount = async () => {
        const usr = await client.account();
        setUser(usr);
    };

    useEffect(() => {
        fetchAccount();
        getCurrentUser(userId);
    }, []);
    
    const profileLink = "/Profile/" + userId;

    return (
        <div className="d-flex flex-column align-items-center justify-content-center search-bar-container ">
        <div className="d-flex flex-column align-items-left justify-content-top all-users-card rounded-5">
        <div> {user != null ? 
            <div className="content-container-edit-profile">
            <div className="profile-section">
                <FaUserCircle className='fs-1'/>
            <div className="mb-3">
                <label htmlFor="text-fields-songName" className="form-label">Song Name:</label>
                <input onChange={(e) => setSong({ ...song, SongName: e.target.value })}
                id="text-fields-songName" className="form-control" type="text" />
            </div>
            <div className="mb-3">
                <label htmlFor="text-fields-songDescription" className="form-label">Song Description:</label>
                <input onChange={(e) => setSong({ ...song, SongDescription: e.target.value })}
                id="text-fields-songDescription" className="form-control" type="text"/>
            </div>
            <div className="mb-3">
                <label htmlFor="text-fields-songURL" className="form-label">Song URL:</label>
                <input onChange={(e) => setSong({ ...song, SongURL: e.target.value })}
                id="text-fields-songURL" className="form-control" type="text" />
            </div>
            <div className="mb-3">
                <label htmlFor="text-fields-imageURL" className="form-label">Image URL:</label>
                <input onChange={(e) => setSong({ ...song, ImageURL: e.target.value })}
                id="text-fields-imageURL" className="form-control" type="text" />
            </div>
        </div>
        <div className="edit-profile-button">
            <div className="float-end">
            <button onClick={addSong} className="btn btn-success ms-2">
                    <FaPencilAlt className='fa-rotate-270'/>
                    Save Changes</button>
                <Link to={profileLink} className="btn btn-secondary ms-2">
                    <FaPencilAlt className='fa-rotate-270'/>
                    Cancel Editing</Link>
            </div>
        </div>
        </div>
        : <h1>Must Be Signed In To Add Song</h1>}
        </div>
        </div>
        </div>
    )
}
export default AddSong;