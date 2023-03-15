<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">婚恋匹配系统</div>
            <el-form :model="param" :rules="rules" ref="signup" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <template #prepend>
                            <el-button icon="el-icon-phone"></el-button>
                        </template>
                    </el-input>
                </el-form-item>

                <!-- <div class="login-btn">
                    <el-button type="primary" @click="_Verified()">获取验证码</el-button>
                </div> -->

                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="param.password">
                        <template #prepend>
                            <el-button icon="el-icon-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="repassword">
                    <el-input type="password" placeholder="repassword" v-model="param.password_extra">
                        <template #prepend>
                            <el-button icon="el-icon-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>

                <!-- <el-form-item prop="code">
                    <el-input v-model="param.code" placeholder="验证码">
                        <template #prepend>
                            <el-button icon="el-icon-user"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="identity">
                    <el-input v-model="param.identity" placeholder="identity">
                        <template #prepend>
                            <el-button icon="el-icon-user"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="city">
                    <el-input v-model="param.city" placeholder="city">
                        <template #prepend>
                            <el-button icon="el-icon-user"></el-button>
                        </template>
                    </el-input>
                </el-form-item> -->


                <div class="login-btn">
                    <el-button type="primary" @click="checkPassword_to_finishSign()">注册</el-button>
                </div>
                <div class="login-btn">
                    <el-button type="primary" @click="toLogin()">返回登录</el-button>
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
import { SignUp } from "../api/index";

export default {
    setup() {
        const router = useRouter();
        const param = reactive({
            username: "",
            password: "",
            password_extra: "",

        });
        // const paramExtra = reactive({
        //     username: "",
        //     password: "",
        //     password_extra: "",
        // })

        const rules = {
            username: [
                {
                    required: true,
                    message: "请输入用户名",
                    trigger: "blur",
                },
            ],
            password: [
                {
                    required: true,
                    message: "请输入密码",
                    trigger: "blur"
                },
            ],
            repassword: [
                {
                    required: true,
                    message: "请再次输入密码",
                    trigger: "blur"
                }
            ]
        };
        const signup = ref(null);

        //校验两次输入密码是否一致
        const checkPassword_to_finishSign = () => {
            if (param.password_extra != param.password) {
                ElMessage.error("两次密码不一致");
            } else {
                // param.password = paramExtra.password;
                // param.username = paramExtra.username;
                finishSign();
            }
        }

        //调用_SignUP方法进行注册
        const finishSign = () => {
            console.log(param)
            signup.value.validate((valid) => {
                if (valid) {
                    // localStorage.setItem("username", param.username);
                    _SignUp();
                } else {
                    return false;
                }
            });
        };

        const store = useStore();
        store.commit("clearTags");

        // -----本系统无获取验证码相关功能
        // const _Verified = () => {
        //     console.log("获取验证码");
        //     const _phone = param.phone;
        //     Verified(_phone).then((res) => {
        //         console.log(res)
        //         if (res.code == 200) {
        //             ElMessage.success("获取成功");
        //         } else {
        //             ElMessage.warning("检查电话");
        //         }
        //     })
        //         .catch((res) => {
        //             ElMessage.error("获取失败");
        //         });
        // }

        const _SignUp = () => {
            // console.log("sign");
            SignUp(param).then((res) => {
                console.log(res)

                if (res.code == 200) {
                    ElMessage.success(res.message + "正在返回登录页面");

                    //注册成功后跳转回登录页面
                    router.push("/login");
                } else {
                    ElMessage.warning(res.message);
                }
            })
                .catch((res) => {
                    ElMessage.error("注册失败");
                });
        };

        const toLogin = () => {
            router.push("/login");
        }

        return {
            param,
            rules,
            signup,
            toLogin,
            finishSign,
            // paramExtra,
            checkPassword_to_finishSign,
            // _Verified,
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