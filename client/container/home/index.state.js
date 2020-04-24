import { observable, toJS, action } from 'mobx';
import service from './index.service';
import rootState from '@c/store';
import { message, localMessage } from '@utils';


class HomeState {
    @observable dataObj = {};
    @action setDataObj = (obj = {}) => {
        this.dataObj = obj;
    }

    getData = async () => {
        let id = localMessage.getlocal('userId') || '';
        let params = {userId: id};
        let result = await service.homeService(params);
        // console.log(result,'================');
        try {
            if(result.data.status === 200) {
                let dataObj = {...result.data.data};
                // console.log(dataObj, 999999);
                let {
                    accountBalance = '', // 账户余额
                    spend = '',
                    extension = '',
                    click = '',
                    company ='',
                    thousandsExposureCosts = '',
                    onceClickCosts = ''
                } = dataObj;

                let newDataObj = {accountBalance, spend, extension, click, thousandsExposureCosts, onceClickCosts, company};
                this.setDataObj(newDataObj);
                // console.log(toJS(this.dataObj), 888999);

            }else {
                // message.error(result.data.msg);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    loginOut = async () => {
        let result = await service.loginOutService();
        // console.log(result,'loginout');
        try {
            if(result.data.status == 200) {
                appHistory.replace('/login');
                localMessage.clearAllLocal();// 应该清除所有local
                // 手动更改状态
                rootState.appState.isAuthenticated = false;
            }else {
                // message.error(result.data.msg);
            }
            
        } catch (error) {
            console.log(error);
        }
    }
}

export default new HomeState();