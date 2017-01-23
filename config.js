'use strict'

const path = require('path')

let config = {
  name: 'QiNA',
  eslint: true,
  port: 9080,

  // electron-packager options
  // Docs: https://simulatedgreg.gitbooks.io/electron-vue/content/docs/building_your_app.html
  building: {
    arch: 'x64',
    asar: false,
    dir: path.join(__dirname, 'app'),
    icon: path.join(__dirname, 'app/icons/icon'),
    ignore: /\b(node_modules|src|index\.ejs|icons)\b/,
    out: path.join(__dirname, 'builds'),
    overwrite: true,
    platform: process.env.PLATFORM_TARGET || 'darwin'
  }
}

config.building.name = config.name

module.exports = config

// npm run build

// cp -r /Users/qoli/Documents/Desktop-Apps/QiNA/app/node_modules /Users/qoli/Documents/Desktop-Apps/QiNA/builds/QiNA-darwin-x64/QiNA.app/Contents/Resources/app
