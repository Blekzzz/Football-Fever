const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWSAPI_TOKEN);

class NewsController {
    static async getNews(req, res, next) {
        try {
            let data = await newsapi.v2.everything({
                q: 'football',
                sources: 'bbc-news,the-verge',
                domains: 'bbc.co.uk, techcrunch.com',
                language: 'en',
                // sortBy: 'relevancy',
                pageSize: 10,
                page: req.query.page
              })

              res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = NewsController