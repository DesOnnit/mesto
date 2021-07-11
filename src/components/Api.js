export default class Api {
    constructor ({baseUrl, headers}) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }
    _getFeath (url, method, body) {
        const feathOptons = {
            method: method,
            headers: this.headers
        };
        if (body) {
            feathOptons.body = JSON.stringify(body);
        }
        return fetch (`${this.baseUrl}/${url}`,feathOptons)
            .then (res => {
                if(res.ok) {
                    return res.json()
                }
                throw new Error (res.status)
            })
            .catch (err => console.log(`${err}`))
    }
    getUserInfo () {
        return this._getFeath ('users/me','GET')
    }
    getInitialCards () {
        return this._getFeath ('cards','GET')
    }
    saveUserInfo (item) {
        return this._getFeath ('users/me','PATCH',item)
    }
    getNewCard (item) {
        return this._getFeath ('cards','POST',item)
    }
    deleteCard (cardId) {
        return this._getFeath (`cards/${cardId}`,'DELETE')
    }
    handleLikeCard (cardId) {
        return this._getFeath (`cards/likes/${cardId}`,'PUT')
    }
    handUnlike (cardId) {
        return this._getFeath (`cards/likes/${cardId}`,'DELETE')
    }
}
