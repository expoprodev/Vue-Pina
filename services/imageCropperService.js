import axios from 'axios';

const PROFILE_IMAGE_URL = "profile/image"

class ImageCropperService {
    updateProfileImage(imageFile) {
        const formData = new FormData();
        formData.append("files", imageFile);
        return axios.post(PROFILE_IMAGE_URL, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    }
}

export default new ImageCropperService();