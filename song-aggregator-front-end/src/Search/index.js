import React, { useEffect, useState } from "react";
import "./index.css"
import SearchBar from "./SearchBar";

function Search() {
    return (
        <div className="d-flex flex-column  align-items-center justify-content-center border search-bar-container ">
            <span className="mb-3">
                Search for Songs
            </span>
            <SearchBar search={''}/>
        </div>
        
    );
}

export default Search;