var aimString =new Array(19);
var currentString =new Array(19);

// var record=[67,87,67,85,78,13,134];
var record=[];
var timeA;
var timeB;

var canvas;
var ctx;
var step;

var aim;
var current;

//var isGoing=false;


//'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',

//字符列表
var chars = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f',
'g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

//生成n个随机字符
function generateMixed(n) {
     var res = "";
     for(var i = 0; i < n ; i ++) {
         var id = Math.ceil(Math.random()*35);
         res += chars[id];
     }
     return res;
}


function genNewString(container){
	for(i=0;i<=19;i++){
		container[i]=chars[Math.ceil(Math.random()*35)];
	}
}

function genStringOut(container){
	var s="";
	for(i=0;i<=19;i++){
		s=s+container[i];
	}
	return s;
}

function init(){
    genNewString(aimString);
    aim=document.getElementById("aim");
    current=document.getElementById("current");
    aim.value=genStringOut(aimString);

    canvas = document.getElementById("can");
    // canvas.height=document.getElementById("can").style.height;
    // canvas.width= document.getElementById("can").style.width;
        canvas.height=500;
    canvas.width= 1000;
    ctx = canvas.getContext("2d");

    timeA=Date.now();
    drawData();
}

function check(){
	//isGoing=true;
	if(current.value===aim.value){
		genNewString(aimString);
        aim.value=genStringOut(aimString);
        current.value="";
        timeB=Date.now();
        addRecord(1200000/(timeB-timeA));
        drawData();
        timeA=Date.now();
	}

}

function addRecord(v){
   record.push(v);
}

function drawData(){
	ctx.fillStyle="fff";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    
    ctx.fillStyle="444";
	step=canvas.width/record.length;
	ctx.beginPath();
	ctx.moveTo(0,500);
	// ctx.lineTo(500,500);
	// ctx.lineTo(20,0);
	for(i=1;i<=record.length;i++){
        ctx.lineTo(i*step,500-record[i-1]*2);
	}
	ctx.lineTo(1000,500);
	ctx.closePath();
	ctx.fill();
}

window.onload=init;

















