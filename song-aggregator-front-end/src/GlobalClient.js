import axios from "axios";
export const BASE_API = "http://localhost:4000";
export const USERS_API = `${BASE_API}/api/users`;
export const SONG_API = `${BASE_API}/api/songs`;
export const LAST_FM_KEY = "300174397d5c23bd99ff6cf5a31e4b3e"; //fix this
const request = axios.create({
  withCredentials: true,
});

export const fetchSongRemote = async (songName, artistName) => {
  const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${LAST_FM_KEY}&artist=${artistName}&track=${songName}&format=json`);
  const responseObject = response.json();

  const track = responseObject.then((response) => {
    return response.track;
  });
  
  return track;
};

export const findSong = async (artistName, songName) => {
  const response = await axios.get(`${SONG_API}/${artistName}/${songName}`);
  return response.data;
}

export const findByUserName = async (userName) => {
    const response = await axios.get(`${USERS_API}/username/${userName}`);
    return response.data;
};

export const addSong = async (song) => {
    const response = await axios.post(SONG_API, song);
    return response.data;
};