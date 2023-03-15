<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">婚恋匹配系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <!-- <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <template #prepend>
                            <el-button icon="el-icon-user"></el-button>
                        </template>
                    </el-input>
                </el-form-item> -->
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <template #prepend>
                            <el-button icon="el-icon-user"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="param.password" @keyup.enter="submitForm()">
                        <template #prepend>
                            <el-button icon="el-icon-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <div class="login-btn">
                    <el-button type="primary" @click="toSign()">注册</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { onMounted } from "vue"
import { Login } from "../api/index";

export default {
    setup() {
        const router = useRouter();
        const param = reactive({
            username: "",
            password: "",
        });

        const rules = {
            username: [
                {
                    required: true,
                    message: "请输入用户名",
                    trigger: "blur",
                },
            ],
            password: [
                { required: true, message: "请输入密码", trigger: "blur" },
            ],
        };
        const login = ref(null);
        const submitForm = () => {
            login.value.validate((valid) => {
                if (valid) {

                    _Login();
                } else {
                    return false;
                }
            });
        };

        const store = useStore();
        store.commit("clearTags");

        const toSign = () => {
            router.replace("/signup");
        };

        const _Login = () => {
            // console.log(form)
            Login(param).then((res) => {
                console.log(res)
                if (res.code == 200) {
                    //保存当前用户名
                    localStorage.setItem("username", param.username);

                    // console.log(res);

                    //在session中储存token
                    localStorage.setItem("token", res.data.token);

                    ElMessage.success(res.message);

                    //登录成功后转到推荐页面
                    router.push("/recommend");
                } else if (res.code == 501) {
                    ElMessage.warning("密码错误");
                } else if (res.code == 502) {
                    ElMessage.error("用户不存在")

                }
            })
                .catch((res) => {
                    ElMessage.error("登录失败");
                });
        };

        return {
            param,
            // form,
            rules,
            login,
            submitForm,
            toSign
        };


    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/gym.png);
    background-size: 100%;
}

.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #000;
    /* color: #fff; */
    border-bottom: 1px solid #ddd;
}

.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.7);
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