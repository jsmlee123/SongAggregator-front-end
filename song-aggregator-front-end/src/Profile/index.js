import 'bootstrap/dist/css/bootstrap.min.css';
import '../global.css'
import { FaGripLines } from "react-icons/fa";

function Profile() {
    return (
        <div className="content-container">
            <div>
        <div class="wd-account-options">
            <div class="wd-profile-header">
                <h3> <FaGripLines/> Jose Annunziato's Profile </h3>
            </div>
            <hr class="wd-hr-line"/>
        </div>
        <div>
            <div class="wd-profile-section">
                <i class="fas fa-user-circle fa-8x"></i>
                <h3>Jose Annunziato</h3>
                <h4>Contact</h4>
                <p>No registered services, you can add some on the <a href="#">settings</a> page.</p>
                <h4>Biography</h4>
                <p>Faculty, Software Engineer, AI, Space, and renewables enthusiast.</p>
                <h4>Links</h4>
                <ul>
                    <li>
                        <i class="fas fa-link"></i>
                        <a href="https://www.youtube.com/webdevtv">Youtube</a>
                        <i class="fas fa-external-link-square-alt"></i>
                    </li>
                </ul>
            </div>
            <div class="wd-edit-profile-button">
                <div class="float-end">
                    <a href="edit.html" class="btn btn-secondary">
                        <i class="fas fa-pencil-alt fa-rotate-270"></i>
                        Edit Profile</a>
                </div>
            </div>
        </div>
    </div>
        </div>
    )
}
export default Profile;