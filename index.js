require('coffee-script');
require('coffee-script/register');
var crawler = require('./crawler.coffee'),
    server  = require('./server.coffee'),
    webpack = require('webpack'),
    config = require('./webpack.config')
    command = process.argv[2];

var dev = function() {
  server()
  webpack(config).watch({
    aggregateTimeout: 300,
    poll: true
  }, function(err, stats){
    console.log(stats.toString({colors: true}));
  });
}

var crawl = function() {
  crawler.init();
}


switch(command) {
  case 'dev':
    dev();
    break;
  case 'dev-crawl': 
    server();
    crawler.init();
    break;
  case 'crawl': 
    crawler.init();
    break;
}


