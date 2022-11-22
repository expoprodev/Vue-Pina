import axios from "axios";

const FORGOT_PASSWORD_URL = "account/forgot"
const VERIFY_URL = "account/forgot/verify"
const RESEND_URL = "account/forgot"
const CHANGE_PASSWORD_URL = "account/forgot/complete"

class ForgotPasswordService {
    forgot(data) {
        return axios.post(FORGOT_PASSWORD_URL, data);
    }

    verifyOtpCode(data) {
        return axios.post(VERIFY_URL, data);
    }

    resendOtpCode(data) {
        return axios.post(RESEND_URL, data);
    }

    changePassword(data) {
        return axios.post(CHANGE_PASSWORD_URL, data);
    }
}

export default new ForgotPasswordService();
