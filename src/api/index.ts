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

//个人中心-基本信息-获取
export const GetBaseInfo = () => {
    return request({
        url: '/api/personal/getbaseinfo',
        method: 'get',
        // data: params,
        headers: {
            "token": localStorage.getItem("token") as string,
            // "Content-Type": "multipart/form-data",
        }
    });
};
//个人中心-基本信息-更新
export const UpdateBaseInfo = (params: any) => {
    return request({
        url: '/api/personal/updatebaseinfo',
        method: 'post',
        data: params,
        headers: {
            "token": localStorage.getItem("token") as string,
            "Content-Type": "multipart/form-data",
        }
    });
};
//个人中心-详细信息-获取
export const GetDisplayInfo = () => {
    return request({
        url: '/api/personal/getdisplayinfo',
        method: 'get',
        // data: params,
        headers: {
            "token": localStorage.getItem("token") as string,
            // "Content-Type": "multipart/form-data",
        }
    });
};

//个人中心-详细信息-更新
export const UpdateDisplayInfo = (params: any) => {
    return request({
        url: '/api/personal/updatedisplayinfo',
        method: 'post',
        data: params,
        headers: {
            "token": localStorage.getItem("token") as string,
            "Content-Type": "multipart/form-data",
        }
    });
};

//个人中心-择偶条件-获取
export const GetMatingCondition = () => {
    return request({
        url: '/api/personal/getmatingcondition',
        method: 'get',
        // data: params,
        headers: {
            "token": localStorage.getItem("token") as string,
            // "Content-Type": "multipart/form-data",
        }
    });
};

//个人中心-择偶条件-更新
export const UpdateMatingCondition = (params: any) => {
    return request({
        url: '/api/personal/updatematingcondition',
        method: 'post',
        data: params,
        headers: {
            "token": localStorage.getItem("token") as string,
            "Content-Type": "multipart/form-data",
        }
    });
};

//根据择偶条件推荐
export const RecommendByUserCondition = (params: any) => {
    return request({
        url: '/api/recommend/byusercondition',
        method: 'get',
        params: params,
        headers: {
            "token": localStorage.getItem("token") as string,
        }
    })
}

//上传用户头像
export const ImgUpload = (params: any) => {
    return request({
        url: '/api/personal/imgupload',
        method: 'post',
        data: params,
        headers: {
            "token": localStorage.getItem("token") as string,
            "Content-Type": "multipart/form-data",
        }
    });
};

//获取用户头像
export const ImgGet = () => {
    return request({
        url: '/api/personal/imgget',
        method: 'get',
        // params: params,
        headers: {
            "token": localStorage.getItem("token") as string,
            "Content-Type": "image/png",
        }
    });
};

