const express = require("express");
const cors = require("cors");
require("dotenv").config();

const path = require("path");
const fileupload = require("express-fileupload");

//routers
const userRouter = require("./routes/user");
const companyRouter = require('./routes/companyRouter')
const productRouter = require('./routes/productRouter')
const productTransferRouter =require('./routes/ProductTransferRouter')
const colleagueRouter = require('./routes/colleagueRouter')
const userSignupRouter = require('./routes/userSignupRouter')
const adminRouter =require('./routes/adminRouter')

const connectDB = require("./db");
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  fileupload({
    // limits: { fileSize: 2 * 1024 * 1024 }, // 2mb
    // abortOnLimit: true, // if limit is reached return 413
    createParentPath: true,
    useTempFiles: true,
  })
);

app.use("/public", express.static(path.join(__dirname, "/public")));
// app.use(express.static(path.join(__dirname, 'build')));

app.use("/api/user", userRouter);
app.use("/api/company", companyRouter);
app.use("/api/product", productRouter);
app.use("/api/transferproduct", productTransferRouter);
app.use("/api/colleague", colleagueRouter);
app.use("/api/usersignup", userSignupRouter);
app.use("/api/admin", adminRouter);


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running 0n localhost:${port}`);
});
