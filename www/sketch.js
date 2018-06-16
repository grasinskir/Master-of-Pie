// Ship variables
let ship;
let moveForward;
let pie;
let crash = false;
let hyper = false;

// Pizza variables
let pizzas = [];
let pizza;
let pizzaorder = 1;

// Bullet variables
let bullets = [];
let shoot;
let reload = 10;
let hit = false;
let offscreen = false;

// Start, end, and score variables
let end = false;
let spacebackground;
let gamebackground;
let endgame;
let score = 0;
let click = true;
let click2 = true;
let click3 = true;
let level = 1;
let next = false;
let levelup = false;

// Control panel variables
let red1 = true;
let blue1 = true;
let blue2 = true;
let blue3 = true;
let mobile = false;
let red2 = true;

// Spiky variables
let piecutter = [];


function preload(){
  // Ship image
  pie = loadImage("blueberrypie.png");

  // Asteroid image
  pizza = loadImage("pizza.png");

  // Starting background
  gamebackground = loadImage("spacetemplate.png");

  // During game background
  spacebackground = loadImage("space.png");

  // Endgame background
  endgame = loadImage("endgame.png");
}

// Ship
class Spacecraft{
  constructor(){
    this.x1 = width/2;
    this.y1 = height/2;
    this.x2 = width/2 - width/95;
    this.y2 = height/2 + height/30;
    this.x3 = width/2 + width/95;
    this.y3 = height/2 + height/30;
    this.heading = 0;
    this.yVelocity = 0;
    this.xVelocity = 0;
  }

  // Make, move, and rotate the ship
  makeShip(){
    // Rotate
    push();
      translate(this.x1, this.y1);
      angleMode(DEGREES);
      rotate(this.heading);
      noFill();
      stroke(255);
      imageMode(CENTER);
      image(pie, 0, 0, width/55, width/35);
    pop();
    // Move forward
    angleMode(DEGREES);
    this.yacceleration = width/10000*cos(this.heading);
    this.xacceleration = width/10000*sin(this.heading);
    this.y1 -= this.yVelocity;
    this.x1 += this.xVelocity;
    // If one mobile game displays control panel
    if(mobile){
    controlPanel();
    }
    // Display bullet bullet
    bulletCount();
  }

  // Make ship move offscreen while traveling in hyperspace
  jumpShip(){
    imageMode(CENTER)
    image(pie, 0, 0, 0, 0);
  }
}

// Pizzas/Asteroids
class Rock{
  constructor(x, y, r){
    this.x = x;
    this.y = y;
    this.r = r;
    this.xVelocity = random(-width/500, width/500)*level;
    this.yVelocity = random(-height/500, height/500)*level;
  }

  // Make the pizza
  makeRock(){
    stroke(255);
    noFill();
    imageMode(CENTER);
    image(pizza, this.x, this.y, this.r, this.r);
      // If on mobile the control panel is displayed
      if(mobile){
      controlPanel();
    }
    // Display bullet bullet
    bulletCount();
  }

  // Move the pizza at a constant, random velocity
  moveRock(){
    this.x += this.xVelocity;
    this.y += this.yVelocity;
      // If on mobile the control panel is displayed
      if(mobile){
      controlPanel();
    }
    // Display bullet bullet
    bulletCount();
  }
}

// Bullets/blueberries
class Projectile{
  constructor(xPos, yPos, angle){
    this.x = xPos;
    this.y = yPos;
    this.r = width/200;
    this.xVelocity = width/160*sin(angle);
    this.yVelocity = width/160*cos(angle);
  }

  // Make the bullet/blueberry
  makeBullet(){
    fill(255, 0, 0);
    noStroke();
    ellipse(this.x, this.y, this.r, this.r);
      // If on mobile the control panel is displayed
      if(mobile){
      controlPanel();
    }
    // Display bullet bullet
    bulletCount();
  }

  // Move the bullet/blueberry
  moveBullet(){
    this.x += this.xVelocity;
    this.y -= this.yVelocity;
      // If on mobile the control panel is displayed
      if(mobile){
      controlPanel();
    }
    // Display bullet bullet
    bulletCount();
  }
}

class Spiky{
  constructor(posX, posY){
    this.x = posX;
    this.y = posY;
    this.width = width/90;
    this.height = width/90;
  }

  makeSpiky(){
    fill(255, 0, 0);
    noStroke();
    triangle(this.x, this.y - this.height, this.x - this.width, this.y + this.height, this.x + this.width, this.y + this.height);
  }
}

