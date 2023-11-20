import React, { useEffect, useState } from "react";
import "./index.css"
import SearchBar from "./SearchBar";
import '../global.css'

function Search() {

    const ICON_URL = "https://static.vecteezy.com/system/resources/thumbnails/001/200/758/small/music-note.png";
    const SEARCH_ICON_URL = "https://cdn-icons-png.flaticon.com/512/482/482631.png"
    return (
        <div className="d-flex flex-column align-items-center justify-content-center search-bar-container ">
            <div className="d-flex flex-row align-items-center justify-content-center mb-3">
                <img src={SEARCH_ICON_URL}
                 class="card-img" alt="..."></img>
                <img src={ICON_URL}
                 class="card-img" alt="..."></img>
            </div>
            <SearchBar search={''}/>
        </div>
        
    );
}

export default Search;