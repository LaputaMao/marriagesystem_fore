import request from '../utils/request';

//登录
export const Login = (params: any) => {
    return request({
        url: '/api/login',
        method: 'post',
        data: params,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
};

//注册
export const SignUp = (params: any) => {
    return request({
        url: '/api/signup',
        method: 'post',
        data: params,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
};
