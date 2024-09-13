document.addEventListener("click", clicking); //for left click
document.addEventListener('contextmenu', clicking); //for right click
ctx = document.getElementById("canvas").getContext("2d"); 
ctx.strokeStyle = 'black';
ctx.fillStyle = 'red'; //for marking squares which the players thinks contains a mine
let mine_count = 10;
const height = 9; const width = 9;
let mine_arr = [];
let mine_left_click = [];
let mine_right_click = [];
let game_over = false;
for (let i = 0; i < 81; i++){
  mine_arr.push(0);
  mine_left_click.push(false);
  mine_right_click.push(false);
}

for (let i = 0; i < mine_count; i++) {
  mine = parseInt(Math.random() * (height * width));
  if (mine_arr[mine] != 1000) {
    mine_arr[mine] = 1000;
  }
  else {
    i--;
  }
}

for (let i = 0; i < (height*width); i++) {
  if (mine_arr[i] != 1000) {
    mine_arr[i] = countmines(mine_arr, i)
  }
}

for (let i = 1; i < 10; i++) {
  for (let j = 1; j < 10; j++) {
    ctx.strokeRect(i*50, j*50, 50, 50);
  }
}

function countmines (arr, position) {
  if (position == 0){
    return parseInt((arr[1] + arr[width] + arr[width+1])/1000);
  }
  else if (position == 8){
    return parseInt((arr[7] + arr[width+8] + arr[width+7])/1000);
  }
  else if (position == width*(height-1)) {
    return parseInt((arr[width*(height-1)+1] + arr[width*(height-2)] + arr[width*(height-2)+1])/1000);
  }
  else if (position == width * height - 1) {
    return parseInt((arr[width*height-2] + arr[width*(height-1)-1] + arr[width*(height-1)-1-2])/1000);
  }
  else if (position < width){
    return parseInt((arr[position-1] + arr[position+1]+arr[position + width] + arr[position+width-1]+ arr[position+width+1])/1000);
  }
  else if (position >= width*(height-1)) {
    return parseInt((arr[position-1]+arr[position+1]+arr[position - width]+arr[position-width-1]+arr[position-width+1])/1000);
  }
  else if (position % width == 0) {
    return parseInt((arr[position-width]+arr[position+1]+arr[position + width]+arr[position-width+1]+arr[position+width+1])/1000);
  }
  else if ((position+1) % width == 0) {
    return parseInt((arr[position-1]+arr[position-width]+arr[position + width]+arr[position+width-1]+arr[position-width-1])/1000);
  }
  else {
    return parseInt((arr[position-1] + arr[position+1] + arr[position + width] + arr[position+width-1] + arr[position + width + 1] + arr[position-width] + arr[position-width+1] + arr[position-width-1])/1000);
  }
}

ctx.font = "30px Arial";
ctx.fillText("mine count: " + mine_count, 550, 200)
function clicking (event) {
  const x = event.pageX;
  const y = event.pageY;
  const position = parseInt(y/50-1)*9+parseInt((x/50-1));
  if (event.button === 0 && mine_left_click[position] == false && game_over == false ){
  if (mine_arr[position] == 1000) {
    gameover();
  }
  else if (x <= 500 && y <= 500){
    ctx.font = "20px Arial";
    ctx.fillText(mine_arr[position], Math.floor(x/50)*50+20, Math.floor(y/50)*50+30);
    mine_right_click[position] = true;
  } }
  else if (event.button === 2 && mine_right_click[position] == false && game_over == false){
    if (mine_left_click[position] == false) {
      ctx.fillRect(Math.floor(x/50)*50, Math.floor(y/50)*50, 50, 50)
      mine_left_click[position] = true;
      mine_count--;
      ctx.font = '30px Arial';
      ctx.clearRect(500, 100, 300, 300);
      ctx.fillText("mine count: " + mine_count, 550, 200);
    }
    else {
      ctx.clearRect(Math.floor(x/50)*50, Math.floor(y/50)*50, 50, 50)
      ctx.strokeRect(Math.floor(x/50)*50, Math.floor(y/50)*50, 50, 50)
      mine_left_click[position] = false;
      mine_count++;
      ctx.font = '30px Arial';
      ctx.clearRect(500, 100, 300, 300);
      ctx.fillText("mine count: " + mine_count, 550, 200);
    }
  }
}

function gameover() {
  ctx.font = '30px Arial';
  ctx.fillText('mine exploded', 550, 300);
  game_over = true;
  stop();
}
