var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
    setUpModeButtons();
    setUpSquares();    
    reset();
}

function setUpModeButtons(){
    for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
    
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6; //This does the same as the if statement below.
            // if(this.textContent === "Easy"){
            //     numSquares = 3;
            // } else {
            //     numSquares = 6;
            // }
    
            reset();
    
            //how many squares need to be shown
            //pick new colors
            //pick a new pickedColor
            //update page to refelect changes
        });
    }
};

function setUpSquares(){
    for(var i = 0; i < squares.length; i++){
        //add click listentsers to squares
        squares[i].addEventListener("click", function(){
            //grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            //compare the color to pickedColor
            if(clickedColor === pickedColor){
                messageDisplay.textContent = "Correct!";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
                resetButton.textContent = "Play again?";
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try again";
            }
        });
    }
};

function reset (){
    //generate new colors
    colors = generateRandomColors(numSquares);
    //pick new random color
    pickedColor = pickColor();
    //change color display to match
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New colors"; //'this' refers to resetButton as we are in its event listener.
    messageDisplay.textContent = "";
    //change colors of squares
    for (var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
        
    }
    h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function(){
    reset();
});

colorDisplay.textContent = pickedColor;

function changeColors(color) {
    //loop through all squares
    for(var i = 0; i < squares.length; i++){
        //change each color to match a given color
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num){
    //make an array
    var arr = [];
    //add num random colors to array
    for(var i = 0; i < num; i++) {
        //get random color and push into arr
        arr.push(randomColor());
    }
    //return array
    return arr;
}

function randomColor() {
    //pick a 'red' from 0-255
    var r = Math.floor(Math.random() * 256); //Math.Floor rounds down the number, therefore the maximum is 255, minimum is 0
    //pick a 'green' from 0-255
    var g = Math.floor(Math.random() * 256);
    //pick a 'blue' from 0-255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r +", " + g + ", " + b + ")";
}