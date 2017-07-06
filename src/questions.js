const getFiles = require('./getFiles');

const questions = () => ([
    {
        type: 'list',
        name: 'type',
        message: '请选择操作类型',
        choices:['push','publish']
    },
    {
        type: 'input',
        name: 'version',
        message: '请输入分支号'
    }
])

const fileSelectQuestion = () => {
    const question = {   
        type: 'checkbox',
        name: 'proName',
        message: '请选择要操作的项目',
        choices: getFiles()
    }
    return question;
}
module.exports = {
    fileSelectQuestion,
    questions
}