function setup() {
  // Create the canvas and set a text size
  // createCanvas(windowWidth, windowHeight);
  textSize(15);
}

function draw() {
  mobile = true;
  createCanvas(windowWidth, windowHeight);

  // Very beginning screen
  if(click /*&& click2*/){
    sleep(2000);
    start();

    // Instructions screen
  // } else if(click2 && click == false) {
  //   instructions();

    // Game screen
  } else if(/*click2 == false &&*/ click == false) {
    mobile = true;
    // Set up the game with score, background, and level
    imageMode(CENTER);
    image(spacebackground, width/2, height/2, width, height);
    fill(255);
    text("Score", width/2 - width/75, height/4);
    text(score, width/2, height/4 + height/30);
    levelCount();

    // Create all the objects
    ship.makeShip();
    for(let i = 0; i < bullets.length; i++){
      bullets[i].makeBullet();
      bullets[i].moveBullet();
    }
    for(let i = 0; i < piecutter.length; i++){
      piecutter[i].makeSpiky();
    }
    for(let i = 0; i < pizzas.length; i++){
      pizzas[i].makeRock();
      pizzas[i].moveRock();
    }

    // If on mobile the onscreen controls affect the ship
    if(mobile){
      if(mouseIsPressed && mouseX >= width/24 - width/30 && mouseX <= width/24 + width/30 && mouseY >= height - height/6 - width/30 && mouseY <= height - height/6 + width/30){
        ship.heading -= 5;
        blue1 = false;
      } else {
        blue1 = true;
      }
      if(mouseIsPressed && mouseX >= width/6.2 - width/30 && mouseX <= width/6.2 + width/30 && mouseY >= height - height/6 - width/30 && mouseY <= height - height/6 + width/30){
        ship.heading += 5;
        blue2 = false;
      } else {
        blue2 = true;
      }
      if(mouseIsPressed && mouseX >= width/9.9 - width/30 && mouseX <= width/9.9 + width/30 && mouseY >= height - height/3.2 - width/30 && mouseY <= height - height/3.2 + width/30){
        ship.yVelocity += ship.yacceleration;
        ship.xVelocity += ship.xacceleration;
        blue3 = false;
      } else {
        blue3 = true;
      }
    }

    // If on computer use keyboard keys W, A, D, F, and Spacebar
    // if(mobile == false){
    //   if(keyIsDown(65)){
    //     ship.heading -= 5;
    //   }
    //   if(keyIsDown(68)){
    //     ship.heading += 5;
    //   }
    //   if(keyIsDown(87)){
    //     ship.yVelocity += ship.yacceleration;
    //     ship.xVelocity += ship.xacceleration;
    //   }
    // }

    // Slow the ship in the positive y if either the mouse is pressed or W is down
    if(ship.yVelocity < 0 && !mouseIsPressed /*&& !keyIsDown(87)*/){
      ship.yVelocity += abs(ship.yacceleration);

      // If the y velocity is close to 0, the ship stops
      if(ship.yVelocity < 0 && ship.yVelocity > ship.yacceleration && !mouseIsPressed){
        ship.yVelocity = 0;
        ship.yacceleration2 = 0;
        ship.xVelocity = 0;
      }
    }

    // Slow the ship in the negative y if either the mouse is pressed or W is down
    if(ship.yVelocity > 0 && !mouseIsPressed /*&& !keyIsDown(87)*/){
      ship.yVelocity -= abs(ship.yacceleration);

      // If the y velocity is close to 0, the ship stops
      if(ship.yVelocity > 0 && ship.yVelocity < ship.yacceleration && !mouseIsPressed){
        ship.yVelocity = 0;
        ship.yacceleration2 = 0;
        ship.xVelocity = 0;
      }
    }

    // Slow the ship in the negative x if either the mouse is pressed or W is down
    if(ship.xVelocity > 0 && !mouseIsPressed /*&& !keyIsDown(87)*/){
      ship.xVelocity -= abs(ship.xacceleration);

      // If the x velocity is close to 0, the ship stops
      if(ship.xVelocity > 0 && ship.xVelocity < ship.xacceleration && !mouseIsPressed){
        ship.xVelocity = 0;
        ship.xacceleration2 = 0;
        ship.yVelocity = 0;
      }
    }

    // Accelerate the ship in the positive x if either the mouse is pressed or W is down
    if(ship.xVelocity < 0 && !mouseIsPressed /*&& !keyIsDown(87)*/){
      ship.xVelocity += abs(ship.xacceleration);

      // If the x velocity is close to 0, the ship stops
      if(ship.xVelocity < 0 && ship.xVelocity > ship.xacceleration && !mouseIsPressed){
        ship.xVelocity = 0;
        ship.xacceleration2 = 0;
        ship.yVelocity = 0;
      }
    }

    // The ship and pizzas/asteroids wrap around the screen
    if(ship.x1 < -height/30 && hyper == false){
      ship.x1 = width;
    }
    if(ship.x1 > width + height/30 && hyper == false){
      ship.x1 = 0;
    }
    if(ship.y1 < -height/30 && hyper == false){
      ship.y1 = height;
    }
    if(ship.y1 > height + height/30 && hyper == false){
      ship.y1 = 0;
    }
    for(i = 0; i < pizzas.length; i++){
      if(pizzas[i].x < -width/10){
        pizzas[i].x = width + width/10;
      }
      if(pizzas[i].x > width + width/10){
        pizzas[i].x = -width/10;
      }
      if(pizzas[i].y < -width/10){
        pizzas[i].y = height + width/10;
      }
      if(pizzas[i].y > height + width/10){
        pizzas[i].y = -width/10;
      }
    }

    // Collision rule between pizzas/asteroids and bullets/blueberries
    for(j = 0; j < pizzas.length; j++){
      for(i = 0; i < bullets.length; i++){
        console.log("p.l = " + pizzas.length + "j = " + j);
        // Collisions for the large and medium pizzas
        // let distance1 = dist(pizzas[j].x, pizzas[j].y, bullets[i].x, bullets[i].y);
        // if(distance1 <= pizzas[j].r/2 && pizzas[j].r <= width/40){
        //   piecutter.push(new Spiky(pizzas[j].x, pizzas[j].y));
        //
        //   i--;
        //   // Add points if hit
        //   score++;
        //   // Makes sure game doesn't break when both the ship and bullet hit a pizza at the same time
        //   hit = true;
        //   // Splice out the pizza and bullet
        //   pizzas.splice(j,1);
        //
        //   bullets.splice(i,1);
        //
        // }if(pizzas.length == 0){
        //   i = bullets.length + 1;
        // }
      }
    }

    for(j = 0; j < pizzas.length; j++){
      for(i = 0; i < bullets.length; i++){
        let distance1 = dist(pizzas[j].x, pizzas[j].y, bullets[i].x, bullets[i].y);
        //  if(distance1 <= pizzas[j].r/2 && pizzas[j].r > width/40){
        //   // Move opposite
        //   pizzas[j].xVelocity *= -1;
        //   pizzas[j].yVelocity *= -1;
        //   // Add a new size pizza with half the radius of the current one and half the radius of the existing pizza
        //   // pizzas.push(new Rock(pizzas[j].x - width/40, pizzas[j].y - width/40, pizzas[j].r/2));
        //   pizzas[j].r = pizzas[j].r/2;
        //   // Add points if hit
        //   score++;
        //   // Splice the bullet out
        //   bullets.splice(i,1);
        //   i--;
        //   hit = true;
        //   // Collisions for small pizzas
        //   // if(pizzas[j].r <= width/40){
        //   //   piecutter.push(new Spiky(pizzas[j].x, pizzas[j].y));
        //   //
        //   //   i--;
        //   //   // Add points if hit
        //   //   score++;
        //   //   // Makes sure game doesn't break when both the ship and bullet hit a pizza at the same time
        //   //   hit = true;
        //   //   // Splice out the pizza and bullet
        //   //   pizzas.splice(j,1);
        //   //   bullets.splice(i,1);
        //   //
        //   //
        //   // }
        //
        //
        // }
        if(distance1 <= pizzas[j].r/2 /*&& pizzas[j].r <= width/40*/){
          piecutter.push(new Spiky(pizzas[j].x, pizzas[j].y));


          // Add points if hit
          score++;
          // Makes sure game doesn't break when both the ship and bullet hit a pizza at the same time
          hit = true;
          // Splice out the pizza and bullet
          pizzas.splice(j,1);

          bullets.splice(i,1);
          i--;
          // if(pizzas.length < 1){
          //   j = pizzas.length;
          //   console.log(pizzas.length);
          // }
          break;
        }
        if(pizzas.length < 1){
          break;
        }
        if(bullets.length < 1){
          break;
        }
        // if(pizzas[j].x === undefined){
        //   break;
        // }
        // if(bullets[i].x === undefined){
        //   i = bullets.length;
        //   console.log(pizzas.length);
        // }

        //}

        // // Collisions for small pizzas
        // if(distance1 <= pizzas[j].r/2 && pizzas[j].r <= width/40){
        //   piecutter.push(new Spiky(pizzas[j].x, pizzas[j].y));
        //
        //   i--;
        //   // Add points if hit
        //   score++;
        //   // Makes sure game doesn't break when both the ship and bullet hit a pizza at the same time
        //   hit = true;
        //   // Splice out the pizza and bullet
        //   pizzas.splice(j,1);
        //   bullets.splice(i,1);
        //
        //
        // }
      }
    }

    // If on the last pizza begin next level
    if(pizzas.length < 1){
      nextLevel();
    }

    // Collisions between ship and pizzas/asteroids
    for(j = 0; j < pizzas.length; j++){
      // Tip of the ship
      let distance2 = dist(pizzas[j].x, pizzas[j].y, ship.x1, ship.y1 - width/70);
      // Left corner of the ship
      let distance3 = dist(pizzas[j].x, pizzas[j].y, ship.x1 - width/110, ship.y1 + width/70);
      // Right corner of the ship
      let distance4 = dist(pizzas[j].x, pizzas[j].y, ship.x1 + width/110, ship.y1 + width/70);
      // Collision
      if(distance2 <= pizzas[j].r/4 || distance3 <= pizzas[j].r/4 || distance4 <= pizzas[j].r/4){
        // Go to end
        end = true;
        score = 0;
        // Makes sure game doesn't break when both the ship and bullet hit a pizza at the same time
        crash = true;
      }
    }

    for(j = 0; j < piecutter.length; j++){
      // Tip of the ship
      let distance21 = dist(piecutter[j].x, piecutter[j].y - piecutter[j].height, ship.x1, ship.y1 - width/70);
      let distance31 = dist(piecutter[j].x - piecutter[j].width, piecutter[j].y + piecutter[j].height, ship.x1, ship.y1 - width/70);
      let distance41 = dist(piecutter[j].x + piecutter[j].width, piecutter[j].y + piecutter[j].height, ship.x1, ship.y1 - width/70);
      // Left corner of the ship
      let distance22 = dist(piecutter[j].x, piecutter[j].y - piecutter[j].height, ship.x1 - width/110, ship.y1 + width/70);
      let distance32 = dist(piecutter[j].x - piecutter[j].width, piecutter[j].y + piecutter[j].height, ship.x1 - width/110, ship.y1 + width/70);
      let distance42 = dist(piecutter[j].x + piecutter[j].width, piecutter[j].y + piecutter[j].height, ship.x1 - width/110, ship.y1 + width/70);
      // Right corner of the ship
      let distance23 = dist(piecutter[j].x, piecutter[j].y - piecutter[j].height, ship.x1 + width/110, ship.y1 + width/70);
      let distance33 = dist(piecutter[j].x - piecutter[j].width, piecutter[j].y + piecutter[j].height, ship.x1 + width/110, ship.y1 + width/70);
      let distance43 = dist(piecutter[j].x + piecutter[j].width, piecutter[j].y + piecutter[j].height, ship.x1 + width/110, ship.y1 + width/70);
      // Collision
      if(distance21 <= piecutter[j].width || distance31 <= piecutter[j].width || distance41 <= piecutter[j].width ||
        distance22 <= piecutter[j].width || distance32 <= piecutter[j].width || distance42 <= piecutter[j].width ||
        distance23 <= piecutter[j].width || distance33 <= piecutter[j].width || distance43 <= piecutter[j].width){
        // Go to end
        end = true;
        score = 0;
        // Makes sure game doesn't break when both the ship and bullet hit a pizza at the same time
        crash = true;
      }
    }

    // Splice out the bullet that goes offscreen
    for(i = 0; i < bullets.length; i++){
      if(bullets[i].x > width || bullets[i].x < 0 || bullets[i].y > height || bullets[i].y < 0){
        bullets.splice(i,1);
        i--;
        offscreen = true;
      }
    }

    // Make sure game doesn't break when both the ship and bullet hit a pizza at the same time
    // if(hit == true && crash == true){
    //   end = true;
    //   score = 0;
    //   hit = false;
    //   crash = false;
    // }

    // Ship has a maximum velocity
    if(ship.xVelocity >= width/300){
      ship.xVelocity = width/300;
    }
    if(ship.xVelocity <= -width/300){
      ship.xVelocity = -width/300;
    }
    if(ship.yVelocity >= width/300){
      ship.yVelocity = width/300;
    }
    if(ship.yVelocity <= -width/300){
      ship.yVelocity = -width/300;
    }

    // Endgame
    if(end){
      // New background
      imageMode(CENTER);
      image(endgame, width/2, height/2, width, height);
      fill(255);
      stroke(255);
      text("Game Over", width/2, height/2);
      // Set up for start
      end = false;
      click = true;
      click2 = true;
      mobile = false;
      hit = false;
      crash = false;
      level = 1;
      bullets = [];
      pizzas = [];
      piecutter = [];
    }

    // The shoot portion of the control panel returns to full red color after pressed
    red1 = true;

    // The hyperspace portion of the control panel returns to full red color after pressed
    red2 = true;
  }
}


