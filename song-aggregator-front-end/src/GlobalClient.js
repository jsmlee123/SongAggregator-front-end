import axios from "axios";
export const BASE_API = "http://localhost:4000";
export const USERS_API = `${BASE_API}/api/users`;
export const SONG_API = `${BASE_API}/api/songs`;
const request = axios.create({
  withCredentials: true,
});

export const findByUserName = async (userName) => {
    const response = await axios.get(`${USERS_API}/username/${userName}`);
    return response.data;
};

export const addSong = async (song) => {
    const response = await axios.post(SONG_API, song);
    return response.data;
};