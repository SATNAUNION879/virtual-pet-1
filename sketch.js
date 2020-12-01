//Create variables here 
var  dog, happyDog;

var database;
var foodS, foodStock;

function preload()
{
  dogImg = loadImage("dogImg.png");
  dogImg1 = loadImage("dogImg1.png");
	//load images here
}

function setup() {
  createCanvas(900,600);
  
  dog = createSprite(450,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.4;
  
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

    
}


function draw() {  
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

  drawSprites();
  //add styles here
  
  
fill ("red");
textSize (15);
  text("food remaining" + foodS, 450,480);
  textSize (15);
  text("press UP_ARROW to feed the milk"+450,400);
  
}

function readStock(data){
  foodS=data.val();
}

function writeStock (x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food: x 
  })
}

