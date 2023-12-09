export const LAST_FM_KEY = "300174397d5c23bd99ff6cf5a31e4b3e"; //fix this

export const fetchSong = async (songName) => {
  const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${songName}&api_key=${LAST_FM_KEY}&format=json`);
  const responseObject = response.json();

  const tracks = responseObject.then((response) => {
    return response.results.trackmatches.track;
  });
  return tracks;
};