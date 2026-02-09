const shortid = require('shortid');
const Url = require('../models/url');

async function handleGenerateShortUrl(req,res){
    const body = req.body;
    if (!body.url) return res.status(400).json({error: 'Url is required'});
    const shortID = shortid.generate();
    await Url.create({
        shortId: shortID,
        originalUrl: body.url,
        visitHistory: []
    });
    return res.render('home', { Id: shortID });
};

async function handleGetAnalytics(req,res) {
     const shortId = req.params.shortId;
     const entry = await Url.findOne({shortId});
     return res.json({
        totalClicks: entry.visitHistory.length,
        analytics: entry.visitHistory,
     });
};

module.exports = {
    handleGenerateShortUrl,
    handleGetAnalytics,
};