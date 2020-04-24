/**
 * @desc 下载excel表格
 * @param exportUrl 请求路径 类型：string
 */
import React from 'react';

class Index extends React.Component {
    state = { exportUrl: '' }
    
    static defaultProps = {
        text: '导出表格'
    }

    exportExcel = () => {
        this.props.exportExcel().then(res => {
            this.setState({exportUrl: res});
        });
    }

    render() {
        const { text } = this.props, { exportUrl } = this.state;
        return (
          <div>
              <span className='export' onClick={this.exportExcel}>
                  <a href='javascript:;' >{text}</a>
              </span>
              <iframe src={exportUrl} frameBorder={0} style={{display: 'none'}}></iframe>
          </div>  
        );
    }
}

export default Index;