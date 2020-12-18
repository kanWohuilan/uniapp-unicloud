<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<view  :style="{height: statusBarHeight+ 'px'}">
				
			</view>
			<view class="content" :style="{height: navBarHeight+ 'px', width: searchWidth + 'px'}"
			@click.stop="open" :class="{search: issearch}">
			<view class="back-icon" v-if="issearch" @click="back">
				<uni-icons type="back" size="22" color="#fff"></uni-icons>
			</view>
				<view v-if="!issearch" class="navbar-search">
								
							<uni-icons type="search"class="navbar-search-icon" size="16" color="#999"></uni-icons>
							
						<view class="navbar-search-text">
							uniapp
						</view>
				</view>
				<view class="navbar-search" v-else>
					<input type="text" @input="inputChange" class="navbar-search-text" v-model="val"   placeholder="请输入搜索内容"/>
				</view>
				</view>
			</view>
		<view :style="{height: statusBarHeight + navBarHeight + 'px'}">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: 20,
				navBarHeight: 45,
				searchWidth: 375,
				val: ""
			}
		},
		props:{
			issearch:{
				type:Boolean,
				default() {
					return false
				}
			},
			value: {
				type:[String,Number]
			}
		},
		watch: {
			value(newv) {
				this.val = newv
			}
		},
		created() {
			//获取手机状态栏高度
			const info= uni.getSystemInfoSync()
			//非h5 app mpallipay
			// this.statusBarHeight=info.statusBarHeight
			// this.searchWidth = info.windowWidth
			//获取手机胶囊按钮信息
			//#ifndef H5 || APP-PLUS || MP-ALIPAY
			const btnInfo = uni.getMenuButtonBoundingClientRect()
			this.navBarHeight= (btnInfo.bottom - info.statusBarHeight) + (btnInfo.top - info.statusBarHeight)
			this.searchWidth = btnInfo.left
			//#endif

		},
		methods:{
			back() {
				uni.switchTab({
					url:"../../pages/tabbar/index/index"
				})
			},
			open() {
				if(this.issearch) return
				uni.navigateTo({
					url:"/pages/home-search/home-search"
				})
			},
			inputChange(e) {
				const {value} = e.detail
				this.$emit('input',value)
			}
		}
	}
</script>

<style  lang="stylus">
$mk-base-color = #f07373
.navbar-fixed
	position fixed
	top 0
	left 0
	z-index 99
	width 100%
	background-color $mk-base-color
	.content
		box-sizing border-box
		padding 0 15px
		height 45px
		display flex
		align-items center
		justify-content center
		box-sizing border-box
		.navbar-search
			border-radius 30px
			padding 0 15px
			display flex
			align-items center
			height 30px
			width 100%
			background-color #FFFFFF
			.navbar-search-icon
				margin-right 10px
			.navbar-search-text
				font-size 12px
				color #999999
		&.search
			padding-left 0
			.back-icon
				margin-left 15px
				margin-right 10px
			.navbar-search
				border-radius 5px
</style>