var Pole = function (ctx){
    this.ctx = ctx;
    //this.color="rgba(255,255,255,1)";
    this.color="rgba(249, 234, 52, 1)";
    this.x;
    this.y;
    this.r;
    this.height = 220;
    this.circleCounter = 0;
   }


 Pole.prototype = {
       display:function(){
        this.ctx.fillStyle = this.color;
        //draw the rect
        ctx.fillRect(this.x,this.y,25,this.height);
         //this.ctx.fill();
        // this.ctx.stroke();
       }
 }
