import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { localMessage } from '@utils';
import './index.less';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.nav = [
            {
                link: '/home',
                linkText: '首页',
                navIndex: 0
            },
            {
                link: '/report',
                linkText: '报告',
                navIndex: 1
            },
            {
                link: '/account',
                linkText: '账户',
                navIndex: 2
            }
        ];
    }

    handleClick = (i) => {
        this.setState({activeIndex: i});
        localMessage.setlocal('nav', i);
    }

    // 刷新页面保持当前页面
    refreshPage = () => {
        let nav = localMessage.getlocal('nav');
        if(typeof nav != null) {
            this.setState({activeIndex: nav});
        }else {
            this.setState({activeIndex: 0});
        }
    }

    componentDidMount() {
        this.refreshPage();
        const history = appHistory;
        this.setAcitveNav(history.location);
        this.unlisten = history.listen(this.setAcitveNav);
    }

    componentWillUnmount() {
        this.unlisten();
    }

    setAcitveNav = location => {
        const pathname = location.pathname;
        this.nav.forEach(item => {
            if(item.link === pathname) {
                this.setState({activeIndex: item.navIndex});
                localMessage.setlocal('nav', item.navIndex);
            }
        });

    }
    
    render() {
        let { activeIndex } = this.state;
        return (
            <div className='header'>
                <div className='header-content'>
                    <img src={require('./../../../assets/imgs/2.index-LOGO.png')} alt='logo'/>
                    <div className='right'>
                        <span 
                            
                            className={activeIndex === 0 ? 'active' : ''}
                        >
                            <Link onClick={this.handleClick.bind(this, 0)} to='/home'>首页</Link>
                        </span>
                        <span 
                           
                            className={activeIndex === 1 ? 'active' : ''}
                        >
                            <Link onClick={this.handleClick.bind(this, 1)} to='/report'>报告</Link>
                        </span>
                        <span 
                            
                            className={activeIndex === 2 ? 'active' : ''}
                        >
                            <Link onClick={this.handleClick.bind(this, 2)} to='/account'>账户</Link>
                        </span>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;