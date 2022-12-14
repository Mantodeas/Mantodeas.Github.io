window.onload = function(){
	/* 个位数转两位数 */
	function doubleNum(n){
		return (n <10) ? ("0" + n) : (n);
	}
	/* 储存信息 */
	var songName =["至此流年各天涯", "当我唱起这首歌"]
	var singers =["李志", "小贱"]
	/* 动态插入css代码片段 */
	var head = $('head')[0];
	function loadCssCode(code){
		var style = document.createElement('style');
		style.type = 'text/css';
		style.rel = 'stylesheet';
		style.id = 'style';
		try{
			//for Chrome Firefox Opera Safari
			style .appendChild(document.createTextNode(code));
		}catch(ex){
			//for IE
			style.styleSheet.cssText = code;
		}
		head.appendChild(style);
	}
	/* 定时器 */
	function oTimer(){
		real = setInterval( function(){
			realTime = parseInt(myMusic.currentTime);
			realMinute = doubleNum(parseInt(realTime/60));
			realSecond = doubleNum(realTime%60);
			oRealTime.innerHTML = realMinute + ":" + realSecond;
			left = (realTime*400)/totalTime;
			oSpot.style.left = (left-10) + "px";
			oProgress.style.width = left + "px";
			if(myMusic.ended){
				Play = false;
				oPaly.className = "play iconfont Iconfont icon-zanting";
				oPaly.title = "播放";
			}
		},1000)
	}
	/* 更新信息 */
	function update(){
		for(let i=0; i < 2; i++){
			$(".songName")[i].innerHTML = songName[I];
			$(".singer")[i].innerHTML = singers[I];
		}
		Txt = "#txt" + I;
		TXT = $(Txt);
		lrc = TXT.value;
		Initialize();
	}
	/* 上一首 */
	var I = 0; var arr = null; var Txt = null; var TXT = null;
	var lrc = txt0.value;
	
	/* 播放/暂停 */
	var oPaly = $(".play")[0];
	var Play = false;
	oPaly.onclick = function(){
		if(Play){
			myMusic.pause();
			Play = false;
			oPaly.className = "play iconfont Iconfont icon-zanting";
			oPaly.title = "播放";
			clearInterval(real);
		}else{
			myMusic.play();
			Play = true;
			oPaly.className = "play iconfont Iconfont icon-bofang";
			oPaly.title = "暂停";
			oTimer();
		}
	}
	/* 歌曲进度条 */
	var oProgress = $(".progress")[0];
	var oSpot = $(".spot")[0];
	progress();
	function progress(){
		oSpot.onmousedown = function(event){
			event = event || window.event;
			var offsetX = event.clientX - oSpot.offsetLeft -oSpot.offsetWidth/2;
			document.onmousemove = function(event){
				myMusic.muted = true;
				var left = event.clientX - offsetX;
				if(left < 0){
					left = 0;
				}else if(left > 400){
					left =400;
				}
				oSpot.style.left = (left-10) + "px";
				oProgress.style.width = left + "px";
				realTime = parseInt((left*totalTime)/400);
				realMinute = doubleNum(parseInt(realTime/60));
				realSecond = doubleNum(realTime%60);
				oRealTime = $(".realTime")[0];
				myMusic.currentTime = realTime;
				oRealTime.innerHTML = realMinute + ":" + realSecond;
			}
		}
	}
	/* 音频时间 */
	//总时长
	var real;
	var myMusic = $("#myMusic");
	var totalTime;
	var totalMinute;
	var totalSecond;
	var oTotalTime;
	/* 确保获取成功 */
	setTimeout( function(){
		if(myMusic.readyState == 4){
			totalTime = parseInt(myMusic.duration);
		}else{
			location.reload();
		}
		totalMinute = doubleNum(parseInt(totalTime/60));
		totalSecond = doubleNum(totalTime%60);
		oTotalTime = $(".totalTime")[0];
		oTotalTime.innerHTML = totalMinute + ":" + totalSecond;
	},200);
	/* 当前时长 */
	var realTime = parseInt(myMusic.currentTime);
	var realMinute = doubleNum(parseInt(realTime/60));
	var realSecond = doubleNum(realTime%60);
	var oRealTime = $(".realTime")[0];
	/* 音量 */
	var oShengyin = $(".icon-shengyin")[0];
	var oVolumeBox = $(".volumeBox")[0];
	var display = false;
	oShengyin.onclick = function(){
		if(display){
			oVolumeBox.style.display = "none";
			display = false;
		}else{
			oVolumeBox.style.display = "";
			display = true;
		}
	}
	/* 音量进度条 */
	var oVolume = $(".volume")[0];
	var ovolumeSpot = $(".volumeSpot")[0];
	ovolumeSpot.onmousedown = function(event){
		event = event || window.event;
		var offsetY = event.clientY - ovolumeSpot.offsetTop + ovolumeSpot.offsetHeight/2;
		document.onmousemove = function(event){
			var bottom = (80- (event.clientY - offsetY));
			if(bottom < 0){
				bottom = 0;
			}else if(bottom > 80){
				bottom =80;
			}
			ovolumeSpot.style.bottom = (bottom + 5) + "px";
			oVolume.style.height = bottom + "px";
			myMusic.volume = bottom/80;
		}
	}
	document.onmouseup  = function(){
		myMusic.muted = false;
		document.onmousemove = null;
		oVolumeBox.style.display = "none";
		display = false;
	}
	
	/* 初始化页面 */
	var str = "";
	/* 歌曲,歌手名称，歌单 */
	for(let i=0; i < 2; i++){
		$(".songName")[i].innerHTML = songName[0];
		$(".singer")[i].innerHTML = singers[0];
		str += `<p><span class="l">${songName[i]}</span><span >--</span><span class="r">${singers[i]}</span></p>`;
	}
	/* 解析lrc */
	var lrcArr = lrc.split("[");
	var html = "";
	var oLyric = $(".Lyric")[0];
	Initialize();
	function Initialize(){
		for(let i=0; i < lrcArr.length ; i++){
			lrcArr = lrc.split("[");
			arr = lrcArr[i].split("]");
			var time = arr[0].split(".");
			var timer = time[0].split(":");
			var ms = timer[0] * 60 + timer[1] * 1;
			var text = arr[1];
			if(text){
				html += "<p id=" + ms +">" + text + "</p>";
			}
			oLyric.innerHTML = html;
			arr[0] = null; arr[1] = null;
		}
		html = "";
	}
	var oP = oLyric.getElementsByTagName("p");
	/*歌词滚动*/
	myMusic.addEventListener("timeupdate",function(){
	    if($("#"+realTime)){
			/*清除样式*/
	        for(let i=0; i < oP.length ; i++){
	            oP[i].style.cssText = "font-size: 16px;";
	        }
			/* 歌词滚动 */
	        $("#"+realTime).style.cssText = "background: linear-gradient(-3deg,rgba(255,255,255,0.8) 0%,rgba(128,128,128,0.8) 60%);-webkit-background-clip: text;color: transparent;font-size: 20px;";
			//获得滚动窗口距离浏览器的距离
			var Distance1 = oLyric.offsetTop;
			//获得当前歌词距离浏览器顶部的距离
			var Distance2 = $("#"+realTime).offsetTop;
			//获得当前歌词距离滚动窗口的距离
			var Distance3 = Distance2-Distance1;
			//获得滚动窗口的滚动距离
			var Rolling = Distance2-Distance1-153;
			//比较当前歌词距离滚动窗口的距离，大于153，就让窗口滚动
			if(Distance3>153){
				oLyric.scrollTop = Rolling;
			}
	    }
		/* 播放完毕归位 */
		if(realTime >= (totalTime-1)){
			oLyric.scrollTop = 0;
		}
	})
	
}