import axios from 'axios';
//wrapper class for http client
export default class Fetch {

    static get(url) {
        return new Promise((resolve, reject) => {
            axios.get(url).then(response => {
                resolve(response.data)
            }).catch(function (error) {
                if (error.response) {
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
        })
    }

    static post(url, data) {
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    if (error.response) {
                        reject(error.response.data.error);
                    } else {
                        reject(error);
                    }
                });
        })
    }

    static put(url, data) {
        return new Promise((resolve, reject) => {
            axios.put(url, data)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    if (error.response) {
                        reject(error.response.data.error);
                    } else {
                        reject(error);
                    }
                });
        })
    }

    static delete(url) {
        return new Promise((resolve, reject) => {
            axios.delete(url)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    if (error.response) {
                        reject(error.response.data.error);
                    } else {
                        reject(error);
                    }
                });
        })
    }
}