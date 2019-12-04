var can = document.getElementById('canvas');

can.width =  window.innerWidth;
can.height = window.innerHeight;

var innerHeight = window.innerHeight;
var innerWidth = window.innerWidth;

var ctx = can.getContext("2d");


var clientX =0;
var clientY =0;

document.addEventListener ("mousemove", function () {

    clientX = event.clientX;
    clientY= event.clientY;

});

 function Octogon  (gravity,dx,dy,x,y,string){
     this.string = string;
     this.x=x;
     this.y=y;
     this.dx = dx;
     this.dy = dy;
     this.gravity = gravity;
     this.draw = function () {
        ctx.beginPath();
        ctx.moveTo ( this.x, this.y); // 0,0
        ctx.lineTo (this.x+50,this.y); // 50,0
        ctx.lineTo (this.x+85,this.y+35); // 85, 35
        ctx.lineTo (this.x+85,this.y+85);// 85, 85
        ctx.lineTo (this.x+50,this.y+120); // 50, 120
        ctx.lineTo (this.x,this.y+120); // 00, 120
        ctx.lineTo (this.x-35,this.y+85); // -35, 85
        ctx.lineTo (this.x-35,this.y+35); // -35, 35
        ctx.lineTo (this.x,this.y); //0, 0
        ctx.stroke();
        ctx.closePath();
     };
     this.update = function () {

        if (this.x+30 < clientX ) {
            this.x += this.dx;
        //    this.dx += this.gravity;
        }
        if (this.x+30 > clientX){
            this.x += -this.dx;
        //    this.dx += this.gravity;
        }
        if(this.y+65 < clientY){
            this.y += this.dy;
        //    this.dy += this.gravity;
        }
        if(this.y+65 > clientY){
            this.y+= -this.dy;
            // this.dy +=this.gravity;
        }
        // if (this.y+65 == clientY || this.x+30 == clientX) {
        //     this.dx= dx;
        //     this.dy = dy;
        // }  // supposed to implement gravity/acceleration but idk how yet.


        this.draw();

     }
 }


 var dx= 6;
 var dy= 6;
 var gravity = 0.05;
 var newObj = new Octogon(gravity,dx,dy, clientX, clientY,"hello");

 function background () {

    var greyGrad = ctx.createLinearGradient (0, window.innerHeight, 0, 0,);
    greyGrad.addColorStop (0, "#040466");
    greyGrad.addColorStop(1,"#071839");
    ctx.fillStyle = greyGrad;
    ctx.fillRect (0, 0, window.innerWidth, window.innerHeight);

 }
var x = 0;
var y = 0;
function animate (){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0, window.innerWidth, window.innerHeight);

    background();

     for (var i = 0; i < smallC.length; i++){

       smallC[i].update();
       console.log("hello");

     }
    //  for (var j =0; j<bigT.length;j++){

    // //    bigT[j].draw();
    //     console.log("hi");

    //  }

    newObj.update();
}
var smallC = [];

   var colors = ["#FFFC4F", "#807E28","#E6E347"];
    for (var i = 0; i<100; i++){
    var x =Math.floor( Math.random() * innerWidth);
    var y = Math.floor(Math.random() * innerHeight );
    var r = Math.floor(Math.random() * 4)+2;
    var dx = Math.floor(Math.random() * 4) +1;
    
    var colorIndex = Math.floor(Math.random() *3);
    var color = colors[colorIndex];

    var newC = new SmallCircles (dx,x,y,r,color);
    smallC.push(newC);
    }

var bigT = [];
var Tcolors = ["#454749", "#797C80","#B6BABF"];
    for (var i = 0; i>10; i++){
    var x =Math.floor( Math.random() * innerWidth);
    var y = Math.floor(Math.random() * innerHeight );
    var height = Math.floor(Math.random() * 10)+5;
    var dx = Math.floor(Math.random() * 4) +1;
    var length = Math.floor(Math.random() * 20) + 10;
    
    var colorIndex = Math.floor(Math.random() *3);
    var color = Tcolors[colorIndex];

    var newT = new SmallCircles (dx,x,y,height,length, color);
    bigT.push(newT);
    }


function BigTriangles (dx, x, y, height, length, color){
        this.height = height;
        this.length = length;
        this.x = x;
        this.y = y;
        this.color = color;
        this.draw = function () {
            ctx.beginPath();
            ctx.strokeStyle =color;
            ctx.fillStyle =color;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y+this.height);
            ctx.lineTo(this.x+this.length, this.y + (this.height/2));
            ctx.lineTo(this.x, this.y);
            ctx.stroke();
            ctx.closePath();
        }
        this.update = function () {
    
            if (this.x <0) {
                this.x = window.innerWidth+10;
            }
            else {
                this.x += -dx
            }
            this.draw();
        }
    



    }

 function SmallCircles (dx,x, y, radius,color) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.color = color;
    this.draw = function () {
        ctx.beginPath();
        ctx.strokeStyle =color;
        ctx.fillStyle =color;
        ctx.arc(this.x,this.y,this.radius,0, 2*Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
    this.update = function () {

        if (this.x <0) {
            this.x = window.innerWidth+10;
        }
        else {
            this.x += -dx
        }
        this.draw();
    }

 }

 animate();