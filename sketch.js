var database ,dog,dog1,dog2
var position
//var form
var feed,add
var foodobject
var Feedtime
var Lastfeed, foodStockImg, fs,milk;
//Create variables here

function preload()

{
   
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
  foodStockImg=loadImage("images/Milk.png");
 
}

function setup() {
  background("yellow")
  canvas=createCanvas(500,500);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food()
  dog = createSprite(250,350,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.15

  fs = createSprite(250, 50, 20, 20);
  fs.addImage(foodStockImg);
  fs.scale = 0.1
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
  feed = createButton("FEED DRAGO MILK")
  feed.position(700,100)
  feed.mousePressed(FeedDog)
  add = createButton("ADD FOOD")
  add.position(370,100)
  add.mousePressed(AddFood)


} 

function draw(){
 background("yellow");

 foodobject.display()
 
 drawSprites();
  
 fill(255,255,254);
 textSize(15);


 fedtime=database.ref('FeedTime')
 fedtime.on("value",function(data){ Lastfeed=data.val(); });
 if(Lastfeed>=12)
 {
   text("Last Fed :" + Lastfeed%12 + "PM", 200,100);
 }else if(Lastfeed ===0 )
 {
   text("Last Fed : 12 AM" , 200,100)
 }else
 {
   text("Last Fed :" + Lastfeed + "AM", 200,100);
 }

drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
function AddFood(){
    //dog.addImage(dogimg1);
position++
database.ref('/').update({
  Food:position

}

)
}
function FeedDog(){

dog.addImage(dogimg2)

if(foodobject.getFoodStock()<=0){
  foodobject.updateFoodStock(foodobject.getFoodStock()*0)

}

else{
  foodObject.updateFoodStock(foodobject.getFoodStock()-1)
}


 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}