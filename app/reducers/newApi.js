'use client';

import axios from 'axios';
import { toast } from 'react-toastify';
const newApi = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_NEW_URL });

const formDataURL = ['user/user-profile/change-avatar','user/logo/upload-logo','user/artWork/add','postgresapi/user/artWork/add', 'postgresapi/user/logo/upload-logo'];
newApi.interceptors.request.use((req) => {
    let userTokenData;
    try {
        userTokenData = JSON.parse(sessionStorage.getItem('showmeheadwear'));
    } catch (error) {
        userTokenData = null;
    }
    let token = userTokenData && userTokenData.token ? userTokenData.token : null;
    // Temp Hack to make formData work
    req.headers['Content-Type'] = 'application/json';

    if (formDataURL.includes(req.url)) {
        req.headers['Content-Type'] = 'multipart/form-data';
    }
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

newApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && [401, 403].includes(error.response.status)) {
            sessionStorage.removeItem('showmeheadwear');
            // toast.error("You have been logout, Please login again");
        }
        return Promise.reject(error);
    }
);

export default newApi;
