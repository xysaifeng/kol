import React,{Fragment} from 'react';
import { observer } from 'mobx-react';
import { Form, DatePicker, Table, Pagination } from 'antd';
import { ExportExcel } from '@coms';
import { columns1, columns2, data } from './index.data';
import state from './index.state';

import './index.less';

@observer
class Report extends React.Component {
    state = {
        activeIndex: 1
    }

    switchBtn = (i) => {
        if(this.state.activeIndex !== i) {
            this.setState({activeIndex: i});
            this.props.form.resetFields();
            state.setType(i);
            state.initDateObj();
            state.initPageInfo();
            state.getListData();
        }
    }

    componentDidMount() {
        state.getHeight();
        state.getListData();
        state.initDateObj();
        state.initPageInfo();
    }

    componentWillUnmount() {
        // 初始化type
        state.setType(1);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const config = {
            rules: [{ required: false, message: 'Please select time!' }]
        };
        const { activeIndex } = this.state;
        const columns = activeIndex === 1 ? columns1 : columns2;
        return (
            <div className='report'>
                <div className='home-top'>
                    <div className='row row1'>
                        <span className='report'>REPORT</span>
                        <ExportExcel exportExcel={state.handleExport} />
                    </div>
                    <div className='row row2'>
                        <div className='left-ad'>
                            <span 
                                onClick={this.switchBtn.bind(this, 1)} 
                                className={activeIndex === 1 ? 'active' : ''}>推广数据广告</span>
                            <span 
                                onClick={this.switchBtn.bind(this, 2)} 
                                className={activeIndex === 2 ? 'active' : ''}>广告系列数据</span>
                        </div>
                       
                        <Form layout='inline'>
                            <Form.Item label='开始时间'>
                                {getFieldDecorator('startTime', config)(
                                    <DatePicker 
                                        showToday={false} 
                                        allowClear={true}
                                        name='startTime'
                                        onChange={state.handleStartChange}
                                    />
                                )}
                            </Form.Item>
                            <Form.Item label='结束时间'>
                                {getFieldDecorator('endTime', config)(
                                    <DatePicker 
                                        showToday={false} 
                                        allowClear={true} 
                                        name='endTime'
                                        onChange={state.handleEndChange}
                                    />
                                )}
                            </Form.Item>
                        </Form>
                        
                    </div>
                    
                </div>
                <div className='list'>
                    <Table 
                        columns={columns} 
                        dataSource={state.dataSource}
                        rowKey={(record,i)=> i}
                        pagination={false}
                        scroll={{y: state.tableHeight}}
                        // size={'middle'}
                    />
                    <Pagination 
                        onChange={state.handlePageChange} 
                        total={state.pageInfo.total} 
                        current={state.pageInfo.page}
                        size='small'
                        // itemRender={itemRender} 
                    />
                </div>
                {/* <iframe src={state.src ? state.src : ''} frameBorder={0} style={{display: 'none'}}></iframe> */}
                
            </div>
        );
    }
}

Report = Form.create()(Report);
export default Report;

function itemRender(current, type, originalElement) {
    if (type === 'prev') {
        return <a>上一页</a>;
    }
    if (type === 'next') {
        return <a>下一页</a>;
    }
    return originalElement;
}