import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Add this line to import index.css
import * as client2 from './client2';
import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import * as client from '../GlobalClient';

import { Link } from 'react-router-dom';

function Home() {
  const { currentUser } = useSelector((state) => state.user || {});

  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);

  //listener
  const [following, setFollowing] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [reviewSong, setReviewSong] = useState([]);

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
  };

  const fetchSongInfo = async (id) => {
    const response = await client2.fetchSongInfo(id);
    const parsedData = [
      {
        SongName: response.SongName,
        ArtistName: response.ArtistName,
      },
    ];
    console.log(parsedData);

    setReviewSong((prevState) => [...prevState, parsedData]);
  };

  useEffect(() => {
    const fetchAlbums = async () => {
      const data = await client2.testFetchAlbums();

      const parsedData = data.albums.album.map((album, index) => ({
        index: index + 1,
        name: album.name,
        artist: album.artist.name,
      }));
      setAlbums(parsedData);
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

    const fetchSongsInfo = async () => {
      if (currentUser !== null && currentUser.role === 'LISTENER') {
        reviews.map((review) => {
          fetchSongInfo(review.SongId);
        });
      }
    };

    if (currentUser !== null && currentUser.role === 'LISTENER') {
      fetchFollowing(currentUser._id);
      fetchLikedSongs(currentUser._id);
      fetchReviews(currentUser._id);
    }

    fetchAlbums();
    fetchSongs();
    fetchSongsInfo();

    // console.log(reviewSong);
  }, []);

  return (
    <div className="d-flex flex-column overflow-auto">
      {currentUser === null && (
        <div className="table-container">
          Welcome{' '}
          {currentUser && currentUser.username
            ? currentUser.username
            : 'Anonymous'}
          <div className="tables-wrapper">
            <div className="table-wrapper">
              <h2>Top 10 Albums!</h2>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Album</th>
                    <th>Artist</th>
                  </tr>
                </thead>
                <tbody>
                  {albums.map((album) => (
                    <tr key={album.index}>
                      <td>{album.index}</td>
                      <td>{album.name}</td>
                      <td>{album.artist}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="table-wrapper">
              <h2>Top 10 Songs!</h2>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Song</th>
                    <th>Artist</th>
                  </tr>
                </thead>
                <tbody>
                  {songs.map((song) => (
                    <tr key={song.index}>
                      <td>{song.index}</td>
                      <td>{song.name}</td>
                      <td>{song.artist}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {currentUser && currentUser.role === 'LISTENER' && (
        <div className="div-for-listener d-flex flex-column overflow-auto">
          Welcome {currentUser.username}
          <div className="table-container">
            <div className="d-flex">
              <div className="table-wrapper">
                <h2>Top 10 Albums!</h2>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Album</th>
                      <th>Artist</th>
                    </tr>
                  </thead>
                  <tbody>
                    {albums.map((album) => (
                      <tr key={album.index}>
                        <td>{album.index}</td>
                        <td>{album.name}</td>
                        <td>{album.artist}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="flex-container">
                  <div
                    className="follows2-card overflow-auto rounded-5"
                    style={{
                      marginLeft: '30px',
                      marginTop: '10px',
                      width: '300%',
                      height: '70%',
                    }}
                  >
                    <h4>Following</h4>
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

                  <div
                    className="follows2-card overflow-auto rounded-5"
                    style={{
                      marginLeft: '30px',
                      marginTop: '10px',
                      width: '300%',
                      height: '70%',
                    }}
                  >
                    <h4>Liked Songs</h4>
                    {likedSongs.map((song) => (
                      <Link
                        key={song._id}
                        className="list-group-item"
                        to={`/Details/${song.ArtistName}/${song.SongName}`}
                      >
                        <span style={{ color: 'blue' }}>
                          {song.SongName} by
                        </span>
                        {' ' + song.ArtistName}
                      </Link>
                    ))}
                  </div>

                  <div
                    className="follows2-card overflow-auto rounded-5"
                    style={{
                      marginLeft: '30px',
                      marginTop: '10px',
                      width: '300%',
                      height: '70%',
                    }}
                  >
                    <h4>My Reviews</h4>
                    {reviews.map((review, index) => (
                        <div key={review.id}>
                            {index = index + 1}
                            {" " + review.review + " "}
                            for song -- 


                           
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="table-wrapper">
            <h2>Top 10 Songs!</h2>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Song</th>
                  <th>Artist</th>
                </tr>
              </thead>
              <tbody>
                {songs.map((song) => (
                  <tr key={song.index}>
                    <td>{song.index}</td>
                    <td>{song.name}</td>
                    <td>{song.artist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {currentUser && currentUser.role === 'ARTIST' && (
        <div className="div-for-artist d-flex flex-column overflow-auto">
          Welcome {currentUser.username}
        </div>
      )}
    </div>
  );
}

export default Home;
