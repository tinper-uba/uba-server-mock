/**
 * mock core
 */

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
          text = JSON.stringify(text);
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

exports.tempToText = (source, key) => {
  let type = source.split("@")[1].split("|")[0];
  let len = source.split("@")[1].split("|")[1];
  console.log(type);
  console.log(len);
}

exports.genRandomStr = (randomFlag = true, min, max) => {
  let str = "",
    range = min,
    arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}
