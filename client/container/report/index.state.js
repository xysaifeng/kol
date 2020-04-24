import { observable, toJS, action } from 'mobx';
import service from './index.service';
import { localMessage } from '@utils';
import { GLOBAL_API_DOMAIN } from '@c/config';

class HomeState {
    @observable dataObj = {};
    @action setDataObj = (obj = {}) => {
        this.dataObj = obj;
    }

    getListData = async () => {
        let id = localMessage.getlocal('userId') || '';
        let params = {
            userId: id,
            type: this.type,
            ...this.dateObj,
            ...this.pageInfo
        };
        // console.log(toJS(params), 88989);
        // return;

        let result = await service.reportService(params);
        // console.log(result,'================222');
        // return;
        try {
            if(result.data.status === 200) {

                let {data = [], total=0} = result.data.data;
                let page = result.data.nowPage * 1;
                // console.log(page);
                // console.log(total);
                // console.log(data);
                this.setPageInfo('page', page);
                this.setPageInfo('total', total);
                this.setDataSource(data);

            }else {
                // message.error(result.data.msg);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    // 列表数据
    @observable dataSource = [];
    @action setDataSource = (arr=[]) => {
        this.dataSource = arr;
    }

    // 日期
    @observable dateObj = {
        startTime: '',
        endTime: ''
    }
    @action setDateObj = (key, value) => {
        this.dateObj[key] = value;
    }
    @action initDateObj = () => {
        this.setDateObj('startTime', '');
        this.setDateObj('endTime', '');
    }

    handleStartChange = (date, dateString) => {
        console.log(dateString);
        this.setDateObj('startTime', dateString);
        this.getListData();
    }
    handleEndChange = (date, dateString) => {
        console.log(dateString);
        this.setDateObj('endTime', dateString);
        this.getListData();
    }

    // 类型
    @observable type = 1;
    @action setType = type => {
        this.type = type;
    }

    // 分页
    @observable pageInfo = {
        page: 1,
        total: 0
    }

    @action setPageInfo = (key, value) => {
        this.pageInfo[key] = value;
    }
    @action initPageInfo = () => {
        this.setPageInfo('page', 1);
        this.setPageInfo('total', 0);
        // console.log(toJS(this.pageInfo),'++++++++++++++');
    }

    handlePageChange = (current) => {
        this.setPageInfo('page', current);
        this.getListData();
    }

    // 导出数据
    handleExport = async () => {
        let id = localMessage.getlocal('userId') || '';
        let params = {
            userId: id,
            type: this.type,
            ...this.dateObj,
            ...this.pageInfo
        };
        // console.log(toJS(params));

        let src = `${GLOBAL_API_DOMAIN}/api/report/exportExcel?userId=${params.userId}&startTime=${params.startTime}&endTime=${params.endTime}&type=${params.type}`;
        console.log(toJS(src));
        return await src;
        // this.setSrc(src);
    }

    @observable tableHeight = 300;
    @action setTableHeight = (h = 300) => {
        this.tableHeight = h;
    }

    getHeight = () => {
        let windowHeight = document.body.clientHeight;
        let height = windowHeight - 360;
        this.setTableHeight(height);
    }

}

export default new HomeState();