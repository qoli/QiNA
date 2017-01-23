<style lang="scss">
div,
h1,
h2,
h3,
h4,
h5,
p {
    cursor: default;
    -webkit-user-select: none;
}

// flex
.flex {
    display: flex;
}

.flex-column {
    flex-direction: column;
}

.flex-row {
    flex-direction: row;
}

.aitems-flex-start {
    align-items: flex-start;
}

.aitems-center {
    align-items: center;
}

.aitems-flex-end {
    align-items: flex-end;
}

.aself-center {
    align-self: center;
}

.aself-center {
    align-self: flex-end;
}

.acontent-center {
    align-content: center;
}

.acontent-flex-end {
    align-content: flex-end;
}

.jcontent-center {
    justify-content: center;
}

.jcontent-flex-end {
    justify-content: flex-end;
}

.jcontent-flex-start {
    justify-content: flex-start;
}

// flex-end

* {
    margin: 0;
    padding: 0;
}

body,
html {
    height: 676px;
    width: 440px;
    -webkit-app-region: drag;
    -webkit-user-select: none;
    overflow: hidden;
}

body {
    padding: 80px 30px 30px;
    color: #404040;
    background-size: 100%;
    background-position: bottom;
    background-color: rgba(255, 255, 255, 0.9);
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
