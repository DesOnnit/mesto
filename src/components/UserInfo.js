export default class UserInfo {
    constructor (userNameSelector,userJobSelector) {
        this._profileTitle = document.querySelector (userNameSelector);
        this._profileSubtitle = document.querySelector (userJobSelector);
    }
    getUserInfo () {
        const info = { 
            name: this._profileTitle.textContent, 
            job: this._profileSubtitle.textContent 
        };
        return info;
    }
    setUserInfo (info) {
        this._profileTitle.textContent = info.name;
        this._profileSubtitle.textContent = info.job;
    }
}