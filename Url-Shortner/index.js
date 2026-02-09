const express = require('express');
const path = require('path');
const { connecttoDB } = require('./connect.js');
const urlRouter = require('../Url Shortner/routes/url.js');
const staticRoute = require('../Url Shortner/routes/staticRouter.js');
const URL = require('../Url Shortner/models/url.js');

const app = express();
const port = 7310;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', "ejs");
app.set('views', path.resolve("./views"));

app.use('/test', staticRoute);
app.use('/url', urlRouter);

app.get('/u/:shortId', async (req, res) => {
    const entry = await URL.findOneAndUpdate(
        { shortId: req.params.shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } }
    );

    if (!entry) return res.status(404).send("Short URL not found");
    res.redirect(entry.originalUrl);
});


connecttoDB('mongodb://127.0.0.1:27017/short-url')
  .then(() => console.log("Connected to DB"));

app.listen(port, () => console.log(`Server running on ${port}`));
