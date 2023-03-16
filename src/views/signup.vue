<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">婚恋匹配系统</div>
            <el-form :model="param" :rules="rules" ref="signup" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <template #prepend>
                            <el-button :icon="User"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="param.password">
                        <template #prepend>
                            <el-button :icon="Lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password_extra">
                    <el-input type="password" placeholder="password_again" v-model="param.password_extra">
                        <template #prepend>
                            <el-button :icon="Lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="checkPassword_to_finishSign(signup)">注册</el-button>
                </div>
                <div class="login-btn">
                    <el-button type="primary" @click="toLogin()">返回登录</el-button>
                </div>
                <!-- <p class="login-tips">Tips : 用户名和密码随便填。</p> -->
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useTagsStore } from '../store/tags';
import { usePermissStore } from '../store/permiss';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { SignUp } from "../api/index";
import { Lock, User } from '@element-plus/icons-vue';

interface SignUpInfo {
    username: string;
    password: string;
    password_extra: string;
}

const router = useRouter();
const param = reactive<SignUpInfo>({
    username: '柳非烟',
    password: '123',
    password_extra: '123'
});


//rules检验的prop名称必须和该输入框v-module绑定的param属性一致，否则会valid=null
const rules: FormRules = {
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
        }
    ],
    password_extra: [
        {
            required: true,
            message: "请再次输入密码",
            trigger: "blur"
        }
    ]
};
const permiss = usePermissStore();
const signup = ref<FormInstance>();
const checkPassword_to_finishSign = (formEl: FormInstance | undefined) => {
    if (param.password_extra != param.password) {
        ElMessage.error("两次密码不一致");
    } else {
        // param.password = paramExtra.password;
        // param.username = paramExtra.username;
        submitForm(formEl);
    }
}
const submitForm = (formEl: FormInstance | undefined) => {
    console.log(param)
    if (!formEl) {
        ElMessage.warning("null");
        return;
    }
    formEl.validate((valid: boolean) => {
        console.log(valid);
        if (valid) {

            SignUp(param).then((res) => {

                if (res.data.code == 200) {
                    //保存当前用户名
                    // localStorage.setItem("username", param.username);

                    //在session中储存token
                    // localStorage.setItem("token", res.data.data.token);

                    ElMessage.success(res.data.message + "正在返回登录页面");

                    router.push("/login");
                } else {
                    ElMessage.warning(res.data.message);
                }
            })
                .catch((res) => {
                    ElMessage.error("注册失败");
                });

            // ElMessage.success('登录成功');
            // localStorage.setItem('ms_username', param.username);
            // const keys = permiss.defaultList[param.username == 'admin' ? 'admin' : 'user'];
            // permiss.handleSet(keys);
            // localStorage.setItem('ms_keys', JSON.stringify(keys));
            // router.push('/');
        } else {
            ElMessage.error('error');
            return false;
        }
    });
};

const toLogin = () => {
    router.replace("/login");
};

const tags = useTagsStore();
tags.clearTags();
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login-bg.jpg);
    background-size: 100%;
}

.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}

.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}

.ms-content {
    padding: 30px 30px;
}

.login-btn {
    text-align: center;
}

.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}

.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
