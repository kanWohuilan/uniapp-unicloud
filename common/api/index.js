const get_label= (data)=> {
	return new Promise((reslove,reject)=> {
		uniCloud.callFunction({
			name:'get_label',
			data
		}).then((res) => {
			if(res.result.code === 200) {
				reslove(res.result)
			}else {
				reject(res.result)
			}		
		}).catch((err) => {
			reject(err)
		})
	})
	
}


const get_list= (data)=> {
	return new Promise((reslove,reject)=> {
		uniCloud.callFunction({
			name:'get_list',
			data
		}).then((res) => {
			if(res.result.code === 200) {
				reslove(res.result)
			}else {
				reject(res.result)
			}
		}).catch((err) => {
			reject(err)
		})
	})
	
}

const updata_like= (data)=> {
	return new Promise((reslove,reject)=> {
		uniCloud.callFunction({
			name:'updata_like',
			data
		}).then((res) => {
			if(res.result.code === 200) {
				reslove(res.result)
			}else {
				reject(res.result)
			}
		}).catch((err) => {
			reject(err)
		})
	})
	
}
const update_author= (data)=> {
	return new Promise((reslove,reject)=> {
		uniCloud.callFunction({
			name:'update_author',
			data
		}).then((res) => {
			if(res.result.code === 200) {
				reslove(res.result)
			}else {
				reject(res.result)
			}
		}).catch((err) => {
			reject(err)
		})
	})
	
}

const update_label= (data)=> {
	return new Promise((reslove,reject)=> {
		uniCloud.callFunction({
			name:'update_label',
			data
		}).then((res) => {
			if(res.result.code === 200) {
				reslove(res.result)
			}else {
				reject(res.result)
			}
		}).catch((err) => {
			reject(err)
		})
	})
	
}

const update_comment= (data)=> {
	return new Promise((reslove,reject)=> {
		uniCloud.callFunction({
			name:'update_comment',
			data
		}).then((res) => {
			if(res.result.code === 200) {
				reslove(res.result)
			}else {
				reject(res.result)
			}
		}).catch((err) => {
			reject(err)
		})
	})
	
}

const get_search= (data)=> {
	return new Promise((reslove,reject)=> {
		uniCloud.callFunction({
			name:'get_search',
			data
		}).then((res) => {
			if(res.result.code === 200) {
				reslove(res.result)
			}else {
				reject(res.result)
			}
		}).catch((err) => {
			reject(err)
		})
	})
	
}
const get_detail= (data)=> {
	return new Promise((reslove,reject)=> {
		uniCloud.callFunction({
			name:'get_detail',
			data
		}).then((res) => {
			if(res.result.code === 200) {
				reslove(res.result)
			}else {
				reject(res.result)
			}
		}).catch((err) => {
			reject(err)
		})
	})
	
}

const get_comments= (data)=> {
	return new Promise((reslove,reject)=> {
		uniCloud.callFunction({
			name:'get_comments',
			data
		}).then((res) => {
			if(res.result.code === 200) {
				reslove(res.result)
			}else {
				reject(res.result)
			}
		}).catch((err) => {
			reject(err)	
		})
	})
	
}

const update_thumbsup= (data)=> {
	return new Promise((reslove,reject)=> {
		uniCloud.callFunction({
			name:'update_thumbsup',
			data
		}).then((res) => {
			if(res.result.code === 200) {
				reslove(res.result)
			}else {
				reject(res.result)
			}
		}).catch((err) => {
			reject(err)	
		})
	})
	
}
const get_follow= (data)=> {
	return new Promise((reslove,reject)=> {
		uniCloud.callFunction({
			name:'get_follow',
			data
		}).then((res) => {
			if(res.result.code === 200) {
				reslove(res.result)
			}else {
				reject(res.result)
			}
		}).catch((err) => {
			reject(err)	
		})
	})
	
}

const get_author= (data)=> {
	return new Promise((reslove,reject)=> {
		uniCloud.callFunction({
			name:'get_author',
			data
		}).then((res) => {
			if(res.result.code === 200) {
				reslove(res.result)
			}else {
				reject(res.result)
			}
		}).catch((err) => {
			reject(err)	
		})
	})
	
}
const get_article= (data)=> {
	return new Promise((reslove,reject)=> {
		uniCloud.callFunction({
			name:'get_article',
			data
		}).then((res) => {
			if(res.result.code === 200) {
				reslove(res.result)
			}else {
				reject(res.result)
			}
		}).catch((err) => {
			reject(err)	
		})
	})
	
}

const update_suggest= (data)=> {
	return new Promise((reslove,reject)=> {
		uniCloud.callFunction({
			name:'update_suggest',
			data
		}).then((res) => {
			if(res.result.code === 200) {
				reslove(res.result)
			}else {
				reject(res.result)
			}
		}).catch((err) => {
			reject(err)	
		})
	})
	
}

export default {
	get_detail,
	get_label,
	get_list,
	updata_like,
	get_search,
	update_label,
	update_comment,
	get_comments,
	update_author,
	update_thumbsup,
	get_follow,
	get_author,
	get_article,
	update_suggest
}

