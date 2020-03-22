class Person {
	constructor(gameWidth, gameHeight){

		this.width = 24;
		this.height = 38;
		this.maxSpeedx= 5;
		this.speedx= 0;
		this.maxSpeedy= 5;
		this.speedy = 0;
		this.keyFound = false;
		this.key2Found = false;

		this.position = {
			x: gameWidth/2 - this.width/2,
			y: gameHeight-this.height-10,
		}
	}

	moveLeft(){
		this.speedx= -this.maxSpeedx;
		this.speedy = 0;
	}

	moveRight(){
		this.speedx= +this.maxSpeedx;
		this.speedy = 0;
	}

	moveUp(){
		this.speedy = this.maxSpeedy;
		this.speedx = 0;
	}
	moveDown(){
		this.speedy = -this.maxSpeedy;
		this.speedx = 0;
	}
	stopx(){
		this.speedx = 0;
	}
	stopy(){
		this.speedy = 0;
	}

	draw(ctx){
		ctx.fillStyle = "#f0f";
		ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
	}

	hasFoundKey(keyX,keyY,keyName){
		//CHECK IF BOUNDARIES OF KEY WITHIN BOUNDARIES OF CHARACTER
		if ((keyX > this.position.x && keyX+10 < this.position.x +this.width ) && (keyY > this.position.y && keyY+10 < this.position.y + this.height)){
			 switch(keyName){
				case "key1":
					this.keyFound = true;
					break;
				case "key2":
					this.key2Found = true;
					break;
				case "key3":
					this.key3Found = true;
					break;
			}
		}
	}

	wall_interaction(posX, posY){
			//BELOW
		if((this.position.y > posY+10 && this.position.y < posY+20) && this.position.x >= posX && this.position.x < posX+30) this.position.y = posY+20;
		if((this.position.y > posY+10 && this.position.y < posY +20) && this.position.x +this.width >= posX+70 && this.position.x < posX+100) this.position.y = posY+20;
			//ABOVE
		if((this.position.y + this.height < posY+10 && this.position.y + this.height > posY) && this.position.x >= posX && this.position.x < posX+30) this.position.y = posY-this.height;
		if((this.position.y + this.height < posY+10 && this.position.y + this.height > posY) && this.position.x + this.width >= posX+70 && this.position.x < posX+100) this.position.y = posY-this.height;
			//INSIDES OF WALLS
		if((this.position.x > posX+30-this.width && this.position.x < posX+30) && this.position.y +this.height> posY && this.position.y < posY+20) this.position.x = posX+30;
		if((this.position.x < posX+70 + this.width && this.position.x + this.width > posX+70) && this.position.y + this.height > posY && this.position.y < posY+20) this.position.x = posX+70-this.width;
	}

	door_interaction(posX, posY,keyFoundParam){
		if((this.position.y > posY+10 && this.position.y < posY+20) && this.position.x >= posX+30 && this.position.x < posX+70 && !keyFoundParam) this.position.y = posY+20;
		if((this.position.y + this.height < posY+10 && this.position.y + this.height > posY) && this.position.x >= posX+30 && this.position.x < posX+70 && !keyFoundParam) this.position.y = posY-this.height;
	}

	update(deltaTime){
		if(!deltaTime) return;
		this.position.x += this.speedx;
		this.position.y += this.speedy;

		//outside boundaries
		if(this.position.x < 0) this.position.x = 0;
		if(this.position.x >600-this.width) this.position.x =600-this.width;

		if(this.position.y < 0) this.position.y = 0;
		if(this.position.y >600-this.height) this.position.y =600-this.height;

		//inside boundaries
			//BELOW
		if((this.position.y > 500-this.height && this.position.y < 500) && this.position.x +this.width> 100 && this.position.x < 500) this.position.y = 500;
			//ABOVE
		if((this.position.y +this.height < 140 && this.position.y + this.height > 100) && this.position.x + this.width > 100 && this.position.x < 500) this.position.y = 100-this.height;
			//RIGHT
		if((this.position.x > 500-this.width && this.position.x < 500) && this.position.y +this.height> 100 && this.position.y < 500) this.position.x = 500;
			//LEFT
		if((this.position.x < 100 + this.width && this.position.x + this.width > 100) && this.position.y + this.height > 100 && this.position.y < 500) this.position.x = 100-this.width;


		this.wall_interaction(0,100);
		this.wall_interaction(0,480);
		this.wall_interaction(500,480);

		this.door_interaction(0,100,this.keyFound);
		this.door_interaction(0,480,this.key2Found);
		this.door_interaction(500,480,this.key3Found);

	}
}

class InputHandler {

	constructor(person){
		document.addEventListener('keydown', event => {

			switch(event.keyCode){
				case 37:
					person.moveLeft();
					break;
				case 39:
					person.moveRight();
					break;
				case 40:
					person.moveUp();
					break;
				case 38:
					person.moveDown();
					break;
			}

		});

		document.addEventListener('keyup', event => {

			switch(event.keyCode){
				case 37:
					if(person.speedx <0){
						person.stopx();
					}
					break;
				case 39:
					if(person.speedx >0){
						person.stopx();
					}
					break;
				case 40:
					if(person.speedy >0){
						person.stopy();
					}
					break;
				case 38:
					if(person.speedy <0){
						person.stopy();
					}
					break;
			}
		});
	}
}

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 600;
const GAME_HEIGHT = 600;

ctx.clearRect(0,0,608,608);

function draw_ground(){
	ctx.beginPath();
	ctx.rect(100,100,400,400);
	ctx.stroke();
}

function draw_wall(pos_x,pos_y){
	ctx.fillStyle = "#808080";
	ctx.fillRect(pos_x,pos_y,30,20);
	ctx.fillRect(pos_x+70,pos_y,30,20);
}
function draw_object(colour,pos_x,pos_y,width,height){
	ctx.beginPath();
	ctx.fillStyle = colour;
	ctx.fillRect(pos_x,pos_y,width,height);
	ctx.stroke();
}


function remove_object(pos_x,pos_y, width, height){
	ctx.clearRect(pos_x,pos_y,width,height);
}
let person = new Person(GAME_WIDTH,GAME_HEIGHT);

new InputHandler(person);

let lastTime = 0;

let found_k1 = false;
let found_k2 = false;
let found_k3 = false;

const personImg = new Image();
personImg.src = "/static/images/p1.png";


function gameLoop(timestamp){

	let deltaTime = timestamp-lastTime;
	lastTime = timestamp

	ctx.clearRect(0,0,600,600);
	draw_ground();

	draw_wall(0,100);
	draw_wall(0,480);
	draw_wall(500,480);

	person.update(deltaTime);
	personX = person.position.x;
	personY = person.position.y;
	ctx.drawImage(personImg, personX, personY);
	//person.draw(ctx);

	//draw object box
	if (!person.keyFound){
		draw_object("#f00",80,70,10,10);
		draw_object("#000",30,100,40,20);
	}

	if (!person.key2Found){
		draw_object("#0f0",50,200,10,10);
		draw_object("#000",30,480,40,20);
	}

	if (!person.key3Found){
		draw_object("#00f",540,560,10,10);
		draw_object("#000",530,480,40,20);
	}

	person.hasFoundKey(80,70,"key1");
	person.hasFoundKey(50,200,"key2");
	person.hasFoundKey(540,560,"key3");

	requestAnimationFrame(gameLoop);
}

gameLoop();



