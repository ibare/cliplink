colors = require 'colors'
path = require 'path'
appinfo = require path.join __dirname, 'package.json'
debug = require('debug')(appinfo.name)
express = require 'express'
app = express()

port = process.env.PORT or 8080

app.get '/', (req, res) ->
  res.send('cliplink good!')

server = app.listen port, ->
  debug '%s : ' + 'OK'.green,  appinfo.name
