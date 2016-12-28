function Arrow(){
	this.x=0;
	this.y=0;
	this.color="#FF0000";
	this.rotation=0;
}
Arrow.prototype.draw=function(oGc){
	oGc.save()
	oGc.translate(this.x,this.y);
	oGc.rotate(this.rotation);
	oGc.beginPath()
	oGc.moveTo(50,0);
	oGc.lineTo(0,-50);
	oGc.lineTo(0,-25);
	oGc.lineTo(-50,-25);
	oGc.lineTo(-50,25);
	oGc.lineTo(0,25);
	oGc.lineTo(0,50);
	oGc.lineTo(50,0);
	oGc.closePath();
	oGc.fillStyle=this.style;
	oGc.fill();

	oGc.restore();
}
