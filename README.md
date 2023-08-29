# git-log-excel

[![Language TypeScript](https://img.shields.io/badge/language-typescript-brightgreen?style=flat-square)](https://github.com/hi-cactus/git-log-excel)
[![GitHub release](https://img.shields.io/github/package-json/v/Wimjiang/utility?style=flat-square)](https://github.com/hi-cactus/git-log-excel/releases)
[![License MIT](https://img.shields.io/github/license/Wimjiang/utility?style=flat-square)](https://github.com/hi-cactus/git-log-excel)

### Installing

```bash
$ npm install git-log-excel  -g
```

### Usage

```bash

cd your-git-project

glog
```

filter commit email

```bash
cd your-git-project

glog --email=test@test.email
```

export excel path

```bash
cd your-git-project

glog --email=test@test.email --exportPath=../
```
