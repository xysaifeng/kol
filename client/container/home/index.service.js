import axios from 'axios';
const indexUrl = 'api/index/index';
const loginOutUrl = 'api/login/logout';

class LoginService {
    homeService = (req ={}) => {
        return new Promise((resolve, reject) => {
            axios.get(indexUrl,{params: req})
                .then(res => {
                    resolve(res); 
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }

    loginOutService = (req ={}) => {
        return new Promise((resolve, reject) => {
            axios.get(loginOutUrl,{params: req})
                .then(res => {
                    resolve(res); 
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }
}

export default new LoginService;