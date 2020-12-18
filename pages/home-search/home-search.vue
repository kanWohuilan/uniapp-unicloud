<template>
	<view class="home">
		<navBar :issearch="true" @input="input" v-model="value" ></navBar>
			<view class="home-list">
				
			
			<view class="label" v-if="isHistory">
				<view class="header">
					<text class="title">搜索</text>
					<text class="clear" @click="clear1">清空</text>
				</view>
				<view  class="content" v-if="history.length >0">
					<view class="item" v-for="item in history" @click="clickItem(item)">
						{{item}}
					</view>
				</view>
				<view class="no-data"  v-else>
					没有搜索历史
				</view>
			</view>
			<listscroll v-else>
				<uni-load-more v-if="loading" status="loading" iconType="snow" ></uni-load-more>
				<view v-if="searchlist.length> 0">
					<list-card v-for="item in searchlist"  :item="item" ></list-card>
				</view>
				<view v-if="searchlist.length === 0 && !loading" class="no-data">
					没有搜索到相关数据
				</view>
			</listscroll>
			</view>
			
	</view>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	
	export default {
		data() {
			return {
				isHistory: true,
				searchlist: [],
				value: "",
				loading: false
				
			};
		},
		computed:{
			...mapGetters([
				'history',
				
			])
		},
		methods:{
			clickItem(item) {
				this.value = item
				this.getsearch(item)
			},
			clear1() {
				this.clear(),
				uni.showToast({
					title:"清空完成"
				})
			},
			//节流
			input(value) {
				this.value = value
				// console.log(this.history)
				if(!value){
					clearTimeout(this.timer)
					this.mark = false
					this.getsearch(value)
					return
				}
				this.isHistory =false
			
				// 
				
				if(!this.mark){
									this.mark = true
									this.timer = setTimeout(()=>{
										this.mark = false
										this.setHistory(value)
										this.getsearch(value)
									},1000)
								}
			},
			...mapActions([
				'search',
				'clear'
			]),
			setHistory(value) {
				this.search(value)
			},
			getsearch(value) {
				if(!value) {
					this.searchlist = []
					this.isHistory =true
					return
				}
				this.loading=true
				this.isHistory =false
				this.$api.get_search({
					user_id: '5fcae2c5107b2c0001acd1a6',
					value,
				}).then(res => {
					const {data} = res
					this.searchlist =data
					this.loading=false
				}).catch(()=> {
					this.loading=false
				})
			}
		}
	}
</script>

<style lang="stylus">
	$mk-base-color = #f07373
page
	height 100%
	display flex
	background-color #F5F5F5
	.home
		display flex
		flex 1
		flex-direction column
		
.label
	
	background-color #FFFFFF
	margin-bottom 10px
	.header
		display flex
		justify-content space-between
		font-size 14px
		color #666
		padding 10px 15px
		border-bottom 1px #F5F5F5 solid
		.title
			color $mk-base-color
		.clear
			color #30b33a
			font-weight 700
	.content
		display flex
		flex-wrap wrap
		padding 15px
		padding-top 0
		.item
			padding 2px 10px
			margin-top 12px
			margin-right 10px
			border-radius 5px
			border 1px solid #666
			font-size 14px
			color #666
	.no-data
		height 200px
		line-height 200px
		width 100%
		text-align center
		font-size 12px
		color #666666
		
		
.no-data
	height 200px
	line-height 200px
	width 100%
	text-align center
	font-size 12px
	color #666666
</style>
