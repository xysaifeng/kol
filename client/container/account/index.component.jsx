import React,{Fragment} from 'react';
import { observer } from 'mobx-react';
import { Divider, Table, Modal, Form, Input, Button } from 'antd';
import { columns } from './index.data';
import state from './index.state';
import './index.less';

@observer
class Account extends React.Component {

    componentDidMount() {
        state.getData();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            // console.log('Received values of form: ', values);
            state.setUpdatePwdObj(values);
            state.updatePwd();
          }else {
              console.log(err);
          }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const {dataList=[]} = state;
        let info = {};
        if(dataList.length > 0) {
            info = dataList[0];
        }
        return (
            <div className='account'>
                <div className='home-top'>
                    <div className='row row1'>
                        <span className='overview'>BUDGET</span>
                        <span className='company'>
                            <span>{info.company}</span>
                            <Divider type='vertical' />
                            <span className='exit'>
                                <a href='javascript:;' onClick={state.loginOut}>退出账户</a>
                            </span>
                        </span>
                    </div>
                    <div className='row row2'>
                        <span className='overview2'>账户预算</span>
                        
                    </div>
                    <div className='blue-line'>
                        <img src={require('./../assets/imgs/2.index-line.png')} alt='line'/>
                    </div>
                </div>
                <div className='budget'>
                    <Table 
                        dataSource={dataList}
                        columns={columns}
                        rowKey={(record) => record.id}
                        pagination={false}
                        // size={'small'}
                    />
                </div>
                <div className='home-top account-top'>
                    <div className='row row1'>
                        <span className='overview'>ACCOUNT</span>
                    </div>
                    <div className='row row2'>
                        <span className='overview2'>账户信息</span>
                    </div>
                    <div className='blue-line'>
                        <img src={require('./../assets/imgs/2.index-line.png')} alt='line'/>
                    </div>
                </div>
                <div className='account'>
                    <div>
                        <span>用户名：</span>
                        <span>{info.user_name}</span>
                        <Divider type='vertical' />
                        <span className='exit'>
                            <a href='javascript:;' onClick={state.showModal}>修改密码</a>
                        </span>
                    </div>
                    <div>
                        <span>公司名：</span>
                        <span>{info.company}</span>
                    </div>
                    <div>
                        <span>网址：</span>
                        <span>{info.site}</span>
                    </div>
                </div>

                <Modal
                    visible={state.isShow}
                    onCancel={state.hideModal}
                    footer={null}
                    closable={false}
                    centered={true}
                    width={325}
                    wrapClassName='modify-pwd'
                    destroyOnClose={true}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item label='旧密码'>
                            {
                                getFieldDecorator('oldPwd', {})(
                                    <Input type='password' allowClear={true}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label='新密码'>
                            {
                                getFieldDecorator('newPwd', {})(
                                    <Input type='password' allowClear={true} />
                                )
                            }
                        </Form.Item>
                        <Form.Item label='确认新密码'>
                            {
                                getFieldDecorator('reNewPwd', {})(
                                    <Input type='password' allowClear={true} />
                                )
                            }
                        </Form.Item>
                   
                        <Button 
                            className='submit-btn' 
                            htmlType='submit' 
                            type='primary' 
                        >确认</Button>
                    </Form>
                </Modal>
            </div>
        );
    }
}

Account = Form.create()(Account);
export default Account;