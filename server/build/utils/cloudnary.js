import { v2 as cloudinaryV2 } from 'cloudinary';
import multer from 'multer';
import path from 'path';
import { API_KEY, API_SECRET, CLOUD_NAME } from './config.js';
cloudinaryV2.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
});
export const cloudinary = cloudinaryV2;
export const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            cb(null, false);
            return;
        }
        cb(null, true);
    },
});
//# sourceMappingURL=cloudnary.js.map