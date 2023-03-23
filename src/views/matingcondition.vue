<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover" class="clearfix_">
                    <template #header>
                        <div class="clearfix">
                            <span>择偶条件</span>
                        </div>
                    </template>
                    <div class="info">
                        <div class="info-image">
                            <!-- <el-avatar :size="100" :src="avatarImg" /> -->
                            <el-image :src="resultsrc" />

                            <!-- <img src="http://127.0.0.1:5000/personal/imgget"> -->

                        </div>
                        <div class="info-name">{{ name }}</div>
                        <!-- <div class="info-desc">个人简介</div> -->
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <template #header>
                        <div class="clearfix">
                            <span>修改择偶条件</span>
                        </div>
                    </template>
                    <el-form label-width="auto" :model="matingcondition_form" :rules="select_rules" ref="ruleFormRef"
                        status-icon>
                        <el-form-item label="用户名："> {{ name }} </el-form-item>
                        <el-form-item label="性别：" prop="gender">
                            <el-select v-model="matingcondition_form.gender" clearable placeholder="性别">
                                <el-option v-for="item in options_gender" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="年龄：">
                            <el-input v-model="matingcondition_form.agefrom" :autosize="{ minRows: 1, maxRows: 1 }"
                                placeholder="请输入" />&nbsp;至&nbsp;
                            <el-input v-model="matingcondition_form.ageto" :autosize="{ minRows: 1, maxRows: 1 }"
                                placeholder="" />
                        </el-form-item>
                        <el-form-item label="身高：">
                            <el-input v-model="matingcondition_form.heightfrom" :autosize="{ minRows: 1, maxRows: 1 }"
                                placeholder="请输入" />&nbsp;至&nbsp;
                            <el-input v-model="matingcondition_form.heightto" :autosize="{ minRows: 1, maxRows: 1 }"
                                placeholder="" />
                        </el-form-item>
                        <el-form-item label="教育背景：" prop="edubackground">
                            <el-select v-model="matingcondition_form.edubackground" clearable placeholder="请输入">
                                <el-option v-for="item in options_edubackground" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="工作省份：" prop="workprovince">
                            <!-- 3.22改用el-cascader进行展示优化工作省份和籍贯 -->
                            <el-cascader v-model="matingcondition_form.workprovince" :options="options_workprovice"
                                :show-all-levels="false" :props="props" clearable placeholder="请输入"
                                @change="cascaderChangeW" />
                        </el-form-item>
                        <el-form-item label="籍贯：" prop="nativeprovince">
                            <el-cascader v-model="matingcondition_form.nativeprovince" :options="options_nativeprovice"
                                :show-all-levels="false" :props="props" clearable placeholder="请输入"
                                @change="cascaderChangeN" />
                        </el-form-item>
                        <el-form-item label="薪资水平：" prop="salary">
                            <el-select v-model="matingcondition_form.salary" clearable placeholder="请输入">
                                <el-option v-for="item in options_salary" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="婚姻状况：" prop="marital">
                            <el-select v-model="matingcondition_form.marital" clearable placeholder="请输入">
                                <el-option v-for="item in options_marital" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="民族：" prop="nationality">
                            <el-select v-model="matingcondition_form.nationality" clearable placeholder="请输入">
                                <el-option v-for="item in options_nationality" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="职业：" prop="occupation">
                            <el-select v-model="matingcondition_form.occupation" clearable placeholder="请输入">
                                <el-option v-for="item in options_occupation" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="住房情况：" prop="houseornot">
                            <el-select v-model="matingcondition_form.houseornot" clearable placeholder="请输入">
                                <el-option v-for="item in options_house" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="购车情况：" prop="carornot">
                            <el-select v-model="matingcondition_form.carornot" clearable placeholder="请输入">
                                <el-option v-for="item in options_car" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="饮酒喜好：" prop="drinkornot">
                            <el-select v-model="matingcondition_form.drinkornot" clearable placeholder="请输入">
                                <el-option v-for="item in options_drink" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <!-- ======================================================================================= -->
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit(ruleFormRef)">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts" name="user">
import { reactive, ref } from 'vue';
import { ImgGet, UpdateBaseInfo, GetBaseInfo, GetMatingCondition, UpdateMatingCondition } from '../api/index';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import avatar from '../assets/img/img.jpg';
import { ElMessage, FormInstance, FormRules, uploadBaseProps } from 'element-plus'

