let allArtists = [];

document.addEventListener('DOMContentLoaded', function() {
    fetch('/src/blog/data-blog.json')
        .then(response => response.json())
        .then(data => {
            allArtists = data.artist;
            showAllPosts();
            // Crear botón "Todos"
            const nav = document.getElementById("usuarios-sugeridos");
            const allButton = document.createElement("button");
            allButton.classList.add("all-button");
            allButton.innerHTML = `<p>Todos</p>`;
            allButton.addEventListener("click", showAllPosts);
            nav.insertBefore(allButton, nav.firstChild);
            
            // Añadir botones de usuarios
            allArtists.forEach(profile => {
                sugestUsers(profile);
            });
        })
});

function showAllPosts() {
    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = "";
    allArtists.forEach(profile => {
        insertPosts(profile);
    });
}

function insertPosts(profile) {
    const postsContainer = document.getElementById("posts-container")
    profile.posts.forEach(post => {
        const article = document.createElement("article")
        article.classList = "post"
        let postContent = `
            <div class="post-header">
                <img class="profile-pic" src="${profile.profileimage}" alt="${profile.name}">
                <h3 class="user-name">${profile.name}</h3>
            </div>
            <div class="post-content">
                <p>${post.content}</p>
                ${post.media ? `<img class="post-media" src="${post.media}" alt="Post media">` : ''}
            </div>`
        article.innerHTML = postContent
        postsContainer.appendChild(article)
    })
}

function changeUserProfile(profile) {
    // Limpiar posts anteriores
    const postsContainer = document.getElementById("posts-container")
    postsContainer.innerHTML = ""
    
    // Actualizar posts
    insertPosts(profile)
}

function sugestUsers(profile) {
    const nav = document.getElementById("usuarios-sugeridos");
    const link = document.createElement("button")
    link.addEventListener("click", () => {
        changeUserProfile(profile)
    })
    link.innerHTML = `<img src="${profile.profileimage}">
    <p>${profile.name}</p>`
    nav.appendChild(link);
}