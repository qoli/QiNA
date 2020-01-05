'use strict'

const electron = require('electron')
const path = require('path')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const settings = require('electron-settings');
const transliteration = require('transliteration');
// var fs = require('fs');
var qiniu = require('qiniu');
const {ipcMain, dialog, shell, Menu} = require('electron');

let mainWindow
let config = {}
var readStream

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

        var fileName = transliteration.slugify(arg.Name) + '-' + Date.now() + path.extname(arg.Name);
        var filePath = path.normalize(arg.Path);

        // var token = {
        //     accessKey: val.Access,
        //     secretKey: val.Secret,
        //     bucket: val.Bucket,
        //     origin: val.Domain,
        // }

        try {
            console.log('qn 開始上傳 filePath: ' + filePath + ' fileName: ' + fileName);
            var bucket = val.Bucket;
            var accessKey = val.Access;
            var secretKey = val.Secret;
            var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
            var putPolicy = new qiniu.rs.PutPolicy({
                scope: bucket,
            });
            var uploadToken = putPolicy.uploadToken(mac);
            var config = new qiniu.conf.Config();
            var localFile = filePath;
            // 构建配置类 z0 华东
            config.zone = qiniu.zone.Zone_z0;
            config.useCdnDomain = true;
            var resumeUploader = new qiniu.resume_up.ResumeUploader(config);
            var putExtra = new qiniu.resume_up.PutExtra();
            // putExtra.resumeRecordFile = 'progress.log';
            putExtra.progressCallback = function(uploadBytes, totalBytes) {
                event.sender.send('progress', (Number(uploadBytes / totalBytes) * 100).toFixed(2) + '%')
            }
            //file
            resumeUploader.putFile(uploadToken, fileName, localFile, putExtra, function(respErr, ret, respInfo) {
                if (respErr) {
                    returnMsg = {
                        state: false,
                        err: respErr
                    }
                    console.log(returnMsg);
                    event.sender.send('qina', returnMsg)
                    return false
                }

                if (respInfo.statusCode == 200) {
                    returnMsg = {
                        state: true,
                        hash: ret.hash,
                        key: ret.key
                    }

                    settings.set('Files', {
                        name: ret.key,
                        domain: val.Domain
                    })
                    console.log(returnMsg);
                    event.sender.send('qina', returnMsg)
                } else {
                    returnMsg = {
                        state: false,
                        err: respInfo.statusCode
                    }
                    console.log(returnMsg);
                    event.sender.send('qina', returnMsg)
                }
            });

        } catch ( e ) {
            console.log('Catch: ');
            console.log(e);
            returnMsg = {
                state: false,
                err: 'error'
            }
            event.sender.send('qina', returnMsg)
        }


    });
})

ipcMain.on('stopFile', (event, arg) => {
    console.log('stop upload')

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

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    // mainWindow.webContents.openDevTools();

    console.log('mainWindow opened')

    var template = [{
        label: 'Edit',
        submenu: [{
            label: 'Undo',
            accelerator: 'CmdOrCtrl+Z',
            role: 'undo'
        },
            {
                label: 'Redo',
                accelerator: 'Shift+CmdOrCtrl+Z',
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                label: 'Cut',
                accelerator: 'CmdOrCtrl+X',
                role: 'cut'
            },
            {
                label: 'Copy',
                accelerator: 'CmdOrCtrl+C',
                role: 'copy'
            },
            {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                role: 'paste'
            },
            {
                label: 'Select All',
                accelerator: 'CmdOrCtrl+A',
                role: 'selectall'
            },
        ]
    },
        {
            label: 'View',
            submenu: [{
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click: function(item, focusedWindow) {
                    if (focusedWindow)
                        focusedWindow.reload();
                }
            },
                {
                    label: 'Toggle Developer Tools',
                    accelerator: (function() {
                        if (process.platform == 'darwin')
                            return 'Alt+Command+I';
                        else
                            return 'Ctrl+Shift+I';
                    })(),
                    click: function(item, focusedWindow) {
                        if (focusedWindow)
                            focusedWindow.toggleDevTools();
                    }
                },
            ]
        },
        {
            label: 'Window',
            role: 'window',
            submenu: [{
                label: 'Minimize',
                accelerator: 'CmdOrCtrl+M',
                role: 'minimize'
            },
                {
                    label: 'Close',
                    accelerator: 'CmdOrCtrl+W',
                    role: 'close'
                },
            ]
        },
        {
            label: 'Help',
            role: 'help',
            submenu: [{
                label: '5ML 樣本工作室',
                click: function() {
                    shell.openExternal('https://www.5mlstudio.com/')
                }
            }, {
                label: 'QiNA - Github',
                click: function() {
                    shell.openExternal('https://github.com/qoli/QiNA')
                }
            }, {
                label: '七牛邀請鏈接',
                click: function() {
                    shell.openExternal('https://portal.qiniu.com/signup?code=3lq7qoate7gpa')
                }
            }]
        },
    ];

    if (process.platform == 'darwin') {
        var name = app.getName();
        template.unshift({
            label: name,
            submenu: [{
                label: 'About ' + name,
                role: 'about'
            },
                {
                    type: 'separator'
                },
                {
                    label: 'Services',
                    role: 'services',
                    submenu: []
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Hide ' + name,
                    accelerator: 'Command+H',
                    role: 'hide'
                },
                {
                    label: 'Hide Others',
                    accelerator: 'Command+Alt+H',
                    role: 'hideothers'
                },
                {
                    label: 'Show All',
                    role: 'unhide'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click: function() {
                        app.quit();
                    }
                },
            ]
        });
        // Window menu.
        template[3].submenu.push({
            type: 'separator'
        }, {
            label: 'Bring All to Front',
            role: 'front'
        });
    }

    var menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    console.log("menu done!");
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
