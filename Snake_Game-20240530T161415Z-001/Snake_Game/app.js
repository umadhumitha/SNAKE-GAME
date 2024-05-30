const gameboard=document.getElementById("gameboard");
const context=gameboard.getContext('2d'); //then only we can performing drawing and fill colour
const scoreText=document.getElementById('scoreVal')
const width=gameboard.width;
const height=gameboard.height;
const unit=25;
let foodX,foodY;
let snake=[
  {x:3*unit,y:0},{x:2*unit,y:0},{x:1*unit,y:0},{x:0,y:0},
]
let xVel=25,yVel=0;
let score=0;
let active=true;
let started=false;

startGame();

window.addEventListener('keydown',keyPress);


function startGame()
{context.fillStyle="black";
context.fillRect(0,0,width,height);
//x,y cordinates,width ,height ,here the 0,0 signifies the starting position of the recatngle,using -ve we can change direction of colouring
//here hard coding is avoided by getting the value using the id
createFood();
displayFood();
drawSnake();
// moveSnake();
// clearBoard();
// drawSnake();
}


function clearBoard()
{
  context.fillStyle="#212121";
context.fillRect(0,0,width,height);
}

function createFood()
{
foodX=Math.floor(Math.random()*width/unit)*unit;
foodY=Math.floor(Math.random()*height/unit)*unit;
}

function displayFood()
{
context.fillStyle='green';
context.fillRect(foodX,foodY,unit,unit);
}

function drawSnake()
{
context.fillStyle="violet";
context.strokeStyle="black";
snake.forEach((snakePart)=>
{
  context.fillRect(snakePart.x,snakePart.y,unit,unit);
  context.strokeRect(snakePart.x,snakePart.y,unit,unit);
})
}

function moveSnake()
{
const head={x:snake[0].x+xVel,y:snake[0].y+yVel}
snake.unshift(head)
if(snake[0].x==foodX && snake[0].y==foodY)
{
score+=5;
scoreText.innerHTML=score;
createFood();
}
else
{
snake.pop()
}
}

function nextTick()
{
  if(active)
  {
  setTimeout(()=>{
  clearBoard();
  displayFood();
  moveSnake();
   drawSnake();
   checkGameOver();
   nextTick();

  },400)
}
else{
  clearBoard();
  context.font="bold 50px serif";
  context.fillStyle="white";
  context.textAlign="center"
  context.fillText("GAME OVER!!",width/2,height/2);
  document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {  
        event.preventDefault();
        location.reload();
    }
});
}
}

function keyPress(event)
{
if(!started)
{
  started=true;
  nextTick();
}
const left=37;
const right=39;
const up=38;
const down=40;
switch(true)
{
case(event.keyCode==left && xVel!=unit):
  xVel=-unit;
  yVel=0;
  break;
case (event.keyCode==right && xVel!=-unit):
  xVel=unit;
  yVel=0;
  break;
case (event.keyCode==up && yVel!=unit):
  xVel=0;
  yVel=-unit;
  break;
case(event.keyCode== down && yVel!=-unit):
  xVel=0;
  yVel=unit;
  break;
}
}

function checkGameOver()
{
switch(true)
{
  case(snake[0].x<0):
  active=false;
  break;
  case(snake[0].x>=width):
  active=false;
  break;
  case(snake[0].y<0):
  active=false;
  break;
  case(snake[0].y>=height):
  active=false;
  break;
}
 
}