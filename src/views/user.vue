<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-card shadow="hover">
					<template #header>
						<div class="clearfix">
							<span>基础信息</span>
						</div>
					</template>
					<div class="info">
						<div class="info-image" @click="showDialog">
							<!-- <el-avatar :size="100" :src="avatarImg" /> -->
							<el-image :src="resultsrc" />
						
							<!-- <img src="http://127.0.0.1:5000/personal/imgget"> -->
							
						</div>
						<div class="info-name">{{ name }}</div>
						<div class="info-desc">个人简介</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card shadow="hover">
					<template #header>
						<div class="clearfix">
							<span>账户编辑</span>
						</div>
					</template>
					<el-form label-width="90px">
						<el-form-item label="用户名："> {{ name }} </el-form-item>
						<el-form-item label="旧密码：">
							<el-input type="password" v-model="form.old"></el-input>
						</el-form-item>
						<el-form-item label="新密码：">
							<el-input type="password" v-model="form.new"></el-input>
						</el-form-item>
						<el-form-item label="个人简介：">
							<el-input v-model="form.desc"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="onSubmit">保存</el-button>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
		<el-dialog title="选择图片" v-model="dialogVisible" width="600px">
			<!-- <vue-cropper ref="cropper" :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage"
				style="width: 100%; height: 400px"></vue-cropper>

			<template #footer>
				<span class="dialog-footer">
					<el-button class="crop-demo-btn" type="primary">选择图片
						<input class="crop-input" type="file" name="image" accept="image/*" @change="setImage" />
					</el-button>
					<el-button type="primary" @click="saveAvatar">上传并保存</el-button>
				</span>
			</template> -->
			<el-upload class="upload-demo" drag :headers="headers" action="http://127.0.0.1:5000/personal/imgupload"
				:on-success="handle">
				<el-icon class="el-icon--upload"><upload-filled /></el-icon>
				<div class="el-upload__text">
					将文件拖到此处，或
					<em>点击上传</em>
				</div>
			</el-upload>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="user">
import { reactive, ref } from 'vue';
import { ImgUpload, ImgGet } from '../api/index';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import avatar from '../assets/img/img.jpg';

const handle = () => {
	// console.log(uploadFile.raw);
	console.log("out")
	getimg()
};
const headers = {
	token: localStorage.getItem("token")
};
//ref实现双向数据绑定，更新resultsrc.value=
const resultsrc = ref();
// const binaryData: any = [];
// let resvisible = false;
const name = localStorage.getItem('username');
const form = reactive({
	old: '',
	new: '',
	desc: '个人简介'
});
const onSubmit = () => { };

const avatarImg = ref(avatar);
const imgSrc = ref('');
const cropImg = ref('');
const dialogVisible = ref(false);
const cropper: any = ref();

const showDialog = () => {
	dialogVisible.value = true;
	imgSrc.value = avatarImg.value;
};

// const setImage = (e: any) => {
// 	const file = e.target.files[0];
// 	if (!file.type.includes('image/')) {
// 		return;
// 	}
// 	const reader = new FileReader();
// 	reader.onload = (event: any) => {
// 		dialogVisible.value = true;
// 		imgSrc.value = event.target.result;
// 		cropper.value && cropper.value.replace(event.target.result);
// 	};
// 	reader.readAsDataURL(file);
// };

// const cropImage = () => {
// 	cropImg.value = cropper.value.getCroppedCanvas().toDataURL();
// };

// const saveAvatar = () => {
// 	avatarImg.value = cropImg.value;
// 	dialogVisible.value = false;
// 	console.log(avatarImg.value)
// 	ImgUpload(avatarImg).then((res) => {
// 		console.log(res)
// 	})
// };


function getimg() {
	ImgGet().then((res) => {
		// console.log("in")
		// console.log(res.data)
		// avatarImg.value = res.data
		dialogVisible.value = false;
		// const _resultsrc = window.URL.createObjectURL(res.data);
		// binaryData.push(res.data)
		// resultsrc = window.URL.createObjectURL(new Blob(binaryData, { type: 'image/png' }))
		// resultsrc = window.URL.createObjectURL(res.data);
		resultsrc.value = "http://127.0.0.1:5000/personal/imgget?username=" + name
		// console.log(resultsrc.value)
		// resvisible = true;
	})
}

getimg()


</script>

<style scoped>
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
