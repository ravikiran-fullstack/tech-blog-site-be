import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from 'mongoose';
import articleRouter from "./routes/article.js";
import Article from './models/article.js';
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use("/articles", articleRouter);


const port = `${process.env.PORT}`;
const mongoURI = `${process.env.mongoURI}`;


const connectToMongoDb = async () => {
  try {
    const result = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(process.env.PORT || 8585, "0.0.0.0");
    console.log(`Back end server running on ${process.env.PORT}`);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

connectToMongoDb();

app.get("/", async (req, res) => {
  // const articles = [
  //   {
  //     title: "title1",
  //     date: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed nulla a ipsum dignissim imperdiet non eget neque. Mauris venenatis enim orci, non interdum lacus scelerisque ut. Praesent ac malesuada mauris, vel rutrum neque. In euismod ipsum eu tellus cursus, ac vehicula turpis rutrum. Quisque tempus sagittis ante, et sodales lorem rutrum at. Maecenas efficitur posuere molestie. In ut est lorem. Fusce cursus in nunc ut tempor. Cras vel blandit eros. Vivamus convallis risus id pulvinar rutrum. Mauris eget nisi eget magna mollis iaculis. Mauris eget metus at mi lobortis volutpat id a est. Morbi erat turpis, dapibus in auctor sit amet, posuere nec elit. Fusce mollis augue eget risus condimentum, non efficitur eros commodo.",
  //   },
  //   {
  //     title: "title2",
  //     date: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
  //     description:
  //       "Aenean malesuada lorem sit amet cursus consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur accumsan risus sit amet purus porta posuere. Etiam vulputate dolor quis efficitur pretium. Cras quis pulvinar mi. Phasellus leo quam, sodales non pellentesque in, vulputate id nibh. Ut pellentesque mollis ante ut elementum.",
  //   },
  //   {
  //     title: "title3",
  //     date: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
  //     description:
  //       "Suspendisse sagittis ornare ex id tempor. In risus enim, efficitur nec magna id, condimentum semper felis. Quisque vulputate, tellus et semper pretium, quam orci vestibulum neque, ut luctus metus leo dapibus magna. Quisque sit amet ligula purus. Pellentesque euismod ultricies felis eu cursus. Mauris ornare justo enim, a condimentum nisi laoreet eget. Fusce odio orci, mattis sit amet nisi eget, gravida blandit quam.",
  //   },
  // ];
  const articles = await Article.find().sort({createdAt: 'desc'});

  res.render("articles/index", { articles: articles });
});


