import { observable } from 'mobx';

class AppState {
    @observable isAuthenticated = false
}

export default AppState;