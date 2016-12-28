function Line(x1,y1,x2,y2){
	//以(0,0)点位旋转点。
	this.x=0;
	this.y=0;
	this.x1=(x1===undefined)?0:x1;
	this.y1=(y1===undefined)?0:y1;
	this.x2=(x2===undefined)?0:x2;
	this.y2=(y2===undefined)?0:y2;
	this.rotation=0;
	this.scaleX=1;
	this.ScaleY=1;
	this.lineWidth=1;
	this.k=null;
	this.b=null;
}
Line.prototype.draw= function(context) {
	context.save();
	//将line以(x,y)为中心旋转了this.rotation。
	//只有保证旋转点和线段在同一条直线上才能使旋转角度等于旋转后得到的斜边的角度。
    //所以在设置this.x,this.y,this.x1,this.y1,this.x2,this.y2时要注意。
    //this.y1,this.y2必须相等。在this.y不是0时,而this.y1,this.y2只能设置为0。在this.y1,this.y2相等并且不为零时。this.y必须也是this.y1,this.y2。
	context.translate(this.x,this.y);
	context.rotate(this.rotation);
	context.scale(this.scaleX,this.scaleY);
	context.lineWidth=this.lineWidth;
	context.beginPath();
	context.moveTo(this.x1,this.y1);
	context.lineTo(this.x2,this.y2);
	context.closePath();
	context.stroke();
	context.restore();
};
Line.prototype.getBounds=function(){
	if(this.rotation===0){
		var minX=Math.min(this.x1,this.x2);
		var maxX=Math.max(this.x1,this.x2);
		var minY=Math.max(this.x1,this.x2);
		var maxY=Math.max(this.y1,this.y2);
		return {
			x:this.x+minX,
			y:this.y+minY,
			width:maxX-minX,
			hieght:maxY-minY
		};
	}else{
			//如果有旋转,则将坐标旋转
			var cos=Math.cos(this.rotation);
			var sin=Math.sin(this.rotation);
			var x1=this.x1*cos+this.y1*sin;
			var y1=this.y1*cos+this.x1*sin;
			var x2=this.x2*cos+this.y2*sin;
			var y2=this.y2*cos+this.x2*sin;
			return {
				x:this.x+Math.min(x1,x2),
				y:this.y+Math.min(y1,y2),
				width:Math.max(x1,x2)-Math.min(x1,x2),
				hieght:Math.max(y1,y2)-Math.min(y1,y2)
			};

		}
}
Line.prototype.getDistance=function(x,y){
		var cos=Math.cos(this.rotation);
		var sin=Math.sin(this.rotation);

		var dx1=this.x1;
		var dy1=this.y1;
		var dx2=this.x2;
		var dy2=this.y2;
		
		var x1=dx1*cos-dy1*sin+this.x;
		var y1=dy1*cos+dx1*sin+this.y;
		var x2=dx2*cos-dy2*sin+this.x;
		var y2=dy2*cos+dx2*sin+this.y;
		this.k=(y2-y1)/(x2-x1);
		this.b=y1-this.k*x1;

	if(Math.abs(x2-x1)>0.001){
		var distance=Math.abs(this.k*x+this.b-y)/Math.sqrt(this.k*this.k+1);
		return distance;
	}
	else{
		return Math.abs(x-x1);
	}	
}
Line.prototype.onLine=function(x,y){
	
		
		var cos=Math.cos(this.rotation);
		var sin=Math.sin(this.rotation);
		var dx1=this.x1;
		var dy1=this.y1;
		var dx2=this.x2;
		var dy2=this.y2;

		var x1=dx1*cos-dy1*sin+this.x;
		var y1=dy1*cos+dx1*sin+this.y;
		var x2=dx2*cos-dy2*sin+this.x;
		var y2=dy2*cos+dx2*sin+this.y;

		this.k=(y2-y1)/(x2-x1);
		this.b=y1-this.k*x1;
	if(y==this.k*x+this.b){
		return 0;
	}else if(y>this.k*x+this.b){
		return 1;
	}else{
		return -1;
	}
}
