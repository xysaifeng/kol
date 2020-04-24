import React,{Fragment} from 'react';
import { observer } from 'mobx-react';
import { Divider  } from 'antd';
import state from './index.state';
import './index.less';

@observer
class Home extends React.Component {
    handleClick = () => {
        console.log(1233);
    }

    componentDidMount() {
        state.getData();
    }

    render() {

        return (
            <div className='home'>
                <div className='home-top'>
                    <div className='row row1'>
                        <span className='overview'>OVERVIEW</span>
                        <span className='company'>
                            <span>{state.dataObj.company}</span>
                            <Divider type='vertical' />
                            <span className='exit'>
                                <a href='javascript:;' onClick={state.loginOut}>退出账户</a>
                            </span>
                        </span>
                    </div>
                    <div className='row row2'>
                        <span className='overview2'>昨日推广数据概览</span>
                        <span className='company'>
                            <span>账户余额 : ￥</span>
                            <span>{state.dataObj.accountBalance}</span>
                        </span>
                    </div>
                    <div className='blue-line'>
                        <img src={require('./../assets/imgs/2.index-line.png')} alt='line'/>
                    </div>
                </div>
                <div className='content'>
                    <div className='left'>
                        <span className='money'>￥{state.dataObj.spend}</span>
                        <span className='label'>花费</span>
                        <span className='white-line'></span>
                        <span className='angle'></span>
                        <span className='star'>
                            <img src={require('./../assets/imgs/star.png')} alt='wuxinng' />
                        </span>
                    </div>
                    <div onClick={this.handleClick} className='right'>
                        <div>
                            <span className='money'>{state.dataObj.extension}</span>
                            <span className='label'>曝光量</span>
                        </div>
                        <div>
                            <span className='money'>{state.dataObj.click}</span>
                            <span className='label'>点击量</span>
                        </div>
                        <div>
                            <span className='money'>{state.dataObj.thousandsExposureCosts}</span>
                            <span className='label'>千次曝光成本</span>
                        </div>
                        <div>
                            <span className='money'>{state.dataObj.onceClickCosts}</span>
                            <span className='label'>单次点击成本</span>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}


export default Home;