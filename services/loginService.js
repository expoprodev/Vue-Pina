import axios from "axios";

const LOGIN_URL = "account/login"

class LoginService {
    login(data) {
        return axios.post(LOGIN_URL, data)
    }
}

export default new LoginService();