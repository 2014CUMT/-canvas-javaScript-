//封装一个ball类,参数为半径和颜色，
//球的默认半径40像素，红色，球的属性有大小(半径和x，y扩大的倍数)，位置，样式（颜色，边框），旋转角度
//为ball添加draw方法,实现在设置好球的位置，大小，样式下画出球
function Ball(radius,color){
    if(radius==undefined) radius=40;
    if(color==undefined) color="#ff0000";
    this.x=0;
    this.y=0;
    this.radius=radius;
    this.scaleX=1;
    this.scaleY=1;
    this.ax=0;
    this.ay=0;
    this.mass=1;
    //this.color=utils.parseColor(color,false);
    this.color=color;
    this.rotation=0;
    this.lineWidth=1;
    this.vx=0;
    this.vy=0;
}
Ball.prototype.draw=function(oGc){
 	oGc.save();	
 	oGc.translate(this.x,this.y);

 	oGc.rotate(this.rotation);
 	oGc.scale(this.scaleX,this.scaleY);
 	oGc.fillStyle=this.color;
 	oGc.lineWidth=this.lineWidth;
    oGc.beginPath();
 	oGc.arc(0,0,this.radius,0,2*Math.PI,false);
    oGc.closePath();
 	oGc.fill();
    if(this.lineWidth>0){
        oGc.stroke();
    }
 	oGc.restore();
 /*	alert(this.r);*/
}
Ball.prototype.getBounds=function(){return{
        x:this.x-this.radius,
        y:this.y-this.radius,
        width:this.radius*2,
        height:this.radius*2
    };
}