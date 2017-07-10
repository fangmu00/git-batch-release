const chalk = require('chalk');

const checkCleanCommand = (content) => (
    {
        command: 'git status',
        errFn: function(data) {
            if (data.indexOf('working tree clean') === -1 && data.indexOf('working directory clean') === -1) {
                console.log(chalk.red(`\nError: 你必须清空 ${content.name} 项目下的git工作区\n`));
                process.exit(0);
            }
        }
    }
)

const commands = (content) => {
    const commands = [
        {
            command: 'git fetch origin'
        },
        {
            command: 'git merge origin/master'
        },
        {
            command: 'git commit -m \'build\'',
        },
        {
            command: `git push origin daily/${content.version}`,
        }
    ]
    if (content.type === 'publish') {
        commands.splice(3,2,{
            command: `git tag publish/${content.version}`,
        },{
            command: `git push -u origin publish/${content.version}`,
        })
    }
    return commands;
}

module.exports = {
    checkCleanCommand,
    commands
}