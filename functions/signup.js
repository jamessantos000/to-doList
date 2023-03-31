import axios from 'axios';

export default function signUpValida(dados, callback) {

    const dataS = {
        Auth: dados
    }

    axios.post('https://taskwise.onrender.com/user/new', dataS, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': dataS.length
        },
        cache: false
    })
        .then(response => {
            callback(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}