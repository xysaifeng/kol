import axios from 'axios';
const url = '/api/account/getBudget';
const loginOutUrl = 'api/login/logout';
// 修改密码
const updatePwdUrl = 'api/account/editPwd';

class AccountService {
    getDataService = (req ={}) => {
        console.log(req,'333');

        return new Promise((resolve, reject) => {
            axios.get(url, {params: req})
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

    updatePwdService = (req ={}) => {
        return new Promise((resolve, reject) => {
            axios.post(updatePwdUrl,req)
                .then(res => {
                    resolve(res); 
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }
}

export default new AccountService;