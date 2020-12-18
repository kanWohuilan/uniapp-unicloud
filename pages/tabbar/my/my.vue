<template>
	<view class="my">
		<view class="my-header">
			<view class="backgroud">
				<image src="../../../static/follow-active.png" mode="aspectFill"></image>
			</view>
			<view class="logo">
				<view class="logo-box">
					<image src="../../../static/follow-active.png" mode="aspectFill"></image>
				</view>
				<text class="name"></text>
			</view>
			<view class="info">
				<view class="info-box">
					<text class="title">被关注</text>
					<text>1234</text>
				</view>
				<view class="info-box">
					<text class="title">被关注</text>
					<text>1234</text>
				</view>
				<view class="info-box">
					<text class="title">被关注</text>
					<text>1234</text>
				</view>
			</view>
			
		</view>
		<view class="content">
			<view class="list" @click="openMyArticle">
				<view class="title">
					<uni-icons type="contact" size="20" color="#666"></uni-icons>
					<text class="text">我的文章</text>
				</view>
				<uni-icons type="arrowright" size="24" color="#666"></uni-icons>
			</view>
			<view class="list" @click="openHelp">
				<view class="title">
					<uni-icons type="help" size="20" color="#666"></uni-icons>
					<text class="text">意见反馈</text>
				</view>
				<uni-icons type="arrowright" size="24" color="#666"></uni-icons>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		methods:{
			openMyArticle() {
				uni.navigateTo({
					url:"../../my-article/my-article"
				})
			},
			openHelp() {
				uni.navigateTo({
					url:"../../my-suggest/my-suggest"
				})
			},
		}
	}
</script>

<style lang="stylus">
page
	background-color #F5F5F5
.my
	.my-header
		position relative
		padding-bottom 15px
		.backgroud
			position absolute
			top 0 
			left 0
			right 0
			bottom 0
			filter blur(8px)
			opacity 0.3
			overflow hidden
			image
				width 100%
				height 100%
		.logo
			display flex
			flex-direction column
			align-items center
			padding-top 30px
			.logo-box
				width 60px
				height 60px
				border-radius 50%
				overflow hidden
				image
					width 100%
					height 100%
			.name
				margin-top 15px
				font-size 16px
				font-weight bold
		.info
			display flex
			margin-top 15px
			.info-box
				flex 1
				display flex
				flex-direction column
				justify-content center
				align-items center
				font-size 12px
				color #999999
				.title
					font-size 14px
					color #333333
	.content
		margin-top 10px
		.list
			display flex
			justify-content space-between
			align-items center
			padding 15px
			margin-bottom 10px
			background-color #FFFFFF
			color #333333
			font-size 14px
			.title
				display flex
				align-items center
				justify-content space-between
				.text
					margin-left 10px
				
</style>
