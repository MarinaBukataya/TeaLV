require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use("/user", require("./routers/userRouter"));
app.use("/api", require("./routers/categoryRouter"));
app.use("/api", require("./routers/productRouter"));
app.use("/api", require("./routers/upload"));

const URI = process.env.MONGODB_URI;

mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to DB");
  }
);

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
