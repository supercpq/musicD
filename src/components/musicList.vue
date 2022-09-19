<script setup lang="ts">
import { musicListStore } from "../store/musicList";
import { computed, ref, onMounted } from 'vue'
import _ from "lodash";

const store = musicListStore();
const screenHeight = ref(0)
const startOffset = ref(0)
const start = ref(0)
const end = ref(0)
const myList = ref<any>(null)
const props = defineProps({
    itemSize: Number,
})
//列表总高度
let listHeight = computed(() => {
    return store.allList.length * props.itemSize!;
})
//可显示的列表项数
let visibleCount = computed(() => {
    return Math.ceil(screenHeight.value / props.itemSize!)
})
//偏移量对应的style
let getTransform = computed(() => {
    return `translate3d(0,${startOffset.value}px,0)`;
})
//获取真实显示列表数据
let visibleData = computed(() => {
    return store.allList.slice(
        start.value,
        Math.min(end.value, store.allList.length)
    );
})
onMounted(() => {
    screenHeight.value = document.body.clientHeight;
    start.value = 0
    end.value = start.value + visibleCount.value
})
function scrollEvent() {
    let scrollTop = Math.floor(myList.value.scrollTop);
    //console.log(scrollTop);
    //此时的开始索引
    start.value = Math.floor(scrollTop / props.itemSize!);
    //此时的结束索引
    end.value = start.value + visibleCount.value;
    console.log(end.value - store.allList.length - 8)
    if (end.value - store.allList.length > 8) {
        lazySearch()
    }
    // console.log(1);
    //此时的偏移量
    startOffset.value = scrollTop - (scrollTop % props.itemSize!);

}

const lazySearch = _.throttle(
    function () {
        store.lazySearch();
    },
    200,
    { trailing: false }
)

const getAllResult = _.throttle(
    function () {
        scrollEvent();
    },
    16.7,
    { trailing: false }
)
</script>
    
<template>
    <div ref="myList" class="infinite-list-container" @scroll="getAllResult">
        <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }"></div>
        <div class="infinite-list" :style="{ transform: getTransform }">
            <div ref="items" class="infinite-list-item" v-for="item in visibleData" :key="item.id"
                :style="{ height: itemSize + 'px', lineHeight: itemSize + 'px' }">
                <a :href="`https://music.163.com/#/song?id=${item.id}`">
                    <img :src="item.picUrl" style="width: 90px; height: 90px; float: left" />歌名：{{ item.name.slice(0,
                    25) }} id：{{ item.id }}</a>
            </div>
        </div>
    </div>
</template>
    
<style scoped>
.infinite-list-container {
    height: 100%;
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
}

.infinite-list {
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
    text-align: center;
}

.infinite-list-item {
    padding: 10px;
    color: #555;
    box-sizing: border-box;
    border-bottom: 1px solid #999;
}

a {
    font-size: 20px;
    float: left;
    font-family: "Lucida Console", Courier, monospace;
}

a:link {
    text-decoration: none;
    color: deepskyblue;
}

a:visited {
    text-decoration: none;
    color: deepskyblue;
}

a:hover {
    text-decoration: none;
    color: deepskyblue;
}

a:active {
    text-decoration: none;
    color: deepskyblue;
}
</style>
    