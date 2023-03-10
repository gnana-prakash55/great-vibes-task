import axios from "axios";
import { JobAttributes } from "../statesTypes/JobState";

class JobService {

    private API_URL = import.meta.env.VITE_API_URL

    listJobs() {
        return axios.get(`${this.API_URL}/job`)
    }

    createJob(payload: JobAttributes) {
        return axios.post(`${this.API_URL}/job`, payload)
    }

}

export default new JobService;