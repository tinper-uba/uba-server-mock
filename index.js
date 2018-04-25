/**
 * mock server plugin for uba-server
 * Date : 2018-04-25 10:53:13
 */

const serveStatic = require('serve-static');
const chalk = require('chalk');
const path = require('path');

module.exports = (app, mockConfig) => {
  for (let item in mockConfig) {
    for (let i = 0; i < mockConfig[item].length; i++) {
      for (let url in mockConfig[item][i]) {
        console.log(chalk.green(`[mock]:${item} [${url}] to ${mockConfig[item][i][url]}`));
        app[item.toLowerCase()](url, (req, res) => {
          console.log(chalk.green(`[mock]: ${req.method} ${req.ip} client router [${url}]-[${mockConfig[item][i][url]}]`));
          res.sendFile(path.resolve(".", mockConfig[item][i][url]), {
            headers: {
              "Uba-Server-Mock": require("./package.json").version,
              "Access-Control-Allow-Origin": "*"
            }
          });
        });
      }
    }
  }
}
