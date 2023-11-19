import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"

function SearchBar(props) {
    const { search } = props;
    const [text, setText] = useState(search);
    return (
        <div className="d-flex">
            <input 
                value={text} 
                placeholder="Enter Search Text..."
                className="form-control w-100"
                onChange={(e) => setText(e.target.value)}
            />
            <button type="button" class="btn btn-outline-secondary ms-2">
                    <Link
                        key={text}
                        to={text === '' ? `/search` :`/Results/${text}`}
                        className="text-decoration-none text-secondary"
                    >
                        Search
                    </Link>
            </button>
        </div>
    );
}

export default SearchBar;