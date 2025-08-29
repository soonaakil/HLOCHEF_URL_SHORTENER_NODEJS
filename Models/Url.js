import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortCode: {type: String},
    longUrl: {type: String},
})

export const Url = mongoose.model('project_urlShortner', urlSchema);


