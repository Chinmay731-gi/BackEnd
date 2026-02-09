const mongoose = require('mongoose');

async function connecttoDB(url){
    return mongoose.connect(url);
};

module.exports ={
    connecttoDB
}; 