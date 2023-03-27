<template>
	<div>
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
				<!-- <el-dialog v-model="dialog_visible" :title="item.username" width="30%" :before-close="handle_close"
					destroy-on-close>
					<span>{{}}</span>
					<template #footer>
						<span class="dialog-footer">
							<el-button @click="dialog_visible = false">Cancel</el-button>
							<el-button type="primary" @click="dialog_visible = false">
								Confirm
							</el-button>
						</span>
					</template>
				</el-dialog> -->
			</el-col>
			<el-col :span="8">
				<!-- <el-card shadow="hover" class="clearfix_">
				</el-card> -->
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="12">
				<!-- <el-card shadow="hover" class="clearfix_">
				</el-card> -->
			</el-col>
		</el-row>
		<!--dialog展示候选者其余数据 -->
		<!-- dialog.username是没有数据的，reactive类型需要用dialog.value.username进行访问 -->
		<el-dialog v-model="dialog_visible" title="详细信息" width="30%" destroy-on-close :show-close="false" >
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
	</div>
</template>

<script setup lang="ts" name="recommend">
import Schart from 'vue-schart';
import { reactive, ref } from 'vue';
import imgurl from '../assets/img/img.jpg';
import { ImgGet, RecommendByUserCondition } from '../api/index';
import { ElMessage } from 'element-plus';
import {
	Select,
	CloseBold,
} from '@element-plus/icons-vue'


const name = localStorage.getItem('username');
const test = [{
	name: '111',
	age: '111'
}, {
	name: '2222',
	age: '22'
}, {
	name: '33',
	age: '33'
}, {
	name: '44',
	age: '44'
}, {
	name: '111',
	age: '111'
}, {
	name: '2222',
	age: '22'
}, {
	name: '33',
	age: '33'
}, {
	name: '44',
	age: '44'
},]

const params_get = {
	page: '1',
	per_page: '8',
}
const pages = ref('')
const candidate_list = reactive<any>([])
const dialog_visible = ref(false)
const dialog_data = reactive<any>({})
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
const handle_close = () => {
	// 关闭对话框钩子
	dialog_visible.value = false
}

function getrecommend() {
	RecommendByUserCondition(params_get).then((res) => {
		if (res.data.code == 6200) {
			// console.log(res)
			ElMessage.success(res.data.message);
			pages.value = res.data.pages;
			candidate_list.values = res.data.data
			// candidate_list.values接收数据
			// 该数据为全部数据
			// console.log(candidate_list.values);
		} else {
			ElMessage.warning(res.data.message);
		}
	})
}
getrecommend()

// const options = {
// 	type: 'bar',
// 	title: {
// 		text: '最近一周各品类销售图'
// 	},
// 	xRorate: 25,
// 	labels: ['周一', '周二', '周三', '周四', '周五'],
// 	datasets: [
// 		{
// 			label: '家电',
// 			data: [234, 278, 270, 190, 230]
// 		},
// 		{
// 			label: '百货',
// 			data: [164, 178, 190, 135, 160]
// 		},
// 		{
// 			label: '食品',
// 			data: [144, 198, 150, 235, 120]
// 		}
// 	]
// };
// const options2 = {
// 	type: 'line',
// 	title: {
// 		text: '最近几个月各品类销售趋势图'
// 	},
// 	labels: ['6月', '7月', '8月', '9月', '10月'],
// 	datasets: [
// 		{
// 			label: '家电',
// 			data: [234, 278, 270, 190, 230]
// 		},
// 		{
// 			label: '百货',
// 			data: [164, 178, 150, 135, 160]
// 		},
// 		{
// 			label: '食品',
// 			data: [74, 118, 200, 235, 90]
// 		}
// 	]
// };
// const todoList = reactive([
// 	{
// 		title: '今天要修复100个bug',
// 		status: false
// 	},
// 	{
// 		title: '今天要修复100个bug',
// 		status: false
// 	},
// 	{
// 		title: '今天要写100行代码加几个bug吧',
// 		status: false
// 	},
// 	{
// 		title: '今天要修复100个bug',
// 		status: false
// 	},
// 	{
// 		title: '今天要修复100个bug',
// 		status: true
// 	},
// 	{
// 		title: '今天要写100行代码加几个bug吧',
// 		status: true
// 	}
// ]);
</script>

<style scoped>
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
