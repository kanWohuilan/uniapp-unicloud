<template>
	<view class="follow">
		<view class="follow-tab">
			<view class="tab-item" :class="{active: activeTab === 0}" @click="tab(0)">
				文章
			</view>
			<view class="tab-item" :class="{active: activeTab === 1}" @click="tab(1)">
				作者
			</view>
		</view>
			<view class="follow-list">
			<swiper class="swiper" @change="change" :current="activeList">
				<swiper-item>
						<uni-load-more iconType="snow" status="loading" v-if="list.length===0 && !noData"> </uni-load-more>
						<listscroll>
							<view class="noData" v-if="noData">
								没有数据
							</view>
							<list-card  :type1="type1" :item = "item" :mode="item.mode" v-for="item in list" :key="item._id"></list-card>
						</listscroll>
						
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<listscroll>
							<list-author  :item ="item "  v-for="item in authorList" :key= "item.id"></list-author>
							<view class="noData" v-if="noAuthor">
								没有数据
							</view>
						</listscroll>
						
					</view>
				</swiper-item>
			</swiper>
</view>
	</view>
</template>

<script>
	export default {
		data() {
			return{
				activeTab: 0,
				activeList: 0,
				list:[],
				noData: false,
				noAuthor:false,
				type1:"follow",
				authorList: []
			}
		},
		onLoad() {
			this.getList()
			this.getAuthorList()
			uni.$on('update_article',() => {
				this.getList()
			})
			uni.$on("update_article",() => {
				this.getAuthorList()
			})
		},
		methods:{
			change(e) {
				console.log(e.detail.current);
				const {current} = e.detail
				this.activeTab = current
			},
			tab(index) {
				this.activeTab = index,
				this.activeList= index
			},
			getList() {
				this.$api.get_follow({
					user_id: '5fcae2c5107b2c0001acd1a6'
				}).then(res => {
					const {data}= res
					this.noData = data.length===0 ? true : false
					this.list= data
				})
			},
			getAuthorList() {
				this.$api.get_author({
					user_id: '5fcae2c5107b2c0001acd1a6'
				}).then(res => {
					const {data}= res
					this.noAuthor = data.length===0 ? true : false
					this.authorList= data
				})
			}
		}
	}
</script>

<style lang="stylus">
page
	height 100%
	display flex
	.follow
		flex 1
		display flex
		flex-direction column
		.follow-tab
			display flex
			border-radius 5px
			border-bottom 1px #F5F5F5 solid
			align-items  center
			font-size 12px
			height 30px
			margin 10px 20px
			.tab-item
				border-top-left-radius 5px
				border-bottom-left-radius 5px
				flex 1
				text-align center
				height 100%
				line-height 30px
				border  1px solid #f07373
				&:last-child
					border-left none
					border-top-left-radius 0
					border-bottom-left-radius 0
					border-top-right-radius 5px
					border-bottom-right-radius 5px
				&.active
					color #F07373
		.follow-list
			flex 1
			.swiper
				height 100%
.noData
	margin 0 auto
	margin-top 20px
	text-align center
	font-size 14px
	
</style>
