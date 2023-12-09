import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import SearchBar from "../SearchBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchSong } from "./client";
import { Link } from "react-router-dom";


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
            <div className="mt-2">
                <SearchBar search={searchCriteria} callback={getSearchResults} />
                <div className="d-flex flex-column flex-shrink-1">
                    {Object.keys(tracks).map((key) => {
                        return (
                            <Link
                                key={tracks[key].name}
                                to={`/details/${tracks[key].artist}/${tracks[key].name}`}
                                className="text-decoration-none text-dark"
                            >
                                <div className="card rounded-0 mt-1">
                                    <div class="card-body ">
                                        {tracks[key].name} - {tracks[key].artist}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Results;