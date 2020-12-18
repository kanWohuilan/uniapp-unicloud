
<template>
	<view>
	<view class="comment-content" v-for="item in commentList" :key="item.comment_id">
		<comments-box :comments="item" @reply= "reply"></comments-box>
	</view>
	<uni-load-more v-if="commentList.length===0 || commentList.length>5" :status="load" iconType="snow"></uni-load-more>
	</view>
</template>

<script>
	export default{
		data() {
			return{
				commentList: [],
				pageSize:5,
				page:1,
				load:"loading"
			}
		},
		onLoad(query) {
			this.article_id = query.id
			this.getComments(this.article_id)
		},
		onReachBottom(){
			if(this.load === "noMore") return
			this.page++
			this.getComments(this.article_id)
		},
		methods:{
			getComments(article_id) {
				this.$api.get_comments({article_id,page:this.page,pageSize:this.pageSize}).then((res) =>{
					const {data} = res
					if(data.length === 0) {
						this.load= "noMore"
						return
					}
					let oldForm= this.commentList
					oldForm.push(...data)
					this.commentList = oldForm
					
				})
			}
		} 
	}
</script>

<style lang="stylus">
	.comment-content
		padding 0 15px
</style>
