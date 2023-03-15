import request from '../utils/request';

export const Login = params => {
    return request({
        url: '/api/login',
        method: 'post',
        data: params,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
};