const express = require('express');
const Url = require('../models/url');
const { restrictTo } = require('../middleware/auth');
const router = express.Router();

router.get('/',restrictTo(['NORMAL', 'ADMIN']), async(req,res) => {
    const allUrls = await Url.find({ createdBy: req.user._id });
    return res.render('home', {Urls: allUrls});
});

router.get('/admin/urls', restrictTo(['ADMIN']), async (req,res) => {
    const allUrls = await Url.find({});
    return res.render('home', {
        Urls: allUrls,
    });
});

router.get('/signup', (req,res) => {
    return res.render('signup');
});
router.get('/login', (req,res) => {
    return res.render('login');
});
module.exports = router;    