_  = require 'lodash'
chalk = require 'chalk'
express = require 'express'
app = express()
port = 9977
fs   = require 'fs'
bodyParser = require 'body-parser'
_DB = null

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.get '/', (req, res) -> res.sendfile __dirname + '/public/index.html'

app.post '/update', (req, res) ->
  res.setHeader('Content-Type', 'text/plain')
  {key, item} = req.body
  for prop in item
    _DB[key][prop] = item[key]
  updateDB req.body.key, {key: 'completed', val: req.body.complete}, (db) ->
    res.end(JSON.stringify(db))


app.post '/complete', (req, res) ->
  res.setHeader('Content-Type', 'text/plain')
  updateDB req.body.key, {key: 'completed', val: req.body.complete}, (db) ->
    res.end(JSON.stringify(db))

app.post '/addnotes', (req, res) ->
  res.setHeader('Content-Type', 'text/plain')
  updateDB req.body.key, {key: 'notes', val: req.body.notes}, (db) ->
    res.end(JSON.stringify(db))

updateDB = (key, obj, cb) ->
  _DB[key][obj.key] = obj.val
  fs.writeFile __dirname + '/public/db.json', JSON.stringify(_DB, null, '\t'), (err) =>
    throw err if err isnt null
    cb(_DB)

writeDB = (db, cb) ->
  fs.writeFile __dirname + '/public/db.json', JSON.stringify(db, null, '\t'), (err) =>
    throw err if err isnt null
    _DB = db
    cb()

module.exports = ->
  crawl_data = require __dirname + '/logs/data.json'
  fs.exists __dirname + '/public/db.json', (exists) ->
    if exists
      db = require __dirname + '/public/db.json'
      db = _.assign(db, crawl_data)
      writeDB db, startServer
    else
      writeDB crawl_data, startServer

startServer = ->
  server = app.listen port, ->
    console.log chalk.white.bgCyan "Server listening at http://localhost:#{port}"