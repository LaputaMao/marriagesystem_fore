import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录'
        },
        component: () => import("../views/Login.vue")
    },
    {
        path: '/signup',
        name: 'SignUp',
        meta: {
            title: '注册'
        },
        component: () => import("../views/SignUp.vue")
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;