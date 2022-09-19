import { defineStore } from 'pinia'
import api from '../api/index'

interface musicItem {
    id: number
    name: string
    picUrl: string
}


export const musicListStore = defineStore('musicList', {
    state: () => {
        return {
            list: <musicItem[]>[],
            searchStatus: 'welcome',
            // gridCon: '\'logoItems \'\'searchInput \'\'musiclist\'',
        };
    },
    getters: {
        show: state => {
            return state.list.length > 0;
        },
        allList: state => {
            return state.list
        },
        searchState: state => {
            return state.searchStatus;
        }
    },
    actions: {
        searchMusicByName(name: string) {
            //按名字查找音乐列表
            // console.log('searchMusicListByName1') 
            this.searchStatus = 'loading'
            name = name.trim().slice(0, 20);
            if (name) {
                api.apiMusicList.searchMusicListByName(name).then(
                    res => {
                        console.log(this.show)
                        this.searchStatus = 'congratulation'
                        if (res.data.code == 200) {
                            // console.log(res.data.code)
                            // console.log(res.data)
                            // this.gridCon = '\'logoItems \'\'searchInput \'\'musiclist\'\'musiclist\'\'musiclist\'\'musiclist\'\'musiclist\'\'musiclist\'\'musiclist\'\'musiclist\'\'musiclist'
                            this.list = []
                            console.log(this.list.length)
                            for (let i in res.data.result.songs) {
                                var a: musicItem = { id: res.data.result.songs[i].id, name: res.data.result.songs[i].name, picUrl: res.data.result.songs[i].al.picUrl }
                                this.list.push(a)
                                // console.log(res.data.result.songs[i].id, res.data.result.songs[i].name, res.data.result.songs[i].al.picUrl)
                            }
                            console.log(this.list.length)
                        }
                    },
                    err => {
                        // console.log('searchMusicListByName3')
                        this.searchStatus = 'Sorry'
                        console.log(err.message)
                    }
                )

            }
        },
        lazySearch(name: string = '') {
            //懒加载(现在还只是查相同的内容，以后找到其他接口再改一下这里的具体内容)
            name = this.list[0].name
            if (name) {
                api.apiMusicList.searchMusicListByName(name).then(
                    res => {
                        console.log(this.show)
                        if (res.data.code == 200) {
                            console.log(this.list.length)
                            for (let i in res.data.result.songs) {
                                var a: musicItem = { id: res.data.result.songs[i].id, name: res.data.result.songs[i].name, picUrl: res.data.result.songs[i].al.picUrl }
                                this.list.push(a)
                            }
                            console.log(this.list.length)
                        }
                    },
                    err => {
                        console.log(err.message)
                    }
                )

            }
        },
    }
})