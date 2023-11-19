import React, { useEffect, useState } from "react";
import "./index.css"

function SearchBar(props) {
    const { search } = props;
    const [text, setText] = useState(search);
    return (
        <div>
            <input 
                value={text} 
                placeholder="Enter Search Text..."
                className="form-control"
                onChange={(e) => setText(e.target.value)}
            />
            
        </div>
    );
}

export default SearchBar;