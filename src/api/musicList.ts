// 音乐列表api
import base from './base'
import axios from './http'
import qs from 'qs'

const apiMusicList = {
    searchMusicList(inputid: string) {
        return axios.get(`${base.sml}${inputid}`) // 获取音乐下载链接的接口
    },
    searchMusicListNew(inputid: string) {
        return axios.get(`${base.newsml}${inputid}&level=lossless`)
    },
    searchMusicListByName(inputName: string) {
        return axios.get(`${base.smlist}${inputName}`)
    },
}

export default apiMusicList