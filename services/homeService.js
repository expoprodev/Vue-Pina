import axios from "axios";

const HOME_DETAIL_URL = "profile"

class HomeService {
    getHomeDetails() {
        return axios.get(HOME_DETAIL_URL);
    }
}

export default new HomeService();
