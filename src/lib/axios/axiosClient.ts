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
    function (config:any) {
        if (
            config.url.includes("journal-entry/create")||
            config.url.includes("attachment/create")||
            config.url.includes("pet/create")
        ){
            if(config.headers["Content-Type"] == "application/json" || config.headers["Accept"] == "application/json"){
                delete config.headers["Content-Type"];
                delete config.headers["Accept"];
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error)
    }
);
export default petJournalApiClient;