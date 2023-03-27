<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form label-width="auto" :model="displayinfo_form" :rules="monologue_rule" ref="ruleFormRef_monologue"
                    status-icon>
                    <el-card shadow="hover" class="fixable_card">
                        <template #header>
                            <div class="clearfix">
                                <span>详细信息</span>
                            </div>
                        </template>
                        <div class="info">
                            <div class="info-image">
                                <el-image :src="resultsrc" />
                            </div>
                            <div class="info-name">{{ name }}</div>
                        </div>
                        <div class="clearfix_">
                            <span>内心独白</span>
                            <div class="clearfix_in_">
                                <el-form-item prop="monologue">
                                    <el-input v-model="displayinfo_form.monologue" :autosize="{ minRows: 8, maxRows: 15 }"
                                        type="textarea" placeholder="" />
                                </el-form-item>
                            </div>
                        </div>
                    </el-card>
                </el-form>
            </el-col>
            <el-col :span="12">
                <el-form label-width="auto" :model="displayinfo_form" :rules="others_rule" ref="ruleFormRef_others"
                    status-icon>
                    <el-card shadow="hover" class="fixable_card">
                        <template #header>
                            <div class="clearfix">
                                <span>信息修改</span>
                            </div>
                        </template>
                        <el-form-item label="星座：" prop="constellation">
                            <el-input v-model="displayinfo_form.constellation" :autosize="{ minRows: 1, maxRows: 1 }"
                                placeholder="" />
                        </el-form-item>
                        <el-form-item label="喜欢的书：" prop="favorbook">
                            <el-input v-model="displayinfo_form.favorbook" :autosize="{ minRows: 2, maxRows: 5 }"
                                type="textarea" placeholder="" />
                        </el-form-item>
                        <el-form-item label="喜欢的歌曲：" prop="favorsong">
                            <el-input v-model="displayinfo_form.favorsong" :autosize="{ minRows: 2, maxRows: 5 }"
                                type="textarea" placeholder="" />
                        </el-form-item>
                        <el-form-item label="喜欢的电影：" prop="favormovie">
                            <el-input v-model="displayinfo_form.favormovie" :autosize="{ minRows: 2, maxRows: 5 }"
                                type="textarea" placeholder="" />
                        </el-form-item>
                        <el-form-item label="电话：" prop="tel">
                            <el-input v-model="displayinfo_form.tel" :autosize="{ minRows: 1, maxRows: 1 }"
                                placeholder="" />
                        </el-form-item>
                        <el-form-item label="爱好：" prop="specialty">
                            <el-input v-model="displayinfo_form.specialty" :autosize="{ minRows: 5, maxRows: 10 }"
                                type="textarea" placeholder="" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary"
                                @click="onSubmit(ruleFormRef_others, ruleFormRef_monologue)">提交</el-button>
                        </el-form-item>
                    </el-card>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts" name="user">
import { reactive, ref } from 'vue';
import { ImgGet, UpdateDisplayInfo, GetDisplayInfo } from '../api/index';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import avatar from '../assets/img/img.jpg';
import { ElMessage, FormInstance, FormRules, uploadBaseProps } from 'element-plus'
import { async } from 'q';

const resultsrc = ref();
const name = localStorage.getItem('username');

const ruleFormRef_monologue = ref<FormInstance>()
const ruleFormRef_others = ref<FormInstance>()

const displayinfo_form = reactive({
    constellation: '',
    favorbook: '',
    favorsong: '',
    favormovie: '',
    monologue: '',
    tel: '',
    specialty: '',
})

const monologue_rule = reactive<FormRules>({
    monologue: [
        { required: true, message: '不能为空', trigger: 'blur' }
    ],
})
const others_rule = reactive<FormRules>({
    constellation: [
        { required: true, message: '不能为空', trigger: 'blur' }
    ],
    favorbook: [
        { required: true, message: '不能为空', trigger: 'blur' }
    ],
    favorsong: [
        { required: true, message: '不能为空', trigger: 'blur' }
    ],
    favormovie: [
        { required: true, message: '不能为空', trigger: 'blur' }
    ],
    tel: [
        { required: true, message: '不能为空', trigger: 'blur' }
    ],
    specialty: [
        { required: true, message: '不能为空', trigger: 'blur' }
    ],
})

//双表联合验证
const onSubmit = async (formElO: FormInstance | undefined, formElM: FormInstance | undefined) => {
    if (!formElO || !formElM) {
        ElMessage.warning("请填写完整信息")
        return
    }
    await formElO.validate((valid, field) => {
        formElM.validate((_valid, field_) => {
            if (_valid && valid) {
                // console.log(displayinfo_form)
                UpdateDisplayInfo(displayinfo_form).then((res) => {
                    if (res.data.code == 6200) {
                        ElMessage.success(res.data.message)
                    } else {
                        ElMessage.warning(res.data.message);
                    }
                })
            } else {
                ElMessage.error(field);
            }
        })
    })
}

function isValidKey(
    key: string | number | symbol,
    object: object
): key is keyof typeof object {
    return key in object;
}

function getimg() {
    ImgGet().then((res) => {
        resultsrc.value = "http://127.0.0.1:5000/personal/imgget?username=" + name
    })
}
function getdisplayinfo() {
    GetDisplayInfo().then((res) => {
        if (res.data.code == 6200) {
            ElMessage.success(res.data.message);
            for (const key in displayinfo_form) {
                if (isValidKey(key, displayinfo_form)) {
                    displayinfo_form[key] = res.data.data[key]
                }
            }
        } else {
            ElMessage.warning(res.data.message);
        }

    })
}
getimg()
getdisplayinfo()
</script>
    


<style scoped>
.fixable_card {
    height: 600px;
}

.clearfix {
    text-align: center;
    background: #e0eee8;
    border: 1px solid #e0eee8;
    padding: 0px;
    margin: 0px;
}

.clearfix_ {
    text-align: center;
    background: #f8e4ff;
    border: 1px solid #e0eee8;
    padding: 0px;
    margin: 0px;
    height: 40px;
}

.clearfix_in_ {
    text-align: center;
    background: #fcddfc;
    /* border: 1px solid #e0eee8; */
    padding: 0px;
    margin: 0px;
    height: 40px;
}

::v-deep(.el-textarea.el-textarea__inner) {
    background: #fcddfc;
    /* border: 1px solid #e0eee8; */
}

.info {
    text-align: center;
    padding: 35px 0;
}

.info-image {
    position: relative;
    margin: auto;
    width: 100px;
    height: 100px;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 50px;
    overflow: hidden;
}

.info-edit {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.info-edit i {
    color: #eee;
    font-size: 25px;
}

.info-image:hover .info-edit {
    opacity: 1;
}

.info-name {
    margin: 15px 0 10px;
    font-size: 24px;
    font-weight: 500;
    color: #262626;
}

.crop-demo-btn {
    position: relative;
}

.crop-input {
    position: absolute;
    width: 100px;
    height: 40px;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
}
</style>