'use strict'

const path = require('path')

let config = {
    name: 'QiNA',
    eslint: true,
    port: 9080,

    building: {
        arch: 'x64',
        asar: true,
        dir: path.join(__dirname, 'app'),
        icon: path.join(__dirname, 'app/icons/icon'),
        ignore: "node_modules/(vue)|index.ejs|icons|^\/src$",
        // ignore: "src|index.ejs|icons",
        out: path.join(__dirname, 'builds'),
        overwrite: true,
        platform: process.env.PLATFORM_TARGET || 'darwin'
    }
}

config.building.name = config.name

module.exports = config

// electron-packager options
// Docs: https://simulatedgreg.gitbooks.io/electron-vue/content/docs/building_your_app.html
// npm run build
// cp -r /Users/qoli/Documents/Desktop-Apps/QiNA/app/node_modules /Users/qoli/Documents/Desktop-Apps/QiNA/builds/QiNA-darwin-x64/QiNA.app/Contents/Resources/app
// ls -l /Users/qoli/Documents/Desktop-Apps/QiNA/builds/QiNA-darwin-x64/QiNA.app/Contents/Resources/app/src && echo && ls -l /Users/qoli/Documents/Desktop-Apps/QiNA/builds/QiNA-darwin-x64/QiNA.app/Contents/Resources/app/node_modules/debug
// open /Users/qoli/Documents/Desktop-Apps/QiNA/builds/QiNA-darwin-x64/QiNA.app
