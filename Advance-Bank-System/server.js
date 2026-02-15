require("dotenv").config()
const app = require("./src/app");
const {connectToDB} = require("./src/config/db")

connectToDB();

app.listen(7310, () => {
    console.log("Server Started");
});