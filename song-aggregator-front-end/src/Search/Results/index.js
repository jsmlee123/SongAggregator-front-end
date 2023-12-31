import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import SearchBar from "../SearchBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchSong } from "./client";
import { Link } from "react-router-dom";
import "../index.css"



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
            <div className="mt-4">
                <SearchBar search={searchCriteria} callback={getSearchResults} />
                <div className="ms-2 mt-2 mb-3">
                    <h5>
                        Showing {tracks.length} Results -
                    </h5>
                </div>
                <div className="d-flex flex-column flex-shrink-1">
                    {Object.keys(tracks).map((key) => {
                        return (
                            <Link
                                key={`${tracks[key].name} - ${tracks[key].artist}`}
                                to={`/Details/${tracks[key].artist}/${tracks[key].name}`}
                                className="text-decoration-none text-dark "
                            >
                                <div className="d-flex flex-row card rounded-5 mt-1 card-container">
                                    <div className="card-body rounded-5 card-container">
                                        <span className="">
                                            {tracks[key].name} - {tracks[key].artist}
                                        </span>
                                        <div className="float-end me-5">
                                            Listeners: {tracks[key].listeners}
                                        </div>
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