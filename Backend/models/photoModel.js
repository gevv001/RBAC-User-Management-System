import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String,
}, {timestamps: true})

const PhotoModel = mongoose.model('Photo', photoSchema);
export default PhotoModel;