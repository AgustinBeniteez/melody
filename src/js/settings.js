//--------- CONSTANTE NUMERO DE TEMAS--------//
const NUMERO_DE_THEMES = 10;
const THEMES = ["tema-default", "tema-claro", "tema-magenta", "tema-rosa", "tema-cian", "tema-azul", "tema-marron", "tema-lila", "tema-pastel", "tema-verde"];
const THEMES_VARIABLES = "--section-color";

// guarda el div de temas
const themesSettings = document.getElementById('config-themes');

//----------- CARGA TEMAS ------------//
// Función para obtener el tema guardado
function getStoredTheme() {
    return localStorage.getItem('selectedTheme') || 0;
}

// Función para guardar el tema seleccionado
function saveTheme(themeIndex) {
    localStorage.setItem('selectedTheme', themeIndex);
}

// Inicializar el tema al cargar la página
window.addEventListener('load', () => {
    const storedTheme = getStoredTheme();
    changeTheme(parseInt(storedTheme)); // Aplicar el tema guardado
    selecBtnTheme(parseInt(storedTheme)); // Marcar el botón del tema guardado
});
//----------- CARGAR BOTONES DE TEMAS ------------//
for (let i = 0; i < NUMERO_DE_THEMES; i++) {
        // crea un boton de tema
    const buttonThemes = document.createElement('button');
    buttonThemes.classList.add(THEMES[i], "btn-theme-color");
    buttonThemes.style.backgroundColor = `var(${THEMES_VARIABLES})`;
    buttonThemes.id = `btn-${THEMES[i]}`;
    buttonThemes.addEventListener('click', () => {
        changeTheme(i);
        selecBtnTheme(i);
    });
    themesSettings.appendChild(buttonThemes);
}

//--------- FUNCION DE CAMBIAR EL TEMA --------//
function changeTheme(theme) { // 'theme' es el índice del tema en el array THEMES
    // Primero, eliminamos cualquier clase de tema existente del array THEMES del body
    THEMES.forEach(themeClassName => {
        if (document.body.classList.contains(themeClassName)) {
            document.body.classList.remove(themeClassName);
        }
    });

    // Luego, añadimos la nueva clase de tema seleccionada
    document.body.classList.add(THEMES[theme]);
    cambiarImagenPreview(theme);
    
    // Guardar el tema seleccionado
    saveTheme(theme);
}

//--------- FUNCION DE CAMBIAR LA IMAGEN DE PREVIEW --------//
function cambiarImagenPreview(theme) {
    const previewImage = document.getElementById('appearance-preview');
    previewImage.src = `/src/img/main/preview-${THEMES[theme]}.png`;
}

//--------- FUNCION DE SELECCIONAR EL BOTON DE TEMA --------//
function selecBtnTheme(theme) {
    // Primero, quitamos la clase del botón anteriormente seleccionado
    const prevSelectedBtn = document.querySelector('.btn-selected-theme');
    if (prevSelectedBtn) {
        prevSelectedBtn.classList.remove('btn-selected-theme');
    }
    
    // Luego, añadimos la clase al nuevo botón seleccionado
    const btnTheme = document.getElementById(`btn-${THEMES[theme]}`);
    btnTheme.classList.add('btn-selected-theme');
}