import express from 'express';

import Article from '../models/article.js';

const articleRouter = express.Router();


articleRouter.get('/' , (req, res) => {
    res.send('in articles');
});

articleRouter.get('/new', (req, res) => {
    const article = {}
    //console.log('new')
    res.render('articles/new', {article: new Article()});
})

articleRouter.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
})

articleRouter.get('/edit/:slug', async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug});
   // console.log('----------------------------------',article);
    res.render('articles/edit', {article: article, update: true});
})

articleRouter.put('/:slug', async (req, res) => {
    //console.log('----------------------------------',req.params.slug, req.body);
    let article = await Article.findOne({slug: req.params.slug});
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    await article.save();
    res.redirect('/');
})

articleRouter.get('/:slug',async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug});
    //console.log('article',article);
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
        res.redirect(`/articles/${article.slug}`)
    } catch(err){
        console.error(err);
        res.render('articles/new', {article: article});
    }
})

export default articleRouter;