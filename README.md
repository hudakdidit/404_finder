# Website Crawler

A tool to crawl a site and log any resources that return a 404. Results are presented with a searchable todo-style checklist.

## Setup

1. [Install Node](https://nodejs.org/en/download/)
2. Clone repo `git clone git@github.com:hudakdidit/site_crawler.git`
3. Install dependencies `npm install`
4. Setup config file: run `mv config-example.json config.json`. Update the `site` and `port` properties as necessary.

## Tasks

**Start webpack and the express web server**
```sh
npm start
```

**Start webpack the express web server, and the web crawler**
```sh
npm run dev-crawl
```

**Start the express web server**
```sh
npm run server
```

**Start the crawler script.**
```sh
npm run crawl
```

