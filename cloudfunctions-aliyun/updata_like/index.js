'use strict';
const db = uniCloud.database()
//定义数据集合操作符
const dbCmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		user_id,
		article_id
	} = event
	//根据userid拿到user数据
	const userinfo = await db.collection('user').doc(user_id).get()
	//拿到user数据里收藏文章的数组
	const article_id_ids = userinfo.data[0].article_likes_ids
	//判断数组里如果有该文章则该次请求删除该文章,否则添加该文章
	let dbCmdFuns = null
	if(article_id_ids.includes(article_id)){
		dbCmdFuns= dbCmd.pull(article_id)
	}else{
		dbCmdFuns= dbCmd.addToSet(article_id)
	}
	//把数组放到该user数据的收藏文章里并更新数据
	await db.collection('user').doc(user_id).update({
		
article_likes_ids: dbCmdFuns
	})
	console.log('event : ', event)
	
	//返回数据给客户端
	return {
		code:200,
		msg: '数据请求成功',
		data:userinfo.data[0]
	}
};
