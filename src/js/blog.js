document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.querySelector('#posts-container');

    fetch('/src/blog/data-blog.json')
        .then(response => response.json())
        .then(data => {
            const artist = data.artist;
            artist.forEach(profile => {
                changeProfile(profile);
                insertPosts(profile);
                sugestUsers(profile)
            });
            

        })
});



function changeProfile(profileObj){
    const profileimage = document.getElementById("foto-perfil")
    const nameUser = document.querySelector("h2")
    console.log(nameUser)
    profileimage.src =`${profileObj.profileimage}`
    nameUser.innerHTML =`${profileObj.name}`
}

function insertPosts(asd) {
    const postsContainer = document.getElementById("posts-container")
    const post = document.createElement("article")
    post.classList = "post"
    post.innerHTML = `<h1>${asd.name}</h1>`
    postsContainer.appendChild(post);
}

function deletePosts(params) {
    
}

function changeUserProfile(params) {
    console.log("adasd")
}

function sugestUsers(profile) {
    const nav = document.getElementById("usuarios-sugeridos");
    const link = document.createElement("button")
    link.addEventListener("click",()=>{
        changeUserProfile()
    })
    link.innerHTML = `<img src="${profile.profileimage}"> 
    <p>Puryabad ${profile.name}</p>`
    nav.appendChild(link);

}