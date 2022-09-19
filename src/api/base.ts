// 接口域名管理

const test = 'http://localhost:3000'
const produce = 'https://www.wxhzny.top'

const base = {
    newsml: `${produce}/song/url/v1?id=`,// 新获取音乐下载的接口
    sml: `${produce}/song/url?id=`,// 获取音乐下载的接口
    smt: `${produce}/search/suggest?keywords=`,// 获取输入建议的接口
    smlist: `${produce}/cloudsearch?keywords=`,// 按名查找音乐列表的接口
}

export default base;