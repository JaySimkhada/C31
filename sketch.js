const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let jsEngine;
let jsWorld;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button1, button2, button3;
var bunny;
var blinkAnimation,eatAnimation,sadAnimation;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blinkAnimation = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eatAnimation = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sadAnimation = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blinkAnimation.playing = true;
  eatAnimation.playing = true;
  sadAnimation.playing = true;

  sadAnimation.looping= false;
  eatAnimation.looping = false;
}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  jsEngine = Engine.create();
  jsWorld = jsEngine.world;
  
  button1 = createImg('cut_btn.png');
  button1.position(220,30);
  button1.size(50,50);
  button1.mouseClicked(drop1);
  

  button2 = createImg('cut_btn.png');
  button2.position(410,250);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);

  blinkAnimation.frameDelay = 20;
  eatAnimation.frameDelay = 20;
  sadAnimation.frameDelay = 20;

  bunny = createSprite(230,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blinkAnimation);
  bunny.addAnimation('eating',eatAnimation);
  bunny.addAnimation('crying',sadAnimation);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,490,690);

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  Engine.update(jsEngine);
  ground.show();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
  }
   
  if(collide(fruit,ground.body)==true )
  {
     bunny.changeAnimation('crying');
   }

   drawSprites();
}

function drop1()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=40)
            {
              World.remove(jsEngine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}
