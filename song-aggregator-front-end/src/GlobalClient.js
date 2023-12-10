import axios from "axios";
export const BASE_API = "http://localhost:4000";
export const USERS_API = `${BASE_API}/api/users`;
export const SONG_API = `${BASE_API}/api/songs`;
export const REVIEW_API = `${BASE_API}/api/reviews`;

export const LAST_FM_KEY = "300174397d5c23bd99ff6cf5a31e4b3e"; //fix this
const request = axios.create({
  withCredentials: true,
});

export const account = async () => {
  const response = await request.post(`${USERS_API}/account`);
  return response.data;
};

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

export const findReviewsBySongID = async (sid) => {
  const response = await axios.get(`${REVIEW_API}/song/${sid}`);

  return response.data;
};

export const createReview = async (review) => {
  const response = await axios.post(`${REVIEW_API}`, review);
  return response.data;
};

export const findUserById = async (id) => {
  const response = await request.get(`${USERS_API}/${id}`);
  return response.data;
};

export const findUserFromReviewId = async (rid)  => {
  const response = await axios.get(`${REVIEW_API}/user/${rid}`);
  return response.data;
};

export const findUserLikesBySong = async (sid) => {
  const response = await axios.get(`${USERS_API}/likes/song/${sid}`);
  return response.data;
};