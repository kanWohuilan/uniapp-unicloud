'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
const { user_id,content,filePaths} = event
	await db.collection("suggest").add({
		user_id,content,filePaths
	})
	//返回数据给客户端
	return {
		code:200,
		msg:"数据获取成功"
	}
};
