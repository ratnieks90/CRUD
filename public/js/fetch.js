import axios from 'axios';

//wrapper class for http client
class Fetch {
    static get(url) {
        return new Promise((resolve, reject) => {
            axios.get(url).then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        })
    }

    static post(url, data) {
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject(error);
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
                    reject(error);
                });
        })
    }
}

export default Fetch;