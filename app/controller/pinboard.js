var pinboard = require('pinboard');

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
  pinboard.get('posts/all', function(data) {
    res.render('index', { 'pinboardData' : data });
  });
}