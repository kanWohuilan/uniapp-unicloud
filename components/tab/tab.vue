<template>
	<view class="tab">
		 <scroll-view scroll-y="true" class="tab-scroll" scroll-x>
		 	<view class="scroll-wrapper">
				<view class="item" v-for="(item,index) in list" :key="index" :class="{active: currentItem === index}" 
				@click="_click(index,item)">
					{{item.name}}
				</view>
				
			</view>
		 </scroll-view>
		 <view class="icon" @click="open">
		 	<uni-icons type="gear" size="26" color="#666"></uni-icons>
		 </view>
		 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentItem: 0
			};
		},
		props:{
			list: {
				type: Array,
				default() {
					return []
				}
			},
			currentlist: Number
				
		},
		watch:{
			currentlist(newv){
				
					this.currentItem = newv
				
				
			}
		},
		methods:{
			_click(index,item) {
				this.currentItem = index,
				this.$emit('tab',{
					data: item,
					index
				})
			},
			open() {
				uni.navigateTo({
					url:"/pages/home-label/home-label",
					
				})
				console.log(1)
			}
		}
	}
</script>

<style lang="stylus">
$mk-base-color = #f07373
.tab
	background-color #FFFFFF
	border-bottom  1px solid #f5f5f5
	width 100%
	display flex
	.tab-scroll
		flex 1
		overflow hidden
		flex-wrap nowrap
		height 45px
		.scroll-wrapper
			display  flex
			height 45px
			align-items center
			flex-wrap nowrap
			.item
				flex-shrink 0
				padding 0 10px
				color #333333
				font-size 14px
				&.active
					color $mk-base-color
	.icon
		display flex
		justify-content center
		align-items center
		width 45px
		position relative
		&::after
			position absolute
			content ''
			top 5px
			bottom 5px
			left 0
			width 1px
			background-color #ddd
	
</style>
