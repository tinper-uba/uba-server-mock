# uba-server-mock

[![npm version](https://img.shields.io/npm/v/uba-server-mock.svg)](https://www.npmjs.com/package/uba-server-mock)
[![devDependency Status](https://img.shields.io/david/dev/tinper-uba/uba-server-mock.svg)](https://david-dm.org/tinper-uba/uba-server-mock#info=devDependencies)
[![NPM downloads](http://img.shields.io/npm/dm/uba-server-mock.svg?style=flat)](https://npmjs.org/package/uba-server-mock)

---

# Installation

```bash
$ npm install uba-server uba-server-mock -D
```

# Usage

open `uba.config.js` file 
```js
plugins: {
    mock: {
        file : "uba.mock.js"
    }
}
```
create file `uba.mock.js` file
```js
module.exports = {
    "get" : [{
        "/api/user/get" : "./mock/get.json"
    }],
    "post" : [{
        "/api/user/post" : "./mock/post.json"
    }]
}
```
# API

### file
- mock config file.