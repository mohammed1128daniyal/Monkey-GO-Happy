var monkey , monkey_running;
var banana , bananaImage , obstacle , obstacleImage;
var bananasGroup , obstaclesGroup;
var survivalTime = 0 , score = 0;
var PLAY = 1 , END = 0 , gameState = 1;
var gameOver , restart;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(400,400);

  monkey = createSprite(50,330,50,50);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.09;
  
  ground = createSprite(400,360,900,10);
  ground.shapeColor = "green";
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  edge1 = createSprite(200,0,400,10);
  edge1.shapeColor = "black";
  
  edge2 = createSprite(200,400,400,10);
  edge2.shapeColor = "black";
  
  edge3 = createSprite(0,200,10,400);
  edge3.shapeColor = "black";
  
  edge4 = createSprite(400,200,10,400);
  edge4.shapeColor = "black";
  
  bananasGroup = createGroup();
  obstaclesGroup = createGroup();

}


function draw() {
  
  background("lightgreen");
  
  monkey.collide(ground);
  
if (gameState === PLAY){
  
   
 if (ground.x<0){
   ground.x = ground.width/2;
 }
  
 if (keyDown("space")){
   monkey.velocityY =-15;
 }
  
  monkey.velocityY = monkey.velocityY + 1 ;
  
 if (monkey.isTouching(bananasGroup)){
   bananasGroup.destroyEach();
   score = score + 1;
 }
  
 if (monkey.isTouching(obstaclesGroup)){
   gameState = END;
 }
  
  spawnObstacles();
  spawnBananas();
}
 else
   
if (gameState === END){
  
  monkey.visible = false;
  ground.setVelocity(0,0);
  bananasGroup.destroyEach();
  obstaclesGroup.destroyEach();
  
  fill("red");
  stroke("red");
  textSize(30);
  text("GAME OVER!",110,150);
  text("Press 'R' To Reset",80,200);
}
  
 if (keyDown("r")){
   reset();
 }
  
  drawSprites();
    
  fill("black");
  stroke("green");
  textSize(15);
  text("SCORE : "+ score,180,50);
  
  fill("black");
  stroke("green");
  textSize(15);
  survivalTime = Math.ceil(frameCount/frameRate());
  text("SURVIVAL TIME : "+ survivalTime,150,30);
  
}

function spawnBananas() {
  
 if (frameCount % 80 === 0){
   
   banana = createSprite(400,150,20,20);
   banana.y = Math.round(random(100,200));
   banana.addImage(bananaImage);
   banana.scale = 0.1;
   banana.velocityX = -7;
   
   banana.setLifeTime = 200;
   
   bananasGroup.add(banana);
 }
}

function spawnObstacles() {

 if (frameCount % 200 === 0){
   
   obstacle = createSprite(400,320,50,50);
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.2;
   obstacle.velocityX = -7;
   
   obstacle.setLifeTime = 200;
   
   obstaclesGroup.add(obstacle);
 }
}

function reset(){
  
  gameState = PLAY;
  monkey.visible = true;
  ground.setVelocity(0,0);
  score = 0;
  survivalTime = 0;
}