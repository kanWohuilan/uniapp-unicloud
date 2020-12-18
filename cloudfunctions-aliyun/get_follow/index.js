'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {user_id
	} = event
	let user = await db.collection('user').doc(user_id).get()
	user = user.data[0]
	let list = await db.collection('article').aggregate()
	.addFields({
		is_like: $.in(["$_id",user.article_likes_ids])
	})
	.project({
		content: 0
	})
	.match({
		is_like: true
	})
	.end()
	
	return {
		code:200,
		msg: "获取数据成功",
		data:list.data
	}
};
