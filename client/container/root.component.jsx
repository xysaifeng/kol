import React, { Suspense } from 'react';

//引入错误边界
import ErrorBoundary from './components/errorBoundary';
import Header from './main/components/header/index.component';
import Loading from './components/loading/index.component';
import Routes from './../config/router/index';
import rootState from '@c/store';
import './main/index.less';

// console.log(rootState,'rrrr');

export default class Root extends React.Component {

  
    render() {
        const {pathname=''} = this.props.location;
        rootState.loadingState.hideLoading();

        return (
            <ErrorBoundary>
                <Suspense fallback={<div style={{color: 'red'}}>Loading...</div>}>
                    <div className='page-content main'>
                        <Header></Header>
                        <div className='main-content'>
                            <div className={pathname == '/report' ? '' : 'bg-img'}>
                                <div className='page-container'>
                                    <Routes />
                                </div>
                            </div>
                        </div>
                        <Loading></Loading>
                    </div>
                </Suspense>
            </ErrorBoundary>
        );
    }
}