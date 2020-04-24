import React from 'react';
import { observer } from 'mobx-react';
import { Button, Input } from 'antd';
import state from './index.state';
import './index.less';
import { GLOBAL_API_DOMAIN } from '@c/config';

@observer
class Login extends React.Component {
    // ref = React.createRef();
    state = {
        validCodeImg: `${GLOBAL_API_DOMAIN}/api/login/showCaptcha`
    }
    
    componentDidMount() {
        state.initLoginData();
        // console.log(this.ref.current.scrollOffset);
        // console.log(this.ref.current.scrollHeight);
        // console.log(this.ref.current.scrollTop);
        // console.log(this.ref,'==33');

        // let docH = document.body.scrollHeight, //滚动条自身高度
        // scrollTop = document.body.scrollTop;  //滚动条滚动高度
        // console.log(docH,'==3');
        // console.log(scrollTop,'==4');


        // console.log(this.ref.scrollHeight);
    }

    handleClickImg = () => {
        let randomNum = parseInt(Math.random() * 100000);
        let validCodeImg = `${GLOBAL_API_DOMAIN}/api/login/showCaptcha/id=${randomNum}`;
        this.setState({validCodeImg});
    }

    render() {
        // console.log(state.loginData.username, 88989);
        return <div className='login'>
        {/* // return <div className='login' ref={el => this.ref = el}> */}
            <div className='login-bg'>
                <div className='login-wrapper'>
                    <img className='logo' src={require('./../assets/imgs/signIn-LOGO.png')} alt='logo' />
                    <div className='sign-text'>Sign in</div>
                    <div className='formInput'>
                   
                        <div className='parent-box'>
                            <span>Account</span>
                            
                            <Input
                                autoComplete='off' 
                                onChange={state.onChange} 
                                name='username' 
                                allowClear={true} 
                                // defaultValue='zvan'
                                onPressEnter={state.pressEnter}

                                placeholder='请输入账号'
                                value={state.loginData.username}
                            />
                        </div>
                        <div className='parent-box'>
                        
                            <span>Password</span>        
                            <Input 
                                // autoComplete='off' 
                                type='password' 
                                onChange={state.onChange} 
                                name='password' 
                                // defaultValue='123456'
                                allowClear={true} 
                                onPressEnter={state.pressEnter}

                                placeholder='请输入密码'
                                value={state.loginData.password}
                            />
                        
                        </div>
                        <div className='parent-box code'>
                       
                            <span>Code</span>           
                            <Input 
                                onChange={state.onChange} 
                                name='captcha' 
                                autoComplete='off'
                                allowClear={true} 
                                onPressEnter={state.pressEnter}
                                
                            />
                            <img title='看不清点击换一张' src={this.state.validCodeImg} onClick={this.handleClickImg} width={80} height={35}/>
                        </div>
                        <span onClick={state.toggleRememberPwd} className='remenber-pwd'>
                            <span className={state.rememberPwd ? 'select' : ''}></span>
                            <span>记住密码</span>
                        </span>
                    </div>
                    <span className={state.btnClick ? 'sign-btn' : 'sign-btn shadow'} onClick={state.btnClick ? state.getLoginInfo : null} >登录</span>
                </div>
            </div>
        </div>;
    }
}

export default Login;