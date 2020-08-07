import PostCard from './components/post-card.js'

customElements.define('post-card', PostCard)
// import LikeCounter from './components/likes-counter.js'
// customElements.define('likes-counter', LikeCounter)

const main = document.querySelector('main')
const likeCounter = document.querySelector('#counter')
const searchInput = document.querySelector('#search')
const logo_ancre = document.querySelector('.logo')

let posts = []
let likedPosts = []
let StorageLike;
if (JSON.parse(localStorage.getItem('like'))) {
    StorageLike = JSON.parse(localStorage.getItem('like'));
} else {
    StorageLike = [];
}

const getLikedPosts = () => {
    likedPosts = StorageLike ;
}
getLikedPosts();
// À voir plus tard
const getPosts = (justLiked = 0) => {
    main.innerHTML = '';
    fetch('http://localhost:/insta/api.php') // requête http
        .then((response) => {
            // réponse du serveur
            return response.json() // récupération du json dans la réponse et conversion en objet js
        })
        .then((json) => {
            // récupération de l’objet js

            posts = json

            // créer les publications dans la vue et les ajouter au DOM
            json.forEach((post) => {
                // Création d’un élément post-card
                const newElement = document.createElement('post-card')

                // Fournir l’objet post à post-card
                newElement.post = post

                // Fournir la propriété isLiked à post-card
                newElement.isLiked = likedPosts.some(
                    (likedPost) => likedPost === post.id
                )

                // Écouter l’événement like
                // newElement.addEventListener('like', (event) => {
                // console.log('post:', event.detail.postId)
                // Mettre à jour le tableau des likedPosts
                likeHandler(newElement)
                // })

                // Ajouter post-card au main
                if(justLiked === 1){
                    if(StorageLike.indexOf(post.id) !== 1){
                        main.appendChild(newElement)
                    }
                }else{
                    main.appendChild(newElement)
                }

            })
        })
}
getPosts()

const likeHandler = (element) => {
    element.addEventListener('like', (event) => {
        const {postId, isLiked} = event.detail

        if (isLiked) {
            likedPosts = [...likedPosts, postId]
            if (StorageLike.indexOf(postId) == -1) {
                StorageLike.push(postId);
                localStorage.setItem('like', JSON.stringify(StorageLike));
            }

        } else {
            const indexOf = StorageLike.indexOf(postId);
            StorageLike.splice(indexOf, 1);
            localStorage.setItem('like', JSON.stringify(StorageLike));

            likedPosts = likedPosts.filter((likedPost) => likedPost !== postId)
        }
        //on reload le compteur
        setLikesCounter()
        // console.log(likedPosts)
        // console.log(localStorage.getItem('like'));
    })
}

const setLikesCounter = () => {
    const n = likedPosts.length
    likeCounter.innerText = n
}

setLikesCounter()

const justPostLiked = () => {
    likeCounter.addEventListener('click', (event) => {
        getPosts(1);
    })
}
justPostLiked();

const getPostsSearch = (search) => {
    main.innerHTML = '';
    fetch('http://localhost:/insta/api.php'+search) // requête http
        .then((response) => {
            // réponse du serveur
            return response.json() // récupération du json dans la réponse et conversion en objet js
        })
        .then((json) => {
            // récupération de l’objet js

            posts = json

            // créer les publications dans la vue et les ajouter au DOM
            json.forEach((post) => {
                // Création d’un élément post-card
                const newElement = document.createElement('post-card')

                // Fournir l’objet post à post-card
                newElement.post = post

                // Fournir la propriété isLiked à post-card
                newElement.isLiked = likedPosts.some(
                    (likedPost) => likedPost === post.id
                )

                // Écouter l’événement like
                // newElement.addEventListener('like', (event) => {
                // console.log('post:', event.detail.postId)
                // Mettre à jour le tableau des likedPosts
                likeHandler(newElement)
                // })

                // Ajouter post-card au main
                    main.appendChild(newElement)


            })
        })
}


const searchPublication = () => {
    searchInput.addEventListener('keyup', (event) => {
        setTimeout(function(){
            const valueInput = document.getElementById('search').value ;
            getPostsSearch(valueInput);
        },650);

    })
}
searchPublication();

const reloadAllPublication = () => {
    logo_ancre.addEventListener('click', (event) => {
        getPosts();
    })
}
reloadAllPublication();
