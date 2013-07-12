var pinboard = require('pinboard');
var webshot = require('webshot');

pinboard.config({
  username: 'ibare',
  password: 'ultima7841',
  format: 'json'
});

exports.list = function(req, res) { 
/* Pinboard result itme spec
  href: "http://developers.amiando.com/index.php/REST_API_ErrorCodes#Invalid_password",
  description: "REST API ErrorCodes - Amiando Developer Wiki",
  extended: "",
  meta: "5182ffc26b44c76a417c8439989680d3",
  hash: "b685c69d9ec478166e2ad8c575199a5d",
  time: "2013-07-10T06:28:05Z",
  shared: "yes",
  toread: "no",
  tags: "REST error api status code"
 */  
  pinboard.get('posts/all', {start: 0, results: 500}, function(data) {
    var tableData = { column: [[], [], []] };

    for(var i = 0; i < data.length; i+=3) {
      for(var j = 0; j < 3; j++) {
        if(i+j > (data.length-1)) break;

        tableData.column[j].push(data[i+j]);
      }
    }

    res.render('index', { 'pinboardData' : tableData });
  });
}