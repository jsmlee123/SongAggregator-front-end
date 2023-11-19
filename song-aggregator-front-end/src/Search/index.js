import React, { useEffect, useState } from "react";
import "./index.css"
import SearchBar from "./SearchBar";
import '../global.css'

function Search() {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center content-container search-bar-container ">
            <span className="mb-3">
                Search for Songs
            </span>
            <SearchBar search={''}/>
        </div>
        
    );
}

export default Search;