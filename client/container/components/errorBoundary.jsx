/**
 * @description 错误边界组件
 */

import React from 'react';

class ErrorBoundary extends React.Component {
    state = {
        hasError: false
    }

    static getDerivedStateFromError(error) {
        console.log(error,'error11111');
        return {hasError: true};
    }

    componentDidCatch(error, info) {
        console.log(error, 8888);
        console.log(info, 99999);
    }

    render() {
        if(this.state.hasError) {
            return <h1>something went wrong!</h1>;
        }
    
        return this.props.children;
    }
}

export default ErrorBoundary;