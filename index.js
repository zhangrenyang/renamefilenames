#!/usr/bin/env node
const glob = require("glob");
const fs = require("fs-extra");
const path = require("path");
const options = { nodir: true };
const replaceConfig = path.resolve("replace.json");
let replace = {};
const from = process.argv[2] || "";
const to = process.argv[3] || "";
if (fs.existsSync(replaceConfig)) {
  const content = fs.readFileSync(replaceConfig, "utf-8");
  replace = JSON.parse(content);
} else if (from) {
  replace[from] = to;
} else {
  throw new Error(
    `既没有传递需要转成空的字符串，也没有在当前目录下没有到到replace.json配置文件!`
  );
}
process.env.NODE_ENV = "development";
console.log(`开始转换文件`);
glob("./**", options, function (err, files) {
  Promise.all(
    files.map((file) => {
      let newFile = file;
      for (let key in replace) {
        let before;
        do {
          before = newFile;
          newFile = newFile.replace(key, replace[key]);
        } while (before !== newFile);
      }
      if (file !== newFile) {
        console.log(file, "=>", newFile);
        return fs.rename(file, newFile);
      }
    })
  ).then(() => console.log("全部转换完成"));
});
