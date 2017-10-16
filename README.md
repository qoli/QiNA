# QiNA

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/powered-by-electricity.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/uses-html.svg)](http://forthebadge.com)

> 基於 vue-electron 開發。

一個七牛 CDN Nodejs GUI 封裝。

視頻展示：[https://ok919op2k.qnssl.com/kapture-2017-01-26-at-4-58-mp4(2017-01-26T04:58:22+08:00).mp4]( https://ok919op2k.qnssl.com/kapture-2017-01-26-at-4-58-mp4(2017-01-26T04:58:22+08:00).mp4)



## 發佈版下載

https://github.com/qoli/QiNA/releases/



## 更新日誌

##### 2017年01月26日．0.0.4 版本

##### 添加

* 文件拖放上傳加入。
* 添加開源項目列表。

##### 修正

* 因代碼錯誤而無法點擊的中央大圓圈。
* 分離部分 css。



##### 2017年01月26日．之前

* 0.0.3 版本．發佈



## 想法

##### 功能：

- [x] 添加文件拖入上傳的支持。
- [ ] 郵件內使用的分享樣式。
- [ ] 下載文件的 Web 分享頁面。
- [ ] 停用「translate3d」動畫，以支持窗口背景透明模糊。




## TODO

##### 問題：

- [x] 修正設定面板無法複製粘貼的問題。
- [x] 修正發佈版本會多開的問題。
- [ ] 中斷按鈕不可靠。
- [ ] 添加上傳速度顯示。
- [ ] 添加暫停功能以及重新開始。




## 問題處理

##### 新建窗口問題

> ~~查到打包發佈版本因七牛 SDK 會新建窗口問題，正在處理。~~
>
> 更換到非官方 qn(by fengmk2 大神)，新建窗口問題解決。



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
