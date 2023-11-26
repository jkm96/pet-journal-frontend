import axios from "axios";
import * as https from "https";
import {petJournalApiBaseUrl} from "@/boundary/constants/appConstants";

const petJournalApiClient = axios.create({
    baseURL: `${petJournalApiBaseUrl}`,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    httpsAgent: new https.Agent({ rejectUnauthorized: false })
});

petJournalApiClient.interceptors.request.use(
    function (config) {

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error)
    }
);
export default petJournalApiClient;