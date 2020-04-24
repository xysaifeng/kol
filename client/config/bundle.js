import { Component } from 'react';
import {observer} from 'mobx-react';

@observer
class Bundle extends Component {
    
    state = {
        mod: null
    }

    componentWillMount() {
        this.load(this.props);
        // console.log(this.props); // {load:f,children:f}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps);
        }
    }
    //load方法，用于更新mod状态
    load(props) {
        //初始化
        this.setState({
            mod: null
        });
        /* 调用传入的load方法，并传入一个回调函数，这个回调函数接收在load方法内异步获取到的组件，并将其更新为mod */ 
    
        props.load(mod => {
            // console.log(mod); // 是个Module{default:f Login()}对象
            // 为了兼容es module 和 AMD module
            this.setState({ mod: mod.default ? mod.default : mod });
        });
    }

    render() {
        //将存在状态中的mod组件作为参数传递给当前包装组件的'子'
        return this.state.mod ? this.props.children(this.state.mod) : null;
    }
}

export default Bundle;