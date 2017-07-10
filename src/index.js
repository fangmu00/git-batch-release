#! /usr/bin/env node
// todo 1.获取当前项目分支 2.确认对话验证处理
const program = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const child_process = require('child_process'); // js执行命令行
const fs = require('fs');
const path = require('path');
const { fileSelectQuestion, questions, comfirmQuestion } = require('./questions');
const getFiles = require('./getFiles');
const { checkCleanCommand, commands } = require('./commands');
const log = require('./log');
const proList = []; //用于存项目列表

const execSh = (commands, content) => {
    let _commands = commands instanceof Array ? commands : [commands];
    console.log((`\n${chalk.cyan('Executing:')} ${content.name}`));

    _commands.some(function(item) {
        let output;
        try {
            output = child_process.execSync(item.command, { cwd: `${process.cwd()}/${content.name}`, encoding: 'utf8' });
            item.errFn && item.errFn(output);
            process.stdout.write(output);
        } catch(err) {
            console.log(`${chalk.red(err.stdout)}`);
        }
        if  (output === undefined) {
            return true;
        }
    });
}

const solveQuestions = (name, index) => {
    if (!name[index]) {
        proList.forEach((item) => {
            execSh(commands(item), item);
        })
        return false;
    }
    log.bar(name[index]);
    inquirer.prompt(questions()).then((content) => {
        proList.push({
            name:name[index],
            type: content.type,
            version: content.version
        });
        log.bar('end');
        console.log('\n');
        solveQuestions(name, index+1)
    });
}

const init = () =>{
    program
    .command('start')
    .alias('s')
    .description('开始')
    .action(option => {
        log.welcome();
        const files = getFiles();
        if (files.length > 0) {
            inquirer.prompt(fileSelectQuestion(files)).then((content) => {
                content.name.forEach((item) => {
                    const o = {
                        name: item
                    }
                    execSh(checkCleanCommand(o),o);
                });
                inquirer.prompt(comfirmQuestion(content.name.join(','))).then(() => {
                    solveQuestions(content.name, 0);
                });
            })
        } else {
            console.log(`\n${chalk.red('Error: 没有可操作的项目!')}`);
        }
    });
}

init();
program.parse(process.argv);