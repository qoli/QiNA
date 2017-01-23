'use strict'

const electron = require('electron')
const path = require('path')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const settings = require('electron-settings');
const {
  ipcMain,
  dialog,
  shell
} = require('electron')
const transliteration = require('transliteration');
var moment = require('moment');
var qiniu = require("qiniu");

let mainWindow
let config = {}

console.log(settings.getSettingsFilePath());

// 收到上傳文件請求
ipcMain.on('upFile', (event, arg) => {
  settings.get('Keys').then(val => {
    var returnMsg;

    if (val == undefined) {
      returnMsg = {
        state: false,
        err: '配置檔尚未設定'
      }
      event.sender.send('qina', returnMsg) //向前端發送 Keys
      return false;
    }

    if (val.Access == null || val.Bucket == null || val.Domain == null || val.Secret == null) {
      returnMsg = {
        state: false,
        err: '配置檔案不全'
      }
      event.sender.send('qina', returnMsg)
      return false;
    }

    qiniu.conf.ACCESS_KEY = val.Access;
    qiniu.conf.SECRET_KEY = val.Secret;
    var domain = val.Domain;
    var bucket = val.Bucket;
    var key = transliteration.slugify(arg.Name) + '(' + moment().format() + ')' + path.extname(arg.Name);
    var filePath = path.normalize(arg.Path);
    var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
    var token = putPolicy.token();

    uploadFile(token, key, filePath);

    function uploadFile(uptoken, key, localFile) {
      var extra = new qiniu.io.PutExtra();

      qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
        if (!err) {
          returnMsg = {
            state: true,
            hash: ret.hash,
            key: ret.key
          }

          settings.set('Files', {
            name: ret.key,
            domain: domain
          })
          console.log(returnMsg);
          event.sender.send('qina', returnMsg)
        } else {
          returnMsg = {
            state: false,
            err: err
          }
          console.log(returnMsg);
          event.sender.send('qina', returnMsg)
        }
      });
    } // function end.

  });
})

ipcMain.on('getLink', (event, arg) => {
  settings.get('Files').then(val => {
    event.sender.send('Files', val);
  })
})



ipcMain.on('openLink', (event, arg) => {
  shell.openExternal(arg)
})

ipcMain.on('getKeys', (event, arg) => {
  settings.get('Keys').then(val => {
    event.sender.send('LoadKeys', val) //向前端發送 Keys
  });

})


ipcMain.on('SaveKeys', (event, arg) => {
  console.log("ipcMain:", arg) // prints "ping"

  settings.set('Keys', {
    Access: arg.Access,
    Secret: arg.Secret,
    Bucket: arg.Bucket,
    Domain: arg.Domain
  }).then(() => {
    settings.get('Keys').then(val => {
      if (val.Access == arg.Access) {
        console.log('SaveKeys !');
        event.sender.send('Done', 'OK')
      } else {
        console.log('SaveKeys Fail');
        event.sender.send('Done', 'Fail')
      }
    });
  });
})


if (process.env.NODE_ENV === 'development') {
  config = require('../config')
  config.url = `http://localhost:${config.port}`
} else {
  config.devtron = false
  config.url = `file://${__dirname}/dist/index.html`
}

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 676,
    width: 440,
    titleBarStyle: 'hidden',
    hasShadow: true,
    frame: false,
    resizable: false,
    fullscreen: false,
    fullscreenable: false
  })

  mainWindow.loadURL(config.url)

  // if (process.env.NODE_ENV === 'development') {
  //   BrowserWindow.addDevToolsExtension(path.join(__dirname,
  //     '../node_modules/devtron'))
  //
  //   let installExtension = require('electron-devtools-installer')
  //
  //   installExtension.default(installExtension.VUEJS_DEVTOOLS)
  //     .then((name) => mainWindow.webContents.openDevTools())
  //     .catch((err) => console.log('An error occurred: ', err))
  // }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  console.log('mainWindow opened')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
