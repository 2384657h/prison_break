class Person {
	constructor(gameWidth, gameHeight){

		this.width = 32;
		this.height = 32;
		this.maxSpeedx= 5;
		this.speedx= 0;
		this.maxSpeedy= 5;
		this.speedy = 0;

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

	update(deltaTime){
		if(!deltaTime) return;
		this.position.x += this.speedx;
		this.position.y += this.speedy;

		//outside boundaries
		if(this.position.x < 0) this.position.x = 0;
		if(this.position.x >576) this.position.x =576;
		if(this.position.y < 0) this.position.y = 0;
		if(this.position.y >576) this.position.y =576;
		//inside boundaries
		if((this.position.y > 468 && this.position.y < 500) && this.position.x +32> 100 && this.position.x < 500) this.position.y = 500;
		if((this.position.y +32 < 132 && this.position.y + 32 > 100) && this.position.x + 32 > 100 && this.position.x < 500) this.position.y = 100-32;

		if((this.position.x > 468 && this.position.x < 500) && this.position.y +32> 100 && this.position.y < 500) this.position.x = 500;
		if((this.position.x < 132 && this.position.x + 32 > 100) && this.position.y + 32 > 100 && this.position.y < 500) this.position.x = 100-32;
		
		

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

const GAME_WIDTH = 608;
const GAME_HEIGHT = 608;

ctx.clearRect(0,0,608,608);

function draw_ground(){
	ctx.beginPath();
	ctx.rect(100,100,400,400);
	ctx.stroke();
}

let person = new Person(GAME_WIDTH,GAME_HEIGHT);

new InputHandler(person);


let lastTime = 0;

let found = false;


function gameLoop(timestamp){

	let deltaTime = timestamp-lastTime;
	lastTime = timestamp

	ctx.clearRect(0,0,608,608);
	draw_ground();
	person.update(deltaTime);
	person.draw(ctx);

	//draw object box
	if (!found){
		ctx.fillStyle = "#f00";
		ctx.fillRect(80, 70, 10, 10);
	}
	else{
		ctx.clearRect(80,70,10,10);
	}

	//check if person picks up object
	if ((80 >person.position.x && 90 < person.position.x +32 ) && (70 > person.position.y && 80 < person.position.y + 32)){
		found = true;
	} 

	requestAnimationFrame(gameLoop);
}

gameLoop();



