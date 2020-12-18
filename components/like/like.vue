<template>
	<view class="like" @click.stop="likeTap">
		<uni-icons :type="like ? 'heart-filled' : 'heart'" size="20" color="#f07373"></uni-icons>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				like:false
			};
		},
		props:{
			item: Object,
			type1: String
		},
		created() {
			this.like = this.item.is_like
		},
		watch:{
			item(newv) {
				this.like = this.item.is_like
			}
		},
		methods:{
			likeTap() {
				this.like =!this.like
				this.updata()
				console.log(this.type1);
			},
			updata() {
				uni.showLoading({
					
				})
				this.$api.updata_like({
					user_id: '5fcae2c5107b2c0001acd1a6',
					article_id: this.item._id
				}).then((res) => {
					uni.hideLoading()
					uni.showToast({
						title:this.like? '收藏成功': '取消收藏',
						icon: 'none'
					})
					console.log(res)
					uni.$emit("update_article",this.type1)
					
				}).catch(() => {
					uni.hideLoading()
					
				})
			}
		}
	}
</script>

<style lang="stylus">
.like
	position absolute
	top 0
	right 0
	display flex
	justify-content center
	height 20px
	width 20px
</style>