function mousePressed(){
  // Mobile button
  if(mouseX >= 0 && mouseX < width/2 && click == false && click2 == true){
    mobile = true;
    click2 = false;
  }

  // Computer button
  if(mouseX > width - width/2 && mouseX <= width && click == false && click2 == true){
    mobile = false;
    click2 = false;
  }
  // Make sure people don't break game by setting a limit on bullets
  if(reload > 0){
    // If on mobile
    if(mobile){
      // The shoot button creates a new bullet and turns a darker red when pressed
      if(mouseX >= width - width/11.5 - width/30 && mouseX <= width - width/11.5 + width/30 && mouseY >= height - height/6 - width/30 && mouseY <= height - height/6 + width/30 && click == false && click2 == false){
        bullets.push(new Projectile(ship.x1, ship.y1, ship.heading));
        red1 = false;
        for(i = 0; i < bullets.length; i++){
          bullets[i].makeBullet();
          bullets[i].moveBullet();
        }
        reload--;
      }
    }

    // If bullets are at 0 have to wait 2 seconds to reload
    if(reload <= 0){
      setTimeout(reloadMechanics, 2000);
    }

    // The hyperspace button causes the ship to disappear and then reappear at a random position, have to wait 1 second before clicking again
    if(mouseX >= width - width/5 - width/30 && mouseX <= width - width/5 + width/30 && mouseY >= height - height/6 - width/30 && mouseY <= height - height/6 + width/30 && click3 && click == false && click2 == false){
      red2 = false;
      hyper = true;
      ship.x1 = -width;
      ship.y1 = -height;
      click3 = false;
      setTimeout(hyperspace, 1000);
    }
  }

  // Start button
  if(mouseX >= width/2 - width/25 && mouseX <= width/2 + width/25 && mouseY >= height/2 - height/25 && mouseY <= height/2 + height/25 && click && click2){
      click = false;
  }
}


