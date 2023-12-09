import 'bootstrap/dist/css/bootstrap.min.css';
import '../global.css'
import { FaGripLines } from "react-icons/fa";

function EditProfile() {
    return (
        <div>
            <div class="wd-profile-section">
            <i class="fas fa-user-circle fa-8x"></i>
            <div class="mb-3">
                <label for="text-fields-name" class="form-label">Name:*</label>
                <input id="text-fields-name" class="form-control" type="text" value="Jose Annunziato" />
            </div>
            <div class="mb-3">
                <label for="select-pronouns" class="form-label">Pronouns:</label>
                <select class="form-select" id="select-pronouns">
                    <option selected>None</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="text-fields-title" class="form-label">Title:</label>
                <input id="text-fields-title" class="form-control" type="text" /><br />
            </div>
            <h4>Contact</h4>
            <p>No registered services, you can add some on the <a href="#">settings</a> page.</p>
            <div class="mb-3">
                <h4>Biography</h4>
                <textarea class="form-control d-block" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <h4>Links</h4>
            <div class="container text-center">
                <div class="row">
                    <div class="col">
                        Title
                    </div>
                    <div class="col">
                        URL
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="mb-3">
                            <input id="link-title" class="form-control" type="text" value="Youtube" />
                        </div>
                    </div>
                    <div class="col-1">
                        <i class="fas fa-long-arrow-alt-right"></i>
                    </div>
                    <div class="col-6">
                        <div class="mb-3">
                            <input id="link-url" class="form-control" type="text" value="https:www.youtube.com"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <div class="wd-add-another-link">
                            <a href="#" class="btn btn-secondary btn-sm">
                                Add another link</a>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <hr/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">

                    </div>
                    <div class="col-4">
                        <div class="wd-add-another-link">
                            <a href="index.html" class="btn btn-secondary btn-sm">
                                Cancel</a>
                        </div>
                    </div>
                    <div class="col-5">
                        <div class="wd-add-another-link">
                            <a href="index.html" class="btn btn-danger btn-sm">
                                Save Profile</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="wd-edit-profile-button">
            <div class="float-end">
                <a href="index.html" class="btn btn-secondary">
                    <i class="fas fa-pencil-alt fa-rotate-270"></i>
                    Cancel Editing</a>
            </div>
        </div>
        </div>
    )
}
export default EditProfile;