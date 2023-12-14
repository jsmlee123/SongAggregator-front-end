import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Add this line to import index.css
import * as client2 from './client2';
import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import * as client from '../GlobalClient';

import { Link } from 'react-router-dom';

function Home() {
  const [currentUser, setCurrentUser] = useState(null);

  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);

  //listener
  const [following, setFollowing] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [reviewSong, setReviewSong] = useState([]);

  // artist
  const [artistSongs, setArtistSongs] = useState([]);

  // listener
  const fetchFollowing = async (userId) => {
    const following = await client.findUsersFollowedByUser(userId);
    setFollowing(following);
  };

  const fetchLikedSongs = async (userId) => {
    const liked = await client.findSongsLikedByUser(userId);
    setLikedSongs(liked);
  };

  const fetchReviews = async (userId) => {
    const reviews = await client2.fetchReviewByUser(userId);
    setReviews(reviews);
    return reviews;
  };

  const fetchAlbums = async () => {
    const data = await client2.testFetchAlbums();

    const parsedData = data.albums.album.map((album, index) => ({
      index: index + 1,
      name: album.name,
      artist: album.artist.name,
    }));
    setAlbums(parsedData);
  };

  const fetchReviewSongs = async (reviews) => {
    const revSongs = [];

    for (const review of reviews) {
      revSongs.push(await client2.fetchSongInfo(review.SongId));
    }

    console.log(revSongs);

    return revSongs;
  };

  const fetchSongs = async () => {
    const data = await client2.testFetchSongs();

    const parsedData = data.tracks.track.map((track, index) => ({
      index: index + 1,
      name: track.name,
      artist: track.artist.name,
    }));

    setSongs(parsedData);
  };

  const fetchSongsInfo = async (reviews) => {
    fetchReviewSongs(reviews).then((revSongs) => setReviewSong(revSongs));
  };

  const fetchAccount = async () => {
    const usr = await client.account();
    setCurrentUser(usr);
    return usr;
  };

  // artist
  const fetchArtistSongs = async (userId) => {
    const songs = await client.findAllSongsByArtist(userId);
    setArtistSongs(songs);
  };

  useEffect(() => {
    fetchAccount().then((usr) => {
      if (usr) {
        fetchFollowing(usr._id);
        fetchLikedSongs(usr._id);
        fetchReviews(usr._id).then((reviews) => fetchSongsInfo(reviews));
      }
      if (usr && usr.role === 'ARTIST') fetchArtistSongs(usr._id);
    });

    fetchAlbums();
    fetchSongs();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center search-bar-container">
      
      <div className="d-flex flex-row align-items-left justify-content-start all-users-card rounded-5">
        <div className='d-flex flex-column me-5'>
         <h1 className='mb-5'>
            Song Aggregator
         </h1>
         <h2>
            {' '}
            Welcome back {' '}
            {currentUser && currentUser.username
              ? currentUser.username
              : 'Anonymous User'}{' '}!
          </h2>
          
          <div className='d-flex flex-column top-ten-card align-items-start justify-items-start rounded-5 mt-4'>
            <h2 className='mt-2'>Top 10 Current Songs!</h2>
            <ol className='d-flex flex-grow-1 flex-column overflow-auto'>
                {songs.map((song) => (
                  <li key={song.index}>
                    <Link
                      key={"top_10_" + song._id}
                      className="list-group-item mb-2"
                      to={`/Details/${song.artist}/${song.name}`}
                    >
                      {song.name} by {song.artist}
                    </Link>
                  </li>
                ))}
            </ol>
          </div>
        </div>
      {currentUser && currentUser.role === 'LISTENER' && (
        <div className="div-for-listener d-flex flex-column ">
          <div className="d-flex flex-column flex-grow-1">
              <div
                className="follows2-card rounded-5 ms-4 overflow-auto"
              >
                <h4>Following</h4>
                <div className='d-flex flex-column overflow-auto'>
                  {following.map((follows) => (
                    <Link
                      key={follows._id}
                      className="list-group-item"
                      to={`/Profile/${follows._id}`}
                    >
                      <span className="text-dark">
                        {follows.username + ' '}
                      </span>
                      <span className="text-secondary">
                        {follows.firstName} {follows.lastName}
                      </span>
                    </Link>
                  ))}
                </div>
                
              </div>

              <div
                className="info-card overflow-auto rounded-5 ms-4 mt-4"
              >
                <h4>Liked Songs</h4>
                {likedSongs.map((song) => (
                  <Link
                    key={song._id}
                    className="list-group-item"
                    to={`/Details/${song.ArtistName}/${song.SongName}`}
                  >
                    
                    {song.SongName} by {' ' + song.ArtistName}
                  </Link>
                ))}
              </div>

              <div
                className="follows2-card overflow-auto rounded-5 mt-4 ms-4"
                
              >
              <h4>My Reviews</h4>
              <ul>
                {reviews.map((review, index) => {
                  const reviewIndex = index + 1;
                  const songIndex =
                    index < reviewSong.length
                      ? index
                      : reviewSong.length - 1;

                  return (
                    <li key={review.id} className=''>                         
                      
                      {reviewSong && reviewSong[songIndex] ? (
                        <Link
                          key={"Review_" + reviewSong[songIndex].ArtistName + "_" + reviewSong[songIndex].SongName}
                          className="list-group-item"
                          to={`/Details/${reviewSong[songIndex].ArtistName}/${reviewSong[songIndex].SongName}`}
                        >
                          {' "' + review.review + '" '}
                          --
                          {' ' + reviewSong[songIndex].SongName}
                          {' by ' + reviewSong[songIndex].ArtistName}
                        </Link>
                      ) : (
                        <span>No song information</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
          
        
      )}
      {currentUser && currentUser.role === 'ARTIST' && (
        <div className="div-for-listener d-flex flex-column">
          <div className="table-container">
            <div className="d-flex">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="flex-container">
                  <div
                    className="follows2-card rounded-5 ms-4 overflow-auto"
                  >
                    <h4>Following</h4>
                    <div className='d-flex flex-column overflow-auto'>
                      {following.map((follows) => (
                        <Link
                          key={follows._id}
                          className="list-group-item"
                          to={`/Profile/${follows._id}`}
                        >
                          <span className="text-dark">
                            {follows.username + ' '}
                          </span>
                          <span className="text-secondary">
                            {follows.firstName} {follows.lastName}
                          </span>
                        </Link>
                      ))}
                    </div>
                    
                  </div>

                <div className="grid-container ms-4 mt-3">
                    <div
                      className="follows2-card overflow-auto rounded-5"
                    >
                      <h4>Liked Songs</h4>
                      {likedSongs.map((song) => (
                        <Link
                          key={song._id}
                          className="list-group-item"
                          to={`/Details/${song.ArtistName}/${song.SongName}`}
                        >
                          
                          {song.SongName} by {' ' + song.ArtistName}
                        </Link>
                      ))}
                    </div>

                    <div
                      className="follows2-card overflow-auto rounded-5 ms-4"
                    >
                      <h4>My Songs</h4>
                      <div className='overflow-auto'>
                        {artistSongs.map((song) => (
                        <Link
                          key={song._id}
                          className="list-group-item"
                          to={`/Details/${currentUser.username}/${song.SongName}`}
                        >
                          
                          {song.SongName}
                        </Link>
                        ))}
                      </div>
                     
                    </div>
                  </div>

                  <div
                    className="follows2-card overflow-auto rounded-5 mt-4 ms-4"
                    
                  >
                    <h4>My Reviews</h4>
                    {reviews.map((review, index) => {
                      const reviewIndex = index + 1;
                      const songIndex =
                        index < reviewSong.length
                          ? index
                          : reviewSong.length - 1;

                      return (
                        <div>                         
                          
                          {reviewSong && reviewSong[songIndex] ? (
                            <Link
                              key={"Review_" + reviewSong[songIndex].ArtistName + "_" + reviewSong[songIndex].SongName}
                              className="list-group-item"
                              to={`/Details/${reviewSong[songIndex].ArtistName}/${reviewSong[songIndex].SongName}`}
                            >
                              {' "' + review.review + '" '}
                              --
                              {' ' + reviewSong[songIndex].SongName}
                              {' by ' + reviewSong[songIndex].ArtistName}
                            </Link>
                          ) : (
                            <span>No song information</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      )}
      </div>

      
    </div>
  );
}

export default Home;
