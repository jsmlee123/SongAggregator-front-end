import 'bootstrap/dist/css/bootstrap.min.css';
import '../global.css'
import react, { useState, useEffect } from "react";
import { FaPencilAlt, FaUserCircle,  } from "react-icons/fa";
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as client from '../GlobalClient';

function EditSong() {
    const navigate = useNavigate();

    const { sid } = useParams();
    const [song, setSong] = useState(null);
    const [user, setUser] = useState(null);

    const getCurrentSong = async (sid) => {
        const song = await client.findSongById(sid);
        setSong(song);
    };

    const updateSong = async () => {
        await client.updateSong(song._id, song);
        navigate(-1);
      };

    const fetchAccount = async () => {
        const usr = await client.account();
        setUser(usr);
    };

    useEffect(() => {
        fetchAccount();
        getCurrentSong(sid);
    }, []);

    return (
        <div className="d-flex flex-column align-items-center justify-content-center search-bar-container ">
            <div className="d-flex flex-column align-items-left justify-content-top all-users-card rounded-5">
                <div> {user != null ? 
                    <div className="content-container-edit-profile">
                        <div className="profile-section">
                            <FaUserCircle className='fs-1'/>
                        <div className="mb-3">
                            <label htmlFor="text-fields-songName" className="form-label">Song Name:</label>
                            <input value={song && song.SongName} onChange={(e) => setSong({ ...song, SongName: e.target.value })}
                            id="text-fields-songName" className="form-control" type="text" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="text-fields-songDescription" className="form-label">Song Description:</label>
                            <input value={song && song.SongDescription} onChange={(e) => setSong({ ...song, SongDescription: e.target.value })}
                            id="text-fields-songDescription" className="form-control" type="text"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="text-fields-songURL" className="form-label">Song URL:</label>
                            <input value={song && song.SongURL} onChange={(e) => setSong({ ...song, SongURL: e.target.value })}
                            id="text-fields-songURL" className="form-control" type="text" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="text-fields-imageURL" className="form-label">Image URL:</label>
                            <input value={song && song.ImageURL} onChange={(e) => setSong({ ...song, ImageURL: e.target.value })}
                            id="text-fields-imageURL" className="form-control" type="text" />
                        </div>
                    </div>
                    <div className="edit-profile-button">
                        <div className="float-end">
                        <button onClick={updateSong} className="btn btn-success ms-2">
                                <FaPencilAlt className='fa-rotate-270'/>
                                Save Changes</button>
                            <Link onClick={() => navigate(-1)} className="btn btn-secondary ms-2">
                                <FaPencilAlt className='fa-rotate-270'/>
                                Cancel Editing
                            </Link>
                        </div>
                    </div>
                    </div>
                : <h1>Must Be Signed In To Edit Song</h1>}
                </div>
            </div>
        </div>
    )
}
export default EditSong;