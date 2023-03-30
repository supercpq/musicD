<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { musicListStore } from "../store/musicList";
import _ from "lodash"; //防抖
import api from "../api/index";

const store = musicListStore();
const download = ref("");
const download1 = ref("");
const count = ref(0);
const count1 = ref(0);
const count2 = ref(0);

const yourInput = ref("");
const countPlus = computed(() => count.value + 1);
const countPlus1 = computed(() => count1.value + 1);
const countPlus2 = computed(() => count2.value + 1);

interface LinkItem {
  value: string;
  link?: string;
}

const links = ref<LinkItem[]>([]);

const loadAll = () => {
  return [{ value: "vue", link: "https://github.com/vuejs/vue" }];
};

const searchDebounce = _.debounce(function (cb) {
  var input: string = yourInput.value.trim().slice(0, 20);
  if (input) {
    api.apiSearchMusic.searchMusicTips(input).then(
      (res) => {
        links.value = [];
        if (res.data.result) {
          for (let i in res.data.result.allMatch) {
            var keyword: string = res.data.result.allMatch[i].keyword;
            var a: LinkItem = { value: keyword };
            links.value.push(a);
          }
          cb(links.value);
        }
      },
      (err) => {
        console.log(err.message);
      }
    );
  }
}, 500);

const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  // finished
  searchDebounce(cb);
};
// 三种状态 1：select的一定是name搜索 2： 敲enter键的且是数字的 3： 敲enter键的且是string的
// 设计1：使用状态模式
// 设计2：多路由展示：先按名搜索，用户点击其他路由再从相应接口获取（这个更易拓展，拟采用此方式）
const searchNameOrId = _.debounce(
  function (isDownload: boolean = false) {
    var input: string = yourInput.value.trim().slice(0, 20);
    if (input) {
      if (Number.isInteger(Number(input)) && !isDownload) {
        //是数字就直接调用
        api.apiMusicList.searchMusicList(input).then(
          (res) => {
            if (res.data.code == 200) download.value = res.data.data[0].url;
          },
          (err) => {
            console.log(err.message);
          }
        );
        api.apiMusicList.searchMusicListNew(input).then(
          (res) => {
            console.log(res.data.code, typeof res.data.code);
            if (res.data.code == 200) download1.value = res.data.data[0].url;
          },
          (err) => {
            console.log(err.message);
          }
        );
      } else {
        //不是就走actions0
        store.searchMusicByName(input);
      }
    }
  },
  200,
  {
    leading: true,
  }
);
const counts = function () {
  if (count2.value > 30) {
    alert("太频繁啦");
  } else {
    count2.value++;
  }
};
const countp = _.debounce(
  function () {
    count1.value++;
  },
  300,
  {
    leading: true,
  }
);

function handleSelect() {
  // 从推荐列表选的，必是按name查
  // console.log(yourInput.value)
  searchNameOrId(true);
  // 调用pinia
}

function SearchMusic() {
  // 需要判断name和id
  // console.log(yourInput.value)
  searchNameOrId();
  // id就直接查，name就调用pinia
}

onMounted(() => {
  links.value = loadAll();
});
</script>

<template>
  <h1>{{ store.searchState }}</h1>

  <div class="search">
    <el-autocomplete
      style="width: 520px"
      v-model="yourInput"
      :fetch-suggestions="querySearchAsync"
      fit-input-width:true
      placeholder="Please input what you want"
      :clearable="true"
      @keyup.enter="SearchMusic"
      @select="handleSelect"
    />
  </div>
  <div class="card">
    <button type="button" @click="count++">
      我可以正常触发count is {{ countPlus }}
    </button>
  </div>
  <div class="card">
    <button type="button" @click="countp()">
      我加了防抖count is {{ countPlus1 }}
    </button>
  </div>
  <div class="card">
    <button type="button" @click="counts()">
      这个有服务器响应哦count is {{ countPlus2 }}
    </button>
  </div>
  <p v-if="download">
    Check out
    <a :href="download" target="_blank">download</a> to download the music
  </p>
  <p v-if="download1">
    Or check out
    <a :href="download1" target="_blank">download</a> to download the music
  </p>
  <p class="read-the-docs">Click on the logos to learn more</p>
</template>

<style scoped lang="scss">
.read-the-docs {
  color: #888;
}

.search {
  width: 100%;
}
</style>
