<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="stylus">
	@import 'components/gaoyia-parse/parse.css'
	/*每个页面公共css */

* {
	box-sizing border-box
}
$mk-base-color = #f07373
</style>
