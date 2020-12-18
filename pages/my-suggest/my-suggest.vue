<template>
	<view class="suggest">
		<view class="title">
			意见反馈:
		</view>
		<view class="content">
			<textarea v-model="value" placeholder="请输入你要反馈的内容" />
		</view>
		<view class="title">
			反馈图片:
		</view>
		<view class="image-box">
			<view class="image-item" v-for="(item,index) in imgList" :key="index"> 
				<view class="clear" @click="del(index)"> 
					<uni-icons type="closeempty" size="18" color="#fff"></uni-icons>
				</view>
				<view class="image">
					<image :src="item.url" mode="aspectFill"></image>
				</view>
			</view>
			
			<view class="image-item" @click="addImg" v-if="imgList.length < count">
				<view class="image">
					<uni-icons type="plusempty" color="#eee" size="50"></uni-icons>
				</view>
			</view>
		</view>
		<button type="default" @click="submit">提交反馈意见</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: [],
				count:5,
				value:""
			}
		},
		methods:{
		
			addImg() {
					let count = this.count - this.imgList.length
				uni.chooseImage({
					count:count,
					success: (res)=> {
						const tempfilpaths = res.tempFilePaths
						tempfilpaths.forEach((item,index) => {
							if(index < count) {
								this.imgList.push({
									url:item,
									name: res.tempFiles[index].name
								})
							}
						})
					}
				})
			},
			del(index) {
				this.imgList.splice(index,1)
			},
			async submit() {
				uni.showLoading()
				let images= []
				console.log(this.imgList);
				for(let i= 0; i< this.imgList.length;i++) {
					
					let filePath1 = await this.uploadFilds(this.imgList[i].url,this.imgList[i].name)
					images.push(filePath1)
	
				}
				this.$api.update_suggest({user_id: "5fcae2c5107b2c0001acd1a6",content: this.value,filePaths:images}).then((res) => {
				uni.hideLoading()
				uni.showToast({
					title:"提交意见成功"
				})
				setTimeout(() => {
					uni.switchTab({
						url:"../tabbar/my/my"
					})
				},2000)
				console.log(res);
				}).catch(() => {
					uni.hideLoading()
					uni.showToast({
						title:"提交意见失败"
					})
				})
				
				console.log(images);
			},
			async uploadFilds(filePath,fileName) {
				const result = await uniCloud.uploadFile({
					filePath:filePath,
					cloudPath:fileName
				})
				return result.fileID

			}
		
		}
	}
</script>

<style lang="stylus">
.suggest
	padding 0 15px
	.title
		font-size 14px
		margin 15px 0
	.content
		border 1px #eee solid
		padding 10px
		textarea
			width 100%
			font-size 12px
	.image-box
		display flex
		flex-wrap wrap
		
		.image-item
			margin-right 5px
			margin-bottom 5px
			width 30%
			height 0
			padding-top 30%
			position relative
			border 1px solid #EEEEEE
			border-radius 2px
			.clear
				position absolute
				right 0
				top 0 
				width 22px
				height 22px
				background-color #F07373
				z-index 2
				border-radius 50%
				display flex
				justify-content center
				align-items center
			.image
				position absolute
				top 5px
				bottom 5px
				left 5px
				right 5px
				display  flex
				align-items center
				justify-content center

				image
					height 100%
					width 100%
	button
		margin-top 14px
		width 100%
		color #F5F5F5
		background-color #F07373
		font-size 15px
		padding 3px 0
		
</style>
