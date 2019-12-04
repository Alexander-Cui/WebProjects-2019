var can = document.getElementById('canvas');

var innerHeight = window.innerHeight -100;
var innerWidth = window.innerWidth;

can.width =  innerWidth;
can.height = innerHeight;
var ctx = can.getContext("2d");

var verticalOffset = can.offsetTop;
var horizontalOffset = can.offsetLeft;

var clientX =0;
var clientY =0;

document.addEventListener ("mousemove", function () {

    clientX = event.clientX - horizontalOffset;
    clientY= event.clientY - verticalOffset;

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
        ctx.fillStyle="#C95A2A";
        ctx.fill();
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

 function background () {

    var greyGrad = ctx.createLinearGradient (0, window.innerHeight, 0, 0,);
    greyGrad.addColorStop (0, "#040466");
    greyGrad.addColorStop(1,"#071839");
    ctx.fillStyle = greyGrad;
    ctx.fillRect (0, 0, window.innerWidth, window.innerHeight);

 }

function createStars (smallC) {

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
    return smallC;
}
var newT = new BigTriangles ( 5, 100, 100, 50, 100, "#65D679");

function animate (){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0, window.innerWidth, window.innerHeight);

    background();

     for (var i = 0; i < smallC.length; i++){

       smallC[i].update();
    //    console.log("hello");

     }
    //  for (var j =0; j<bigT.length;j++){

    //    bigT[j].update();
    //     console.log("hi");

    //  }
     newT.update();
     for (var i = 0; i< enemyShips.length; i++ ) {

        enemyShips[i].update();

     }


    playerObj.update();
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
            ctx.lineTo(this.x-this.length, this.y + (this.height/2));
            ctx.lineTo(this.x, this.y);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
        this.update = function () {
    
            if (this.x <0) {
                this.x = window.innerWidth+10;
                this.y = Math.floor(Math.random () * innerHeight); // starts at a random y location
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

 function generateTriangleShips (enemyShips, inputheight, inputlength, inputcolor, inputBaseSpeed) {
    var baseSpeed = inputBaseSpeed;
    var height = inputHeight; //height all ships have same height
    var length = inputLength;     //length all ships have same length
    var color = inputColor //color all ships have same color

    for (var i= 0; i<15; i++ ) { //we'll have 15 enemy ships

        var newEnemy = new BigTriangles (speed, posX, posY, height, length, color);
        var speed = Math.floor (Math.random() * 4 ) + baseSpeed;   //speed
        var posX = Math.floor (Math.random () * 800 ) + innerWidth; //startx. Start off the screen and a random disance away so they appear one at a time 
        var posY = Math.floor(Math.random () * innerHeight);    //starty random spot vertically in canvas
        enemyShips.push(newEnemy);

    }
    return enemyShips
 }
 var newT = new BigTriangles ( 5, 100, 100, 50, 100, "#65D679");

 var enemyShips = [];
 var inputHeight = 50;
 var inputLength=  100;
 var inputColor = "#65D679";
 var inputBaseSpeed = 5;
 enemyShips = generateTriangleShips (enemyShips, inputHeight, inputLength, inputColor, inputBaseSpeed);
 var dx= 6;
 var dy= 6;
 var gravity = 0.05;
 var playerObj = new Octogon(gravity,dx,dy, clientX, clientY,"hello");

 var smallC = [];
 createStars(smallC);
 animate();