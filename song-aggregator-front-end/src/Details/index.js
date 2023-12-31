import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchSong } from "./client";
import { Link, useLocation } from "react-router-dom";
import { account, addSong, createLike, createReview, deleteLike, deleteReview, deleteSng, findByUserName, findLikeByUserSong, findReviewsBySongID, findSong, findUserFromReviewId, findUserLikesBySong } from "../GlobalClient";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

function Details() {
    const { artistName, songName } = useParams();

    const [user, setUser] = useState(null);
    const [artist, setArtist] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [userReview, setUserReview] = useState("");
    const [localTrack, setLocalTrack] = useState({
        ArtistName: "", 
        SongName: "",
        SongDescription: ""
    });
    const [userLikes, setUserLikes] = useState([]);
    const [isSongLiked, setIsSongLiked] = useState(false);
    const navigate = useNavigate();


    const fetchIsUserLiked = async (sid) => {
        fetchAccount()
        .then((usr) =>{
            if (usr) {
                findLikeByUserSong(sid, usr._id)
                .then((like) => setIsSongLiked(like != null));
                
            }
        });
    };

    const deleteUserLiked = async (sid) => {
        fetchAccount()
        .then((usr) =>{
            if (usr) {
                deleteLike(sid, usr._id)
                .then(() => {
                    fetchIsUserLiked(sid);
                    fetchLikes(sid);
                });
            }
        });
    }

    const addUserLiked = async (sid) => {
        fetchAccount()
        .then((usr) =>{
            if (usr) {
                createLike(sid, usr._id)
                .then(() => {
                    fetchIsUserLiked(sid);
                    fetchLikes(sid);
                });
            }
        });
    };

    const deleteRev = async (rid) => {
        deleteReview(rid)
            .then(() => fetchReviews(localTrack._id));
    };

    const deleteSong = async () => {
        deleteSng(localTrack._id)
            .then(navigate("/Search"))
    };

    const editSong = async () => {
        navigate(`/EditSong/${localTrack._id}`)
    }

    const fetchAccount = async () => {
        const usr = await account();
        setUser(usr);
        return usr;
    };

    const fetchLikes = async (sid) => {
        const userLikes = await findUserLikesBySong(sid);
        setUserLikes(userLikes);
    };

    const fetchReviews = async (sid) => {
        const reviews = await findReviewsBySongID(sid);
        for (let i = 0; i < reviews.length; i++) {
            reviews[i]["user"] = await findUserFromReviewId(reviews[i]._id);
        }
        setReviews(reviews);
        return reviews;
    };

    const submitReview = async () => {
        createReview({review: userReview, UserId: user._id, SongId: localTrack._id})
            .then(() => fetchReviews(localTrack._id));
    };

    const isOwnSong = () => {
        return (user && artist && user._id === artist._id);
    };

    
    useEffect(() => {
        findByUserName(artistName)
            .then((user) => setArtist(user))             
            .catch((e) => console.log(e));
        
        fetchAccount();
        
        fetchSong(songName, artistName)
            .then((response) => {
                const songObj = { ArtistName: artistName, SongName: songName}
                if (artist) {
                    songObj["ArtistId"] = artist._id;
                }
                if (response && "wiki" in response) {
                    const arefIndex = response.wiki.summary.indexOf("<a href");
                    songObj["SongDescription"] = response.wiki.summary
                        .slice(0, arefIndex != -1 ? arefIndex : response.wiki.summary.length);
                }
                if (response && "album" in response) {
                    songObj["ImageURL"] = response.album.image["3"]["#text"];
                } 
                addSong(songObj)
                    .then((response) => {
                        setLocalTrack(response);
                        return response;
                    })
                    .then((response) => {
                        fetchReviews(response._id);
                        fetchLikes(response._id);
                        fetchIsUserLiked(response._id);
                    })
                    .catch((e) => console.log(e));  
            })
    }, []);


    
    return (
        <div className="d-flex flex-row justify-content-between details-page-container">
            <div className="d-flex flex-column card song-info-card rounded-4 overflow-auto">
                {("ImageURL" in localTrack) && 
                    <img src={localTrack.ImageURL}
                        className="card-img-top" alt="..."></img>
                }
                <h4 className="font-weight-bold">
                    <div>
                        <span>{localTrack.SongName}</span>
                        <div className="edit-song-buttons">
                            {isOwnSong() && (
                                <div>
                                    <button 
                                            type="button" 
                                            className={`btn mt-2 btn-success `}
                                            onClick={editSong}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                            type="button" 
                                            className={`btn mt-2 btn-danger ms-2 `}
                                            onClick={deleteSong}
                                    >
                                        Delete
                                    </button>
                                    
                                </div>
                                
                            )}
                        </div>
                    </div>
                   
                    
                </h4>
                <h5>
                    { artist ? 
                        <Link
                            key={"ArtistPF"}
                            to={`/Profile/${artist._id}`}
                            className={`text-decoration-none text-center text-info text-dark`}
                        > 
                            {localTrack.ArtistName}
                        </Link>
                        :
                        localTrack.ArtistName
                    }   
                </h5>
                <p>
                    {localTrack.SongDescription}
                </p>
            </div>

            <div className="d-flex flex-column card song-info-card rounded-4 ms-5 ">
                <h3>
                    Reviews
                </h3>
                <div className="overflow-auto">
                    {
                        reviews.map((rev,index) => {
                            return (
                            <div 
                                className="d-flex flex-column review-card rounded-5 justify-content-between mb-2 overflow-auto"
                                key={"review_card"+ index}>
                                <div>
                                    {rev.review}
                                </div>
                                <div className="d-flex flex-row justify-content-between">
                                    <Link
                                        key={rev._id}
                                        to={`/Profile/${rev.user._id}`}
                                        className={`text-decoration-none text-center text-info text-dark`}
                                    >   
                                        {"- " + rev.user.username +" "} 
                                        <span className="text-secondary">
                                            {rev.user.firstName + " " + rev.user.lastName}
                                        </span>

                                    </Link>
                                    { user && rev.user._id === user._id &&
                                        <button 
                                            type="button" 
                                            className={`btn mt-2 btn-danger `}
                                            onClick={() => deleteRev(rev._id)}
                                        >
                                            Delete
                                        </button>
                                    }
                                </div>
                            </div>);
                        })
                    }
                </div>
            </div>
            
            <div className="d-flex flex-column card song-info-card rounded-4 ms-5 overflow-auto">
                {user && 
                    <div>
                        <h4>Write a Review</h4>
                        <textarea 
                            className="form-control submit-review " 
                            id="reviewFormSubmission" 
                            rows="5"
                            onChange={(e) => setUserReview(e.target.value)}/>
                        <button 
                            type="button" 
                            className="btn btn-secondary mt-2"
                            onClick={submitReview}
                        >
                            Submit
                        </button>
                    </div>
                }
                <div className="mt-3">
                    <h3>
                        Liked By {userLikes.length} People
                    </h3>
                    <div className="likes-card overflow-auto rounded-5">
                        {userLikes.map((userLike) => (
                            <div>
                                <Link
                                    key={localTrack._id + "_" + userLike._id}
                                    to={`/Profile/${userLike._id}`}
                                    className={`text-decoration-none text-center text-info text-dark`}
                                >                           
                                    { userLike.username +" "} 
                                    <span className="text-secondary">
                                        {userLike.firstName + " " + userLike.lastName}
                                    </span>
                                    
                                    
                                </Link>
                            </div>
                        ))}
                    </div>
                    {user && 
                        <div className="mt-4">
                            <h3>
                                Like/Unlike Song
                            </h3>
                            <button 
                                type="button" 
                                className={`btn mt-2 ${isSongLiked ?  "btn-danger" : "btn-success"}`}
                                onClick={isSongLiked ? () => deleteUserLiked(localTrack._id) : () => addUserLiked(localTrack._id)}
                            >
                                {isSongLiked ? "Unlike" : "Like"}
                            </button>
                        </div>
                        
                    }
                </div>
            </div>
        </div>
        
    );
}

export default Details;