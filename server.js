require("dotenv").config();
const express = require("express"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  routes = require("./routes"),
  env = process.env;

// routes
// import authRoutes from "./routes/api/auth";
// import itemRoutes from "./routes/api/items";
// import userRoutes from "./routes/api/users";

const app = express();

// CORS Middleware
app.use(cors());
// Bodyparser Middleware
app.use(bodyParser.json());

const URI = `${env.DB_DRIVER}://${env.DB_USER}:${env.DB_PASS}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;

// Connect to Mongo
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/v1", routes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
