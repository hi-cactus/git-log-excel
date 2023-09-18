# git-log-excel

[![Language TypeScript](https://img.shields.io/badge/language-typescript-brightgreen?style=flat-square)](https://github.com/hi-cactus/git-log-excel)
[![GitHub release](https://img.shields.io/github/package-json/v/hi-cactus/git-log-excel?style=flat-square)](https://github.com/hi-cactus/git-log-excel/releases)
[![License MIT](https://img.shields.io/github/license/Wimjiang/utility?style=flat-square)](https://github.com/hi-cactus/git-log-excel)

> export git commits to excel

### Installing

```bash
$ npm install git-log-excel  -g
```

### Usage

```bash

cd your-git-project

glog
```

filter by committer email

```bash
cd your-git-project

glog --email=test@test.email
```

export excel path

```bash
cd your-git-project

glog --email=test@test.email --exportPath=../
```

set hour over date `hh-mm-ss` default: 18:30:00

```bash
cd your-git-project

glog --overDate 19:00:00

# or
glog -d 19:00:00
```

set hour over date excel column name default: Hours over 18:30

```bash
cd your-git-project

glog --overDateName "Hours over 7PM"

# or
glog -dn "Hours over 7PM"
```

# License

MIT
