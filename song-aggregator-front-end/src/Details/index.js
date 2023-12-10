import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchSong } from "./client";
import { addSong, findByUserName, findSong } from "../GlobalClient";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

function Details() {
    const { artistName, songName } = useParams();

    const [artist, setArtist] = useState(null);

    const [localTrack, setLocalTrack] = useState({
        ArtistName: "", 
        SongName: ""
    });

    
    useEffect(() => {
        findByUserName(artistName)
            .then((user) => setArtist(user))             
            .catch((e) => console.log(e));
        
        findSong(artistName, songName)
            .then((response) => { 
                if (response) {
                    setLocalTrack(response);
                } else {
                    fetchSong(songName, artistName)
                    .then((response) => {
                        const songObj = { ArtistName: artistName, SongName: songName}
                        if (artist) {
                            songObj["ArtistId"] = artist._id;
                        }
                        console.log(response)
                        if ("wiki" in response) {
                            const arefIndex = response.wiki.summary.indexOf("<a href");
                            songObj["SongDescription"] = response.wiki.summary
                                .slice(0, arefIndex != -1 ? arefIndex : response.wiki.summary.length);
                        }
                        if ("album" in response) {
                            songObj["ImageURL"] = response.album.image["3"]["#text"];
                        } 
                        addSong(songObj)
                            .then((response) => setLocalTrack(response))
                            .catch((e) => console.log(e));
                    });
                }
            });
    }, []);

    
    
    return (
        <div className="d-flex flex-row details-page-container">
            <div className="d-flex flex-column card song-info-card rounded-4 ">
                {"ImageURL" in localTrack && 
                    <img src={localTrack.ImageURL}
                        className="card-img-top" alt="..."></img>
                }
                <h4 className="font-weight-bold">
                    {localTrack.SongName}
                </h4>
                <h5>
                    {localTrack.ArtistName /* conditionally make think link to artist page if possible*/}
                </h5>
                <p>
                    {localTrack.SongDescription}
                </p>
            </div>

            <div>
                
            </div>
        </div>
        
    );
}

export default Details;