var utils={}
//实现动画循环：requestAnimationFrame
if(!window.requestAnimationFrame)
window.requestAnimationFrame=window.webkitRequestAnimationFrame||
							 window.mozRequestAnimationFrame||
							 window.msRequestAnimationFrame||
							 window.oRequestAnimationFrame||
							 function(callback){ 
							 	window.setTimeout(callback,1000/60);
							 };
if(!window.cancelRequestAnimationFrame){
	window.cancelRequestAnimationFrame=window.cancelAnimationFrame||
									window.webkitCancelRequestAnimationFrame||
									window.oCancelRequestAnimationFrame||
									window.mozCancelRequestAnimationFrame||
									window.msCancelRequestAnimationFrame||
									window.clearTimeout;
}
 //捕捉鼠标位置
utils.captureMouse=function(element){
 	var position={x:0,y:0};
 	element.addEventListener("mousemove",function(ev){
 		ev=ev||window.event;
 		if(ev.pageX&&ev.pageY){
 			position.x=ev.pageX-element.offsetLeft;
 			position.y=ev.pageY-element.offsetTop;
 		}
 		else{
			position.x=ev.clientX+document.body.ScrollLeft+document.documentElement.ScrollLeft-element.offsetLeft;
 			position.y=ev.clientY+document.body.ScrollTop+document.documentElement.ScrollTop-element.offsetTop;
 		}
 	},false);
 	return position;
 }
 utils.captureTouch=function(element){
 	var position={x:null,y:null,isPressed:false};
 	element.ontouchstart=function(ev){		
 		position.isPressed=true;
 			
 	}
 	element.ontouchend=function(){
 		position.isPressed=false;
 		position.x=null;
 		position.y=null;
 	}
 	element.ontouchmove=function(ev){
 		ev=ev||window.event;
 		var touch_position=ev.touchs[0];
 		if(touch_position.pageX&touch_position.pageY){
 			position.x=touch_position.pageX-element.offsetLeft;
 			position.y=touch_position.pageY-element.offsetTop;
 		}
 		else{
			position.x=touch_position.clientX+document.body.ScrollLeft+document.documentElement.ScrollLeft-element.offsetLeft;
 			position.y=touch_position.clientY+document.body.ScrollTop+document.documentElement.ScrollTop-element.offsetTop;

 		}
 	}
 	return position;
 }

//将颜色值"#FFFFFF"或FFFFFF格式转化为alpha(r,g+,b,alpha)格式,若带有alpha则转化为alpha(r,g,b,alpha)格式;

utils.colorToRGB=function(color,alpha){
	if(typeof color=="string"&color[0]=="#"){
		var color=window.parseInt(color.splice(1),16);
	}
	alpha=(alpha==undefined)?1:alpha;
	var r=color>>16&0xff;
	var g=color>>8&0xff;
	var b=color&0xff;
	alpha=(alpha<0)?0:(alpha>1?1:alpha);
	if(alpha==1)
		return "alpha("+r+","+g+","+b+")";
	else
		return "alpha("+r+","+g+","+b+","+alpha+")";
}

//将颜色值"#FFFFFF"格式转化为数字格式或者将FFFFFF格式转化为"#FFFFFF"
utils.parseColor=function(color,ToNumber){
	if(ToNumber){
		if(typeof color=="string"&color[0]=="#"){
			color=window.parseInt(color.splice(1),16);
		}
		return color;
	}
	else{
		if(typeof color=="number"){
			color="#"+("00000"+(color|0).toString(16)).substr(-6);
		}
		return color;	
	}
	return color;
}
utils.containsPoint=function(rect,x,y){
	return !(x<rect.x||x>rect.x+rect.width||y<rect.y||y>rect.y+rect.height);
}
utils.intersects=function(rectA,rectB){
	return !(rectA.x+rectA.width<rectB.x||
			rectB.x+rectB.width<rectA.x||
			rectA.y+rectA.height<rectB.y||
			rectB.y+rectB.height<rectA.y);
}