# QiNA

> 一個七牛 CDN Nodejs GUI 封裝

基於 vue-electron 開發。



## Release 下載

https://github.com/qoli/QiNA/releases/



## TODO

> 查到打包發佈版本因七牛 SDK 會新建窗口問題，正在處理。

##### 發佈版本問題：
- [ ] 修正設定面板無法複製粘貼的問題。
- [ ] 添加拖入文件的支持。
- [ ] 修正發佈版本會多開的問題。



## Screen

![螢幕快照 2017-01-23 下午5.26.56](./screen/main.png)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron app for production
npm run build
npm run build:darwin # builds for darwin (macOS)

# lint all JS/Vue component files in `app/src`
npm run lint

# run webpack in production
npm run pack
```
More information can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/docs/npm_scripts.html).

---

This project was generated from [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about this project can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
