// Crear una instancia global del reproductor
const reproductor = new Reproductor([]);

// Función global para iniciar el reproductor
function iniciarReproductor(audioUrl, titulo = '', artista = '', album = '', imagenUrl = '') {
    const metadata = {
        title: titulo,
        artist: artista,
        album: album,
        artwork: imagenUrl
    };
    reproductor.iniciarReproductor(audioUrl, metadata);
}