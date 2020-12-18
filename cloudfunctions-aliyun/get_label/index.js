'use strict';
//获取数据库的引用
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,
		type
	}= event
	//判断是否请求全部标签 还是请求current 为true的标签
	let matchObj= {}
	if(type !== 'all') {
		matchObj = {
			current: true
		}
	}
	
	let userinfo = await db.collection('user').doc(user_id).get()
	userinfo = userinfo.data[0]
  let label = await db.collection('label').aggregate()
	//添加字段current判断当前记录的label id是否在用户label数组中
	.addFields({
		current: $.in(['$_id',$.ifNull([userinfo.label_ids,[]])])
	})
	.match(matchObj)
	.end()
	
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: label.data
	}
};
