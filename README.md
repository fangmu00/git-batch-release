# git-batch-release
批量发布git

## 安装
```
npm install
npm link
```

## 使用方式
1. 配置project.json
```
{
    "react-demo": { // 项目名称
        "proPath": "../react-demo", // 项目相对路径
        "version": "daily/1.0.0" // 分支版本号
    },
    "demo1": {
        "proPath": "../demo1",
        "version": "daily/1.11.0" 
    }
    ....
}
```
2. 命令行执行
```
// 提交所有项目
app p -a 
// 提交指定项目
app p -i '项目名称按,分割'
// 发布所有项目
app pb -a 
// 发指定项目
app pb -i '项目名称按,分割'
```

## 优化点
* 并发执行命令
* 错误处理
* 支持自定义指令

