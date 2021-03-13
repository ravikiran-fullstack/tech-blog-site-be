import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import cors from 'cors';
import articleRouter from "./routes/article.js";
import Article from './models/article.js';
const app = express();

app.set("view engine", "ejs");
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use("/articles", articleRouter);


const port = `${process.env.PORT}`;
const mongoURI = `${process.env.mongoURI}`;


const connectToMongoDb = async () => {
  try {
    const result = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    app.listen(process.env.PORT || 8585, "0.0.0.0");
    console.log(`Back end server running on ${process.env.PORT}`);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

connectToMongoDb();




