pinboard = require('pinboard')
webshot = require('webshot')
pinboard.config
  username: 'ibare'
  password: 'ultima7841'
  format: 'json'

exports.list = (req, res) ->

  ### Pinboard result itme spec
    href: "http://developers.amiando.com/index.php/REST_API_ErrorCodes#Invalid_password",
    description: "REST API ErrorCodes - Amiando Developer Wiki",
    extended: "",
    meta: "5182ffc26b44c76a417c8439989680d3",
    hash: "b685c69d9ec478166e2ad8c575199a5d",
    time: "2013-07-10T06:28:05Z",
    shared: "yes",
    toread: "no",
    tags: "REST error api status code"
  ###

  pinboard.get 'posts/all', {
    start: 0
    results: 500
  }, (data) ->
    tableData = column: [
      []
      []
      []
    ]
    i = 0
    while i < data.length
            j = 0
      while j < 3
        if i + j > data.length - 1
          break
        tableData.column[j].push data[i + j]
        j++
      i += 3
    res.render 'index', 'pinboardData': tableData
    return
  return
