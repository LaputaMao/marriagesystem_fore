<template>
	<div>
		<!-- 搜索框 -->
		<!-- gutter	栅格间隔 -->
		<!-- <el-form label-width="auto" :model="get_params" :rules="search_rule" ref="ruleFormRef_search"> -->
		<el-row :gutter="10" justify="center">
			<el-col :span="12">
				<!-- <el-form-item prop="search"> -->
				<el-input v-model="get_params.querystr" placeholder="Please input" clearable>
					<template #append>
						<el-button :icon="Search" @click="search_submit()" />
					</template>
				</el-input>
				<!-- </el-form-item> -->

			</el-col>
		</el-row>



		<!-- 搜索结果展示 -->
		<el-row :gutter="10">
			<el-col v-for="item in candidate_list.values" :key="item" :span="6" :offset="0">
				<!-- 向dialog中传输对应用户数据解决办法：将v-for中的item通过show_dialog()函数传入dialog_data中 -->
				<el-card shadow="hover" class="clearfix_" @click="show_dialog(item)">
					<div class="info-image">
						<!-- <el-avatar :size="100" :src="avatarImg" /> -->
						<el-image :src="item.image" />
					</div>
					<div style="padding: 11px">
						<span>{{ item.username }}</span>
						<div class="bottom">
							<time class="time">{{ item.gender }}&nbsp;{{ item.age }}岁<br />身高:{{ item.height }}</time>
							<!-- <el-button text class="button">Operating</el-button> -->
						</div>
					</div>
				</el-card>
				<!-- 将el-dialog写到v-for中只会使得dialog赋最后一次的值 -->
			</el-col>
		</el-row>

		<!-- 翻页 -->
		<el-row :gutter="10" justify="center">
			<!-- 上一页 -->
			<el-button @click="previous_page()" v-if="get_params.page != 1" style="display:block;margin:100 " type="danger"
				:icon="ArrowLeft" circle />
			<!-- 页数 -->
			<el-button style="display:block;margin:100 " type="danger" circle>{{ get_params.page }}/{{ pages
			}}</el-button>
			<!-- 下一页 -->
			<el-button @click="next_page()" v-if="get_params.page != parseInt(pages)" style="display:block;margin:100 "
				type="danger" :icon="ArrowRight" circle />
		</el-row>


		<el-dialog v-model="dialog_visible" title="详细信息" width="30%" destroy-on-close :show-close="false">
			<template #header>
				<div class="my-header">
					<!-- <el-icon class="el-icon--left">
						<CircleCloseFilled />
					</el-icon> -->
					<!-- <h3 class="titleClass">{{ dialog_data.value.username }}</h3> -->
					<div class="info-image">
						<el-image :src="dialog_data.value.image" />
					</div>
				</div>
			</template>

			<el-descriptions :column="1" size="large">
				<el-descriptions-item align="center">
					{{ dialog_data.value.username }}<br />{{ dialog_data.value.gender }}&nbsp;{{
						dialog_data.value.age }}岁&nbsp;{{ dialog_data.value.marital }}
				</el-descriptions-item>
				<el-descriptions-item label="籍贯">
					<el-tag size="large" effect="light">{{ dialog_data.value.nativeprovince }}</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="工作地">
					<el-tag size="large" type="success" effect="light">{{ dialog_data.value.workprovince }}</el-tag>
				</el-descriptions-item>
			</el-descriptions>
			<el-descriptions :column="2" size="large">
				<el-descriptions-item label="学历">
					{{ dialog_data.value.edubackground }}
				</el-descriptions-item>
				<el-descriptions-item label="身高">
					{{ dialog_data.value.height }}
				</el-descriptions-item>
				<el-descriptions-item label="职业">
					{{ dialog_data.value.occupation }}
				</el-descriptions-item>
				<el-descriptions-item label="月薪">
					{{ dialog_data.value.salary }}
				</el-descriptions-item>
				<el-descriptions-item label="住房">
					{{ dialog_data.value.houseornot }}
				</el-descriptions-item>
				<el-descriptions-item label="购车">
					{{ dialog_data.value.carornot }}
				</el-descriptions-item>
				<el-descriptions-item label="星座">
					{{ dialog_data.value.constellation }}
				</el-descriptions-item>
				<el-descriptions-item label="民族">
					{{ dialog_data.value.nationality }}
				</el-descriptions-item>
				<el-descriptions-item label="特长">
					{{ dialog_data.value.specialty }}
				</el-descriptions-item>
				<el-descriptions-item label="喜欢的书">
					{{ dialog_data.value.favorbook }}
				</el-descriptions-item>
				<el-descriptions-item label="喜欢的歌">
					{{ dialog_data.value.favorsong }}
				</el-descriptions-item>
				<el-descriptions-item label="喜欢的电影">
					{{ dialog_data.value.favormovie }}
				</el-descriptions-item>
			</el-descriptions>
			<el-descriptions :column="1" size="large" direction="vertical" border>
				<el-descriptions-item label-class-name="my-label" label="内心独白" label-align="center">
					{{ dialog_data.value.monologue }}
				</el-descriptions-item>
			</el-descriptions>
			<!-- <span>{{ dialog_data.value.gender }}</span><br />
			<span>{{ dialog_data.value.age }}</span><br />
			<span>{{ dialog_data.value.height }}</span><br />
			<span>{{ dialog_data.value.monologue }}</span><br /> -->
			<template #footer>
				<div class="dialog-footer">
					<!-- <el-button @click="dialog_visible = false">Cancel</el-button> -->
					<el-button @click="dialog_like" style="display:block;margin:0 auto" size="large" type="danger"
						:icon="Select" circle /><br />
					<el-button @click="dialog_dislike" style="display:block;margin:0 auto" size="large" type="info"
						:icon="CloseBold" circle />
					<!-- <el-button type="primary" @click="dialog_visible = false">
						Confirm
					</el-button> -->
				</div>
			</template>
		</el-dialog>
		<!-- </el-form> -->
	</div>
