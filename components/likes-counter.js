export default class LikesCounter  extends HTMLElement{

    constructor(){
        super()
        this._root = this.attachShadow({mode: 'open'})
    }

    // observer l'attribut
//get static observedAttributes(){
    //return ['number']
}
// reaction au changement de l'attribut
//attributChagedCallback(){

//}

//connectedCallback(){}

//}
