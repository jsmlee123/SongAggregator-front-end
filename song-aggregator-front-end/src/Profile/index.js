import 'bootstrap/dist/css/bootstrap.min.css';
import './/index.css'
import react, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { FaGripLines, FaUserCircle, FaLink, FaExternalLinkSquareAlt, FaPencilAlt, FaSearch } from "react-icons/fa";
import * as client from '../GlobalClient';

function Profile() {
    const [account, setAccount] = useState(null);
    const { userId } = useParams();
    const [ currentUser, setCurrentUser ] = useState(null);
    const navigate = useNavigate();
    // const [account, setAccount] = useState(null);
    // const navigate = useNavigate();

    // const fetchFollowers = async (userId) => {
    //     const followers = await followsClient.findUsersFollowingUser(userId);
    //     setFollowers(followers);
    //   };

      const getCurrentUser = async (userId) => {
        const cu = await client.findUserById(userId);
        setCurrentUser(cu);
      };

    const [user, setUser] = useState(null);

    const fetchAccount = async () => {
        const usr = await client.account();
        setUser(usr);
    };

    useEffect(() => {
        fetchAccount();
        getCurrentUser(userId);
    }, []);
    
    const follow = async () => {
        // try {
        //   await client.signup(credentials);
        //   navigate("/project/account");
        // } catch (err) {
        //   setError(err.response.data.message);
        // }
    };
    const unfollow = async () => {
        // try {
        //   await client.signup(credentials);
        //   navigate("/project/account");
        // } catch (err) {
        //   setError(err.response.data.message);
        // }
    };
    const signedIn = account !== null;
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
                    {signedIn
                     ? ( <div>
                        <h4>Contact</h4>
                    <p>Email: annunziatio.jose@gmail.com</p>
                    <h4>Biography</h4>
                    <p>Born on: 01/01/2020</p> 
                    <p>Role: Listener</p>
                    </div>)
                    :(<div className='warning'>
                        <h4> WARNING!</h4>
                        <p>Must be signed in to see private/sensitive info.</p>
                         </div>) }
                    <h4>Following</h4>
                    <ul>
                        <li>
                            <FaLink />
                            <a href="https://www.youtube.com/webdevtv">Youtube</a>
                            <FaExternalLinkSquareAlt />
                        </li>
                    </ul>
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
                    {signedIn && (<button className="btn btn-success" onClick={follow}>
                        Follow
                    </button>)}
                    {signedIn && (<button className="btn btn-danger" onClick={unfollow}>
                        Unfollow
                    </button>)}
                    {currentUser && (<Link to="/EditProfile" className="btn btn-secondary">
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