export default class PostCard extends HTMLElement {
  constructor() {
    super()
    this._root = this.attachShadow({ mode: 'open' })
    // this.likeButton = null
  }

  connectedCallback() {
    /* const title = this.post.title
    const img = this.post.img
    const tags = this.post.tags */
    const { title, img, tags } = this.post

    /* faire un tableau à partir des tags 'statue,rue,paris' qui devient ['statue', 'rue', 'paris'] */
    const arrayTags = tags.split(',')

    // FORMATER LES TAGS
    // Initaliser la chaîne la caractère
    let contentTags = ''

    // Remplir la chaîne de caractères
    arrayTags.forEach((tag) => {
      // 1. contentTags -> ''
      // 2. contentTags -> '<a href="#">#statue</a>'
      contentTags = `${contentTags} <a href="#">#${tag}</a>`
      // 1. contentTags -> '<a href="#">#statue</a>'
      // 2. contentTags -> '<a href="#">#statue</a> <a href="#">#rue</a>'
    })

    this._root.innerHTML = `
      <style>
        @import "./components/post-card.css"
      </style>
      <div class="wrapper">
        <div>
          <img src="./img/${img}" class="border-bottom">  
          <div class="legend">
            <h1 class="titre">${title}</h1>
            <div class="like"><img src="./img/dislike.svg"><span> J’aime</span>
          </div>
            <div class="tags">
          <p>${contentTags}</p>
        </div>     
        </div>     
      </div>
      `

    // const likeButton = this._root.querySelector('.like')
    this.likeButton = this._root.querySelector('.like')

    this.renderLike()

    this.likeButton.addEventListener('click', (event) => {
      // Modifier la valeur de this.isLiked
      this.isLiked = !this.isLiked

      this.renderLike()
      // Envoyer un événement personnalisé liké ou pas liké
      this.like()
    })
  }

  renderLike() {
    // const likeButton = this._root.querySelector('.like')
    const imgLike = this._root.querySelector('.like > img')
    const spanLike = this._root.querySelector('.like > span')

    const like = './img/like.svg'
    const dislike = './img/dislike.svg'

      if (this.isLiked) {
        spanLike.innerText = ' J’aime'
        imgLike.src = like
        this.likeButton.classList.add('black')
        this.likeButton.classList.remove('black')
    } else {
        spanLike.innerText = ' Je n’aime plus'
        imgLike.src = dislike
        this.likeButton.classList.remove('black')
        this.likeButton.classList.add('black')

    }
  }
  like() {
    const likeEvent = new CustomEvent('like', {
      detail: {
        postId: this.post.id,
        isLiked: this.isLiked,
      },
    })
    this.dispatchEvent(likeEvent)
  }
}
