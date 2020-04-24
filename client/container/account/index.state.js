import { observable, action, toJS } from 'mobx';
import { message, localMessage } from '@utils';
import rootState from '@c/store';
import service from './index.service';

class AccountState {
    @observable dataList = [];
    @action setDataList = (arr = []) => {
        this.dataList = arr;
    }
   
    getData = async () => {
        let id = localMessage.getlocal('userId') || '';
        let params = {userId: id};
        let result = await service.getDataService(params);
        console.log(result);
        try {
            if(result.data.status === 200){
                let {data = []} = result.data;
                if(data.length > 0) {
                    let dataList = [data[0]];
                    console.log(dataList);
                    this.setDataList(dataList);
                }
            }else {
                // message.error(result.data.msg);
            }
        } catch (error) {
            console.log(error);
        }

    }

    loginOut = async () => {
        let result = await service.loginOutService();
        console.log(result,'loginout');
        try {
            if(result.data.status == 200) {
                appHistory.replace('/login');
                // 设置为false 有问题
                // localMessage.setlocal('islogin', {loginFlag: false});
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

    // 修改密码
    updatePwd = async () => {
        let params = toJS(this.updatePwdObj);
        let id = localMessage.getlocal('userId') || '';
        params.userId = id;
        
        if(!params.oldPwd || !params.newPwd || !params.reNewPwd) {
            message.error('密码不能为空！');
            return;
        }
        if(params.newPwd !== params.reNewPwd) {
            message.error('两次密码不一致！');
            return;
        }
        console.log(params);

        // return;

        let result = await service.updatePwdService(params);
        // console.log(result,'pwd');
        try {
            if(result.data.status == 200) {
                message.success('修改成功！');
                this.hideModal();

            }else {
                // message.error(result.data.msg || 'err');
                // 不关闭弹框 update on 20190723 22:52
                // this.hideModal();
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    // 修改密码
    @observable updatePwdObj = {};
    @action setUpdatePwdObj = (obj = {}) => {
        this.updatePwdObj = obj;
    }

    // 弹出框状态
    @observable isShow = false;
    @action hideModal = () => {
        this.isShow = false;
    }
    @action showModal = () => {
        this.isShow = true;
    }
}

export default new AccountState();