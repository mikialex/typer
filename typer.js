//字符列表
var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];
//'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',


var typer = function() {
    this.aim = document.getElementById("aim");
    this.current = document.getElementById("current");

    this.canvas = document.getElementById("can");
    this.canvas.height = 500;
    this.canvas.width = 1000;
    this.ctx = this.canvas.getContext("2d");

    this.record = [];
    this.aimString = new Array(19);
    this.currentString = new Array(19);

    this.timeA = Date.now();
    // this.timeB=null;
    // this.step=1;

    this.genNewString(this.aimString);
    this.aim.value = this.genStringOut(this.aimString);

    return this;
}

typer.prototype = {
    record: [],
    aimString: [],
    currentString: [],
    aim: null,
    current: null,
    canvas: null,
    ctx: null,
    timeA: null,
    timeB: null,
    step: 1,
};



typer.prototype.generateMixed = function(n) {
    var res = "";
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 35);
        res += chars[id];
    }
    return res;
}

typer.prototype.genNewString = function(container) {
    for (i = 0; i <= 19; i++) {
        container[i] = chars[Math.ceil(Math.random() * 35)];
    }
}

typer.prototype.genStringOut = function(container) {
    var s = "";
    for (i = 0; i <= 19; i++) {
        s = s + container[i];
    }
    return s;
}

typer.prototype.check = function() {
    //isGoing=true;
    if (this.current.value === this.aim.value) {
        this.genNewString(this.aimString);
        this.aim.value = this.genStringOut(this.aimString);
        this.current.value = "";
        this.timeB = Date.now();
        this.addRecord(1200000 / (this.timeB - this.timeA));
        this.drawData();
        this.timeA = Date.now();
    }

}

typer.prototype.addRecord = function(v) {
    this.record.push(v);
}

typer.prototype.drawData = function() {
    this.ctx.fillStyle = "fff";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "444";
    this.step = this.canvas.width / this.record.length;
    this.ctx.beginPath();
    this.ctx.moveTo(0, 500);
    // ctx.lineTo(500,500);
    // ctx.lineTo(20,0);
    for (i = 1; i <= this.record.length; i++) {
        this.ctx.lineTo(i * this.step, 500 - this.record[i - 1] * 2);
    }
    this.ctx.lineTo(1000, 500);
    this.ctx.closePath();
    this.ctx.fill();
}

var t1;

function intoPage() {
    t1 = new typer();
}

window.onload = intoPage;

function checkNow() {
    t1.check();
}
