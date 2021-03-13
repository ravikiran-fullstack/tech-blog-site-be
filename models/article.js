import mongoose from "mongoose";
import marked from "marked";
import slugify from "slugify";
import createDomPurify from "dompurify";
import { JSDOM } from "jsdom";
const dompurify = createDomPurify(new JSDOM().window);

const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    markdown: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    sanatizedHtml: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

articleSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if(this.markdown) {
      this.sanatizedHtml = dompurify.sanitize(marked(this.markdown));
  }
  next();
});

const Article = mongoose.model("Article", articleSchema);

export default Article;
