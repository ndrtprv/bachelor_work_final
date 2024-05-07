import { $authHost, $host } from "./index";
import {jwtDecode} from 'jwt-decode';

export const registration = async (login, phone_num, password, name, surname, bio) => {
    const {data} = await $host.post('api/user/signup', {login, phone_num, password, name, surname, bio, avatar: null, createdAt: new Date(), verifiedAt: null})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (login, password) => {
    const {data} = await $host.post('api/user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/check')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}