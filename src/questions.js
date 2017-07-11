const chalk = require('chalk');
const { getCurrentVersion } = require('./file')

const questions = (name) => ([
    {
        type: 'list',
        name: 'type',
        message: '请选择操作类型',
        choices:['push','publish']
    },
    {
        type: 'input',
        name: 'version',
        message: '请输入分支号',
        default: getCurrentVersion(name)
    }
])

const fileSelectQuestion = (files) => (
    {
        type: 'checkbox',
        name: 'name',
        message: '请选择要操作的项目',
        choices: files,
        validate: (content) => {
            if (content.length === 0) {
                return '至少选择一个项目!';
            }
            return true;
        }
    }
)

const comfirmQuestion = (proList) => (
    {
        type: 'confirm',
        name: 'isOk',
        message: `当前选中的项目有：\n${chalk.cyan(proList)}\n请确认操作项目：`,
        validate: (content) => {
            if (!content) {
                process.exit(0);
                return false;
            }
            return true;
        }
    }
)

module.exports = {
    fileSelectQuestion,
    questions,
    comfirmQuestion
}