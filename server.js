import express from "express";
import mongoose from "mongoose";
import { getOriginalUrl, shortUrl } from "./Controllers/url.js";
import path from 'path';
import dotenv from 'dotenv'
dotenv.config()

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(path.resolve(), 'public')));

mongoose.connect(process.env.MONGO_URI,{
    dbName: "Projects_iN_NodeJS"
}).then(()=> console.log('MongoDB connected successfully')).catch((err)=> console.log(err))

app.get('/', (req, res)=> {
    res.render('index.ejs', {shortUrl: null});
})

app.post('/short', shortUrl);

app.get('/:shorturl', getOriginalUrl);

const port = process.env.PORT;
app.listen(port, ()=>console.log(`My server is running on port http://localhost:${port}`))

