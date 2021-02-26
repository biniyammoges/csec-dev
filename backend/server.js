const express = require("express");
const dotenv = require("dotenv");
const connectMongo = require("./config/db");
const colors = require("colors");
const fileupload = require("express-fileupload");
const path = require("path");
const { errorHandler, notFound } = require("./middlewares/errorHandler");

// routers
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");

// set enviromental var
dotenv.config();

// connect database
connectMongo();

// initialize express
const app = express();

// body parser
app.use(express.json());

// File upload
app.use(fileupload());

// static folder
app.use(express.static(path.join(__dirname, "public")));

// Mount routers
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/events", eventRoutes);

// error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.cyan.underline.bold)
);
