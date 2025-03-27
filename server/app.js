const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
require("dotenv").config();
require("express-async-errors");

//setting up morgan for test-environment
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//setting up middleware and invoking them
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");


app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use(cookieParser(process.env.JWT_SECRET));

//setting up routes and invoking them
const authRoute = require("./routes/authRoute");
const quizRoute = require("./routes/quizRoute");
const questionRoute = require("./routes/questionRoute");
const participantRoute = require("./routes/participantRoute");
const submissionRoute = require("./routes/submissionRoute");

app.use("/", express.static(path.resolve(__dirname, "../client/build")));

app.get("/api/v1", (req, res) => {
  res.status(200).json({ msg: "connection succesful" });
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/quiz", quizRoute);
app.use("/api/v1/question", questionRoute);
app.use("/api/v1/participant", participantRoute);
app.use("/api/v1/submission", submissionRoute);

// only when ready to deploy
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

//setting up error handlers and invoking them
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//setting up DB and invoking route
const connectDB = require("./db/connectDB");
const { default: Credentials } = require("next-auth/providers/credentials");
const port = process.env.PORT || 80;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
