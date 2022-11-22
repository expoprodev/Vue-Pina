import axios from 'axios';

const CLUSTERS_URL = "clusters/"

class ClusterService {
    getClusters() {
        return axios.get(CLUSTERS_URL)
    }

    createCluster(payload) {
        return axios.put(CLUSTERS_URL, payload)
    }

    startCluster(instanceId) {
        return axios.post(CLUSTERS_URL + instanceId + '/start')
    }

    stopCluster(instanceId) {
        return axios.post(CLUSTERS_URL + instanceId + '/stop')
    }

    terminateCluster(instanceId) {
        return axios.delete(CLUSTERS_URL + instanceId)
    }
}

export default new ClusterService();