import express from "express";
import mongoose from "mongoose";
import { getOriginalUrl, shortUrl } from "./Controllers/url.js";
import path from 'path';

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(path.resolve(), 'public')));

mongoose.connect("mongodb+srv://aakilamity:ohyvTdaixPYcsyvj@cluster0.tfzwymi.mongodb.net/", {
    dbName: "Projects_iN_NodeJS"
}).then(()=> console.log('MongoDB connected successfully')).catch((err)=> console.log(err))

app.get('/', (req, res)=> {
    res.render('index.ejs', {shortUrl: null});
})

app.post('/short', shortUrl);

app.get('/:shorturl', getOriginalUrl);

const port = 3000;
app.listen(port, ()=> console.log(`Server is running on port ${port}`));

