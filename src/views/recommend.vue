<template>
	<div>
		<el-row :gutter="10">
			<el-col v-for="item in candidate_list.values" :key="item" :span="6" :offset="0">
				<el-card shadow="hover" class="clearfix_" @click="show_dialog">
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
		<el-dialog v-model="dialog_visible" title="Tips" width="30%" :before-close="handle_close">
			<span>This is a message</span>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialog_visible = false">Cancel</el-button>
					<el-button type="primary" @click="dialog_visible = false">
						Confirm
					</el-button>
				</span>
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

const show_dialog = () => {
	dialog_visible.value = true
}
const handle_close = () => {
	// 关闭对话框钩子
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
