window.GlobalGame = {};
window.GlobalGame.showRewardVideo = function(event, cb) {
	if (event == null || event.length == 0) {
		event = 'video';
	};

	if (window.JYSDK == null || JYSDK.AdManager == null || JYSDK.AdManager.showRewardVideo == null) {
		return;
	}

	JYSDK.AdManager.showRewardVideo({
		data: {id: event},
	 	success: function(res) {
	 		cb && cb(true);
	 	},
	})
}

window.GlobalGame.showInterstitial = function(event, cb) {
	if (window.JYSDK == null || JYSDK.AdManager == null || JYSDK.AdManager.showRewardVideo == null) {
		return;
	}
	
	JYSDK.AdManager.showInterstitial({
		data: {id: event},
	 	success: function(res) {
	 		cb && cb(true);
	 	},
	})
}

window.GlobalGame.rankData = [];

(function() {

	var names = ['北京', '上海', '天津', '重庆', '黑龙江', '吉林', '辽宁', '内蒙古', '河北', '新疆', '甘肃', '青海', '陕西', '宁夏', '河南', '山东', '山西', '安徽', '湖南', '湖北', '江苏', '四川', '贵州', '云南', '广西', '西藏', '浙江', '江西', '广东', '福建', '台湾', '海南', '香港', '澳门',];
	function randomNum(min, max) {
		var dis = max - min;
		return Math.floor(Math.random() * dis + min);
	}

	function getTimeString() {
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		return '' + year + '-' + month + '-' + day;
	}

	function getMinutes() {
		var date = new Date();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		return hours * 60 + minutes;
	}

	function resetRates() {
		var arr = [];
		for (var i = 0; i < names.length; i++) {
			var v = Math.random() * 100 + 10;
			arr.push(v);
		}

		return arr;
	}

	function saveData(t, v) {
		let obj = {};
		obj[t] = v;
		window.localStorage.setItem('sheep_global_data', JSON.stringify(obj));
	}

	function getData() {
		var ret = null;
		var datas = window.localStorage.getItem('sheep_global_data');
		var timeKey = getTimeString();
		if (datas && datas.length > 5) {
			datas = JSON.parse(datas);
			ret = datas[timeKey];
		}

		if (ret == null) {
			ret = resetRates();
			saveData(timeKey, ret);
		}

		return ret;
	}

	var sheepArr = [];
	var rates = getData();
	var curTime = getMinutes();
	for (var i = 0; i < names.length; i++) {
		var item = {all_score: 0, win_score: 0, name: ''};
		item.all_score = parseInt(rates[i] * curTime);
		item.win_score = item.all_score;
		item.name = names[i];

		var result = [];
		for (var j = 0; j < 36; j++) {
			var sheep = {"state": 1, "fail": 30, "uid": 12345, "gender": 0, "skin": 10,};
			sheep.gender = randomNum(0, 2);
			sheep.skin = randomNum(1, 1);
			result.push(sheep);
		}

		item.result = JSON.stringify(result);
		sheepArr.push(item);
	}

	sheepArr.sort(function(a, b) {
		return b.win_score - a.win_score;
	})

	GlobalGame.rankData = sheepArr;
})();

