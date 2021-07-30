var bg , bgImg ;
var topground , bottomground
var balloon , balloonImg 
var topobstacles , topobstacles1 , topobstacles2 , topobstaclesGroup
var bottomobstacle , bottomobstacle1 , bottomobstacle2 , bottomobstacle3 , bottomobstacleGroup
var barGroup;
var gameover , gameoverImg
var restart , restartImg;
var score = 0
var play = 1
var end = 0
var gameState = play

function preload(){
  bgImg = loadImage("assets/bg.png")
  balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
  topobstacles1 = loadImage("assets/obsTop1.png")
  topobstacles2 = loadImage("assets/obsTop2.png")
  bottomobstacle1 = loadImage("assets/obsBottom1.png")
  bottomobstacle2 = loadImage("assets/obsBottom2.png")
  bottomobstacle3 = loadImage("assets/obsBottom3.png")
  restartImg = loadImage("assets/restart.png")
  gameoverImg = loadImage("assets/gameOver.png")
}

function setup(){
  createCanvas(400,400)
  bg = createSprite(165,485)
  bg.addImage(bgImg)
  bg.scale = 1.3

  bottomground = createSprite(200,390,800,20)
  bottomground.visible = false

  topground  = createSprite(200,10,800,20)
  topground.visible = false

  balloon = createSprite(100,200,20,50)
  balloon.addAnimation("balloon_flying",balloonImg)
  balloon.scale = 0.2
  balloon.debug = true
   
  topobstaclesGroup = new Group()
  bottomobstacleGroup = new Group()
  barGroup = new Group()

  gameover = createSprite(220,200)
  gameover.addImage(gameoverImg)
  gameover.scale = 0.5
  gameover.visible = false

  restart = createSprite(220,240)
  restart.addImage(restartImg)
  restart.scale = 0.5
  restart.visible = false

}

function draw(){
  background("grey")
  if(gameState === play){
    if(keyDown("space")){
      balloon.velocityY = -6
    }
    balloon.velocityY = balloon.velocityY+2
    Bar()
    spawobstaclesTop()
    spawnbottomobstacle()
    if(topobstaclesGroup.isTouching(balloon)||bottomobstacleGroup.isTouching(balloon)||balloon.isTouching(topground)||balloon.isTouching(bottomground)){
      gameState = end
    }
  }
  if(gameState === end){
    gameover.visible = true
    gameover.depth = gameover.depth+1
    
    restart.visible = true
    restart.depth = restart.depth+1
    balloon.velocityY = 0
    balloon.velocityX = 0
    topobstaclesGroup.setVelocityXEach(0)
    bottomobstacleGroup.setVelocityXEach(0)
    barGroup.setVelocityXEach(0)
    topobstaclesGroup.setLifetimeEach(-1)
    bottomobstacleGroup.setLifetimeEach(-1)
    balloon.y = 200
    if(mousePressedOver(restart)){
      Reset()
    }
  }
 
  drawSprites()
  Score()
}

function spawobstaclesTop(){
  if(World.frameCount % 60 === 0){
    topobstacles = createSprite(400,50,40,50)
    topobstacles.scale = 0.1
    topobstacles.velocityX = -4
    topobstacles.y = random(10,100)
    var rand = Math.round(random(1,2))
    switch(rand){
      case 1:topobstacles.addImage(topobstacles1)
      break;
      case 2:topobstacles.addImage(topobstacles2)
      break;
      default:break
    }

    topobstacles.lifetime = 100;
    balloon.depth = balloon.depth+1
    topobstaclesGroup.add(topobstacles)
    
  }
}

function spawnbottomobstacle(){

    if(World.frameCount % 60 === 0){
      bottomobstacle = createSprite(400,350,40,50)
      bottomobstacle.addImage(bottomobstacle1)
      bottomobstacle.scale = 0.07
      bottomobstacle.velocityX = -4
      
      var rand = Math.round(random(1,3))
      switch(rand){
        case 1:bottomobstacle.addImage(bottomobstacle1)
        break;
        case 2:bottomobstacle.addImage(bottomobstacle2)
        break;
        case 3:bottomobstacle.addImage(bottomobstacle3)
        default:break
      }
  
      bottomobstacle.lifetime = 100;
      balloon.depth = balloon.depth+1
      bottomobstacleGroup.add(bottomobstacle)
      
    }
  }
  function Bar(){
    if(World.frameCount % 60 === 0){
      var bar = createSprite(400,200,10,800)
      bar.velocityX = -4
      bar.depth = balloon.depth
      bar.lifetime = 70
      bar.visible = false
      barGroup.add(bar)
    }
  }
  
  function Score(){
    if(balloon.isTouching(barGroup)){
        score = score+1
    }
    textSize(30)
    fill("red")
    text("Score :"+score,250,50)
  }

  function Reset(){
    gameState = play
    gameover.visible = false
    restart.visible = false
    topobstaclesGroup.destroyEach()
    bottomobstacleGroup.destroyEach()
    score = 0
  }