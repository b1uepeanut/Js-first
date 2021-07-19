//JS calculator
//연산자의 우선순위에 따라서 계산하도록 수정하기
//by Narong
//2021.7.16

//input 객체
//입력을 담당하는 객체 
var input = { 'array': [] };

//입력받은 수식을 문자열로 return
input.getInput = function () {
    return this.array.join("");
};

//입렫 받은 배열을 초기화 
input.removeAll = function (value) {
    this.array = [];
    this.array.push(value);
};

//수식이 비었는지 검사
input.empty = function () {
    return this.array.length === 0;
};

//계산을 실행하기 전 준비 단계
//getValue()를 호출하기 전 반드시 수행되어야 함
//의존 관계를 줄이려면 바깥이 아니라, 안에서 호출하는게 좋다 ,,? (뭔소리)
input.prepareCalculate = function() {
    this.array= this.array.join("").split(" ");
}

//수식에서 값을 읽어옴
input.getValue = function(){
    var str =this.array.shift();
    var n = Number(str);
    return n;
};

//수식에서 연산자를 읽어옴
input.getOperator = function(){
    var op = this.array.shift();
    if(op === '+' || op === '-' || op === '*' || op === '/'){
        return op;
    } else {
        return "$"; 
    }
};

//output 객체 
//출력을 담당하는 객체
var output = {};
output.text = document.getElementById('output');

//계산 결과를 출력
output.print = function(str){
    this.text.innerHTML = str;
};

//수식을 출력
output.display = function() {
    this.text.innerHTML = input.getInput();
}


//calaculator 객체
//계산을 담당하는 객체 
var calculator = {};
calculator.calculator = function(first, second, op)
{
    var ret;
     switch(op)
     {
         case "+":
             ret = first + second; break;
         case "-":
             ret = first - second; break;
         default : 
             return NaN;
     }
    return ret;   
};



//숫자 버튼의 핸들러 함수 
var clickNumbers = function (event) {
    var str = event.target.innerHTML;
    console.log(str);

    if (str === 'bs')
    {
        input.array.pop();
    }
    else if (str === '+' || str === '-' || str === '*' || str === '/')
    {
        input.array.push(' ' + str + ' ');
    }
    else 
    {
        input.array.push(str);
    }

    
    if (input.empty())
    {
        output.text.innerHTML = 0;
    }
    else
     {
        output.display();
    }
};

// '=' 버튼의 핸들러 함수 
var showResult = function (event) {
    input.prepareCalculate();

    var result = input.getValue();

    for(var i = 0; i<input.array.length; i++)
    {
        if(input.array[i] === " * " || input.array[i] ===" / ")
        {
            if(input.array[i] === " / ")
            {
                input.array[i-1] = input.array[i-1] /  input.array[i+1];
            }
            else if (input.array[i] === ' * ')
            {
                input.array[i-1] = input.array[i-1] *  input.array[i+1];
            }
        }
        else
        {
            var op = input.getOperator();
            var second = input.getValue();
            result = calculator.calculator(result, second, op);
        }
    }
    // while (!input.empty()){
        
    // }

    output.print(result);
    input.removeAll(result);
}

