import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"

function SearchBar(props) {
    const { search, callback } = props;
    const [text, setText] = useState(search);

    return (
        <div className="d-flex">
            <input 
                value={text} 
                placeholder="Enter Search Text..."
                className="form-control w-100"
                onChange={(e) => setText(e.target.value)}
            />
            <button 
                type="button" 
                class="btn btn-secondary ms-2"
                onClick={callback}
            >
                    <Link
                        key={text}
                        to={text === '' ? `/Search` :`/Results/${text}`}
                        className="text-decoration-none text-dark"
                    >
                        Search
                    </Link>
            </button>
        </div>
    );
}

export default SearchBar;