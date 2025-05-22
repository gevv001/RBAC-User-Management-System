import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
    data: {
        type: Buffer,
        required: true
    },
    contentType: {
        type: String,
        required: true,
        enum: ["image/jpeg", "image/png", "image/jpg", "image/webp"]
    },
}, { timestamps: true })

const PhotoModel = mongoose.model('Photo', photoSchema);
export default PhotoModel;