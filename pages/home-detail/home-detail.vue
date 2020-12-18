<template>
	<view class="detail">
		<view class="detail-title">
			{{formData.title}}
		</view>
		<view class="detail-header">
			<view class="avatar">
				<image :src="formData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="content">
				<view class="content-title">
					{{formData.author.author_name}}
				</view>
				<view class="content-info">
					<text>{{formData.create_time}}</text>
					<text>{{formData.browse_count}}</text>
					<text>{{formData.thumbs_up_count}}</text>
				</view>
			</view>
			<button type="default" class="header-button" @click="follow(formData.author.id)">{{formData.is_author_like?'取消关注':'关注'}}</button>
		</view>
		<view class="detail-content">
			<view class="html">
				<parser :content="formData.content" :noData="noData"></parser>
			</view>
			<view class="comment">
				<view class="comment-title">
					最新评论
				</view>
				<view class="comment-content" v-for="item in commentsList" :key="item.comment_id"> 
					<comments-box :comments="item" @reply="reply"></comments-box>
				</view>
			</view>
		</view>
		<view class="detail-bottom">
			<view class="bottom-input" @click="openComment"> 
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#f07373" ></uni-icons>
			</view>
			<view class="bottom-icons">
				<view class="icon-box" @click="toComments">
					<uni-icons type="chat" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="icon-box" @click="like">
					<uni-icons :type="formData.is_like?'heart-filled':'heart'" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="icon-box" @click="thumbsup">
					<uni-icons :type="formData.is_thumbs_up?'hand-thumbsup-filled':'hand-thumbsup' " size="22" color="#f07373"></uni-icons>
				</view>
			</view>
			
		</view>
		<release ref="popup" @submit="submit"></release>
	</view>
</template>

<script>
	import parser from "@/components/gaoyia-parse/parse.vue"
	export default{
		components:{
			parser
		},
		data() {
			return {
				formData:{},
				replyFormData: {},
				noData:'<p style="text-align:center;color:#666">详情加载中...</p>',
				commentsList: []
			}
		},
		onLoad(query) {
			this.formData = JSON.parse(query.params)
			this.getDetail()
			this.getComments()
		},
		methods:{
			toComments(){
				uni.navigateTo({
				url:'../detail-comments/detail-comments?id='+this.formData._id
				})
			},
			thumbsup() {
				this.updateThumbsup(this.formData._id)
			},
			like() {
				this.updateLike(this.formData._id)
			},
			follow(author_id) {
				this.updateAuthor(author_id)
			},
			close() {
				this.$refs.popup.close()
			},
			submit(content) {
				console.log(this.replyFormData.comment_id);
				console.log(content)
				this.updatecomment({content,...this.replyFormData})
			},
			reply(e) {
				this.$refs.popup.open()
				this.replyFormData= {
					comment_id: e.comment_id
				}
			},
			getComments() {
				this.$api.get_comments({
					article_id:this.formData._id
				}).then((res) => {
					this.commentsList = res.data
					console.log(this.commentsList);
				})
				
			},
			updateThumbsup(article_id) {
				uni.showLoading()
								this.$api.update_thumbsup({
									user_id:"5fcae2c5107b2c0001acd1a6",
									article_id
								}).then(res=>{
									uni.hideLoading()
									this.formData.is_thumbs_up = true
									this.formData.thumbs_up_count++
									uni.showToast({
										title:res.msg
									})
								})
			},
			updateAuthor(author_id) {
				
				uni.showLoading()
				this.$api.update_author({author_id,user_id:"5fcae2c5107b2c0001acd1a6"}).then((res) => {
					this.formData.is_author_like = !this.formData.is_author_like
					uni.hideLoading()
					uni.showToast({
						title: this.formData.is_author_like ? '关注作者成功' : '取消关注',
						icon:'none'
					})
				})
			},
			updatecomment(content) {
				console.log(content);
				const formdata ={
								user_id:"5fcae2c5107b2c0001acd1a6",
									article_id:this.formData._id,
									...content
								}
								// console.log(formdata);
								uni.showLoading()
								this.$api.update_comment(formdata).then((res)=>{
									console.log(res);
									uni.hideLoading()
									uni.showToast({
										title:'评论发布成功'
									})
									this.getComments()
									this.close()
									this.replyFormData = {}
								})
			},
			updateLike(article_id) {
				uni.showLoading()
				this.$api.updata_like({article_id,user_id:"5fcae2c5107b2c0001acd1a6"}).then((res) => {
					uni.hideLoading()
					uni.$emit('update_article')
					this.formData.is_like =!this.formData.is_like
					uni.showToast({
						title:this.formData.is_like ? '收藏成功': '取消收藏',
						icon:'none'
						
					})
				})
			},
			getDetail() {
				this.$api.get_detail({user_id:"5fcae2c5107b2c0001acd1a6",
				article_id: this.formData._id}).then((res)=> {
					this.formData = res.data[0]
				})
			},
			openComment() {
				this.$refs.popup.open()
				console.log(2);
			}
		}
	}
</script>

<style lang="stylus">
.detail
	padding 15px 0
	padding-bottom 54px
	.detail-title
		padding 0 15px
		font-size 18px
		font-weight bold
		color #333333
	.detail-header
		display flex
		align-items center
		margin-top 10px
		padding 0 15px
		.avatar
			flex-shrink 0
			width 40px
			height 40px
			border-radius 50%
			overflow hidden
			image
				width 100%
				height 100%
		.content
			width 100%
			display flex
			flex-direction column
			padding-left 10px
			justify-content space-between
			font-size 12px
			.content-title
				font-size 14px
				color #333333
			.content-info
				color #999999
				text
					margin-right  10px
		.header-button
			height 30px
			font-size 12px
			color #FFFFFF
			background-color #f07373
			flex-shrink 0
	.detail-content
		margin-top 20px
		.html
			padding 0 15px
		.comment
			margin-top 30px
			.comment-title
				padding 10px 15px
				font-size 14px
				color #666666
				border-bottom 1px solid #f5f5ff
			.comment-content
				padding 0 15px
				border-top 1px #eee solid
	.detail-bottom
		position fixed
		bottom 0
		left 0
		right 0
		height 44px
		display flex
		align-items center
		border-top 1px #F5F5F5 solid
		background-color #FFFFFF
		.bottom-input
			display flex
			justify-content space-between
			align-items center
			height 30px
			border 1px #DDDDDD solid
			border-radius 5px
			margin-left 10px
			padding 0 10px
			width 100%
			text
				font-size 14px
				color #999999
		.bottom-icons
			display flex
			padding 0 10px
			.icon-box
				text-align center
				width 44px
</style>
