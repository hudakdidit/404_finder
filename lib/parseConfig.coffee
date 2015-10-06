config     = require '../config.json'

module.exports = ->
  {port, site}     = config
  name = site.split("//").pop().split(".").join("_").replace(':', '_')
  return {} =
    name: name
    url: site
    port: port