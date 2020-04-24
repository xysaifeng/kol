import axios from 'axios';
import Qs from 'qs';
import { GLOBAL_API_DOMAIN } from './config';
import { localMessage, message } from '@utils';
import rootState from './store';

let timeoutAxiosRequest = null;
let timeoutAxiosResponse = null;
let errorOnce = null;

// console.log(axios.defaults);
axios.defaults.baseURL = GLOBAL_API_DOMAIN;
axios.defaults.timeout = 60 * 1000;
axios.defaults.withCredentials = false;

// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Axios同一请求发送两次 解决方案
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.transformRequest = [obj => Qs.stringify(obj)];

axios.interceptors.request.use( 
    config => {
        clearTimeout(timeoutAxiosRequest);
        timeoutAxiosRequest = setTimeout(() => {
            rootState.loadingState.showLoading();
        }, 10);
        // const um = localMessage.getCookie('account');
        // if(um) {
        //     config.header.um = um;
        // }

        return config;
    }, 
    error => {
    
        return Promise.reject(error);
    }
);
 

axios.interceptors.response.use(
    response => {
        clearTimeout(timeoutAxiosResponse);
        clearTimeout(errorOnce);
        timeoutAxiosResponse = setTimeout(() => {
            rootState.loadingState.hideLoading();
        }, 300);
        // 统一处理错误机制
        const { data={} } = response;
        // console.log(response, 9090);
        if(data) {
            const {status='', msg=''} = data;
            // console.log(ret,'ret');
            if(status && (status != 200) ) {
                errorOnce = setTimeout(() => {
                    message.error(msg || '数据异常！');
                    console.log(33);
                    rootState.appState.isAuthenticated = true;
                }, 500);
            }
        }
        // else {
        //     errorOnce = setTimeout(() => {
        //         message.error('请登录！');
        //         console.log(44);
        //     }, 500);
        // }


        // 登录失效后请求跳转至登录页面
        if(response.headers['loginstatus'] && response.headers['loginstatus'] == '401') {
            appHistory.replace('/login');
            errorOnce = setTimeout(() => {
                message.error('请登录！');
                console.log(44);
            }, 500);
        }
        return response;
    }, 
    error => {
        rootState.loadingState.hideLoading();
        // message.error('系统繁忙，请稍后重试！');
        return Promise.reject(error);
    }
);

export default axios;