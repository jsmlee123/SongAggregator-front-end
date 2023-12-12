import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Add this line to import index.css
import * as client from './client';
import { useState, useEffect } from 'react';

function Home({ user }) {
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const fetchAlbums = async () => {
            const data = await client.testFetchAlbums();

            const parsedData = data.albums.album.map((album, index) => ({
                index: index + 1,
                name: album.name,
                artist: album.artist.name,
            }));
            setAlbums(parsedData);
        };

        const fetchSongs = async () => {
            const data = await client.testFetchSongs();

            const parsedData = data.tracks.track.map((track, index) => ({
                index: index + 1,
                name: track.name,
                artist: track.artist.name,
            }));

            setSongs(parsedData);
        }

        fetchAlbums();
        fetchSongs();
    }, []);

    return (
        <div className="table-container">
            Welcome {user ? user : 'anonymous'}
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
    );
}

export default Home;

            
     