var gameState = 0; 
var fedTime,lastFed,foodRem;
var dog,sadDog,happyDog, database;
var form, player, game,playerCount; 
var foodS,foodStock;
var addFood;
var greeting
var foodObj;
var value
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("dog7.png");
happyDog=loadImage("dog8.png");
milkimg = loadImage("Milk.png");
bgimg = loadImage("bg3.jpg");
bg2img = loadImage("bg2.jpg");
flowerimg = loadAnimation("flower/Z-0.png","flower/Z-1.png","flower/Z-2.png","flower/Z-3.png");
flower2img = loadAnimation("flower2/T-0.png","flower2/T-1.png","flower2/T-2.png","flower2/T-3.png"); 
butterflyimg = loadAnimation("butterfly/0-0.png","butterfly/0-2.png","butterfly/0-4.png","butterfly/0-5.png","butterfly/0-9.png","butterfly/0-12.png","butterfly/0-13.png","butterfly/0-15.png","butterfly/0-16.png","butterfly/0-17.png"); 
}

function setup() {
  database=firebase.database();
  createCanvas(1000,600);

  foodObj = new Food();
  game = new Game(); 
  game.getState();
  game.start(); 
  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,500,150,150);
  dog.addImage(sadDog);
  dog.scale=1.5;

  //create feed the dog button here

  milkbottle = createSprite(150,320)
  milkbottle.addImage(milkimg)
  milkbottle.visible = 0
  milkbottle.scale = 0.1

  greeting = createElement('h1'); 
  greeting.x=350
  greeting.y=75

  flower = createSprite(150,350,20,20)
  flower.addAnimation("flower",flowerimg)
  flower.scale = 0.4
  
  flower2 = createSprite(900,320,20,20)
  flower2.addAnimation("flower",flower2img)
  flower2.scale = 0.4

  butterfly = createSprite(0,350,20,20)
  butterfly.addAnimation("flower",butterflyimg)
  butterfly.scale = 0.1

}

function draw() {

if (gameState===0)
{
  background(bg2img);
  fill("black");
  textSize(20);
  text("👇Enter your dog's name👇", 400,320);
  textSize(30);
  textFont("Algerian");
  text("Feed you dog🐶", 410,30);
  
}
  if (gameState===1)
  {
  background(bgimg);
  drawSprites();
  butterfly.velocityX=1.5
  butterfly.velocityY=-0.5
  foodObj.display();
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data)
  {
    lastFed=data.val();
  })

  addFood=createButton("Add Food");
  addFood.position(1200,145);
  addFood.mousePressed(addFoods);


  feedFood=createButton("Feed Food🥛");
  feedFood.position(1050,145);
  feedFood.mousePressed(feedDog);
 
  fill(57,32,12);
  textSize(25);
  if(lastFed>=12){
  text("Your dog was last fed at:"+lastFed%12 + " PM", 10,50);
  }else if(lastFed==0){
  text("Your dog was last fed at:"+"12 AM",10,50);
  }else{
  text("Your dog was last fed at:"+lastFed + " AM", 10,50);
  }


   fill(4,23,117)
   textSize(20)
   text(value,400,dog.y-80)
  }
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog()
{
  foodObj.getFoodStock();
  if(foodObj.foodStock<=0)
  {
    foodObj.foodStock=0;
    milkbottle.visible=0;
    dog.addImage(sadDog);
  }
  else{
    dog.addImage(happyDog);
    if(foodObj.foodStock===1)
    {
        milkbottle.visible=0;
        dog.addImage(sadDog);
    }
    else
    milkbottle.visible = 0
    foodObj.updateFoodStock(foodObj.foodStock-1);
    database.ref('/').update({
    Food:foodObj.foodStock,
    FeedTime:hour()
    });
  }
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
