import LoadComponent from '@coms/loading/index.component';
import React from 'react';
import ReactDOM from 'react-dom';

function loading() {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const ref = React.createRef();
    ReactDOM.render(<LoadComponent ref={ref} />, div);
    return {
        // showLoading (isShowLoading = true) {
        //     if(isShowLoading) {
        //         return ref.current.showLoading();
        //     }else {
        //         return null;
        //     }
        // },
        // hideLoading () {
        //     return ref.current.hideLoading();
        // }
    };
}
// console.log(loading());
export default new loading();