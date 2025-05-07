//-------- LEECTURA DE JSON --------//
fetch("src/data/data.json")
  .then((response) => response.json())
  .then((data) => {
    //--- usamos 
    const songs = data.songs;
    const songList = document.getElementById("song-list");
    songs.forEach((song) => {
        songList.innerHTML += `
        <div class="song">
        <img src="${song.img}" alt="${song.title}">
        <div class="song-details">
          <h2>${song.title}</h2>
          <p>${song.artist}</p>
          <p>${song.album}</p>
        </div>
      </div>
        `;
    })
  })