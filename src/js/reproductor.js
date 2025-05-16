class Reproductor {
  constructor(songList) {
    this.songList = songList;
    this.currentIndex = 0;
    this.audio = new Audio();
    this.isPlaying = false;
    this.setupAudioEvents();
  }

  setupAudioEvents() {
    this.audio.addEventListener('ended', () => {
      this.playNext();
    });
  }

  play() {
    if (this.songList.length > 0) {
      this.audio.src = this.songList[this.currentIndex];
      this.audio.play();
      this.isPlaying = true;
    }
  }

  playFrom(index) {
    if (index >= 0 && index < this.songList.length) {
      this.currentIndex = index;
      this.play();
    }
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying = false;
  }

  playNext() {
    this.currentIndex = (this.currentIndex + 1) % this.songList.length;
    this.play();
  }

  playPrevious() {
    this.currentIndex = (this.currentIndex - 1 + this.songList.length) % this.songList.length;
    this.play();
  }

  setVolume(level) {
    this.audio.volume = Math.max(0, Math.min(1, level));
  }

  getCurrentTime() {
    return this.audio.currentTime;
  }

  getDuration() {
    return this.audio.duration;
  }

  seek(time) {
    if (time >= 0 && time <= this.audio.duration) {
      this.audio.currentTime = time;
    }
  }
}


