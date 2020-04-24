import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import lazyLoad from './../lazyLoad';

// 首页
import home from 'bundle-loader?lazy&name=home!@page/home/index.component';
// 报告
import report from 'bundle-loader?lazy&name=report!@page/report/index.component';
// 账户
import account from 'bundle-loader?lazy&name=account!@page/account/index.component';


const Routes = () => {
    return (
        <Switch>
            <Redirect exact strict from='/' to='/home' />
            <Route path='/home' component={lazyLoad(home, '首页')} />
            <Route path='/report' component={lazyLoad(report, '报告')} />
            <Route path='/account' component={lazyLoad(account, '账户')} />
        </Switch>
    );
};

export default Routes;