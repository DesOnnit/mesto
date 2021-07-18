export default class UserInfo {
    constructor (userNameSelector,userJobSelector,userAvatarSelector) {
        this._profileTitle = document.querySelector (userNameSelector);
        this._profileSubtitle = document.querySelector (userJobSelector);
        this._profileAvatar = document.querySelector (userAvatarSelector);
    }
    getUserInfo () {
        const info = { 
            name: this._profileTitle.textContent, 
            job: this._profileSubtitle.textContent,
        };
        return info;
    }
    setUserInfo (info) {
        this._profileTitle.textContent  = info.name;
        this._profileSubtitle.textContent = info.about;
        this._profileAvatar.src = info.avatar
    }
    setUserAvatar (data) {
        this._profileAvatar.src = data.avatar
    }
}

