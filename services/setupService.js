import axios from 'axios';

const SETUP_RESULTS_URL = "result/setup/"
const SETUP_RESULT_ITEM_URL = "result/setups/"

class SetupService {
    getSetups(page, pageSize) {
        return axios.get(SETUP_RESULTS_URL, {
            params: {
                page: page,
                pagesize: pageSize,
            }
        })
    }

    getSetup(modelName) {
        return axios.get(SETUP_RESULT_ITEM_URL + modelName)
    }

    getTabConfigurations(modelName) {
        return axios.get(SETUP_RESULT_ITEM_URL + modelName + "/layout")
    }

    saveTabConfigurations(modelName, data) {
        return axios.post(SETUP_RESULT_ITEM_URL + modelName + "/layout", data)
    }

    getChart(modelName, fieldName) {
        if (fieldName === "") {
            return Promise.reject("fieldName shouldn't be null")
        }
        return axios.get(SETUP_RESULT_ITEM_URL + modelName + "/" + fieldName);
    }
}

export default new SetupService();