const headers = {
    token: localStorage.getItem("token")
};

const resultsrc = ref();
const name = localStorage.getItem('username');
const props = {
    expandTrigger: 'hover' as const,
}
const matingcondition_form = reactive({
    gender: '',
    agefrom: '',
    ageto: '',
    heightfrom: '',
    heightto: '',
    edubackground: '',
    workprovince: '',
    nativeprovince: '',
    salary: '',
    marital: '',
    nationality: '',
    occupation: '',
    houseornot: '',
    carornot: '',
    drinkornot: '',
});

// const baseinfo_request = reactive<any>({
//     gender: '',
//     age: '',
//     height: '',
//     edubackground: '',
//     workprovince: '',
//     nativeprovince: '',
//     salary: '',
//     marital: '',
//     nationality: '',
//     occupation: '',
//     houseornot: '',
//     carornot: '',
//     drinkornot: '',
// })

const options_gender = [
    {
        value: '男',
        label: '男',
    },
    {
        value: '女',
        label: '女',
    },
]
const options_edubackground = [
    {
        value: '高中中专及以下',
        label: '高中中专及以下',
    },
    {
        value: '大专',
        label: '大专',
    },
    {
        value: '本科',
        label: '本科',
    },
    {
        value: '硕士',
        label: '硕士',
    },
    {
        value: '博士',
        label: '博士',
    },
]
const options_workprovice = [
    {
        value: '直辖市',
        label: '直辖市',
        children: [
            {
                value: '北京',
                label: '北京',
            },
            {
                value: '天津',
                label: '天津',
            },
            {
                value: '上海',
                label: '上海',
            },
            {
                value: '重庆',
                label: '重庆',
            },
        ]
    },
    {
        value: '省份',
        label: '省份',
        children: [
            {
                value: '河北',
                label: '河北',
            },
            {
                value: '山西',
                label: '山西',
            },
            {
                value: '黑龙江',
                label: '黑龙江',
            },
            {
                value: '吉林',
                label: '吉林',
            },
            {
                value: '辽宁',
                label: '辽宁',
            },
            {
                value: '江苏',
                label: '江苏',
            },
            {
                value: '浙江',
                label: '浙江',
            },
            {
                value: '安徽',
                label: '安徽',
            },
            {
                value: '福建',
                label: '福建',
            },
            {
                value: '江西',
                label: '江西',
            },
            {
                value: '山东',
                label: '山东',
            },
            {
                value: '河南',
                label: '河南',
            },
            {
                value: '湖北',
                label: '湖北',
            },
            {
                value: '湖南',
                label: '湖南',
            },
            {
                value: '广东',
                label: '广东',
            },
            {
                value: '海南',
                label: '海南',
            },
            {
                value: '四川',
                label: '四川',
            },
            {
                value: '贵州',
                label: '贵州',
            },
            {
                value: '云南',
                label: '云南',
            },
            {
                value: '陕西',
                label: '陕西',
            },
            {
                value: '甘肃',
                label: '甘肃',
            },
            {
                value: '青海',
                label: '青海',
            },
            {
                value: '台湾',
                label: '台湾',
            },
        ]
    },
    {
        value: '自治区',
        label: '自治区',
        children: [
            {
                value: '内蒙古',
                label: '内蒙古',
            },
            {
                value: '广西',
                label: '广西',
            },
            {
                value: '西藏',
                label: '西藏',
            },
            {
                value: '宁夏',
                label: '宁夏',
            },
            {
                value: '新疆',
                label: '新疆',
            },
        ]
    },
    {
        value: '特别行政区',
        label: '特别行政区',
        children: [
            {
                value: '香港',
                label: '香港',
            },
            {
                value: '澳门',
                label: '澳门',
            },
        ]
    }

]
const options_nativeprovice = [
    {
        value: '直辖市',
        label: '直辖市',
        children: [
            {
                value: '北京',
                label: '北京',
            },
            {
                value: '天津',
                label: '天津',
            },
            {
                value: '上海',
                label: '上海',
            },
            {
                value: '重庆',
                label: '重庆',
            },
        ]
    },
    {
        value: '省份',
        label: '省份',
        children: [
            {
                value: '河北',
                label: '河北',
            },
            {
                value: '山西',
                label: '山西',
            },
            {
                value: '黑龙江',
                label: '黑龙江',
            },
            {
                value: '吉林',
                label: '吉林',
            },
            {
                value: '辽宁',
                label: '辽宁',
            },
            {
                value: '江苏',
                label: '江苏',
            },
            {
                value: '浙江',
                label: '浙江',
            },
            {
                value: '安徽',
                label: '安徽',
            },
            {
                value: '福建',
                label: '福建',
            },
            {
                value: '江西',
                label: '江西',
            },
            {
                value: '山东',
                label: '山东',
            },
            {
                value: '河南',
                label: '河南',
            },
            {
                value: '湖北',
                label: '湖北',
            },
            {
                value: '湖南',
                label: '湖南',
            },
            {
                value: '广东',
                label: '广东',
            },
            {
                value: '海南',
                label: '海南',
            },
            {
                value: '四川',
                label: '四川',
            },
            {
                value: '贵州',
                label: '贵州',
            },
            {
                value: '云南',
                label: '云南',
            },
            {
                value: '陕西',
                label: '陕西',
            },
            {
                value: '甘肃',
                label: '甘肃',
            },
            {
                value: '青海',
                label: '青海',
            },
            {
                value: '台湾',
                label: '台湾',
            },
        ]
    },
    {
        value: '自治区',
        label: '自治区',
        children: [
            {
                value: '内蒙古',
                label: '内蒙古',
            },
            {
                value: '广西',
                label: '广西',
            },
            {
                value: '西藏',
                label: '西藏',
            },
            {
                value: '宁夏',
                label: '宁夏',
            },
            {
                value: '新疆',
                label: '新疆',
            },
        ]
    },
    {
        value: '特别行政区',
        label: '特别行政区',
        children: [
            {
                value: '香港',
                label: '香港',
            },
            {
                value: '澳门',
                label: '澳门',
            },
        ]
    }

]
const options_salary = [
    {
        label: '2000-',
        value: '2000-',
    },
    {
        label: '2000-5000',
        value: '2000-5000',
    },
    {
        label: '5000-8000',
        value: '5000-8000',
    },
    {
        label: '8000-12000',
        value: '8000-12000',
    },
    {
        label: '12000-18000',
        value: '12000-18000',
    },
    {
        label: '18000-30000',
        value: '18000-30000',
    },
    {
        label: '30000+',
        value: '30000+',
    },

]
const options_marital = [
    {
        label: '未婚',
        value: '未婚',
    },
    {
        label: '离异',
        value: '离异',
    },
    {
        label: '丧偶',
        value: '丧偶',
    },
]
const options_nationality = [
    {
        label: '汉族',
        value: '汉族',
    },
    {
        label: '壮族',
        value: '壮族',
    },
    {
        label: '回族',
        value: '回族',
    },
    {
        label: '满族',
        value: '满族',
    },
    {
        label: '维吾尔族',
        value: '维吾尔族',
    },
    {
        label: '苗族',
        value: '苗族',
    },
    {
        label: '彝族',
        value: '彝族',
    },
    {
        label: '土家族',
        value: '土家族',
    },
    {
        label: '藏族',
        value: '藏族',
    },
    {
        label: '蒙古族',
        value: '蒙古族',
    },
    {
        label: '其他少数民族',
        value: '其他少数民族',
    },
]
const options_occupation = [
    {
        label: '计算机、互联网',
        value: '计算机、互联网',
    },
    {
        label: '通信、电信',
        value: '通信、电信',
    },
    {
        label: '电子、机械',
        value: '电子、机械',
    },
    {
        label: '金融服务',
        value: '金融服务',
    },
    {
        label: '投资、证券',
        value: '投资、证券',
    },
    {
        label: '贸易、进出口',
        value: '贸易、进出口',
    },
    {
        label: '食品、日用',
        value: '食品、日用',
    },
    {
        label: '服装、纺织',
        value: '服装、纺织',
    },
    {
        label: '家具、玩具',
        value: '家具、玩具',
    },
    {
        label: '医疗',
        value: '医疗',
    },
    {
        label: '广告、推广',
        value: '广告、推广',
    },
    {
        label: '影视、媒体',
        value: '影视、媒体',
    },
    {
        label: '房地产',
        value: '房地产',
    },
    {
        label: '法律、咨询',
        value: '法律、咨询',
    },
    {
        label: '教育、培训',
        value: '教育、培训',
    },
    {
        label: '学术、科研',
        value: '学术、科研',
    },
    {
        label: '酒店、餐饮',
        value: '酒店、餐饮',
    },
    {
        label: '娱乐、体育',
        value: '娱乐、体育',
    },
    {
        label: '旅游',
        value: '旅游',
    },
    {
        label: '美容、保健',
        value: '美容、保健',
    },
    {
        label: '农业',
        value: '农业',
    },
    {
        label: '政府、机关',
        value: '政府、机关',
    },
    {
        label: '其他行业',
        value: '其他行业',
    },
]
const options_house = [
    {
        label: '工作地有房',
        value: '工作地有房',
    },
    {
        label: '籍贯地有房',
        value: '籍贯地有房',
    },
    {
        label: '租房',
        value: '租房',
    },
    {
        label: '无房',
        value: '无房',
    },
]
const options_car = [
    {
        label: '有车',
        value: '有车',
    },
    {
        label: '无车',
        value: '无车',
    },
]
const options_drink = [
    {
        label: '每天都会喝酒',
        value: '每天都会喝酒',
    },
    {
        label: '社交需要',
        value: '社交需要',
    },
    {
        label: '从不喝酒',
        value: '从不喝酒',
    },
]

