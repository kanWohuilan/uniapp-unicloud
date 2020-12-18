<template>
	<view class="author">
		<view class="image">
			<image :src="item.avatar" mode="aspectFill"></image>
		</view>
		<view class="content">
			<view class="title">
				{{item.author_name}}
			</view>
			<view class="desc">
				<view class="des-label">
					{{item.professional}}
				</view>
				<view class="des-info">
					<text> 发帖{{item.article_ids.length}}</text>
					<text>粉丝 {{item.fans_count}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			item: {
				type: Object,
				default() {
					return {}
				}
			}
		}
	}
</script>

<style lang="stylus">
.author
	display flex
	padding  10px 0
	margin 0 10px
	border-radius 5px
	.image
		flex-shrink 0
		width 40px
		height 40px
		overflow hidden
		image
			width 100%
			height 100%
	.content
		display flex
		flex-direction column
		justify-content space-between
		padding-left 10px
		width 100%
		.title
			position relative
			padding-right 30px
			font-size 14px
			color #333333
			font-weight bold
			line-height 1.2
		.desc
			display flex
			justify-content space-between
			font-size 12px
			.des-label
				color #666666
			.des-info
				color #999999
				line-height 1.5
				text:first-child
					margin-right 10px
</style>
