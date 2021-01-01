var dog, happyDog, database, foodS, foodStock;
var dogimg,happydimg;
function preload()
{
  dogimg = loadImage("images/dogImg.png")
  happydimg = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database()
	createCanvas(500,500);
  
  dog  = createSprite(250,250,5,5);
  dog.addImage(dogimg);
  dog.scale = 0.3;

  foodStock = database.ref("Food")
  foodStock.on("value",readStock)
}


function draw() {  
  background(46, 139, 87);
  
 
  if(keyWentDown("Up_Arrow")){
    writeStock(foodS);
    dog.addImage(happydimg)
  }

  drawSprites();

  textSize(17);
  fill(255,255,254);
  text ("Food remaining : "+ foodS,250,400);
  stroke("red");
  textSize(17);
  text("Press up arrow key To Feed Max!",130,10,300,20)
}
function readStock (data){
  foodS = data.val ();
}
function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }


  database.ref("/").update({
    Food:x
  })
}