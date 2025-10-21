let soundplay = document.getElementById("sound");
let soundplay2 = document.getElementById("sound2");
let button = document.getElementById("button-section").querySelectorAll("div");
let screen = document.getElementById("screen");
let text = [
    "we wok detok not onle tok de tok",
    "hidup jokowi !!"
]
let button_map = [
    "1", "2", "3", "C",
    "4", "5", "6", "X",
    "7", "8", "9", "/",
    "0", "=", "+", "-",
];
let value = [""];
let state = false;

//assigning div as a button automatically cause im too lazy to write document.getElementById one by one for each div.
button.forEach((btn, index) => {
    btn.addEventListener('click', function(){
        insert(button_map[index]);
    });
})

function insert(a)
{
    console.log("Pressed:", a);
    console.log("Before:", value);
    if(a == "C")
    {
        state = false;
        value = [""];
        display(screen, value);
        return;
    }
    if(a == "=")
    {
        value = calculate(value);
        display(screen, value);
        return;
    }
    if (
    !["X", "/", "+", "-"].includes(value[value.length - 1]) &&
    !["X", "/", "+", "-"].includes(a)
    ) {
        value[value.length - 1] = value[value.length - 1] + a;
        display(screen, value);
        return;
    }
    value.push(a);
    display(screen, value);
}

function calculate(a)
{
    for(let i = a.length; i > 1; i--)
    {
        for(let i = 0; i < a.length; i++)
        {
            let hasil = 0;
            if(a[i] == "X")
            {
                hasil = a[i-1] * a[i+1];
                a[i-1] = hasil;
                a.splice(i, i+1);
            }
            else if(a[i] == "/")
            {
                hasil = a[i-1] / a[i+1];
                a[i-1] = hasil;
                a.splice(i, i+1);
            }
        }
        for(let i = 0; i < a.length; i++)
        {
            let hasil = 0;
            if(a[i] == "+")
            {
                hasil = parseInt(a[i-1]) + parseInt(a[i+1]);
                a[i-1] = hasil;
                a.splice(i, i+1);
            }
            else if(a[i] == "-")
            {
                hasil = a[i-1] - a[i+1];
                a[i-1] = hasil;
                a.splice(i, i+1);
            }
        }
    }
    return a;
}

function audioFunction(a, triggerText, current = 0)
{
    let i = current;
    if(i == a.length)
    {
        state = true;
        triggerText.innerHTML = 12;
        return;
    }
    triggerText.innerHTML = text[i];
    a[i].play();
    a[i].addEventListener("ended", ()=>
        {
            a[i].pause;
            i++
            audioFunction(a, triggerText, i);
        }
    )
}



function display(a, b)
{
    let text = "";
    b.forEach((item) => 
        {
            text += item;
            text += " ";
        }
    )
    if(b[0] == "12" && state == false)
    {
        audioFunction([soundplay2, soundplay], a);
        return;
    }
    a.innerHTML = text;
}