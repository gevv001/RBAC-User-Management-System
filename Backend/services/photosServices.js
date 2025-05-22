import PhotoModel from "../models/photoModel.js"
import { isValidId } from "./userUtils.js";

class PhotosServices {
    static async uploadPhoto(file) {
        try {
            const photo = new PhotoModel({
                data: file.buffer,
                contentType: file.mimetype
            });

            const saved = await photo.save();

            return {
                status: 201,
                message: "Photo upload successful",
                url: `/photos/${saved._id}`,
                id: saved._id
            }
        } catch (error) {
            console.error(error);

            return {
                status: 500,
                message: 'Failed to upload photo'
            }
        }
    }

    static async getPhoto(id) {
        try {
            if (!isValidId(id)) {
                return {
                    status: 400,
                    message: "Not valid photo id"
                }
            }

            const photo = await PhotoModel.findById(id);

            if (!photo) {
                return {
                    status: 404,
                    message: "Photo not found"
                }
            }
            
            return {
                status: 200,
                contentType: photo.contentType,
                data: photo.data
            }
            
        } catch (error) {
            console.error(error);

            return {
                status: 500,
                message: 'Server Error'
            }
        }
    }
}

export default PhotosServices