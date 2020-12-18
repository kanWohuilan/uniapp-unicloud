<template>
	<view class="comments-box">
		<view class="header">
			<view class="avatar">
				<image :src="comments.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="info">
				<view v-if="!comments.is_reply" class="title">{{comments.author.author_name}}</view>
			  <view v-else class="title">{{comments.author.author_name}} <text class="reply-text">回复</text>{{comments.to}}</view>
				<view>{{formatTime(comments.create_time)}}</view>
			</view>
		</view>
		<view class="content">
				<view>{{comments.comment_content}}</view>
					<view class="comments-info">
								<view class="comments-button" @click="commentsReply(comments)">回复</view>
					</view>
						<view class="comments-reply" v-for="item in comments.replys" :key="item.comment_id">
									<comments-box :reply="true" :comments="item" @reply="commentsReply"></comments-box>
								</view>
		</view>
	</view>
</template>

<script>
	import commentsBox from '@/components/comments-box/comments-box.vue'
	import {parseTime} from '@/utils/index.js'
	export default {
		name:"commentsBox",
		components: {
			commentsBox
		},
		data() {
			return {
				
			};
		},
		props:{
			comments: {
				type:Object,
				default() {
					return {}
				}
			},
				reply: {
				type: Boolean,
				default: false
			}
			
		},
		methods:{
			formatTime(time) {
							return parseTime(time)
						},
			commentsReply(comments) {
						// if (comment.is_reply) {
						// 			comment.comments.reply_id = comment.comments.comment_id
						// 			comment.comments.comment_id = this.comments.comment_id
						// 		}
						console.log(comments);
				this.$emit('reply',comments)
			}
		},
		
	}
</script>

<style lang="stylus">
.comments-box
	margin 15px 0
	.header
		display flex
		.avatar
			flex-shrink 0
			width 30px
			height 30px
			border-radius 5px
			overflow hidden
			image
				width 100%
				height 100%
		.info
			display flex
			flex-direction column
			padding-left 15px
			font-size 12px
			color #999999
			line-height 1
			.title
				margin-bottom 5px
				font-size 14px
				color #333333
	.content
		margin-top 10px
		font-size 14px
		color #000000
		.comments-info
			margin-top 15px
			display flex
			.comments-button
				padding 2px 10px
				font-size 12px
				color #999999
				border-radius 20px
				border 1px #ccc solid
		.comments-reply 
			display: flex;
			margin: 15px 0;
			padding: 0 10px;
			border: 1px #eee solid;
</style>
