// Variable global para almacenar la canción seleccionada
let selectedSong = null;
//-------- CONSTANTES ALBUMS--------//
const ALBUMS_LIST = [["From Zero","/src/img/thumbnails/from-zero.webp","Linkin Park"],
                      ["GUTS","/src/img/thumbnails/GUTS.webp","Olivia Rodrigo"],
                      ["11 razones","/src/img/thumbnails/11Razones.webp","Aitana"],
                      ["6 de febrero","/src/img/thumbnails/6-de-febrero.webp","Aitana"]];

//-------- PAGINA DE INICIO REPRODUCTOR --------//
//--- obtengo los elementos del html
const album1 = document.getElementById("album-1");
const album2 = document.getElementById("album-2");
const album3 = document.getElementById("album-3");
const album4 = document.getElementById("album-4");
const albums = [album1,album2,album3,album4];

//-------- FUNCIONES ALBUMS --------//
function loadAlbums() {
    for (let i = 0; i < albums.length; i++) {
        let album = albums[i];
        const title = album.querySelector("h2");
        const img = album.querySelector("img");
        const author = album.querySelector("h3");
        
        title.textContent = ALBUMS_LIST[i][0];
        img.src = ALBUMS_LIST[i][1];
        img.alt = ALBUMS_LIST[i][0];
        author.textContent = ALBUMS_LIST[i][2];
    }
}

// Cargar los álbumes cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", loadAlbums);


//--- cambia la infomacion del reproductor
function changeSongInfo(song) {
  //---- obtengo los elementos del html
  const infoSongSide = document.getElementById("thumbnails-info-container");
  const infoSongTitle = document.getElementsByClassName("song-info-title");
  const infoSongArtist = document.getElementsByClassName("song-info-artist");
  const lyricsContainer = document.getElementById("lyrics");
  const totalTime = document.getElementById("total-time");
  //---- remplazo el contenido por el de la cancion seleccionada
  infoSongSide.src = song.albumImageUrl;
  infoSongTitle[0].textContent = song.title;
  infoSongArtist[0].textContent = song.artist;
  lyricsContainer.textContent = song.lyrics;
  totalTime.textContent = song.duration;
}

//-------- LEECTURA DE JSON Y MANEJO DE EVENTOS --------//
fetch("/src/data/data.json")
  .then((response) => response.json())
  .then((data) => {
    const songs = data.songs;
    const songList = document.getElementById("song-list-content");

    songs.forEach((song) => {
      const songElement = document.createElement("div");
      cargarCanciones(song, songElement);
      // agrega el elemento a la lista de canciones
      songList.appendChild(songElement);
    });
  });

//--------- FUNCIONES PARA OCULTAR PAGINA DE INICIO CANCIONES --------//
function limpiarSonglist() {
  const songList = document.getElementById("search-main-page");
  if (songList.classList.contains("hidden")) {
    // aplica el style hidden
    songList.classList.remove("hidden");
  }else{
    // quita el style hidden
    songList.classList.add("hidden");
  }
}

function limpiarAlbum() {
  const albumSongList = document.getElementById("album-song-menu");
  if (albumSongList) {
    // Eliminar el contenido del álbum
    albumSongList.remove();
  }
}

//--------- FUNCIONES PARA OCULTAR/MOSTRAR MODAL --------//
function ocultarModal(){
  const modalSettings = document.getElementById("settings-modal")
  if (modalSettings.classList.contains("hidden")) {
      modalSettings.classList.remove("hidden");
  }else{
      modalSettings.classList.add("hidden");
  }
}


