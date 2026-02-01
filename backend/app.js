const express = require("express");
const app = express();
const pizzas = require("./routes/pizzas");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const cors = require("cors");

// Configure specific origins
const allowedOrigins = ["http://localhost:3000"];
app.use(
  cors({
    origin: allowedOrigins,
  }),
);
// app.use(cors());
app.use(express.json());
console.log("after express json");
app.use("/api/v1/pizzas", pizzas);
console.log("after api v1 pizzas");

app.use(notFound);
console.log("before errorHandlerMiddleware");
app.use(errorHandlerMiddleware);
console.log("after errorHandlerMiddleware");
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    const dbConnect = await connectDB(process.env.MONGO_URI);
    console.log("mongodb connected ", dbConnect);
    app.listen(port, () =>
      console.log(`Server is listerning on port ${port}...`),
    );
  } catch (error) {
    console.log(error);
  }
};

start();
