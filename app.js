import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import expressEjsLayouts from "express-ejs-layouts";
import cookieParser from "cookie-parser";
import { checkUser } from "./middlewares/auth.js";
import methodOverride from "method-override";
import RedisStore from "connect-redis";
import session from "express-session";
import router from "./routes/index.js";
import ("./db/database.js")
import redisClient from "./db/redis.js";
const app = express();
const PORT = process.env.PORT || 3001;

// Helmet middleware configuration
app.use(helmet());

// Static file serving middleware
app.use(express.static('public'));
app.use(express.static('uploads'));

// Body parsing middleware
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

// Cookie parsing middleware
app.use(cookieParser());

// Method override middleware
app.use(methodOverride('_method'));

// Express EJS layouts middleware
app.use(expressEjsLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');

// Check user middleware
app.use('*', checkUser);

// Redis store for sessions
const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});

// Session middleware configuration
app.use(session({
  name: "sessid",
  store: redisStore,
  cookie: {
    maxAge: 1000 * 60 * 60 *24,
    httpOnly: true,
    secure: !process.env.NODE_ENV === "production"
  },
  resave: false,
  saveUninitialized: false,
  secret: "keyboard cat",
}));


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Router middleware
app.use("/", router);

// Server listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
