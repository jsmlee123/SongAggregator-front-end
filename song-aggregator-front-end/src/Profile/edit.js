import 'bootstrap/dist/css/bootstrap.min.css';
import '../global.css'
import react, { useState, useEffect } from "react";
import { FaPencilAlt, FaUserCircle} from "react-icons/fa";
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as client from '../GlobalClient';

function EditProfile() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [ currentUser, setCurrentUser ] = useState(null);
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

    const updateUser = async () => {
        await client.updateUser(user._id, user);
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
            <div class="profile-section">
                <FaUserCircle className='fs-1'/>
            <div class="mb-3">
                <label htmlFor="text-fields-firstName" class="form-label">First Name:</label>
                <input onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                id="text-fields-firstName" class="form-control" type="text" defaultValue={currentUser && currentUser.firstName} />
            </div>
            <div class="mb-3">
                <label htmlFor="text-fields-lastName" class="form-label">Last Name:</label>
                <input onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                id="text-fields-lastName" class="form-control" type="text" defaultValue={currentUser && currentUser.lastName} />
            </div>
            <div class="mb-3">
                <label htmlFor="text-fields-email" class="form-label">Email:</label>
                <input onChange={(e) => setUser({ ...user, email: e.target.value })}
                id="text-fields-email" class="form-control" type="text" defaultValue={currentUser && currentUser.email} />
            </div>
            <div class="mb-3">
                <label htmlFor="text-fields-dob" class="form-label">Date of Birth:</label>
                <input onChange={(e) => setUser({ ...user, dob: e.target.value })}
                id="text-fields-dob" class="form-control" type="date" defaultValue={currentUser && currentUser.dob} />
            </div>
        </div>
        <div className="edit-profile-button">
            <div className="float-end">
            <button onClick={updateUser} className="btn btn-success ms-2">
                    <FaPencilAlt className='fa-rotate-270'/>
                    Save Changes</button>
                <Link to={profileLink} className="btn btn-secondary ms-2">
                    <FaPencilAlt className='fa-rotate-270'/>
                    Cancel Editing</Link>
            </div>
        </div>
        </div>
        : <h1>Must Be Signed In To Edit</h1>}
        </div>
        </div>
        </div>
    )
}
export default EditProfile;