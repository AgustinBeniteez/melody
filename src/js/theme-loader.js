// Constantes de temas
const THEMES = ["tema-default", "tema-claro", "tema-magenta", "tema-rosa", "tema-cian", "tema-azul", "tema-marron", "tema-lila", "tema-pastel", "tema-verde"];

// Función para obtener el tema guardado
function getStoredTheme() {
    return localStorage.getItem('selectedTheme') || 0;
}

// Función para aplicar el tema
function applyTheme() {
    const storedTheme = getStoredTheme();
    
    // Eliminar cualquier tema existente
    THEMES.forEach(themeClassName => {
        if (document.body.classList.contains(themeClassName)) {
            document.body.classList.remove(themeClassName);
        }
    });

    // Aplicar el tema guardado
    document.body.classList.add(THEMES[parseInt(storedTheme)]);
}

// Aplicar el tema cuando se carga la página
window.addEventListener('load', applyTheme);