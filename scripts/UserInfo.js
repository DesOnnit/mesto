export default class UserInfo {
    constructor (nameInfo,jobInfo) {
        this._profileTitle = document.querySelector (nameInfo)
        this._profileSubtitle = document.querySelector (jobInfo)
        this._nameInput = document.querySelector ('#name')
        this._jobInput = document.querySelector ('#job')
    }
    getUserInfo () {
        this._nameInput.value= this._profileTitle.textContent;
        this._jobInput.value = this._profileSubtitle.textContent;
    }
    setUserInfo () {
        this._profileTitle.textContent = `${this._nameInput.value}`;
        this._profileSubtitle.textContent = `${this._jobInput.value}`;
    }
}