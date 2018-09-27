<style lang="scss">
@import "./style/comm.scss";

* {
    margin: 0;
    padding: 0;
    color: rgba(100, 100, 100, 0.9);
}

body,
html {
    background-color: rgb(250, 250, 250);
}

body {
    height: 676px;
    width: 440px;
    -webkit-app-region: drag;
    -webkit-user-select: none;
    overflow: hidden;
    padding: 80px 30px 30px;
    color: #404040;
    background-size: 100%;
    background-position: bottom;
    background-repeat: no-repeat;
    background-image: url("./components/MainView/assets/CloudBg.png");
}

.app {
    height: 100%;
    -webkit-app-region: no-drag;
}

.HightLight {
    color: #1D78E9;
    font-weight: 800;
}

.wide {
    width: 128px;
}

.button {
    height: 38px;
    font-size: 12px;
    font-weight: 800;
    border-radius: 4px;
}

.button.is-info.is-outlined {
    background-color: #fff;
}

.Control {
    p {
        margin-bottom: 6px;
    }
    text-align: center;
    position: absolute;
    bottom: 55px;
    width: 440px;
    left: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}

.SettingTitle,
.form {
    margin-bottom: 24px;
}

.SettingControl {
    padding: 0 30px;
    text-align: left;
}

.More {
    p {
        font-size: 12px;
    }
}

.label {
    font-size: 10px;
}

.HightLight {
    cursor: pointer;
}
</style>
<template>
    <div class="app">
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import store from 'src/vuex/store'

export default {
    store
}
</script>