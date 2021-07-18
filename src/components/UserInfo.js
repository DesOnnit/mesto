export default class UserInfo {
    constructor (userNameSelector,userJobSelector,userAvatarSelector,promise) {
        this._profileTitle = document.querySelector (userNameSelector);
        this._profileSubtitle = document.querySelector (userJobSelector);
        this._profileAvatar = document.querySelector (userAvatarSelector);
        this._name = promise.name;
        this._about = promise.about;
        this._id = promise._id;
        this._link = promise.link;
        this._avatar = promise.avatar;
        this._createUser()
    }
    _createUser () {
        this._profileTitle.textContent = this._name;
        this._profileSubtitle.textContent = this._about;
        this._profileAvatar.src = this._avatar;
    }
    getUserInfo () {
        const info = { 
            name: this._name, 
            job: this._about,
            _id: this._id,
        };
        return info;
    }
    getUserId () {
        return this._id;
    }
    setUserInfo (info) {
        this._profileTitle.textContent  = info.name;
        this._profileSubtitle.textContent = info.about;
    }
    setUserAvatar (data) {
        this._profileAvatar.src = data.avatar
    }
}

