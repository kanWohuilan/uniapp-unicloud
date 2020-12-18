export const search = function({commit,state},history){
	 //去掉两端的空格
	 let list = state.history
	 let word = history.trim()
	 //判断是否为空格 是否为重复词 是否超出最大词数
	 if (word.match(/^[ ]*$/)) {
	         return;
	       }
	 
	 if(list.indexOf(history) < 0) {
		 list.unshift(history)
	 }
	 if(list.length >10) {
		 list.pop()
	 }
		
		uni.setStorageSync("_history",list)
		
	}
export const clear = function({commit,state},history) {
	uni.removeStorageSync("_history")
	commit('set_history',[])
}