</template>

<script setup lang="ts" name="search">
import { ref, reactive, onMounted } from 'vue';
import {
	Search,
	Select,
	CloseBold,
	ArrowLeft,
	ArrowRight,
} from '@element-plus/icons-vue';
import { SearchByKeys } from '../api/index';
import { ElMessage, FormInstance, FormRules } from 'element-plus';

const input = ref('')
const pages = ref('')
const candidate_list = reactive<any>([])

const dialog_visible = ref(false)
const dialog_data = reactive<any>({})

const ruleFormRef_search = ref<FormInstance>()
const search_rule = reactive<FormRules>({
	search: [
		{ required: true, message: '不能为空', trigger: 'blur' }
	],
})

const dialog_like = () => {
	dialog_visible.value = false
	ElMessage.success("like")
}
const dialog_dislike = () => {
	dialog_visible.value = false
	ElMessage.warning("dislike")
}

const show_dialog = (_item: any) => {
	// dialog打印dialog_data的数据，每次点击动态更新
	dialog_data.value = _item
	// console.log(dialog_data.value)
	dialog_visible.value = true
}

const previous_page = () => {
	if (get_params.page != 1) {
		get_params.page = get_params.page - 1;
		ElMessage.success("上一页");
		search_submit();
	} else {
		ElMessage.warning("已经是第一页了");
	}
}

const next_page = () => {
	if (get_params.page != parseInt(pages.value)) {
		get_params.page = get_params.page + 1;
		ElMessage.success("下一页");
		search_submit();
	} else {
		ElMessage.warning("已经是最后一页了");
	}
}

const get_params = reactive({
	querystr: '',
	page: 1,
	per_page: '4',
})
const search_submit = () => {

	// console.log(get_params.querystr)
	// await formEl.validate((valid, field) => {

	// get_params.querystr = input.value
	// console.log(get_params.querystr)
	SearchByKeys(get_params).then((res) => {
		if (res.data.code == 6200) {
			// console.log(res.data)
			ElMessage.success(res.data.message);
			pages.value = res.data.pages;
			candidate_list.values = res.data.data;
		} else {
			ElMessage.warning(res.data.message);
		}
	})
	// 
}

</script>

<style>
.message-title {
	cursor: pointer;
}

.handle-row {
	margin-top: 30px;
}

.my-label {
	background: var(--el-color-success-light-9);
}

.titleclass {
	text-align: center;
	align-items: center;
}

.my-header {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	/* text-align: center;
	align-items: center; */
}

.el-card:hover {
	box-shadow: 0 10px 50px rgba(255, 142, 170, 0.932);
	border-color: #ffe9ba;
	transition: all 0.4s ease;
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
	background: #ffe9ec;
	border: 10px solid #fdeedf;
}

.time {
	font-size: 15px;
	color: #999;
}

.bottom {
	margin-top: 13px;
	line-height: 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.info-image {
	position: relative;
	margin: auto;
	width: 200px;
	height: 200px;
	background: #ffffff;
	border: 1px solid #ffffff;
	border-radius: 50px;
	overflow: visible;
}

.info-image:hover .info-edit {
	opacity: 1;
}

.el-row {
	margin-bottom: 20px;
}

.grid-content {
	display: flex;
	align-items: center;
	height: 100px;
}

.grid-cont-right {
	flex: 1;
	text-align: center;
	font-size: 14px;
	color: #999;
}

.grid-num {
	font-size: 30px;
	font-weight: bold;
}

.grid-con-icon {
	font-size: 50px;
	width: 100px;
	height: 100px;
	text-align: center;
	line-height: 100px;
	color: #fff;
}

.grid-con-1 .grid-con-icon {
	background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
	color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
	background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
	color: rgb(100, 213, 114);
}

.grid-con-3 .grid-con-icon {
	background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
	color: rgb(242, 94, 67);
}

.user-info {
	display: flex;
	align-items: center;
	padding-bottom: 20px;
	border-bottom: 2px solid #ccc;
	margin-bottom: 20px;
}

.user-info-cont {
	padding-left: 50px;
	flex: 1;
	font-size: 14px;
	color: #999;
}

.user-info-cont div:first-child {
	font-size: 30px;
	color: #222;
}

.user-info-list {
	font-size: 14px;
	color: #999;
	line-height: 25px;
}

.user-info-list span {
	margin-left: 70px;
}

.mgb20 {
	margin-bottom: 20px;
}

.todo-item {
	font-size: 14px;
}

.todo-item-del {
	text-decoration: line-through;
	color: #999;
}

.schart {
	width: 100%;
	height: 300px;
}
</style>
