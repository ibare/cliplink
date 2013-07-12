var fs = require('fs');
var webshot = require('webshot');
var pinboard = require('pinboard');
var imagemagick = require('imagemagick');

pinboard.config({
  username: 'ibare',
  password: 'ultima7841',
  format: 'json'
});

pinboard.get('posts/all', { start: 300, results: 50 }, function(data) {
  for(var i in data) {
    var imageName = data[i].meta+'.png';
    webshot(data[i].href, data[i].meta+'.png', { 
        windowSize: { width: 1280, height: 1024 },
        shotSize: { width: 'window', height: 'all' } },  
      function(err, path) {

        fs.exists(path, function(exists) { 
          if (exists) {
            // 폭 640px 로 변경
            imagemagick.resize({ srcPath: path, dstPath: path, width: 640 }, function(error, stdout, stderr){
              console.log('resize');
              if (!error)
                imagemagick.identify(path, function(err, features){
                  if (!err) {
                    // 세로가 1280 이상이면 크롭한다.
                    if(features.height > 1280) {
                      imagemagick.crop({
                        srcPath: path,
                        dstPath: path,
                        width: 640,
                        height: 1280,
                        quality: 1,
                        gravity: "North"}, function(err, stdout, stderr) {
                          console.log('crop ok');
                        }
                      );
                    }
                  }
                });
              else throw error;
            });
          } else {
            console.log('파일이 없음');
          }
        }); 
      }
    );
  }
});
