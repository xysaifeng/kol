class localMessage {
    getlocal = (str) => {
        try {
            if(window.Storage && window.localStorage && window.localStorage instanceof Storage) {
                //获取数据
                // eslint-disable-next-line camelcase
                const localMessage = JSON.parse(window.localStorage.getItem(str));
                return localMessage;
            }
        } catch (error) {
            console.log(error);
        }
    }

    setlocal = (str, obj) => {
        try {
            if(window.Storage && window.localStorage && window.localStorage instanceof Storage) {
                //存入数据
                window.localStorage.setItem(str, JSON.stringify(obj));
            }
        } catch (error) {
            console.log(error);
        }
    }

    removelocal = (str) => {
        try {
            if(window.Storage && window.localStorage && window.localStorage instanceof Storage) {
                //删除指定localStorage
                window.localStorage.removeItem(str);
            }
        } catch (error) {
            console.log(error);
        }
    }

    clearAllLocal = () => {
        try {
            if(window.Storage && window.localStorage && window.localStorage instanceof Storage) {
                //删除全部localStorage
                window.localStorage.clear();
            }
        } catch (error) {
            console.log(error);
        }
    }

    // 读写删除 cookie

    setCookie = (name, value) => {
        let days = 365;
        let exp = new Date();
        exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = name + '=' + escape(value) + ';path=/;expires=' + exp.toGMTString();
    }

    getCookie2 = name => {
        let arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
        if(arr != null) {
            return arr[2];
        }
        return null;
    }

    getCookie = name => {
        var name = name + '=';
        var ca = document.cookie.split('; ');
        for(var i = 0; i < ca.length; i ++) {
            var c = ca[i].trim();
            if(c.indexOf(name) == 0){
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }

    // 删除指定cookie
    delCookie = name => {
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        let cookie = this.getCookie(name);
        if(cookie) {
            document.cookie = name + '=' + cookie + ';expires=' + exp.toGMTString();
        }
    }

    // 删除所有cookie
    clearAllCookie = () => {
        let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if(keys) {
            for(let i = keys.length; i --;) {
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toGMTString();
            }
        }
    }

    // 读写session
    getSession = (str) => {
        try {
            if(window.Storage && window.sessionStorage && window.sessionStorage instanceof Storage) {
                //获取数据
                const localMessage = JSON.parse(window.sessionStorage.getItem(str)) || null;
                return localMessage;
            }
        } catch (error) {
            console.log(error);
        }
    }

    setSession = (str, obj) => {
        try {
            if(window.Storage && window.sessionStorage && window.sessionStorage instanceof Storage) {
                //存入数据
                window.sessionStorage.setItem(str, JSON.stringify(obj));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default new localMessage;