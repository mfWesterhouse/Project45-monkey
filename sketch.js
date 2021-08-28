const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var monkey, monkeyImage;
var jungle, jungleImage;
var bananaImage, bananaGroup;
var ground, platform, ground2;

var score = 0;

var start = 1;
var play = 2;
var end = 3;
var gameState = start;

function preload(){
  jungleImage = loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  monkeyImage = loadImage("monkey.png");
}

function setup() {
  createCanvas(800,400);

  engine = Engine.create();
  world = engine.world;

  jungle = createSprite(600,200,800,500);
  jungle.addImage("jungle", jungleImage);
  jungle.scale = 1.5;
  jungle.velocityX = -(3 + 2 * score/10);

  ground = new Ground(400,395,800,10);
  platform = new Ground(100,110,50,10);

  ground2 = createSprite(400,395,800,5);
  ground2.visible = false;

  monkey = createSprite(100,100,100,100);
  monkey.addImage("monkey", monkeyImage);
  monkey.scale = 0.1;
  monkey.setCollider("circle",0,0,300);
  monkey.debug = true;
  
  bananaGroup = new Group();

}

function draw() {
  background("green"); 

  if(jungle.x < 200){
    jungle.x = 600;
    jungle.velocityX = -(2 + 2 * score/10);
  }

  if(gameState === start){

    jungle.velocityX = 0;

    if(keyDown(UP_ARROW)){
      gameState = play;
    }

    monkey.velocityY = 0;

  }

  if(gameState === play){
    
    spawnBananas();

    jungle.velocityX = -(2+2*score/10);

    if(keyDown(32)){
      monkey.x = monkey.x + 5;
      monkey.y = monkey.y - 25;
    }
    if(keyDown(LEFT_ARROW)){
      monkey.x = monkey.x - 10;
    }
    if(keyDown(RIGHT_ARROW)){
      monkey.x = monkey.x + 10;
    }
    

    if(bananaGroup.isTouching(monkey)){
      score = score + 1;
      bananaGroup.destroyEach();
    }

    monkey.collide(ground2);

    platform.x = 0;
    platform.y = 400;

    monkey.velocityY = monkey.velocityY + 0.8;
  }

  drawSprites();
  monkey.display();
  ground.display();

  Engine.update(engine);

  fill("white");
  textSize(15);
  text("Score : " + score,700,20);

  if(gameState === start){
    text("Press Up Arrow to Play",400,200);
    text("Use the left and right arrows to move",400,220);
    text("Use the space bar to go up",400,240);
  }

}

function spawnBananas(){
  if(frameCount % 120 === 0){
    var banana = createSprite(790,100,20,20);
    banana.y = Math.round(random(10,200));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -(3 + 2 * score/10);
    bananaGroup.add(banana);
  }
}