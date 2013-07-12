var webshot = require('webshot');
var pinboard = require('pinboard');
var imagemagick = require('imagemagick');

pinboard.config({
  username: 'ibare',
  password: 'ultima7841',
  format: 'json'
});

pinboard.get('posts/all', { start: 250, results: 50 }, function(data) {
  for(var i in data) {
    webshot(data[i].href, data[i].meta+'.png', { 
        windowSize: { width: 1280, height: 1024 },
        shotSize: { width: 'window', height: 'all' }
      },  
      function(err) {
      console.log('ok!');
    });
  }
});