const select_rules = reactive<FormRules>({
    gender: [
        { required: true, message: '不能为空', trigger: 'blur' }
    ],
    // age: [
    //     { required: true, message: '不能为空', trigger: 'blur' }
    // ],
    // height: [
    //     { required: true, message: '不能为空', trigger: 'blur' }
    // ],
    edubackground: [
        { required: true, message: '不能为空', trigger: 'blur' }
    ],
    workprovince: [
        { required: true, message: '不能为空', trigger: 'blur' }
    ],
    nativeprovince: [
        { required: true, message: '不能为空', trigger: 'blur' }
    ],
    salary: [
        { required: true, message: '不能为空', trigger: 'blur' }
    ],
    marital: [
        { required: true, message: '不能为空', trigger: 'blur' }
    ],
    nationality: [
        { required: true, message: '不能为空', trigger: 'blur' }
    ],
    occupation: [
        { required: true, message: '不能为空', trigger: 'blur' }
    ],
    houseornot: [
        { required: true, message: '不能为空', trigger: 'blur' }
    ],
    carornot: [
        { required: true, message: '不能为空', trigger: 'blur' }
    ],
    drinkornot: [
        { required: true, message: '不能为空', trigger: 'blur' }
    ],
})

const ruleFormRef = ref<FormInstance>()

