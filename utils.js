/**
 * mock core
 */

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");


/**
 * 获得mock文件
 * @param {*} file 
 */
exports.getMockConfig = (file) => {
  return require(path.resolve(".", file));
}

exports.getTime = () => {
  let time = new Date();
  return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
}

/**
 * 加载
 * @param {*} router 
 * @param {*} file 
 */
exports.loadMock = (router, file) => {
  let mock = this.getMockConfig(file);
  for (let methor in mock) {
    for (let i = 0; i < mock[methor].length; i++) {
      for (let url in mock[methor][i]) {
        router[methor](url, async(ctx) => {
          // let text;
          ctx.set("Access-Control-Allow-Origin", "*");
          ctx.set("Uba-Server-Mock", require("./package.json").version);
          // ctx.body = await this.getMockConfig(mock[methor][i][url]);
          let txt = await this.loadFile(mock[methor][i][url]);
          ctx.body = txt;
          // if (methor == "get") {
          //   text = ctx.query;
          // } else {
          //   text = ctx.request.body;
          // }
          // text = JSON.stringify(text);
          console.log(chalk.yellow(`[${this.getTime()}] [MockServer] : Method : ${methor} -> Path : ${url} `))
        });
      }
    }
  }
}


/**
 *  读取一个文件
 * @param {*} file 
 */
exports.loadFile = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(".", file), "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
