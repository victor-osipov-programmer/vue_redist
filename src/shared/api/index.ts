import axios from 'axios'

export const http = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 1000,
    withCredentials: true,
    withXSRFToken: true,
    // xsrfCookieName: 'XSRF-TOKEN',
    // xsrfHeaderName: 'X-XSRF-TOKEN',
});