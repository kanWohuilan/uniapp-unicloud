<template>
	<view class="label">
		<view class="header">
			<view class="title">
				我的标签
			</view>
			<view class="edit" @click="edit">
				{{is_edit ? '完成': '编辑'}}
			</view>
		</view>
		<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
		<view class="content">
			<view class="item" v-for="(item,index) in labelList" :key="index" >
				{{item.name}}
				<uni-icons v-if="is_edit" type="clear" @click="del(index)" class="icon"></uni-icons>
			</view>
			<view v-if="labelList.length===0 && !loading " class="no-data">
				当前没有数据
			</view>
		</view>
		<view class="header">
			<view class="title">
				我的标签
			</view>
			
		</view>
		<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
		<view class="content">
			<view class="item" v-for="(item,index) in list" :key="index" @click="add(index)">
				{{item.name}}

			</view>
			<view v-if="list.length===0 && !loading" class="no-data">
				当前没有数据
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				labelList: [],
				list: [],
				is_edit: false,
				loading: true
			}
		},
		onLoad() {
			this.getlabel()
		},
		methods:{
			update(label) {
				let labelID = []
				
					label.forEach(item => {
						labelID.push(item._id)
					})
				
				console.log(labelID)
				uni.showLoading()
				this.$api.update_label({user_id: "5fcae2c5107b2c0001acd1a6",label: labelID}).then(res => {
					uni.hideLoading()
					console.log(1)
					uni.showToast({
						title:'成功'
					})
					uni.$emit('labelChange')
				}).catch(() => {
					uni.hideLoading()
					
				}) 
			},
			edit() {
				if(this.is_edit){
					this.update(this.labelList)
					this.is_edit= false
					
				}else{
					this.is_edit=true
				}
				
				// this.is_edit = !this.is_edit
			},
			getlabel() {
				this.loading =true
				this.$api.get_label({user_id: "5fcae2c5107b2c0001acd1a6",type: "all"}).then((res) =>{
					const {data} = res
					this.list = data.filter(item => !item.current)
					this.labelList = data.filter(item => item.current)
					this.loading =false
					console.log(data);
				})
			},
			del(index) {
				if(!this.is_edit) return
				this.list.push(this.labelList[index])
				this.labelList.splice(index,1)
			},
			add(index) {
				if(!this.is_edit) return
				this.labelList.push(this.list[index])
				this.list.splice(index,1)
			}
		}
	}
</script>

<style lang="stylus">
	page
		background-color #F5F5F5

.label
	.header
		display flex
		justify-content space-between
		padding 10px 15px
		font-size 14px
		color #666666
		border-bottom 1px solid #F5F5F5
		.edit
			color #30B33A
			font-weight bold
	.content
		display flex
		flex-wrap wrap
		padding 15px
		padding-top 0
		.item
			position relative
			padding 2px 5px
			margin-top 12px
			border-radius 5px
			border 1px #666666 solid
			font-size  14px
			color #666666
			margin-right 10px
			.icon
				position absolute
				top -8px
				right -8px
				background-color #FFFFFF
				border-radius 50%
			
.no-data
	margin 0 auto
</style>
