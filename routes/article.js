import express from 'express';

import Article from '../models/article.js';

const articleRouter = express.Router();


articleRouter.get('/', (req, res) => {
    res.send('in articles');
});

articleRouter.get('/new', (req, res) => {
    const article = {}
    console.log('new')
    res.render('articles/new', {article: new Article()});
})

articleRouter.get('/:id',async (req, res) => {
    const article = await Article.findById(req.params.id);
    console.log('article',article);
    if(article == null) res.redirect('/');
    res.render('articles/show', {article: article});
})

articleRouter.post('/', async (req, res) => {
    let article = new Article({
        title:req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    
    try{

        article = await article.save();
        res.redirect(`/articles/${article.id}`)
    } catch(err){
        console.error(err);
        res.render('articles/new', {article: article});
    }
})

export default articleRouter;