//--------- FUNCIONES PARA CARGAR ALBUM --------//
function cargarAlbum(albumNumber) {
  const songList = document.getElementById("song-list");
  let albumSongList = document.getElementById("album-song-menu");
  
  // Eliminar el álbum anterior si existe
  if (albumSongList) {
    albumSongList.remove();
  }
  
  // -----------Crear nuevo contenedor de álbum---------
  albumSongList = document.createElement("article");
  albumSongList.id = "album-song-menu";
  albumSongList.classList.remove("hidden"); // Asegurar que el nuevo álbum sea visible

  albumSongList.innerHTML = `
    <header id="album-header">
    <img src="${ALBUMS_LIST[albumNumber][1]}" alt="${ALBUMS_LIST[albumNumber][0]}">
    <div class="album-info">
      <h2>${ALBUMS_LIST[albumNumber][0]}</h2>
      <h3>${ALBUMS_LIST[albumNumber][2]}</h3>
    </div>
    <button id="btn-back"> <i class="fa-solid fa-circle-xmark"></i> </button>
    </header>
    <nav id="nav-songs">
        | <span>Titulo <i class="fa-solid fa-music"></i></span> | <span id="separador-nav"></span>  <span id="span-duration">| duration <i class="fa-solid fa-clock"></i> | </span>  <span id="span-year">| release year <i class="fa-solid fa-calendar-days"></i> |</span>
    </nav>
  `;

  fetch("/src/data/data.json")
    .then((response) => response.json())
    .then((data) => {
      const songs = data.songs;
      songs.forEach((song) => {
                            //ALBUMS_LIST[][0] hacer referencia al nombre del album
        if (song.album === ALBUMS_LIST[albumNumber][0]) {
          const articleListAlbum = document.createElement("article");
          //---- añado id al elemento----
          articleListAlbum.id = "list-container-album";
          cargarCanciones(song, articleListAlbum);
          albumSongList.appendChild(articleListAlbum);
        }
      });
      
    })
  songList.appendChild(albumSongList);
  
  //--------- LISTENER PARA BOTON DE VOLVER AL INICIO --------//
  const btnBack = albumSongList.querySelector('#btn-back');
  btnBack.addEventListener('click', () => {
    limpiarAlbum();
    limpiarSonglist();
  });
}

//--------- FUNCION DE ABIR EL ALBUM --------//
//--- listener al hacer click en el album
album1.addEventListener("click", () => {
    limpiarSonglist();
    cargarAlbum(0);
});
album2.addEventListener("click", () => {
  limpiarSonglist();
  cargarAlbum(1);
})
album3.addEventListener("click", () => {
  limpiarSonglist();
  cargarAlbum(2);
})
album4.addEventListener("click", () => {
  limpiarSonglist();
  cargarAlbum(3);
})
//--------- LISTENER PARA BOTON DE VOLVER AL INICIO --------//
// El listener se agrega dinámicamente en la función cargarAlbum

//--------- FUNCION CARGAR CANCIONES --------//
function cargarCanciones(song, songElement) {
  songElement.className = "song";
  songElement.id = `song-${song.title}`;
  songElement.innerHTML = `
    <img src="${ song.albumImageUrl ? song.albumImageUrl : "/src/img/thumbnails/thumbnails_default.webp" }" alt="${song.title}">
    <div class="song-details">
      <h2>${song.title}</h2>
      <p><i class="fa-solid fa-microphone-lines" style="padding-left:2px;"></i>
      ${song.artist}</p>
      <p><i class="fa-solid fa-compact-disc"></i> ${song.album}</p>
    </div>
    <div class="song-duration">
      <p><i class="fa-solid fa-clock"></i>
      ${song.duration ? song.duration : "0:00"}</p>
    </div>
    <div class="song-releaseYear">
      <p> <i class="fa-solid fa-calendar-days"></i>
      ${song.releaseYear ? song.releaseYear : "????"}</p>
    </div>
  `;

  // Agregar el event listener para el clic
  songElement.addEventListener("click", function() {
    selectedSong = song;
    if (typeof changeSongInfo === 'function') {
      changeSongInfo(selectedSong);
    } else {
      console.error('La función changeSongInfo no está definida');
    }
  });
}

//---------- LISTENER DEL MODAL SETTINGS --------------
const btnSettings = document.getElementById("btn-settings");
btnSettings.addEventListener("click", function() {
    ocultarModal();
});



