// --------Cargar los datos de las noticias---------
let newsData = [];
let currentNewsIndex = 0;

// ----------Función para cargar los datos del JSON--------
async function loadNewsData() {
    try {
        const response = await fetch('/src/news/data-news.json');
        newsData = await response.json();
        updateMainNews(currentNewsIndex);
        generateNewsGrid();
        startNewsCarousel();
    } catch (error) {
        console.error('Error al cargar las noticias:', error);
    }
}

// --------Función para actualizar la noticia principal---------
function updateMainNews(index) {
    const news = newsData[index];
    const imageNews = document.getElementById('image-news');
    imageNews.style.opacity = '0';
    
    setTimeout(() => {
        imageNews.src = news.image;
        imageNews.style.opacity = '1';
    }, 500);
    
    document.getElementById('headline').textContent = news.title;
    const newsLink = document.getElementById('news-link');
    newsLink.onclick = function(e) {
        e.preventDefault();
        window.open(news.url, '_blank'); // Abre la URL en una nueva pestaña
    };
}

//--------- Función para generar el Carrusel de Noticias----------
function generateNewsGrid() {
    const navNews = document.getElementById('nav-news');
    navNews.innerHTML = '';

    newsData.forEach((news, index) => {
        const article = document.createElement('article');
        article.className = 'news';
        article.id = `nav-news-${index + 1}`;

        article.innerHTML = `
            <a href="${news.url}" target="_blank">
                <img src="${news.image}" alt="${news.title}">
                <h2>${news.title}</h2>
            </a>
        `;

        // Agregar evento click para cambiar la noticia principal
        article.addEventListener('click', (e) => {
            e.preventDefault();
            currentNewsIndex = index;
            updateMainNews(currentNewsIndex);
        });

        navNews.appendChild(article);
    });
}

//----------- Función para iniciar el carrusel automático---------------
function startNewsCarousel() {
    setInterval(() => {
        currentNewsIndex = (currentNewsIndex + 1) % newsData.length;
        updateMainNews(currentNewsIndex);
    }, 5000); // Cambiar cada 5 segundos
}

//--------- Cargar las noticias cuando se carga la página--------------
document.addEventListener('DOMContentLoaded', loadNewsData);