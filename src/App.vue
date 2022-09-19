<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import searchMusic from './components/searchMusic.vue'
import musicList from './components/musicList.vue';
import { musicListStore } from "./store/musicList";
import { ref } from 'vue'
const store = musicListStore();

</script>

<template>
  <div class="grid-container">
    <div class="logos">
      <div class="logo">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo vite" alt="Vite logo" />
        </a>
      </div>
      <div class="logo">
        <a href="https://vuejs.org/" target="_blank">
          <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
      </div>
      <div class="logo">
        <a href="https://www.typescriptlang.org/" target="_blank">
          <img src="./assets/typescript-logo.svg" class="logo ts" alt="ts logo" />
        </a>
      </div>
      <div class="logo">
        <a href="https://pinia.web3doc.top/" target="_blank">
          <img src="./assets/logo.svg" class="logo pinia" alt="pinia logo" />
        </a>
      </div>
      <div class="logo">
        <a href="https://element-plus.gitee.io/zh-CN/" target="_blank">
          <img src="./assets/element-plus-logo.svg" class="logo element" alt="elment plus logo" />
        </a>
      </div>
      <div class="logo">
        <a href="https://www.sasscss.com/" target="_blank">
          <img src="./assets/sass.svg" class="logo sass" alt="sass logo" />
        </a>
      </div>
    </div>
    <div class="search">
      <searchMusic />
    </div>
    <div class="list">
      <musicList v-show="store.show" :itemSize="100" style="margin: auto" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logos {
  grid-area: logoItems;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  -webkit-justify-content: center;
  justify-content: center;

  .logo {
    height: 6em;
    padding: 0.2em;
    will-change: filter;
    margin: 5px;

    .vite:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }

    .vue:hover {
      filter: drop-shadow(0 0 2em #42b883aa);
    }

    .ts:hover {
      filter: drop-shadow(0 0 2em #2288e7aa);
    }

    .pinia:hover {
      filter: drop-shadow(0 0 2em #ffdd00aa);
    }

    .element:hover {
      filter: drop-shadow(0 0 2em #0088ffaa);
    }

    .sass:hover {
      filter: drop-shadow(0 0 2em #ff74b7ee);
    }
  }
}

.search {
  grid-area: searchInput;
}

.list {
  grid-area: musiclist;
}

.grid-container {
  display: grid;
  grid:
    'logoItems '
    'searchInput '
    'musiclist'
    'musiclist'
    'musiclist'
    'musiclist'
    'musiclist'
    'musiclist'
    'musiclist'
    'musiclist'
    'musiclist';
  grid-gap: 100px;
  padding: 5em;
  margin: auto;

  &-div {
    padding: 10px 0px;
  }
}
</style>
