fs = require('fs')
webshot = require('webshot')
pinboard = require('pinboard')
imagemagick = require('imagemagick')
pinboard.config
  username: 'ibare'
  password: 'ultima7841'
  format: 'json'
pinboard.get 'posts/all', {
  start: 300
  results: 50
}, (data) ->
  for i of data
    imageName = data[i].meta + '.png'
    webshot data[i].href, data[i].meta + '.png', {
      windowSize:
        width: 1280
        height: 1024
      shotSize:
        width: 'window'
        height: 'all'
    }, (err, path) ->
      fs.exists path, (exists) ->
        if exists
          # 폭 640px 로 변경
          imagemagick.resize {
            srcPath: path
            dstPath: path
            width: 640
          }, (error, stdout, stderr) ->
            console.log 'resize'
            if !error
              imagemagick.identify path, (err, features) ->
                if !err
                  # 세로가 1280 이상이면 크롭한다.
                  if features.height > 1280
                    imagemagick.crop {
                      srcPath: path
                      dstPath: path
                      width: 640
                      height: 1280
                      quality: 1
                      gravity: 'North'
                    }, (err, stdout, stderr) ->
                      console.log 'crop ok'
                      return
                return
            else
              throw error
            return
        else
          console.log '파일이 없음'
        return
      return
  return
