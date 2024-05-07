import { makeAutoObservable } from 'mobx';

export default class UserStore {

    constructor() {
        this._isLoggedIn = false;
        this._isAdmin = false;
        this._user = {};
        makeAutoObservable(this);
    }

    setIsLoggedIn(bool) {
        this._isLoggedIn = bool;
    }

    setIsAdmin(bool) {
        this._isAdmin = bool;
    }

    setUser(user) {
        this._user = user;
    }

    get isLoggedIn() {
        return this._isLoggedIn;
    }

    get isAdmin() {
        return this._isAdmin;
    }

    get user() {
        return this._user;
    }
}