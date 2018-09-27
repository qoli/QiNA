<style lang="scss">
.posB {
    width: 380px;
    position: absolute;
    top: 280px;
    left: 30px;
    height: 600px;
}

.content {
    text-align: center;
    font-size: 12px;
    h5 {
        font-weight: 800;
        margin-top: 0.8em !important;
        margin-bottom: 0.2em !important;
    }
    p {
        margin-bottom: 0.1em !important;
    }
}

.AboutControl {
    position: absolute;
    bottom: 12px;
    width: 440px;
    left: 0;
    text-align: center;
    p {
        font-size: 10px;
        margin-top: 1em;
        color: #aaa
    }
}

hr {
    background-color: #eee;
}

.Link {
    text-decoration: underline;
}

.Done {
    input {
        text-align: center;
        background: none;
        border: none;
        box-shadow: none;
        background-color: RGB(52, 119, 217);
        color: #fff;
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.24);
        border-radius: 4px;
        font-size: 12px
    }
}

.FileBox {
    width: 380px;
    text-align: left;
    border-radius: 4px;
    background-color: #fff;
    border: 1px solid RGB(52, 119, 217);
    height: 42px;
    position: relative;
    svg {
        position: absolute;
        top: 8px;
        left: 8px;
    }
    span {
        padding-left: 32px;
        padding-right: 8px;
        line-height: 42px;
        font-size: 12px;
    }
    span.leftText {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 310px;
    }
    .is-pulled-right {
        span {
            font-weight: 800;
            color: RGB(54, 122, 214);
        }
    }
}
</style>
<template>
    <div>
        <div class="posB">
            <div class="Done content">
                <div class="FileBox">
                    <svg width="20px" height="24px" viewBox="62 44 20 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <path d="M82,51 L82,65 C82,66.65675 80.65675,68 79,68 L65,68 C63.34325,68 62,66.65675 62,65 L62,47 C62,45.34325 63.34325,44 65,44 L75,44 L82,51 Z M75,51 L79.17175,51 L75,46.82825 L75,51 Z M80,65 L80,53 L73,53 L73,46 L65,46 C64.63975,46 64.40225,46.1835 64.29275,46.29275 C64.1835,46.40225 64,46.63975 64,47 L64,65 C64,65.36025 64.1835,65.59775 64.29275,65.707 C64.40225,65.8165 64.63975,66 65,66 L79,66 C79.36025,66 79.59775,65.8165 79.707,65.707 C79.81625,65.5975 80,65.36025 80,65 Z" id="Shape" stroke="none" fill="#1D78E9" fill-rule="evenodd"></path>
                    </svg>
                    <span class="leftText">{{name}}</span>
                    <div class="is-pulled-right">
                        <span>完成</span>
                    </div>
                    <div class="is-clearfix"></div>
                </div>
                <hr/>
                <label class="label">分享鏈接</label>
                <p class="control">
                    <input class="input" type="text" placeholder="Text input" v-model="link">
                </p>
            </div>
        </div>
        <div class="Control">
            <router-link to="/" class="button is-info is-outlined">返回</router-link>
        </div>
    </div>
</template>
<script>
import {
    ipcRenderer
}
from 'electron'

export default {
    data() {
        return {
            name: '',
            domain: '',
            link: ''
        }
    },
    created: function() {
        var that = this

        ipcRenderer.send('getLink')

        ipcRenderer.on('Files', (event, arg) => {
            that.domain = arg.domain
            that.name = arg.name
            that.link = arg.domain + '/' + arg.name
        })
    },
    methods: {
        open() {
            ipcRenderer.send('openLink', this.www)
        }
    },
    name: 'SettingView'
}
</script>