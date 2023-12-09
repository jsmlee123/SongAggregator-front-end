import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import SearchBar from "../SearchBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchSong } from "./client";


function Results() {
    const { searchCriteria } = useParams();

    const [tracks, setTracks] = useState([]);

    const getSearchResults = () => {
        fetchSong(searchCriteria)
        .then((tracks) => setTracks(tracks))
        .catch((e) => console.log(e));
    }

    useEffect(() => {
        getSearchResults();
    }, []);
    
    return (
        <div className="container d-flex flex-column">
            <SearchBar search={searchCriteria} callback={getSearchResults} />
            <div>
                {Object.keys(tracks).map((key) => {
                    return (
                        <div >
                            {tracks[key].name} {tracks[key].artist}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Results;