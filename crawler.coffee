_            = require 'lodash'
_log         = require('single-line-log').stdout
fs           = require 'fs'
chalk        = require 'chalk'
Crawler      = require "simplecrawler"
moment       = require 'moment'
log_path     = "test/site-crawler/logs/"
config       = require('./lib/parseConfig')()


#--------------------------------------------------------
# Site Crawler
#--------------------------------------------------------

SiteCrawler =
  remaining: null
  init: ->
    @errorsObj = {}
    @startTimer()
    @errors = 0
    @startCrawler()

  startTimer: ->
    @duration = 1
    @timer = setInterval =>
      @duration++
    , 1000

  startCrawler: ->
    @crawler = Crawler.crawl config.url
    @crawler.parseScriptTags = false
    @crawler.parseHTMLComments = false
    @crawler
    .on "fetch404", @logError.bind(@)
    .on "fetchcomplete", @progress.bind(@)
    # .on "fetchredirect", @logRedirect.bind(@)
    .on "complete", @finish.bind(@)

  createLogFile: (cb) ->
    @current_logfile = "#{log_path}#{moment().format('MMM-D-YYYY-h-mm-ss-a')}_log.txt"
    fs.writeFile @current_logfile, "", (err) =>
      throw err if err isnt null
      cb()

  logError: (item, response) ->
    @errors++
    status = response.statusCode
    url = item.url
    ref = item.referrer
    @addError
      url: url
      ref: ref

  addError: (params) ->
    if @errorsObj[params.url]?
      @errorsObj[params.url].refs.push params.ref
    else
      @errorsObj[params.url] =
        refs: ["#{params.ref}"]

  getRemaining: -> @crawler.queue.complete()
  getTotal: -> @crawler.queue.length

  progress: (finished = false)->
    percent_complete = @getRemaining() / @getTotal()
    progress_bar = ""
    progress = parseInt(percent_complete * 30)
    [1..30].map (notch) ->
      if notch <= progress
        progress_bar += "="
      else
        progress_bar += " "
    progress = "Crawling #{config.url} [#{progress_bar}] #{(percent_complete * 100).toFixed(2)}%"
    _log chalk.cyan progress

  finish: ->
    _log.clear()
    clearInterval @timer
    duration = "#{(@duration / 60).toFixed(2)} minutes"
    console.log chalk.white.bgCyan "\n Site Crawler Completed in #{duration}"
    
    if @errors > 0
      console.log chalk.white.bgMagenta "\n #{@errors} Total Errors"

    fs.writeFile "#{__dirname}/log/#{config.name}.json", JSON.stringify(@errorsObj), (err) ->
      throw err if err isnt null


module.exports = SiteCrawler