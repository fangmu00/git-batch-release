const fs = require('fs');

const getFiles = () => {
    const files = fs.readdirSync(process.cwd());
    const proFiles = [];
    files.forEach((item) => {
        if (fs.statSync(`${process.cwd()}/${item}`).isDirectory() && fs.readdirSync(`${process.cwd()}/${item}`).indexOf('.git') != -1 ) {
            proFiles.push(item)
        }         
    });
    return proFiles;
} 

const getCurrentVersion = (name) => {
    try {
        const f = fs.readFileSync(`${process.cwd()}/${name}/.git/HEAD`, { encoding: 'utf8'})
        console.log(f)
        const list = f.split('/');
        const version = list[list.length-1];
        return version;
    } catch (error) {
        console.log(error);
        return '';
    }

}

module.exports = {
    getFiles,
    getCurrentVersion
}