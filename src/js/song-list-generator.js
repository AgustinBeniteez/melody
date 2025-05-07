// Variable global para almacenar la canción seleccionada
let selectedSong = null;

//-------- LEECTURA DE JSON Y MANEJO DE EVENTOS --------//
fetch("/src/data/data.json")
  .then((response) => response.json())
  .then((data) => {
    const songs = data.songs;
    const songList = document.getElementById("song-list-content");

    songs.forEach((song) => {
      const songElement = document.createElement("div");
      songElement.className = "song";
      songElement.id = `song-${song.title}`;

      songElement.innerHTML = `
          <img src="${song.albumImageUrl}" alt="${song.title}">
          <div class="song-details">
            <h2>${song.title}</h2>
            <p><i class="fa-solid fa-microphone-lines" style="padding-left:2px;"></i> ${
              song.artist
            }</p>
            <p><i class="fa-solid fa-compact-disc"></i> ${song.album}</p>
          </div>
          <div class="song-duration">
            <p><i class="fa-solid fa-clock"></i> ${
              song.duration ? song.duration : "0:00"
            }</p>
          </div>
          <div class="song-releaseYear">
            <p> <i class="fa-solid fa-calendar-days"></i> ${
              song.releaseYear
            }</p>
          </div>
        `;

      //⭕-------- funciones ------------
      //--- cambia la infomacion del reproductor
      function changeSongInfo(song) {
        //---- obtengo los elementos del html
        const infoSongSide = document.getElementById(
          "thumbnails-info-container"
        );
        const infoSongTitle =
          document.getElementsByClassName("song-info-title");
        const infoSongArtist =
          document.getElementsByClassName("song-info-artist");
        const lyricsContainer = document.getElementById("lyrics");
        //---- remplazo el contenido por el de la cancion seleccionada
        infoSongSide.src = song.albumImageUrl;
        infoSongTitle[0].textContent = song.title;
        infoSongArtist[0].textContent = song.artist;
        lyricsContainer.textContent = song.lyrics;
      }
      //⭕-------- Listener ------------
      // agrega event listener para el clic
      songElement.addEventListener("click", () => {
        selectedSong = song;
        //---------- llamar a funcion que cambie la cancion del reproductor ------
        changeSongInfo(selectedSong);
      });
      // agrega el elemento a la lista de canciones
      songList.appendChild(songElement);
    });
  });
