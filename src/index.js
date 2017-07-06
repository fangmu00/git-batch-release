#! /usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const child_process = require('child_process'); // js执行命令行
const fs = require('fs');
const path = require('path');
const { fileSelectQuestion, questions } = require('./questions');

const { resolve } = path;
let file = null;

try {
    file = fs.readFileSync(resolve(__dirname, '../project.json')); // 获取项目配置文件
} catch (error) {
    console.log(`\n\n  ${chalk.red(error)}`);
}
if (!file) { return false }
const fileJson = JSON.parse(file);

const execSh = (commands, name) => {
  commands.some(function(item) {
    console.log((`\n${chalk.cyan('Executing:')} ${item}`));
    let output;
    try {
      output = child_process.execSync(item, { cwd: fileJson[name].proPath });

    } catch(err) {
      console.log(`${chalk.red(err.stdout)}`);
    }
    output && process.stdout.write(output);

    if  (output === undefined) {
        return true;
    }
  });
}

const pushItem = (type, item) => {
    console.log(`\n${chalk.yellow('Start runing: ')}${item}`);
    let command = [
        'git fetch origin',
        'git merge origin/master',
        'git add . --all',
        'git commit -m \'build\'',
        `git push origin ${fileJson[item].version}`,
    ]
    if (type === 'publish') {
        const versionNumber = fileJson[item].version.split('/')[1];
        console.log(versionNumber);
        command = [
            'git fetch origin',
            'git merge origin/master',
            `git tag publish/${versionNumber}`,
            `git push origin -u publish/${versionNumber}`,
        ]
    }
    let file = null;
    try {
        file = fs.readFileSync(resolve(__dirname, `../${fileJson[item].proPath}/.git/refs/heads/${fileJson[item].version}`));
    } catch(err) {
        console.log(`\n${chalk.red('Error: The git file is non-existent!')}`);
    }
    file && execSh(command, item);
}

const push = () =>{
    program
    .command('push')
    .alias('p')
    .description('提交代码')
    .option('-a, --all','提交所有', ()=> { Object.keys(fileJson).forEach((item) => { pushItem('push',item); })})
    .option('-i, --items [proName]','提交指定内容', (v)=> { const arr = v.split(','); arr.forEach((item) => { pushItem('push',item); })})
    .action(option => {
        console.log((`\n${chalk.green('End')}`));
    });
}


const publish = () =>{
    program
    .command('publish')
    .alias('pb')
    .description('发布代码')
    .option('-a, --all','发布所有', ()=> { Object.keys(fileJson).forEach((item) => { pushItem('publish',item); })})
    .option('-i, --items [proName]','发布指定内容', (v)=> { const arr = v.split(','); arr.forEach((item) => { pushItem('publish',item); })})
    .action(option => {
        console.log((`\n${chalk.green('End')}`));
    });
}

const init = () =>{
    program
    .command('start')
    .alias('s')
    .description('开始')
    .action(option => {
        inquirer.prompt(fileSelectQuestion()).then((content) => {
            console.log(content);
        })
    });
}

init();
push();
publish();
program.parse(process.argv);