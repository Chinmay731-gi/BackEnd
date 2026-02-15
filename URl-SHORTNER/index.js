const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');  
const { connecttoDB } = require('./connect.js');
const urlRouter = require('./routes/url.js');
const staticRoute = require('./routes/staticRouter.js');
const userRouter = require('./routes/user.js');

const URL = require('./models/url.js');
const { checkForAuthentication, restrictTo } = require('./middleware/auth.js');
const router = require('./routes/url.js');

const app = express();
const port = 7310;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.set('view engine', "ejs");
app.set('views', path.resolve("./views"));

app.use('/',  staticRoute);
app.use('/url',restrictTo(["NORMAL","ADMIN"]), urlRouter);
app.use('/user', userRouter);   

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
