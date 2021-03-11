import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  markdown: {
    type: String,
    required: true
  },
  createdAt: {
      type: Date,
      default: Date.now
  }  
}, {timestamps: true});

const Article = mongoose.model('Article', articleSchema);

export default Article;