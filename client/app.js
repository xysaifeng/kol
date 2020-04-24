import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Router, Route, Redirect} from 'react-router-dom';//pn
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment';
import '@c/axios';
import { localMessage } from '@utils';
import './app.less';
moment.locale('zh-cn');
const createBrowserHistory = require('history').createBrowserHistory;
const history = createBrowserHistory();
window.appHistory = history;

import rootState from '@c/store';
import Root from '@page/root.component';
import Login from 'bundle-loader?lazy&name=login!@page/login/index.component';
import lazyLoad from '@c/lazyLoad';

try {
    const isLogin = localMessage.getlocal('islogin');
    rootState.appState.isAuthenticated = isLogin.loginFlag;
    console.log(isLogin);
} catch (error) {
    rootState.appState.isAuthenticated = false;
    console.log(2222, '===================isLogin');
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    console.log(rootState.appState.isAuthenticated,'==========gaoxioale');
    return (
        <Route
            {...rest}
            render={props =>
                rootState.appState.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login'
                        }}
                    />
                )
            }
        />
    );
};

ReactDOM.render((
    <LocaleProvider locale={zhCN}>
        <Router history={history}>
            <Switch>
                <Route path='/login' exact strict component={lazyLoad(Login,'登录')}/>
                <PrivateRoute path='/' component={Root}/>
            </Switch>
        </Router>
    </LocaleProvider>  
),document.getElementById('root'));