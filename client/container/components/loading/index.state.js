import { observable, action } from 'mobx';

class LoadingState {
    @observable loading = false

    @action showLoading = (loading = true) => {
        this.loading = loading;
    }

    @action hideLoading = () => {
        this.loading = false;
    }

}

export default LoadingState;