// function keyTyped(){
//   // Make sure people don't break game by setting a limit on bullets
//   if(reload > 0){
//     // When on computer
//     if(mobile == false){
//       // The Spacebar creates a new bullet
//       if(keyCode === 32){
//         bullets.push(new Projectile(ship.x1, ship.y1, ship.heading));
//         for(i = 0; i < bullets.length; i++){
//           bullets[i].makeBullet();
//           bullets[i].moveBullet();
//         }
//         reload--;
//       }
//     }
//   }
//
//   // If bullets are at 0 have to wait 2 seconds to reload
//   if(reload <= 0){
//     setTimeout(reloadMechanics, 2000);
//   }
//
//   // F key causes the ship to disappear and then reappear at a random position, have to wait 1 second before clicking again
//   if(keyIsDown(70) && click3 == true){
//     hyper = true;
//     ship.x1 = -width;
//     ship.y1 = -height;
//     ship.xVelocity = 0;
//     ship.yVelocity = 0;
//     click3 = false;
//     setTimeout(hyperspace, 1000);
//   }
// }


// Creates buttons for moving the ship and shooting
function controlPanel(){
  // Left blue button, turns the ship left
  if(blue1){
    // Button is bright blue and transparent
    fill('rgba(0, 0, 255, 0.5)');
    stroke(0);
    ellipse(width/24, height - height/6, width/15, width/15);
  } else {
    // When pressed the button turns darker
    fill('rgba(0, 0, 100, 0.5)');
    stroke(0);
    ellipse(width/24, height - height/6, width/15, width/15);
  }

  // Right blue button, turns the ship right
  if(blue2){
    // Button is bright blue and transparent
    fill('rgba(0, 0, 255, 0.5)');
    stroke(0);
    ellipse(width/6.2, height - height/6, width/15, width/15);
  } else {
    // When pressed the button turns darker
    fill('rgba(0, 0, 100, 0.5)');
    stroke(0);
    ellipse(width/6.2, height - height/6, width/15, width/15);
  }

  // Middle blue button, moves the ship forward
  if(blue3){
    // Button is bright blue and transparent
    fill('rgba(0, 0, 255, 0.5)');
    stroke(0);
    ellipse(width/9.9, height - height/3.3, width/15, width/15);
  } else {
    // When pressed the button turns darker
    fill('rgba(0, 0, 100, 0.5)');
    stroke(0);
    ellipse(width/9.9, height - height/3.3, width/15, width/15);
  }

  // Right red button, shoots a bullet/blueberry
  if(red1){
    // Button is bright red and transparent
    fill('rgba(255, 0, 0, 0.5)');
    stroke(0);
    ellipse(width - width/11.5, height - height/6, width/15, width/15);
  } else {
    // When pressed the button turns darker
    fill('rgba(100, 0, 0, 0.5)');
    stroke(0);
    ellipse(width - width/11.5, height - height/6, width/15, width/15);
  }

  // Right red button, jumps ship around screen
  if(red2){
    // Button is bright red and transparent
    fill('rgba(255, 0, 0, 0.5)');
    stroke(0);
    ellipse(width - width/5, height - height/6, width/15, width/15);
  } else {
    // When pressed the button turns darker
    fill('rgba(100, 0, 0, 0.5)');
    stroke(0);
    ellipse(width - width/5, height - height/6, width/15, width/15);
  }
}


