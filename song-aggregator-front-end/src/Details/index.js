import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchSong } from "./client";
import { addSong, findByUserName } from "../GlobalClient";

function Details() {
    const { artistName, songName } = useParams();

    const [track, setTrack] = useState({});
    const [artist, setArtist] = useState(null);
    const [localTrack, setLocalTrack] = useState({});

    
    useEffect(() => {
        
        findByUserName(artistName)
            .then((user) => setArtist(user))             
            .catch((e) => console.log(e));

        fetchSong(songName, artistName)
            .then((response) => setTrack(response))
            .then(() => {
                const songObj = { ArtistName: artistName, SongName: songName}
                if (artist) {
                    songObj["ArtistId"] = artist._id;
                }
                addSong(songObj)
                    .then((response) => console.log(response))
                    .catch((e) => console.log(e));
            });
    }, []);

    
    
    return (
        <div>
            {track.name}
        </div>
    );
}

export default Details;