import express from "express";
import Article from "../models/article.js";

const articleRouter = express.Router();

// get all posts
articleRouter.get("/", async (req, res) => {
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
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.json(articles);
  //res.render("articles/index", { articles: articles });
});

articleRouter.get("/category/:category", async (req, res) => {
    const articles = await Article.find({category: req.params.category});
    console.log(articles);
    res.json(articles);
});

articleRouter.get("/", (req, res) => {
  res.send("in articles");
});

articleRouter.get("/new", (req, res) => {
  const article = {};
  //console.log('new')
  res.render("articles/new", { article: new Article() });
});

articleRouter.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/articles/");
});

articleRouter.get("/edit/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  console.log('----------------------------------',article);
  res.render("articles/edit", { article: article, update: true });
});

articleRouter.put("/:slug", async (req, res) => {
  console.log('----------------------------------',req.params.slug, req.body);
  let article = await Article.findOne({ slug: req.params.slug });
  article.title = req.body.title;
  article.description = req.body.description;
  article.markdown = req.body.markdown;
  article.category = req.body.category;
  article.backgroundImage = req.body.backgroundImage; 
  await article.save();
  res.redirect("/articles/");
});

articleRouter.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  //console.log('article',article);
  //if (article == null) res.redirect("/");
  //res.render("articles/show", { article: article });
  return res.send(article);
});

articleRouter.post("/", async (req, res) => {
  console.log(req.body);
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
    category: req.body.category,
    backgroundImage: req.body.backgroundImage
  });

  try {
    article = await article.save();
    res.redirect(`/articles/${article.slug}`);
  } catch (err) {
    console.error(err);
    res.render("articles/new", { article: article });
  }
});

export default articleRouter;
