import { message } from 'antd';

class Message {
    success = (str) => {
        message.success(str);
    }

    error = (str) => {
        message.error(str);
    }

    warning = (str) => {
        message.warning(str);
    }

}

export default new Message;