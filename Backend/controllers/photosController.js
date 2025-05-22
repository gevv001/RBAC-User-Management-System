import { sendJson } from "../utils/response.js";
import PhotosServices from "../services/photosServices.js";

class PhotosController {
    static async uploadPhoto(req, res) {
        const { file } = req;
        const response = await PhotosServices.uploadPhoto(file);
        sendJson(res, response);
    }

    static async getPhoto(req, res) {
        const { id } = req.params;
        const response = await PhotosServices.getPhoto(id);
        if (response.status != 200) {
            sendJson(res, response);
        }

        res.set('Content-type', response.contentType);
        return res.send(response.data)
    }
}

export default PhotosController;