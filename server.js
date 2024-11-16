const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL;
const PORT = process.env.PORT;
const { server } = require("./app");

mongoose
    .connect(DB_CONNECTION_URL)
    .then(() => console.log("Successfull DB Connection"))
    .catch((e) => console.log(e));

server.listen(PORT, (e) => console.log(`Server running at port ${PORT}`));
