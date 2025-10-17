import shortid from "shortid";
import { Url } from "../Models/Url.js"

export const shortUrl = async (req, res)=> {
    const longUrl = req.body.longUrl;
    const shortCode = shortid.generate();

    const baseURL = process.env.BASE_URL;
    const shortUrl = `${baseURL}/${shortCode}`;
    // const shortUrl = `http://localhost:3000/${shortCode}`;
    // const shortUrl = `HloChef/${shortCode}`;
    // save the database 
    const newUrl = new Url({shortCode, longUrl});
    await newUrl.save();

    console.log("Short saved: ", newUrl);
    res.render('index.ejs', { shortUrl });
}

export const getOriginalUrl = async (req, res)=> {
    const shortCode = req.params.shortCode;

    // find on database 
    const originalUrl = await Url.findOne(shortCode);

    if(originalUrl) {
        res.redirect(originalUrl.longUrl);
    } else {
        res.json({
            msg: 'Invalid shortcode'
        });
    }
} 