// Sets the game up
function start(){
  // First/starting background
  imageMode(CENTER);
  image(gamebackground, width/2, height/2, width, height);
  fill(255);
  text("Master of Pie", width/2 - width/20, height/4);
  text("Start", width/2 - width/75, height/2);
  text("(Landscape Orientation Preferred)", width/2 - width/10, height/4 + height/14);
  // Pizzas array is cleared
  pizzas = [];
  // Creates the ship
  ship = new Spacecraft();
  // Creates pizzas/asteroids at random places offscreen
  for(let i = 0; i < pizzaorder; i++){
    pizzas[i] = new Rock(random(0, width), random(0, height), random(width/40, width/10));
  }
  // Reset variables
  click3 = true;
  reload = 10;
  piecutter = [];
  pizzaorder = 1;
  level = 1;
  mobile = true;
}


// Gives directions of what to do if on mobile or computer
function instructions(){
  // Second/ingame background
  imageMode(CENTER);
  image(spacebackground, width/2, height/2, width, height);
  fill(255);
  // Directions
  text("Use Onscreen Controls", width/6, height/4);
  text("Mobile", width/4, height/2);
  text("Use W A D F and Spacebar Keys", width - width/3, height/4);
  text("Computer", width - width/4, height/2);
}


// Delay between end and start
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


// Makes the ship jump across the screen
function hyperspace(){
  ship.x1 = random(0, width);
  ship.y1 = random(0, height);
  ship.makeShip();
  click3 = true;
  hyper = false;
}


// Resets bullet count for reloading
function reloadMechanics(){
  reload = 10;
}


// Draws the number of bullets at the bottom of the screen
function bulletCount(){
  let xPos = width - width/25;
  let yPos = height - height/25;
  for(let i = 0; i < reload; i++){
    fill('rgba(255, 0, 0, 0.5)');
    noStroke();
    ellipse(xPos, yPos, width/100, width/100);
    xPos -= width/50;
  }
}


// Shows the level onscreen
function levelCount(){
  fill(255);
  text("Level", width/2, height - height/4);
  text(level, width/2, height - height/4 + height/25);
}


// Increases the level and number of pizzas (up to 5)
function nextLevel(){
  pizzaorder++;
  if(pizzaorder >= 5){
    pizzaorder = 5;
  }
  level++;
  for(let i = 0; i < pizzaorder; i++){
    pizzas[i] = new Rock(random(0, width), random(-height, 0), random(width/40, width/10));
  }
}
