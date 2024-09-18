import axios, { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, Method } from "axios";  
import AppConfig from "src/config-global";

import { getBrowserNameHeaderValue } from "./browserUtils";

export interface IRequestModifierParams {
    stringify?: boolean;
    timeout?: number;
    onUploadProgress?: (progressEvent: ProgressEvent) => void;
    onDownloadProgress?: (progressEvent: ProgressEvent) => void;
    failSilently?: boolean;
}

// const token = accessToken;

const API_URL = AppConfig.apiBaseUrl;

// console.log("API_URL: ", API_URL);
const apiHeaders:any = {
    Accept: "application/json",
    "Content-Type": "application/json",
    appVersion: 7,
    osName: "browser",
    // "Access-Control-Allow-Origin": "*",
    browsername: getBrowserNameHeaderValue()
};

class API {
    static get = (
        route: string,
        headers?: object,
        baseURL = API_URL
    ): AxiosPromise => {
        const allHeaders = { ...apiHeaders, ...headers };
        return API.xhr(route, allHeaders, {}, "get", baseURL);
    };

    static post = (
        route: string,
        apiData: object,
        headers?: object,
        modifierParams: IRequestModifierParams = {},
        baseURL = API_URL
    ): AxiosPromise => {
        // console.log("API calling")
        const allHeaders = { ...apiHeaders, ...headers };
        const { stringify } = modifierParams;
        return API.xhr(
            route,
            allHeaders,
            apiData,
            "post",
            baseURL,
            stringify,
            modifierParams
        );
    };

    static put = (
        route: string,
        data: object,
        headers?: object,
        params: IRequestModifierParams = {},
        baseURL = API_URL
    ): AxiosPromise => {
        const allHeaders = { ...apiHeaders, ...headers };
        const { stringify = true } = params;

        return API.xhr(route, allHeaders, data, "put", baseURL, stringify, params);
    };

    static patch = (
        route: string,
        data: object,
        headers?: object,
        params: IRequestModifierParams = {},
        baseURL = API_URL
    ): AxiosPromise => {
        const allHeaders = { ...apiHeaders, ...headers };
        const { stringify = true } = params;

        return API.xhr(route, allHeaders, data, "patch", baseURL, stringify, params);
    };

    static delete = (
        route: string,
        params: object,
        headers?: object,
        baseURL = API_URL
    ): AxiosPromise => {
        const allHeaders = { ...apiHeaders, ...headers };
        return API.xhr(route, allHeaders, params, "delete", baseURL);
    };

    static xhr = (
        route: string,
        headers: object | any,
        apiData: object,
        method: Method,
        baseURL = API_URL,
        stringify: boolean = false,
        params: IRequestModifierParams = {}
    ): any => {
        // file object can't be stringified hence using a flag to determine.
        const data:any = apiData && stringify ? JSON.stringify(apiData) : apiData;
        const {
            failSilently = false
        }:any = params || {};

        const debugData = {
            route,
            apiData: apiData ? JSON.stringify(apiData) : "",
            method
        };

        const axiosConfig: AxiosRequestConfig = {
            method,
            headers,
            url: `${route}`,
            baseURL,
            withCredentials: true,
            ...doesNotNeedBody(method, data),
        };
        axios.interceptors.response.use((response: AxiosResponse): any => {
            if (response && !Object.prototype.hasOwnProperty.call(response, "data")) {
                return response;
            }
            return response;
        });

        return axios(axiosConfig).catch((error: any) => {
            API.axiosError(error, debugData, failSilently);
        });
    };

    // static axiosError = (
    //     error: AxiosError,
    //     debugData: Record<string, string>,
    //     failSilently: boolean = false,
    // ): void => {
    //     // console.error(error,"sdds", error.message)
    //     if (error.response && error.response.status === 401) {
    //         //  Add redirect to login screen logic
    //         useHandleLogout();
    //     } else if (error.response && error.response.status === 491) {
    //         // Handle other erros
    //     } else {
    //         // handle 500 erros
    //         throw error;
    //     }
    // };

    static axiosError = (
        error: AxiosError,
        debugData: Record<string, string>,
        failSilently: boolean = false,
    ): void => {
        if (error.response && error.response.status === 401) {
          // Let redux-saga or calling function handle the logout behavior
          throw new Error("Unauthorized");
        } else {
          throw error;
        }
    };
}


// Adding this to avoid malformed or illegal request in gcp
const doesNotNeedBody = (method: string, data: any) => {
    if (
        method === "get" ||
        method === "GET" ||
        method === "delete" ||
        method === "DELETE" ||
        method === "options" ||
        method === "OPTIONS"
    ) {
        return null;
    }

    return { data };
};

export default API;