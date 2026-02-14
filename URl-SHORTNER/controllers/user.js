const User = require('../models/user');
const { v4 : uuidv4 } = require('uuid');
const { setUser } = require('../service/auth');
async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    try {
        await User.create({ name, email, password });
        return res.status(201).render('home', { 
            message: 'User created successfully' 
        });

    } catch (err) {
        console.error(err);
        return res.status(500).render('home', { 
            message: 'Something went wrong!' 
        });
    }
};

async function handleUserLogin(req, res) {
    const { email , password } = req.body;
    const user = await User.findOne({email , password });
    if (!user) return res.render("login", {
        error: "Invalid Username or Password",
    });
     const token = setUser( user);
     res.cookie("uid", token);
    return res.render("home");
};

module.exports = {
   handleUserSignup,
   handleUserLogin
};