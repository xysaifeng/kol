import { observable, action, toJS } from 'mobx';
import { localMessage } from '@utils';
import service from './index.service';
import rootState from '@c/store';
import { message } from '../../utils';

class LoginState {
    @observable account = '';
    @observable pwd = '';
    @observable code = '';
    @observable rememberPwd = true;
    @observable loginData = {
        username: '',
        // username: 'zvan',
        password: '',
        // password: '123456',
        captcha: ''
    }

    @action toggleRememberPwd = () => {
        this.rememberPwd = !this.rememberPwd;
    }

    // 刷新页面后进行初始化
    @action initLoginData = () => {
        let username = localMessage.getCookie('account') || '',
            password = localMessage.getCookie('password') || '';
        // console.log(username,password);
        this.setLoginData('username', username);
        this.setLoginData('password', password);
        // this.setLoginData('username', '');
        // this.setLoginData('password', '');
        this.setLoginData('captcha', '');
        this.rememberPwd = true;
    }

    // 登录按钮状态颜色
    @observable btnClick = false;
    @action setBtnClick = (bool=false) => {
        this.btnClick = bool;
    };

    @action setLoginData = (key, value) => {
        this.loginData[key] = value;
        this.validInput(this.loginData);
    }

    // 校验是否输入框不为空
    validInput = (params={}) => {
        if(params.username && params.password && params.captcha ) {
            this.setBtnClick(true);
        }else {
            this.setBtnClick();
        }
    }

    onChange = (e) => {
        let { name, value='' } = e.target;
        this.setLoginData(name, value);
    }

    // 按键盘enter登录
    pressEnter = () => {
        this.getLoginInfo();
    }

    onCookie = () => {
        if(this.rememberPwd) {
            localMessage.setCookie('account', this.loginData.username);
            localMessage.setCookie('password', this.loginData.password);
        }else {
            localMessage.delCookie('account');
            localMessage.delCookie('password');
        }
    }

    getLoginInfo = async () => {
        let params = toJS(this.loginData);
        if(!params.username) {
            message.error('账号不能为空！');
            return;
        }else if(!params.password) {
            message.error('密码不能为空！');
            return;
        }else if(!params.captcha) {
            message.error('验证码不能为空！');
            return;
        }
        console.log(params);

        // return;
        let result = await service.loginService(params);
        console.log(result);
        
        // return;
        try {
            if(result.data.status == 200) {
                let {userId = ''} = result.data.data || {};
                if(userId) {
                    localMessage.setlocal('nav', 0);
                    localMessage.setlocal('userId', userId);
                    localMessage.setlocal('islogin', {loginFlag: true});
                    rootState.appState.isAuthenticated = true;// 这里手动修改状态
                    this.onCookie();
                    setTimeout(()=> {// 延时再跳转避免警告
                        appHistory.replace('/');
                    },500);
                
                    console.log(rootState.appState.isAuthenticated, '登录成功了');
                }else {
                    message.error('没有用户id,请联系管理员');   
                }
            }else {
                rootState.appState.isAuthenticated = true;// 这里手动修改状态
                // rootState.appState.isAuthenticated = false;// 这里手动修改状态
                localMessage.setlocal('nav', 0);
                localMessage.setlocal('userId', 1);
                localMessage.setlocal('islogin', {loginFlag: true});
                // localMessage.setlocal('islogin', {loginFlag: false});
                this.onCookie();
                setTimeout(()=> {// 延时再跳转避免警告
                    appHistory.replace('/');
                },500);
                console.log('======================= login error');
                
            }
            
        } catch (error) {
            console.log(error);
        }
    }

}

export default new LoginState();