<template>
	<view class="my-article">
		<uni-load-more v-if="list.length === 0" iconType="snow" status="loading"></uni-load-more>
		<list-card :item = "item" v-for="item in list"></list-card>
	</view>
</template>

<script>
	export default {
		data() {
			return{
				list:[]
			}
		},
		onLoad() {
			this.$api.get_article({user_id: "5fcae2c5107b2c0001acd1a6"}).then(res => {
				this.list = res.data
			}) 
		}
	}
</script>

<style>
</style>
