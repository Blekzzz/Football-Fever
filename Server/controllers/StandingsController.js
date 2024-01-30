const axios = require('axios')

class StandingsController {
    static async getTable(req, res, next) {
        const { league } = req.params
        let options = {
            method: 'GET',
            url: `https://football98.p.rapidapi.com/${league}/table`,
            headers: {
                'X-RapidAPI-Key': process.env.X_RAPID_API_KEY,
                'X-RapidAPI-Host': 'football98.p.rapidapi.com'
            }
        }
        try {
            const { data } = await axios.request(options)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getLatestTransfer(req, res, next) {
        const { league } = req.params
        let options = {
            method: 'GET',
            url: `https://football98.p.rapidapi.com/${league}/transfers`,
            headers: {
                'X-RapidAPI-Key': process.env.X_RAPID_API_KEY,
                'X-RapidAPI-Host': 'football98.p.rapidapi.com'
            }
        }
        try {
            const { data } = await axios.request(options)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async squadDetail(req, res, next) {
        const { team, league } = req.params
        const options = {
            method: 'GET',
            url: `https://football98.p.rapidapi.com/${league}/table/squadname/${team}`,
            headers: {
                'X-RapidAPI-Key': process.env.X_RAPID_API_KEY,
                'X-RapidAPI-Host': 'football98.p.rapidapi.com'
            }
        };

        try {
            const { data } = await axios.request(options);
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getMatchday(req, res, next) {
        const { league } = req.params
        let options = {
            method: 'GET',
            url: `https://football98.p.rapidapi.com/${league}/fixtures`,
            headers: {
                'X-RapidAPI-Key': process.env.X_RAPID_API_KEY,
                'X-RapidAPI-Host': 'football98.p.rapidapi.com'
            }
        }
        try {
            const { data } = await axios.request(options)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = StandingsController