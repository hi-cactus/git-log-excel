# git-log-excel

[![Language TypeScript](https://img.shields.io/badge/language-typescript-brightgreen)](https://github.com/hi-cactus/git-log-excel)
[![GitHub release](https://img.shields.io/github/package-json/v/hi-cactus/git-log-excel)](https://github.com/hi-cactus/git-log-excel/releases?logo=github)
[![License MIT](https://img.shields.io/github/license/hi-cactus/utility)](https://github.com/hi-cactus/git-log-excel)
[![npm version](https://img.shields.io/npm/v/git-log-excel?logo=npm)](https://img.shields.io/npm/v/git-log-excel?logo=npm)
> export git log to excel

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
