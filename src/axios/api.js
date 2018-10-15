import apiAddHuman from './interface/addHuman';
import apiUpdateHuman from './interface/updateHuman';
import apiRegisterHuman from './interface/registerHuman';
import removeHuman from './interface/removeHuman';

// 封装接口服务为插件
const install = Vue => {
    if(install.installed) return;
    install.installed = true;
    Object.defineProperties(Vue.prototype, {
        $http: {
            get() {
                return Object.assign({},apiAddHuman, apiUpdateHuman, apiRegisterHuman, removeHuman)
            }
        }
    })
}

export default install;