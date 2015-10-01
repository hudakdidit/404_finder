# CONFIG
_          = require 'lodash'
fs         = require 'fs'
chalk      = require 'chalk'
express    = require 'express'
bodyParser = require 'body-parser'
config     = require('./lib/parseConfig')()


# CONFIG
app        = express()
_DB        = null
{name, port}     = config


# ROUTER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.get '/', (req, res) -> res.sendfile __dirname + '/public/index.html'
app.get '/api', (req, res) ->
  res.setHeader('Content-Type', 'text/json')
  res.send(JSON.stringify(config))

app.post '/update', (req, res) ->
  res.setHeader('Content-Type', 'text/plain')
  {index, item} = req.body
  updateDB index, item, ->
    res.end(JSON.stringify(_DB))


# 'DATABASE' METHODS
updateDB = (key, obj, cb) ->
  _DB[key] = _.assign(_DB[key], obj)
  fs.writeFile __dirname + "/public/#{name}_db.json", JSON.stringify(_DB, null, '\t'), (err) =>
    throw err if err isnt null
    cb(_DB)

writeDB = (db, cb) ->
  fs.writeFile __dirname + "/public/#{name}_db.json", JSON.stringify(db, null, '\t'), (err) =>
    throw err if err isnt null
    _DB = db
    cb()

readDB = ->
  crawl_data = require __dirname + "/log/#{name}.json"
  fs.exists __dirname + "/public/#{name}_db.json", (exists) ->
    if exists
      db = require __dirname + "/log/#{name}.json"
      checkUpdate(crawl_data, db, startServer)
    else
      writeDB crawl_data, startServer

checkUpdate = (crawled, db, cb) ->
  _.mapKeys crawled, (url, val) ->
    if db[url]?
      # The issue is apparently not resolved
      db[url].complete = false
      db[url].reopened = true
    else
      # The issue is new
      db[url] = val
  writeDB db, cb

startServer = ->
  server = app.listen port, ->
    console.log chalk.white.bgCyan "Server listening at http://localhost:#{port}"

module.exports = -> readDB()