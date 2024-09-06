document.addEventListener("click", clicking);
ctx = document.getElementById("canvas").getContext("2d"); //setting up canvas for drawing
ctx.strokeStyle = 'black'; //for the borders to show
let mine_count = 10;
let height = 9; let width = 9; //setting up the grid
let mine_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0];
for (let i = 0; i < mine_count; i++) {
  mine = parseInt(Math.random() * (height * width));
  if (mine_arr[mine] != 1000) {
    mine_arr[mine] = 1000; //random distribution of the mines
  }
  else {
    i--; //so that loop keeps going until all mines are allocated to a unique position
  }
}
for (let i = 0; i < (height*width); i++) {
  if (mine_arr[i] != 1000) {
    mine_arr[i] = countmines(mine_arr, i)
  }
}

for (let i = 1; i < 10; i++) {
  for (let j = 1; j < 10; j++) {
    ctx.strokeRect(i*50, j*50, 50, 50); //used because fillRect doesn't make borders
  }
}

function countmines (arr, position) { //basic calculations to figure out how many mines in adjacent squares
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

function clicking (event) {
  x = event.pageX;
  y = event.pageY;
  position = parseInt(y/50-1)*9+parseInt((x/50-1));
  if (mine_arr[position] == 1000) {
    gameover();
  }
  else {
    ctx.font = "20px Arial";
    ctx.fillText(mine_arr[position], Math.floor(x/50)*50+20, Math.floor(y/50)*50+30);
  }
}

function gameover() {
  ctx.font = '30px Arial';
  ctx.fillText('Mine exploded', 500, 300);
  stop();
}
