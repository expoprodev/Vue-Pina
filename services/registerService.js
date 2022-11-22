import axios from "axios";

const INFORMATION_URL = "account/register"
const VERIFY_URL = "account/register/verify"
const RESEND_URL = "account/register/otp"
const COMPLETE_URL = "account/register/complete"

class RegisterService {
    registerInformation(data) {
        return axios.put(INFORMATION_URL, data);
    }

    verifyOtpCode(data) {
        return axios.post(VERIFY_URL, data);
    }

    resendOtpCode(data) {
        return axios.post(RESEND_URL, data);
    }

    complete(data) {
        return axios.post(COMPLETE_URL, data);
    }
}

export default new RegisterService();
