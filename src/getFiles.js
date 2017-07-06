const fs = require('fs');
const path = require('path');

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

module.exports = getFiles;