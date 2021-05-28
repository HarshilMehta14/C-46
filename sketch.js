//Universal variables
var GameState = "Play";
var life = 3;
var score = 0;
var bg;
var i = 0;
var o = 0;
var edges;

//Level 1 variables
var EnemySpaceship1;
var Player;
var bullet1, bullet2, bullet3;
var Missiles;
var EnemySpaceship1Grp, MissilesGrp, BulletsGrp;
var SquadronSpaceship;

//Variables for Images
var PlayerImg;
var EnemySpaceship1Img, EnemySpaceship2Img, EnemySpaceship3Img;
var SquadronSpaceshipImg;
var MissilesImg, bulletsImg;
var livesImg;

function preload(){
    PlayerImg = loadImage("images/Player Spaceship.png");
    bulletsImg = loadImage("images/bullet.png");

    EnemySpaceship1Img = loadImage("images/Enemy Spaceship1.png");
    EnemySpaceship2Img = loadImage("images/Enemy Spaceship2.png");
    EnemySpaceship3Img = loadImage("images/Enemy Spaceship3.png");

    livesImg = loadImage("images/Lives.png");

    SquadronSpaceshipImg = loadImage("images/Squadron Spaceship.png")
}
function setup(){
    createCanvas(displayWidth-40, displayHeight-30);

    edges = createEdgeSprites();

    //The player Sprite and spaceship we'll add Image afterwards
    player = createSprite(width/2, height-70, 150, 150);
    player.addImage(PlayerImg);
    player.scale = 0.4;
    //player.debug = true;
    player.setCollider("circle", 0, 0, 150)
    //player.collide(edges[]);


    //Creating Groups For level1 variables
    EnemySpaceship1Grp = new Group();
    MissilesGrp = new Group();
    BulletsGrp = new Group();
    
}

function draw(){
    background(0);
    textSize(20);
    

    if(GameState === "Play")
    {
        text("Score : " + score, 50, 50);

        image(livesImg, 50, 75, 50, 50);
        image(livesImg, 100, 75, 50, 50);
        image(livesImg, 150, 75, 50, 50);

        if(keyIsDown(LEFT_ARROW))
        {
            player.x -= 2;
        }

        if(keyIsDown(RIGHT_ARROW))
        {
            player.x += 2;
        }

        if(frameCount % 150 === 0)
        {
            SpawnSpaceships1();
        }

        for(i = 0; i < EnemySpaceship1Grp.length; i++)
        {
            if(EnemySpaceship1Grp.get(i).isTouching(BulletsGrp))
            {
                EnemySpaceship1Grp.get(i).destroy();
                BulletsGrp.get(o).destroy();
                
                score += 50;            
            }

            if(EnemySpaceship1Grp.get(i).isTouching(player))
            {
                EnemySpaceship1Grp.get(i).destroy();
                life -= 1;
            }
        }
        drawSprites();
    }

}

function SpawnBullets()
{
    bullet1 = createSprite(player.x, player.y-30, 10, 10);
    bullet1.velocityY = -1.5;
    bullet1.addImage(bulletsImg);
    bullet1.scale = 0.1;
    bullet1.lifetime = 400;
    BulletsGrp.add(bullet1);

    /*bullet2 = createSprite(player.x + 35, player.y, 10,10);
    bullet2.velocityY = -1.5;
    bullet2.velocityX = 1.5;
    bullet2.addImage(bulletsImg);
    bullet2.scale = 0.1;
    BulletsGrp.add(bullet2);

    bullet3 = createSprite(player.x - 40, player.y, 10, 10);
    bullet3.velocityY = -1.5;
    bullet3.velocityX = -1.5;
    bullet3.addImage(bulletsImg);
    bullet3.scale = 0.1;
    bullet3.lifetime = 400;
    BulletsGrp.add(bullet3);*/

    BulletsGrp.setLifetimeEach(400);

}
function SpawnSpaceships1()
{
    var b = 50;
    for(var a = 0; a <= 8; a++)
    {
                
        EnemySpaceship1 = createSprite(b, 50, 75, 75);
        b += 150;

        EnemySpaceship1.addImage(EnemySpaceship1Img);
        EnemySpaceship1.scale = 0.5;
        EnemySpaceship1Grp.add(EnemySpaceship1);
        
    }
    EnemySpaceship1Grp.setVelocityYEach(2);
    EnemySpaceship1Grp.setLifetimeEach(350);
}

function keyPressed()
{
    if(GameState === "Play" && keyCode === 115 || keyCode === 83 && BulletsGrp.length < 5)
    {
        SpawnBullets();
    }
}