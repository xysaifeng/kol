import axios from 'axios';
const reportUrl = 'api/report/adreport';


class LoginService {
    reportService = (req ={}) => {
        return new Promise((resolve, reject) => {
            axios.get(reportUrl,{params: req})
                .then(res => {
                    resolve(res); 
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }
}

export default new LoginService;