import axios from 'axios';
//https://github.com/bezkoder/vue-3-authentication-jwt/blob/master/src/services/auth.service.js
const PROFILE_URL = "profile/details"
const EDIT_PROFILE_URL = "profile/info"
const PROFILE_IMAGE_URL = "profile/image"

class ProfileService {
    getDetails() {
        return axios.get(PROFILE_URL);
    }

    save(data) {
        return axios.put(EDIT_PROFILE_URL, data)
    }

    getProfileImage() {
        return axios.get(PROFILE_IMAGE_URL, {headers: {'Accept': '*/*'}, responseType: 'blob'})
    }
}

export default new ProfileService();