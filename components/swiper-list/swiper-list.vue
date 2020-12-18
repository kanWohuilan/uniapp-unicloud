<template>
	<swiper class="swiper-home" @change= "change" :current= "activelist" >
		<swiper-item v-for="(item,index) in tab" :key= "index">
		
				<listscroll @loadMore="loadMore">
					<list-card :mode= "item.mode" :item="item" v-for="item in listCatchData[index]" :key="item._id"></list-card>
					<uni-load-more v-if="listCatchData[index]"  :status="load[index].loading" iconType="snow"></uni-load-more>
				</listscroll>
		
			
		</swiper-item>
		<swiper-item>
			
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		data() {
			return {
				//请求的各个模块数据
				listCatchData: {},
				//各个模块当前请求的页数和loading状态
				load:{},
				//每页请求的数据数量
				pageSize:9,
		
			};
		},
		props:{
			//tab数据数组
			tab: {
				type:Array,
				default() {
					return []
				}
			},
			//当前滑动页index
			activelist: {
				type: Number,
				default: 0
			}
		},
		created() {
			uni.$on('update_article',(e) => {
				if(e === "follow") {
					this.load ={}
					this.listCatchData ={}
					this.getList(this.activelist)
				}
			})
		},
		watch:{
			//等父组件tab请求到后再发请求,防止没有tab
			tab(newv) {
				
				if(newv.length === 0) return
				
				this.listCatchData={}
				this.load = {}
				this.getList(this.activelist)
				console.log(this.listCatchData)
				console.log(this.activelist)
			}
		},
		methods:{
			change(e){
			console.log(this.activelist)
				this.$emit('change',e.detail.current)
				//滑动完的模块index
				const current =  e.detail.current
				//当数据不存在 或者数据length为0的时候请求数据 防止数据重复请求
				if(!this.listCatchData[current] || this.listCatchData[current].length===0){
					this.getList(current)
				}
				
				
			},
			getList(current) {
				//每个模块分页和loading状态不同,当该模块没有属性时,需要设置改模块私有属性
				if(!this.load[current]) {
					this.load[current] = {
						page: 1,
						loading: "loading"
					}
				}
				//按每个模块私有属性页数请求数据函数
				this.$api.get_list({ 
					user_id: '5fcae2c5107b2c0001acd1a6',
					name: this.tab[current].name, page: this.load[current].page, pageSize: this.pageSize}).then(res => {
					// this.listCatchData[current] = res.data
					//判断如果请求的数据为空,代表没有更多数据
					if(res.data.length === 0) {
						//设置改模块的loading属性为'没有更多数据了'
						let oldLoad = {}
						oldLoad.loading = 'noMore'
						oldLoad.page= this.load[current].page
						this.$set(this.load,current,oldLoad)
						this.$forceUpdate()

						return
					}
					//新建该模块数据数组每加一页请求到的数据push进数组里,再把数组设置到data对象里
					let oldlist = this.listCatchData[current] || []
					oldlist.push(...res.data)
					this.$set(this.listCatchData,current,oldlist)
					console.log(this.tab[current].name)
				})
				},
				//下拉加载数据
				loadMore() {
					//判断该模块loading状态是否为更多没有数据了
					if(this.load[this.activelist].loading === 'naMore') return
						//该模块需要请求的页数++,再请求数据
					this.load[this.activelist].page++
					this.getList(this.activelist)
				}
		},
		
	}
</script>

<style lang="stylus">
.swiper-home
	height 100%

</style>
