// Variables globales
let selectedSong = null;
let likedSongs = new Set(); // Almacena las canciones favoritas

// Cargar canciones favoritas desde localStorage
function loadLikedSongsFromStorage() {
  const storedSongs = localStorage.getItem('likedSongs');
  if (storedSongs) {
    likedSongs = new Set(JSON.parse(storedSongs));
  }
}

// Guardar canciones favoritas en localStorage
function saveLikedSongsToStorage() {
  localStorage.setItem('likedSongs', JSON.stringify(Array.from(likedSongs)));
}

//-------- CONSTANTES ALBUMS--------//
const ALBUMS_LIST = [["Tus Favoritos","/src/img/thumbnails/fav.webp",""],
                    ["From Zero","/src/img/thumbnails/from-zero.webp","Linkin Park"],
                    ["Debi Tirar Mas Fotos","/src/img/thumbnails/baile_inolvidable_y_dbtf.webp","Bad Bunny"],
                    ["11 razones","/src/img/thumbnails/11Razones.webp","Aitana"]];

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
document.addEventListener("DOMContentLoaded", () => {
  loadLikedSongsFromStorage(); // Cargar favoritos al iniciar
  loadAlbums();
  
  // Agregar event listener al botón de favoritos
  const btnFav = document.getElementById("btn-fav");
  btnFav.addEventListener("click", () => {
    if (selectedSong) {
      if (likedSongs.has(selectedSong.title)) {
        likedSongs.delete(selectedSong.title);
        btnFav.querySelector("i").style.color = "";
      } else {
        likedSongs.add(selectedSong.title);
        btnFav.querySelector("i").style.color = "var(--magenta-btn)";
      }
      saveLikedSongsToStorage(); // Guardar cambios en localStorage
    }
  });
});


//--- cambia la infomacion del reproductor
function changeSongInfo(song) {
  //---- obtengo los elementos del html
  const infoSongSide = document.getElementById("thumbnails-info-container");
  const infoSongTitle = document.getElementsByClassName("song-info-title");
  const infoSongArtist = document.getElementsByClassName("song-info-artist");
  const lyricsContainer = document.getElementById("lyrics");
  const totalTime = document.getElementById("total-time");
  const btnFav = document.getElementById("btn-fav");

  //---- remplazo el contenido por el de la cancion seleccionada
  infoSongSide.src = song.albumImageUrl;
  infoSongTitle[0].textContent = song.title;
  infoSongArtist[0].textContent = song.artist;
  lyricsContainer.textContent = song.lyrics;
  totalTime.textContent = song.duration;

  // Actualizar el estado del botón de favoritos
  if (likedSongs.has(song.title)) {
    btnFav.querySelector("i").style.color = "var(--magenta-btn)";
  } else {
    btnFav.querySelector("i").style.color = "";
  }
}

//-------- LEECTURA DE JSON Y MANEJO DE EVENTOS --------//
fetch("/src/data/data.json")
  .then((response) => response.json())
  .then((data) => {
    const songs = data.songs;
    const songList = document.getElementById("song-list-content");

    songs.forEach((song) => {
      const songElement = document.createElement("div");
      loadSongs(song, songElement);
      // agrega el elemento a la lista de canciones
      songList.appendChild(songElement);
    });
  });

//--------- FUNCIONES PARA OCULTAR PAGINA DE INICIO CANCIONES --------//
function clearSonglist() {
  const songList = document.getElementById("search-main-page");
  if (songList.classList.contains("hidden")) {
    // aplica el style hidden
    songList.classList.remove("hidden");
  }else{
    // quita el style hidden
    songList.classList.add("hidden");
  }
}

