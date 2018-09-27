<style lang="scss">
.posA {
    width: 380px;
    position: absolute;
    top: 80px;
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
        color: #aaa;
    }
}

hr {
    background-color: #eee;
}

.Link {
    text-decoration: underline;
}

.lh {
    line-height: 2.4em;
}
</style>
<template>
    <div>
        <div class="posA">
            <div class="content">
                <h5>QiNA</h5>
                <p>一個基於七牛 CDN 的靜態文件存放工具</p>
                <hr/>
                <p>樣本工作室作品</p>
                <h5>開發者</h5>
                <p>Qoli Wong</p>
                <p class="Link">www.5mlstudio.com</p>
                <hr/>
                <h5>版本</h5>
                <p>1.0.0</p>
                <hr/>
                <h5>相關開源項目</h5>
                <p class="lh">
                    <span class="tag">animate.css</span>
                    <span class="tag">bulma</span>
                    <span class="tag">electron</span>
                    <br/>
                    <span class="tag">electron-settings</span>
                    <span class="tag">moment</span>
                    <span class="tag">qn</span>
                    <span class="tag">transliteration</span>
                    <span class="tag">vue</span>
                </p>
            </div>
        </div>
        <div class="Control">
            <router-link to="/Setting" class="button is-info is-outlined">设定</router-link>
            <router-link to="/" class="button is-info is-outlined">QiNA</router-link>
        </div>
        <div class="AboutControl">
            <p>Copyright ©️ 2017 5ml-Studio All Rights Reserved.</p>
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
            www: 'https://www.5mlstudio.com'
        }
    },
    methods: {
        open() {
            ipcRenderer.send('openLink', this.www)
        }
    },
    name: 'SettingView'
}
</script>