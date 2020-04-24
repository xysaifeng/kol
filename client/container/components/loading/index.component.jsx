import React from 'react';
import { observer } from 'mobx-react';
import rootState from '@c/store';
import './index.less';

console.log(rootState.loadingState);

@observer 
class Index extends React.Component {
    // state = {
    //     loading: false
    // }

    // showLoading = () => {
    //     this.setState({loading: true});
    // }

    // hideLoading = () => {
    //     this.setState({loading: false});
    // }

    render() {
        return (
            <div className={rootState.loadingState.loading ? 'loading': 'loading hide'}>
                <div className='spinner'>
                    <div className='bounce1'></div>
                    <div className='bounce2'></div>
                    <div className='bounce3'></div>
                </div>
                <span>Loading...</span>
            </div>
        );
    }
}

export default Index;