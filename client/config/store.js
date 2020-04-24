import AppState from '../app.state';
import LoadingState from '@coms/loading/index.state';

class RootState {
    constructor() {
        this.appState = new AppState(this);
        this.loadingState = new LoadingState(this);
    }
}

export default new RootState();