// Crear una instancia global del reproductor
const player = new Player([]);

// Función global para iniciar el reproductor
function startPlayer(audioUrl, title = '', artist = '', album = '', imageUrl = '') {
    const metadata = {
        title: title,
        artist: artist,
        album: album,
        artwork: imageUrl
    };
    player.startPlayer(audioUrl, metadata);
}