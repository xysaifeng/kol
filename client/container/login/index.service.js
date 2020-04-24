import axios from 'axios';

const loginUrl = '/api/login/login';
// 验证码
const validCodeUrl = '/api/login/showCaptcha';
// console.log(axios);

class LoginService {
    loginService = (req ={}) => {
        return new Promise((resolve, reject) => {
            axios.post(loginUrl, req)
                .then(res => {
                    resolve(res); 
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }

    validCodeService = (req ={}) => {
        return new Promise((resolve, reject) => {
            axios.get(validCodeUrl,{params: req})
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