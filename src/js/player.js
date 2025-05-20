class Player {
  constructor(songList) {
    this.songList = songList;
    this.currentIndex = 0;
    this.audio = new Audio();
    this.isPlaying = false;
    this.volume = 1.0; // Default volume
    this.setupAudioEvents();
    this.setupMediaSession();
    this.setupVolumeControl();
  }
  //----- PARA QUE SE PUEDA CONTROLAR DESDE LAS NOTIFICACIONES DE WINDOWS & MOBILE
  setupMediaSession() {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => this.play());
      navigator.mediaSession.setActionHandler('pause', () => this.pause());
    }
  }

  setupAudioEvents() {
    // Manejar el botón de control para reproducir/pausar
    const controlButton = document.querySelector('#btn-play');
    // Configurar el volumen inicial
    this.audio.volume = this.volume;

    // Configurar el evento timeupdate para actualizar el tiempo y la barra de progreso
    this.audio.addEventListener('timeupdate', () => {
      const currentTime = this.audio.currentTime;
      const duration = this.audio.duration;

      // Actualizar el tiempo actual
      const currentTimeElement = document.querySelector('#current-time');
      if (currentTimeElement) {
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        currentTimeElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }

      // Actualizar la barra de progreso
      const progressBar = document.querySelector('#progress-bar-input');
      if (progressBar && !isNaN(duration)) {
        progressBar.value = (currentTime / duration) * 100;
      }
    });

    // Agregar evento para buscar en la canción usando la barra de progreso
    const progressBar = document.querySelector('#progress-bar-input');
    if (progressBar) {
      progressBar.addEventListener('input', (e) => {
        const time = (e.target.value / 100) * this.audio.duration;
        this.audio.currentTime = time;
      });
    }

    if (controlButton) {
      controlButton.addEventListener('click', () => {
        if (this.isPlaying) {
          this.pause();
          controlButton.innerHTML = '<i class="fa-solid fa-play"></i>';
          controlButton.classList.remove('playing');
        } else {
          this.play();
          controlButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
          controlButton.classList.add('playing');
        }
      });
    }
  }

  play() {
    if (this.songList.length > 0) {
      if (!this.audio.src) {
        this.audio.src = this.songList[this.currentIndex];
      }
      this.audio.play();
      this.isPlaying = true;
      
      // Actualizar el ícono del botón a pausa
      const controlButton = document.querySelector('#btn-play');
      if (controlButton) {
        controlButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
        controlButton.classList.add('playing');
      }

      // Asegurar que el volumen esté sincronizado
      const volumeControl = document.querySelector('#volume-control-input');
      if (volumeControl) {
        volumeControl.value = this.volume * 100;
      }
    }
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;

    // Mantener el control de volumen sincronizado
    const volumeControl = document.querySelector('#volume-control-input');
    if (volumeControl) {
      volumeControl.value = this.volume * 100;
    }
  }

  startPlayer(audioUrl, metadata = {}) {
    // Detener la reproducción actual si existe
    if (this.isPlaying) {
      this.pause();
    }
    
    this.songList = [audioUrl];
    this.currentIndex = 0;
    this.audio.src = audioUrl; // Establecer la nueva URL de audio

    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: metadata.title || 'Reproduciendo música',
        artist: metadata.artist || '',
        album: metadata.album || '',
        artwork: [
          { src: metadata.artwork || '/src/img/thumbnails/thumbnails_default.webp', sizes: '512x512', type: 'image/webp' }
        ]
      });
    }

    this.play();
  }

  setupVolumeControl() {
    const volumeControl = document.querySelector('#volume-control-input');
    if (volumeControl) {
      // Establecer el valor inicial
      volumeControl.value = this.volume * 100;
      
      // Manejar cambios en el control de volumen
      volumeControl.addEventListener('input', (e) => {
        const newVolume = e.target.value / 100;
        this.setVolume(newVolume);
      });
    }
  }

  setVolume(value) {
    // Asegurar que el valor esté entre 0 y 1
    this.volume = Math.max(0, Math.min(1, value));
    this.audio.volume = this.volume;

    // Actualizar el control de volumen en la interfaz
    const volumeControl = document.querySelector('#volume-control');
    if (volumeControl) {
      volumeControl.value = this.volume * 100;
    }
  }
}