function clearAlbum() {
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
function loadAlbum(albumNumber) {
  const songList = document.getElementById("song-list");
  let albumSongList = document.getElementById("album-song-menu");
  
  // Eliminar el álbum anterior si existe
  if (albumSongList) {
    albumSongList.remove();
  }

  // Inicializar el conjunto de canciones favoritas si no existe
  if (!window.likedSongs) {
    window.likedSongs = new Set();
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
        | <span>Songs <i class="fa-solid fa-music"></i></span> | <span id="separador-nav"></span>  <span id="span-duration">| duration <i class="fa-solid fa-clock"></i> | </span>  <span id="span-year">| release year <i class="fa-solid fa-calendar-days"></i> |</span>
    </nav>
  `;

  fetch("/src/data/data.json")
    .then((response) => response.json())
    .then((data) => {
      const songs = data.songs;
      let hasFavorites = false;

      if (albumNumber === 0) {
        // Para el álbum de favoritos, verificar si hay canciones favoritas
        songs.forEach((song) => {
          if (likedSongs.has(song.title)) {
            hasFavorites = true;
            const articleListAlbum = document.createElement("article");
            articleListAlbum.id = "list-container-album";
            loadSongs(song, articleListAlbum);
            albumSongList.appendChild(articleListAlbum);
          }
        });

        // Si no hay favoritos, mostrar el tutorial
        if (!hasFavorites) {
          const tutorialElement = document.createElement("div");
          tutorialElement.className = "tutorial-favorites";
          tutorialElement.innerHTML = `
            <i class="fa-solid fa-heart"></i>
            <h3>¡No tienes canciones favoritas aún!</h3>
            <p>Para agregar canciones a tus favoritos:</p>
            <ol>
              <li>Selecciona cualquier canción de la lista</li>
              <li>Haz clic en el icono del corazón 💟 en el reproductor</li>
              <li>¡La canción aparecerá en tus favoritos!</li>
            </ol>
          `;
          albumSongList.appendChild(tutorialElement);
        }
      } else {
        // Para otros álbumes, mostrar sus canciones normalmente
        songs.forEach((song) => {
          if (song.album === ALBUMS_LIST[albumNumber][0]) {
            const articleListAlbum = document.createElement("article");
            articleListAlbum.id = "list-container-album";
            loadSongs(song, articleListAlbum);
            albumSongList.appendChild(articleListAlbum);
          }
        });
      }
    })
  songList.appendChild(albumSongList);
  
  //--------- LISTENER PARA BOTON DE VOLVER AL INICIO --------//
  const btnBack = albumSongList.querySelector('#btn-back');
  btnBack.addEventListener('click', () => {
    clearAlbum();
    clearSonglist();
  });
}

//--------- FUNCION DE ABIR EL ALBUM --------//
//--- listener al hacer click en el album
album1.addEventListener("click", () => {
    clearSonglist();
    loadAlbum(0);
});
album2.addEventListener("click", () => {
  clearSonglist();
  loadAlbum(1);
})
album3.addEventListener("click", () => {
  clearSonglist();
  loadAlbum(2);
})
album4.addEventListener("click", () => {
  clearSonglist();
  loadAlbum(3);
})
//--------- LISTENER PARA BOTON DE VOLVER AL INICIO --------//
// El listener se agrega dinámicamente en la función cargarAlbum

//--------- FUNCION CARGAR CANCIONES --------//
function loadSongs(song, songElement) {
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

  // Agregar el event listener para el clic a las canciones
  songElement.addEventListener("click", function() {
    selectedSong = song;
    if (typeof changeSongInfo === 'function') {
      changeSongInfo(selectedSong);
      // Inicializar el reproductor con la URL de la canción seleccionada
      startPlayer(
        selectedSong.audioUrl,
        selectedSong.title,
        selectedSong.artist,
        selectedSong.album || '',
        selectedSong.albumImageUrl
      );
    } else {
      console.error('La función changeSongInfo no está definida');
    }
  });
}

// Agregar evento de búsqueda al input
document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.querySelector("#search input");
  searchInput.addEventListener("input", function(e) {
    const searchTerm = e.target.value.toLowerCase();
    filtrarCanciones(searchTerm);
  });
});

// ---------Función para filtrar canciones-----------
function filtrarCanciones(searchTerm) {
  const songElements = document.querySelectorAll(".song");
  
  songElements.forEach(songElement => {
    const title = songElement.querySelector("h2").textContent.toLowerCase();
    const artist = songElement.querySelector(".song-details p:first-of-type").textContent.toLowerCase();
    const album = songElement.querySelector(".song-details p:last-of-type").textContent.toLowerCase();
    
    if (title.includes(searchTerm) ||
        artist.includes(searchTerm) ||
        album.includes(searchTerm)) {
      songElement.style.display = "flex";
    } else {
      songElement.style.display = "none";
    }
  });
}
