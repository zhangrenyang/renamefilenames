#!/usr/bin/env node
var glob = require('glob');
var fs = require('fs-extra');
var path = require('path');
const options = { nodir: true }
var replaceConfig = path.resolve('replace.json');
console.log(replaceConfig);
let replace = {};
if (fs.existsSync(replaceConfig)) {
    replace = fs.readJsonSync(replaceConfig);
} else {
    throw new Error(`在当前目录下没有到到replace.json配置文件!`);
}
process.env.NODE_ENV = 'development';
console.log(`开始转换文件`);
glob('./**', options, function (err, files) {
    Promise.all(files.map(file => {
        let newFile = file;
        for (let key in replace) {
            newFile = newFile.replace(new RegExp(key, 'g'), replace[key]);
        }
        if (file !== newFile) {
            console.log(file, '=>', newFile);
            return fs.rename(file, newFile);
        }
    })).then(() => console.log('全部转换完成'));
})