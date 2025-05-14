class Reproductor {
    constructor(playlist) {
        this.playlist = playlist;
        this.currentSongIndex = 0;
        this.audio = new Audio(this.playlist[this.currentSongIndex]);
        this.isPlaying = false;
        this.isShuffleOn = false;

        this.init();
    }

    playFrom(index) {
        if (index >= 0 && index < this.playlist.length) {
            this.currentSongIndex = index;
            this.loadAndPlaySong();
            this.isPlaying = true;
            this.updatePlayPauseIcon();
        }
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlaying = false;
        this.updatePlayPauseIcon();
    }

    init() {
        $(document).ready(() => {
            this.setupEventListeners();
            this.updatePlayPauseIcon();
        });
    }

    setupEventListeners() {
        // Evento para cuando termina la canción
        this.audio.addEventListener("ended", () => this.nextSong());

        // Botón de play/pause
        $("#btn-play").click(() => {
            this.togglePlay();
        });

        // Botón de siguiente canción
        $("#btn-after").click(() => {
            this.nextSong();
        });

        // Botón de canción anterior
        $("#btn-before").click(() => {
            this.previousSong();
        });

        // Botón de reproducción aleatoria
        $("#btn-shuffle").click(() => {
            this.toggleShuffle();
        });

        // Actualizar la barra de progreso
        this.audio.addEventListener("timeupdate", () => {
            this.updateProgressBar();
        });

        // Control de la barra de progreso
        $("#progress-bar-input").on("input", (e) => {
            const time = (e.target.value / 100) * this.audio.duration;
            this.audio.currentTime = time;
        });
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
        this.isPlaying = !this.isPlaying;
        this.updatePlayPauseIcon();
    }

    play() {
        this.audio.play();
    }

    pause() {
        this.audio.pause();
    }

    nextSong() {
        if (this.isShuffleOn) {
            this.currentSongIndex = Math.floor(Math.random() * this.playlist.length);
        } else {
            this.currentSongIndex = (this.currentSongIndex + 1) % this.playlist.length;
        }
        this.loadAndPlaySong();
    }

    previousSong() {
        if (this.isShuffleOn) {
            this.currentSongIndex = Math.floor(Math.random() * this.playlist.length);
        } else {
            this.currentSongIndex = (this.currentSongIndex - 1 + this.playlist.length) % this.playlist.length;
        }
        this.loadAndPlaySong();
    }

    toggleShuffle() {
        this.isShuffleOn = !this.isShuffleOn;
        $("#btn-shuffle").toggleClass("active");
    }

    loadAndPlaySong() {
        // Detener y limpiar el audio actual
        this.audio.pause();
        this.audio.currentTime = 0;
        
        // Remover el audio anterior y crear uno nuevo
        this.audio.remove();
        this.audio = new Audio(this.playlist[this.currentSongIndex]);
        
        // Configurar los event listeners necesarios
        this.audio.addEventListener("ended", () => this.nextSong());
        this.audio.addEventListener("timeupdate", () => this.updateProgressBar());
        
        // Reproducir la nueva canción
        this.audio.play();
        this.isPlaying = true;
        this.updatePlayPauseIcon();
    }

    updatePlayPauseIcon() {
        const icon = $("#play-pause");
        if (this.isPlaying) {
            icon.removeClass("fa-play").addClass("fa-pause");
        } else {
            icon.removeClass("fa-pause").addClass("fa-play");
        }
    }

    updateProgressBar() {
        const progress = (this.audio.currentTime / this.audio.duration) * 100;
        $("#progress-bar-input").val(progress);

        // Actualizar el tiempo actual y total
        $("#current-time").text(this.formatTime(this.audio.currentTime));
        $("#total-time").text(this.formatTime(this.audio.duration));
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return "00:00";
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}


