<template>
	<view>
		<uni-popup type="bottom" ref="popup" :maskClick="false">
			<view class="popup-wrap">
				<view class="header">
					<view class="item" @click="close">
						取消
					</view >
					<view class="item" @click="submit">
						发布
					</view>
				</view>
				<view class="content">
					<textarea value=""  placeholder="请输入评论内容" maxlength="200" v-model="commentsValue"  />
					<view class="count">
						{{commentsValue.length}}/200
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components:{
			uniPopup
		},
		data() {
			return {
				commentsValue: ''
			};
			
		},
		methods:{
			open() {
				this.$refs.popup.open()
				this.commentsValue=''
				
			},
			submit() {
				if(!this.commentsValue) {
					uni.showToast({
						title: "请输入评论内容",
						icon:"none"
					})
					return
				}
				this.$emit('submit',this.commentsValue)
				
			},
			close() {
				this.$refs.popup.close()
				this.commentsValue=''
			}
		}
	}
</script>

<style lang="stylus">
.popup-wrap
	background-color #FFFFFF
	.header
		display flex
		justify-content space-between
		font-size 14px
		color #666666
		border-bottom 1px f5f5f5 solid
		.item
			height 50px
			line-height 80px
			padding 0 15px
	.content
		width 100%
		padding 15px
		textarea
			width 100%
			height 200px
		.count
			display flex
			justify-content flex-end
			font-size 12px
			
			
		
			
		 
</style>
