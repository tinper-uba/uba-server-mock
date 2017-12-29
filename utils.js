const fs = require("fs");
const path = require("path");
const chalk = require("chalk");



/**
 * 读取文件
 * @param {*} filepath 
 */
exports.readMockFile = (filepath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

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
          let text;
          ctx.set("Access-Control-Allow-Origin", "*");
          ctx.set("Uba-Server-Mock", require("./package.json").version);
          ctx.body = await this.getMockConfig(mock[methor][i][url]);
          if(methor == "get"){
            text = ctx.query;
          }else{
            text = ctx.request.body;
          }
          text = JSON.stringify(text);
          console.log(chalk.yellow(`[${this.getTime()}] [MockServer] : Methor : ${methor} -> Path : ${url} -> ReceiveData : ${text}`))
        });
      }

    }
  }
}
