import axios from 'axios';

class API {
    constructor() {
        this.baseURL= 'https://growdev-test-node.herokuapp.com'
    }

    post(url, dados) {
        const api = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
        return api.post(url, dados)
    }

    get(url) {
        const api = axios.create({
            baseURL: this.baseURL,
        });
        return api.get(url);
    }

    getAutenticado(url, token) {
        const api = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
        });
        return api.get(url);
    }

    postAutenticado(url, dados, token) {
        const api = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
        });
        return api.post(url,dados);
    }

    delete(url, token) {
        const api = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
        return api.delete(url)
    }
}

export default new API()