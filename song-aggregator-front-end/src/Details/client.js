export const LAST_FM_KEY = "300174397d5c23bd99ff6cf5a31e4b3e"; //fix this

export const fetchSong = async (songName, artistName) => {
  const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${LAST_FM_KEY}&artist=${artistName}&track=${songName}&format=json`);
  const responseObject = response.json();

  const track = responseObject.then((response) => {
    return response.track;
  });
  
  return track;
};