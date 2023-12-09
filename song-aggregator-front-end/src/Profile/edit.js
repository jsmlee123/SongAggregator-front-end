import 'bootstrap/dist/css/bootstrap.min.css';
import '../global.css'
import { FaPencilAlt, FaUserCircle,  } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

function EditProfile() {
    const navigate = useNavigate();
    const saveChanges = async () => {
      navigate("/Profile");
    };
    return (
        <div className="content-container-profile">
            <div class="profile-section">
                <FaUserCircle className='fs-1'/>
            <div class="mb-3">
                <label for="text-fields-firstName" class="form-label">First Name:</label>
                <input id="text-fields-firstName" class="form-control" type="text" value="Jose" />
            </div>
            <div class="mb-3">
                <label for="text-fields-lastName" class="form-label">Last Name:</label>
                <input id="text-fields-lastName" class="form-control" type="text" value="Annunziato" />
            </div>
            <div class="mb-3">
                <label for="text-fields-email" class="form-label">Email:</label>
                <input id="text-fields-email" class="form-control" type="text" value="annunziato.jose@gmail.com" />
            </div>
            <div class="mb-3">
                <label for="text-fields-dob" class="form-label">Date of Birth:</label>
                <input id="text-fields-dob" class="form-control" type="date" value="2000-01-01" />
            </div>
        </div>
        <div class="edit-profile-button">
            <div class="float-end">
            <button onClick={saveChanges} class="btn btn-success">
                    <FaPencilAlt className='fa-rotate-270'/>
                    Save Changes</button>
                <Link to="/Profile" class="btn btn-secondary">
                    <FaPencilAlt className='fa-rotate-270'/>
                    Cancel Editing</Link>
            </div>
        </div>
        </div>
    )
}
export default EditProfile;