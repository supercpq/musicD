// 音乐查找api
import base from './base'
import axios from './http'
import qs from 'qs'

const apiSearchMusic = {
    searchMusicTips(inputName: string) {
        return axios.get(`${base.smt}${inputName}&type=mobile`)
    }
}

export default apiSearchMusic