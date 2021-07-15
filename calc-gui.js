var input = {'array' : []};
input.getInput = function()
{
    return this.array.join("");
};

var output = {};
output.text = document.getElementById('output');

var clickNumbers = function(event)
{
    var str = event.target.innerHTML
    console.log(str);
    switch(str)
    {
        case 'bs':
            input.array.pop(); break;
        case '+':
            input.array.push(' ' + str + ' '); break;
        case '-':
            input.array.push(' ' + str + ' '); break;
        case '*':
            input.array.push(' ' + str + ' '); break;
        case '/':
            input.array.push(' ' + str + ' '); break;
        default:
            input.array.push(str);
    }

    if(input.array.length === 0)
    {
        output.text.innerHTML = 0;
    }
    else
    {
    output.text.innerHTML = input.getInput();
    }
}

var showResult = function(event)
{
    var str = event.target.innerHTML
    console.log(str);
}