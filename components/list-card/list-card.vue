<template>
	<view @click="open">
	<!-- 	基础卡片 -->
		<view class="listcard" v-if="mode==='base'">
			<view class="image">
				<image :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="content">
				<view class="title">
					<text>{{item.title}}</text>
					<like :type1="type1" :item="item"></like>
				</view>
				
				<view class="desc">
					<view class="label">
						<view class="label-item">
							{{item.classify}}
						</view>
					</view>
					<view class="browse">
						{{item.browse_count}}浏览
					</view>
				</view>
			</view>
		</view>
	<!-- 	多图模式 -->
		<view class="listcard mode-column" v-if="mode==='column'">
			
			<view class="content">
				<view class="title">
					<text>{{item.title}}</text>
					<like :type1="type1" :item="item"></like>
				</view>
				<view class="image">
					<view v-if="index< 3" :key="index" v-for="(item,index) in item.cover" class="img-item">
						<image :src="item" mode="aspectFill"></image>
					</view>
				</view>
				<view class="desc">
					<view class="label">
						<view class="label-item">
							{{item.classify}}
						</view>
					</view>
					<view class="browse">
						{{item.browse_count}}浏览
					</view>
				</view>
			</view>
			
		</view>
		<!-- 大图模式 -->
		<view class="listcard mode-image" v-if="mode==='image'">
			<view class="image">
				<image :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="content">
				<view class="title">
					<text>{{item.title}}</text>
					<like :type1="type1" :item="item"></like>
				</view>
				<view class="desc">
					<view class="label">
						<view class="label-item">
							{{item.classify}}
						</view>
					</view>
					<view class="browse">
						{{item.browse_count}}浏览
					</view>
				</view>
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
		
		props: {
			type1:{
				type: String,
				default: ""
			},
			mode: {
				type: String,
				default: 'base'
			},
			item: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		methods: {
			open() {
				const item = this.item
				 const params= {
					 _id:item._id,
					 title: item.title,
					 author: item.author,
					 create_time:item.create_time,
					 thumbs_up_count: item.thumbs_up_count,
					 browse_count: item.browse_count
				 }
				uni.navigateTo({
					url:'/pages/home-detail/home-detail?params='+JSON.stringify(params)
				})
			}
		}
	}
</script>

<style lang="stylus">
	$mk-base-color = #f07373
.listcard
	display flex
	padding 10px
	margin 10px
	border-radius 5px
	box-shadow  0 0 5px 1px rgba(0,0,0,.1)
	.image
		flex-shrink 0
		width 60px
		height 60px
		border-radius 5px
		overflow hidden
		image
			height 100%
			width 100%
	.content
		display flex
		justify-content space-between
		flex-direction column
		padding-left 10px
		width 100%
		.title
			position relative
			padding-right 30px
			font-size 14px
			color #333
			font-weight 700
			line-height 1.2
			text
				overflow hidden
				text-overflow ellipsis
				display -webkit-box
				-webkit-line-clamp 2
				-webkit-box-orient vertical
			
		.desc
			display flex
			justify-content space-between
			font-size 12px
			.label
				display flex
				.label-item
					padding 0 5px
					margin-right 5px
					border-radius 15px
					color $mk-base-color
					border 1px $mk-base-color solid
			.browse
				color #999999
				line-height 1.5
	&.mode-column
		.content
			width 100%
			padding-left 0
			.image
				display flex
				margin-top 10px
				width 100%
				height 70px
				.img-item
					margin-left 10px
					width 100%
					border-radius 5px
					overflow hidden
					image
						width 100%
						height 100%
					&:first-child
						margin-left 0
			.desc
				margin-top 10px
				
	&.mode-image
		flex-direction column
		
		.image
			width 100%
			height 100px
		.content
			padding-left 0
			margin-top 10px
			.desc
				display flex
				align-items center
				margin-top 10px
			
</style>
	