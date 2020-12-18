<template>
	<view class="home">
		<navBar class="navbar"></navBar>
		<tab :list="tabList" @tab="tab" class="tab" :currentlist = "currentlist"></tab>
		<view class="home-list">

			<swiper-list :tab= 'tabList' @change="change" :activelist="activelist"></swiper-list>

		</view>
		
	</view>
</template>

<script>

	export default {
		data() {
			return{
				tabList: [],
				//tab变化动态值
				currentlist: 0,
				//list滑动变化动态值
				activelist:0
			}
		},
		onLoad() {
			this.getLabel()
			uni.$on('labelChange',(res) => {
				this.tabList = []
				this.currentlist = 0
				this.activelist = 0
				this.getLabel()
			})
		},
	
		methods:{
			getLabel() {
				this.$api.get_label({user_id: "5fcae2c5107b2c0001acd1a6"}).then((res) => {
					const {data} = res
					data.unshift({name:'全部'})
					this.tabList = data
			
				})
				
			},
			tab({data,index}) {
				
				this.activelist= index
				
			},
			change(current) {
				
				this.currentlist= current 
				this.activelist =current 
			console.log(this.activelist)
			}
		}
	}
</script>

<style lang="stylus">
page
	height 100%
	display flex
.home
	display flex
	flex-direction column
	flex 1
	
	.home-list
		flex 1
		overflow hidden
		

	
</style>
