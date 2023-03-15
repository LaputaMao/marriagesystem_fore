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
    }, {
        path: '/',
        name: 'base',
        component: () => import("../views/Base.vue"),
        children: [
            /*将用户页面全部作为base页面的孩子页面 */
            {
                path: '/recommend',
                name: 'Recommend',
                meta: {
                    title: '推荐'
                },
                component: () => import("../views/Recommend.vue")
            },
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;