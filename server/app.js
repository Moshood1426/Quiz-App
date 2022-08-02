const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors")

//setting up morgan for test-environment
const morgan = require("morgan");
const cookieParser = require('cookie-parser');

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//setting up middleware and invoking them
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET))

//setting up routes and invoking them
const authRoute = require("./routes/authRoute")
const quizRoute = require("./routes/quizRoute")
const questionRoute = require("./routes/questionRoute")
const participantRoute = require("./routes/participantRoute")

app.get("/api/v1", (req, res) => {
    res.status(200).json({msg: "connection succesful"})
})

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/quiz', quizRoute)
app.use('/api/v1/question', questionRoute)
app.use("/api/v1/participant", participantRoute)

//setting up error handlers and invoking them
const errorHandlerMiddleware = require("./middleware/error-handler")
const notFoundMiddleware = require("./middleware/not-found")

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);



//setting up DB and invoking route
const connectDB = require("./db/connectDB");
const port = process.env.PORT || 5000;

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

