const statusObj = {
    '0': '生效',
    '1': '暂停',
    '2': '用尽'
};
const columns = [
    {
        title: '预算名称', 
        dataIndex: 'budgetName'
    },
    {
        title: '开始时间', 
        dataIndex: 'startTime'
    },
    {
        title: '结束时间', 
        dataIndex: 'endTime'
    },
    {
        title: '预算金额', 
        dataIndex: 'budgetAmount'
    },
    {
        title: '状态', 
        dataIndex: 'status',
        render: (text) => {
            return statusObj[text];
        }
    }
];

export {
    columns
};