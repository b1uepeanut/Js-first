//html elements
var word1 = document.getElementById('world1'); //answer
var world2 = document.getElementById('world2'); //buttons
var check = document.getElementById('check'); //word1 === word2
var progress = document.getElementById('progress'); //progress check
var time = document.getElementById('time');

//game objects
var game = { 
    'btns': [],
    'maxPlay' : 3,
    'current' : 0
};

game.startTime = Date.now();
game.words = 'apple,banana,melon,grape,avocado,apricot,plum'.split(',');

//choose 1 wodr from words
game.choose = function () {
    var idx = Math.floor(Math.random() * this.words.length);
    this.answer = this.words[idx];
    this.letters = this.answer.split('');
    word1.innerHTML = this.answer;
};

game.addButttons = function () {
    for (var i = 0; i < this.letters.length; i++) {
        var btn = document.createElement('button');
        btn.innerHTML = this.letters[i];
        world2.appendChild(btn);
        this.btns.push(btn);
    }
};

game.removeButtons = function(){
    for(var i = 0; i<this.btns.length; i++){
        world2.removeChild(this.btns[i]);;
    }
    this.btns = [];
};

game.checkGood = function()
{
    return this.answer === this.letters.join('');
};

game.updateDisplay = function () {
    if (this.checkGood()) {
        check.innerHTML = '일치!';
    } else {
        check.innerHTML = '일치하지 않음!!';
    }
};
game.init = function () {
    this.choose();
    this.addButttons();
    this.updateDisplay();
};

game.init();

game.copyBtnText = function () {
    for (var i = 0; i < this.letters.length; i++) {
        this.btns[i].innerHTML = this.letters[i];

    }
};

game.swap = function(){
    var temp = [];
    //copy and swap
    while (game.letters.length != 0) {
        var s = game.letters.pop();
        temp.push(s);
    }
    game.letters = temp;
    game.copyBtnText();
    game.updateDisplay();
};

game.Rshift = function(){
    var n = game.letters.pop();
    game.letters.unshift(n);
    game.copyBtnText();
    game.updateDisplay();
};
game.Lshift = function(){
    var n = game.letters.shift();
    game.letters.push(n);
    game.copyBtnText();
    game.updateDisplay();
};

game.progress = function(){
    if(game.checkGood()){
        game.current++;
        game.removeButtons();
        game.init();
        game.shuffle();
        var str ='';
        for(var i =0; i< game.current; i++){
            str += '0';
        }
        progress.innerHTML = str;
    }
    if(game.current == game.maxPlay){
        var sec = (Date.now() - game.startTime) / 1000;
        alert("Good! Thank you for playing " + sec + ' sec');
        clearInterval(x);
    }

}
//event handler for swap button
var swap = function () {
    game.swap();
    game.progress();
};

var Rshift = function () {
    game.Rshift();
    game.progress();
};

var Lshift = function () {
    game.Lshift();
    game.progress();
};

var random = function () {
    var ran = Math.floor(Math.random() * 10) + 1
};


//shuffle
game.shuffle = function () {
    var toggle = Math.floor(Math.random() * 2) === 0;

    if (toggle) {
        game.swap();
    }

    var rmax = Math.max(game.answer.length -2, 1);
    var n = Math.floor(Math.random() * rmax) + 1;
    for (var i = 0; i < n; i++) {
        game.Rshift();
    }
};

game.shuffle();

var updateTime = function(){
    var now = Date.now() - game.startTime;
    time.innerHTML = (now / 1000);
};

var x = setInterval(updateTime, 50);