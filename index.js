const request = require('request')
const fs = require('fs')

const log = function() {
    console.log.apply(console, arguments)
}

const getData = function(url) {
    request(url, function(error, res, body) {
        if (error === null && res.statusCode === 200) {
            // log('请求成功: ', body)
            const path = 'douban.json'
            const data = JSON.parse(body)
            saveJSON(path, data.subjects)
        } else {
            log('请求失败: ', error)
        }
    })
}

const saveJSON = function(path, data) {
    const s = JSON.stringify(data, null, 2)
    fs.writeFile(path, s, function(error) {
        if (error !== null) {
            log('写入文件错误: ', error)
        } else {
            log('保存成功')
        }
    })
}

const __main = function() {
    const url = 'https://api.douban.com/v2/movie/top250'
    getData(url)
}


__main()
