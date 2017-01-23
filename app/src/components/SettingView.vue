<style lang="scss">
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
<div>
  <div class="">
    <div class="SettingTitle">
      <p class="title is-1">設定</p>
      <p class="subtitle is-3">應用的七牛密鑰</p>
    </div>

    <div class="form">
      <label class="label">Access Key</label>
      <p class="control">
        <input v-model.trim="Access" class="input" type="text" placeholder="Access Key">
      </p>
      <label class="label">Secret Key</label>
      <p class="control">
        <input v-model.trim="Secret" class="input" type="text" placeholder="Secret Key">
      </p>
      <label class="label">儲存空間</label>
      <p class="control">
        <input v-model.trim="Bucket" class="input" type="text" placeholder="Bucket Name">
      </p>
      <label class="label">融合 CDN 加速域名</label>
      <p class="control">
        <input v-model.trim="Domain" class="input" type="text" placeholder="https:// or http://">
      </p>
    </div>

    <div class="More">
      <p>應用程式必須要一個七牛密鑰才能正常工作。</p>
      <p>查看七牛密鑰：
        <span v-on:click="open" class="HightLight">{{www}}</span></p>
    </div>
  </div>
  <div class="SettingControl Control">
    <div class="is-pulled-left">
      <button v-on:click="saveData" class="button wide is-info" v-bind:class="{ 'is-loading': isSaveing }">{{mainText}}</button>
    </div>

    <div class="is-pulled-right">
      <router-link to="/About" class="button is-info is-outlined">關於 QiNA</router-link>
      <!-- <button v-on:click="getData" class="button is-info is-outlined">重置</button> -->
      <router-link to="/" class="button is-info is-outlined">返回</router-link>
    </div>

    <div class="is-clearfix"></div>

  </div>
</div>
</template>

<script>
import {
  ipcRenderer
}
from 'electron';

export default {
  data() {
    return {
      Access: null,
      Secret: null,
      Bucket: null,
      Domain: null,
      isSaveing: false,
      mainText: '保存設定',
      www: 'https://portal.qiniu.com/user/key'
    }
  },
  created: function() {
    this.getData();
  },
  filters: {
    filters: function(value) {
      return value;
    }
  },
  methods: {
    open() {
      ipcRenderer.send('openLink', this.www);
    },
    loadData() {
      ipcRenderer.on('LoadKeys', (event, arg) => {
        this.Access = arg.Access;
        this.Secret = arg.Secret;
        this.Bucket = arg.Bucket;
        this.Domain = arg.Domain;
      })
    },
    getData() {
      ipcRenderer.send('getKeys');
      this.loadData();
    },
    Done() {
      ipcRenderer.on('Done', (event, arg) => {
        var that = this;

        if (arg == 'OK') {
          that.mainText = '成功'
        } else {
          that.mainText = '保存發生錯誤'
        }

        setTimeout(function() {
          that.isSaveing = false;
        }, 800);
        setTimeout(function() {
          that.mainText = '保存設定'
        }, 2000);

      })
    },
    saveData() {
      console.log('SaveKeys');
      this.isSaveing = true;

      ipcRenderer.send('SaveKeys', {
        Access: this.Access,
        Secret: this.Secret,
        Bucket: this.Bucket,
        Domain: this.Domain
      })

      this.Done();

    }
  },
  name: 'SettingView'
}
</script>
