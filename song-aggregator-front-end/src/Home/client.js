export const apiKey = "300174397d5c23bd99ff6cf5a31e4b3e";


// testing anon user access to home page

const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=disco&api_key=${apiKey}&format=json&limit=10`

const apiUrl2 = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${apiKey}&format=json&limit=10`


export const testFetchAlbums = async () => {
  const response = await fetch(apiUrl);
  const responseObject = response.json();


  
  return responseObject;


}

//testing top 10 songs
export const testFetchSongs = async () => { 

  const response = await fetch(apiUrl2);
  const responseObject = response.json();
  return responseObject;


}