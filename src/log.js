const chalk = require('chalk');

const bar = (name) => {
    const icon = '*'
    const len = 70;
    const nameLen = name.length;
    let startLen= 0;
    let endLen= 0;
    let showLog = '';
    if (len>nameLen) {
        const edgeLen = (len-nameLen)/2;
        if (edgeLen.toString().indexOf('.') !== -1) {
            startLen = edgeLen.toString().split('.')[0];
            endLen = edgeLen*2 -startLen;
        } else {
            startLen = edgeLen;
            endLen = edgeLen;
        }
        for (let i = 0;i<startLen;i++) {
            showLog+=icon;
        }
        if ( startLen == endLen ){
            const edgeLog = showLog;
            showLog+= chalk.cyan(name);
            showLog+= edgeLog;
        } else {
            showLog+= chalk.cyan(name);
            for (let i = 0;i<endLen;i++) {
                showLog+=icon;
            }
        }
        console.log(showLog);
    }
}

const welcome = () => {
    //bar('');
    bar('欢迎使用git批量发布系统');
    //bar('');
}
module.exports = {
    bar,
    welcome
}