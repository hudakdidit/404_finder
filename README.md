# Website Crawler

A tool to crawl a site and log any resources that return a 404. Results are presented with a searchable todo-style checklist.

## Setup

1. [Install Node](https://nodejs.org/en/download/)
2. Clone repo `git clone git@github.com:hudakdidit/site_crawler.git`
3. Install dependencies `npm install`
4. Setup config file: run `mv config-example.json config.json`. Update the `site` and `port` properties as necessary.
5. Start by running `npm run crawl` to crawl the site you added in the last step. This will create the json 'database' (used as the data for the react front-end). Depending on the size of the site, the crawler may take some time so check your email and get coffee. A progress bar will indicate how far along the crawler is.

## Notes

TODO


## Tasks

**Start the crawler script.**
```sh
npm run crawl
```

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