//获取cascade数组的第二个值
const cascaderChangeW = () => {
    matingcondition_form.workprovince = matingcondition_form.workprovince[1]
    console.log(matingcondition_form);
}

const cascaderChangeN = () => {
    matingcondition_form.nativeprovince = matingcondition_form.nativeprovince[1]
    console.log(matingcondition_form);
}

//上传age、height的range数据，到后端处理再进行处理
const onSubmit = async (formEl: FormInstance | undefined) => {
    // console.log("in");
    if (!formEl) return
    // console.log("in in");
    await formEl.validate((valid, fields) => {
        if (valid) {
            UpdateMatingCondition(matingcondition_form).then((res) => {
                if (res.data.code == 6200) {
                    ElMessage.success(res.data.message);
                } else {
                    ElMessage.warning(res.data.message);
                }
            })
        } else {
            ElMessage.error(fields);

        }
    })

};

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

//请求数据时的数据拆分
function getbaseinfo() {
    GetMatingCondition().then((res) => {
        if (res.data.code == 6200) {
            console.log(res.data)
            ElMessage.success(res.data.message);
            for (const key in matingcondition_form) {

                console.log(res.data.data[key])
                if (isValidKey(key, matingcondition_form)) {
                    matingcondition_form[key] = res.data.data[key]
                }
            }
        } else {
            ElMessage.warning(res.data.message);
        }
    })
}
//在加载页面时调用getimg更新用户头像
getimg()
//在加载页面时同时get用户基本信息
getbaseinfo()

</script>

<style scoped>
.el-input {
    width: 95px;
}

.clearfix {
    text-align: center;
    background: #e0eee8;
    border: 1px solid #e0eee8;
    padding: 0px;
    margin: 0px;
}

.clearfix_ {
    padding: 0px;
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
