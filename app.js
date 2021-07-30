const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authCont = require("./middleware/authCont");
const connectDB = require("./config/db");
const pollingProcess = require('./pollingProcess/pollingProcess');
dotenv.config({ path: "./config/config.env" });

/**Connect to the database */
 connectDB();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/user", require("./routes/authAPIs.js"));
app.use("/api/check", require("./routes/checkAPIs.js"));
app.use("/api/report", require("./routes/reportsAPIs.js"));

app.get("/", authCont.authenticateToken, (req, res) => {
  res.json("Welocome To our monitoring " + req.useremail);
});

app.listen(3000, () => {
  console.log("Server is Running");
});

pollingProcess.mainProcess();
