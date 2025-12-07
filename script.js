//get the elements
const button=document.getElementById("start");
const scoreBoard=document.getElementById("score");
const board=document.getElementById("board");

//cells array to collect each cell
const cells=[];
let size=20; //the size of our grid 20*20

//function to create a grid
function createGrid(){
    //clear the board first
    board.innerHTML="";
    cell=[];
    //create a grid
    for(let i=0;i<size*size;i++){
        //create a div element
        const cell=document.createElement("div");
        //add the classlist
        cell.classList.add("cell");
        //append it to the board
        board.appendChild(cell);
        //push it to the cells array
        cells.push(cell);
    }
}

createGrid();

//lets draw the snake and food
let snake=[{x:10,y:10}]; //initial position
let food={x:5,y:5};
let direction="RIGHT";
let gameInterval=null;
let score=0;



function draw(){
    //clear the grid first
    cells.forEach(cell=>cell.classList.remove("snake","food"));

    snake.forEach((part)=>{
        let index=part.y*size+part.x;
        cells[index].classList.add("snake");
    });

    //add the food
    let index=food.y*size+food.x;
    cells[index].classList.add("food");

}

draw();

//function to move the snake
function move(){
    //get a shallow copy of the first snake element
    const head={...snake[0]};
    //check the direction and move the head accordingly
    if(direction==="UP") head.y--;
    if(direction==="DOWN") head.y++;
    if(direction==="LEFT") head.x--;
    if(direction==="RIGHT") head.x++;

    snake.unshift(head);

    //function to check for collission with the border
    //to be added later
    

    //check if it is collided with the food 
    if(head.x===food.x && head.y===food.y){
        //update the score;
        score++;
        scoreBoard.innerHTML=`Score ${score}`;
          placeFood();
    }
    else{
        snake.pop();
    }

    //draw it again
    draw();
  
}

//function to randomly place the food
function placeFood(){
    food.x=Math.floor(Math.random()*size);
    food.y=Math.floor(Math.random()*size);
}

//add event listner to the document
document.addEventListener("keydown",(e)=>{
    //detect the keys and set the direction accordingly

   switch(e.key){
    case "ArrowUp":
        direction="UP";
        break;
    case "ArrowDown":
        direction="DOWN";
        break;
    case "ArrowLeft":
        direction="LEFT";
        break;
    case "ArrowRight":
        direction="RIGHT";
        break;
    default:
        return; //quit when the key doesn't handle the key event  
   }
});

//add event listner to the start button
button.addEventListener('click',()=>{
    //clear the previous interval
    clearInterval(gameInterval);
    //create a grid
    createGrid();
    direction="RIGHT";
    score=0;
    scoreBoard.textContent=`Score: ${score}`;
    snake=[{x:10,y:10}];
    food={x:5,y:5};
    placeFood();
     draw();

    gameInterval=setInterval(move,200);
});