class Player {
	constructor(gameWidth, gameHeight){

		this.width = 24;
		this.height = 38;
		this.maxSpeedx= 5;
		this.speedx= 0;
		this.maxSpeedy= 5;
		this.speedy = 0;
		this.characterCode = 0;
		this.key1Found = false;
		this.key2Found = false;
		this.key3Found = false;

		this.position = {
			x: gameWidth/2 - this.width/2,
			y: gameHeight - this.height/4 - gameHeight/6,
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
	move_player(x_value, y_value){
		this.position.x = x_value;
		this.position.y = y_value;
	}

	draw(ctx){
		var playerImg = new Image();
		switch(this.characterCode){
			case 1:
				playerImg.src = "/static/images/p1.png";
				break;
			case 2:
				playerImg.src = "/static/images/p2.png";
				break;
			case 3:
				playerImg.src = "/static/images/p3.png";
				break;
			case 0:
				playerImg.src = "/static/images/playerGem.png";
				break;
       
		}
		ctx.drawImage(playerImg, this.position.x,this.position.y,this.width,this.height);
		if (mode == "Demo"){
			var gemImg = new Image();
			gemImg.src = "/static/images/playerGem.png";
			ctx.drawImage(gemImg, this.position.x + this.width/2 - this.width/4,this.position.y - 27.5,12.5,25);
		}
		if (mode == "Ranked" && playerSelected){
			var gemImg = new Image();
			gemImg.src = "/static/images/playerGem.png";
			ctx.drawImage(gemImg, this.position.x + this.width/2 - this.width/4,this.position.y - 27.5,12.5,25);
		}
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

	update(deltaTime){
		if(!deltaTime) return;

		if (!stopAllMovement){
			this.position.x += this.speedx;
			this.position.y += this.speedy;
		}
		//outside boundaries
		if(this.position.x < 0) this.position.x = 0;
		if(this.position.x >600-this.width) this.position.x =600-this.width;

		if(this.position.y < 0) this.position.y = 0;
		if(this.position.y >600-this.height) this.position.y =600-this.height;

	}

}

class Person {
	constructor(x_value, y_value, movement, currentDirection, characterSrc){

		this.width = 24;
		this.height = 38;
		this.maxSpeedx= 1;
		this.speedx= 0;
		this.maxSpeedy= 1;
		this.speedy = 0;
		this.movement = movement;
		this.currentDirection = currentDirection;
		this.characterSrc = characterSrc;
		this.maxMovement = 40;


		this.position = {
			x: x_value - this.width/2,
			y: y_value - this.height/2,
		}

		this.origin = {
			x: x_value - this.width/2,
			y: y_value - this.height/2,
		}
	}

	performMovement(){

		if(distracted==1){
			this.maxSpeedx = 5;
			this.maxSpeedy = 5;
		}else{
			this.maxSpeedx = 1;
			this.maxSpeedy = 1;
		}

		if (!canPlayerInteract(this.position.x - 5, this.position.y - 5, this.width + 10, this.height +10)){
			if (this.movement == 'vertical'){
				if (this.currentDirection == 'up'){
					if (this.position.y > this.origin.y + this.maxMovement){
						this.currentDirection = 'down';
						this.maxMovement = getRandomInt(180);
					}else{
						this.moveUp();
					}
				}
				if (this.currentDirection == 'down'){
					if (this.position.y < this.origin.y - this.maxMovement){
						this.currentDirection = 'up';
						this.maxMovement = getRandomInt(180);
					}else{
						this.moveDown();
					}
				}
			}
			if (this.movement == 'horizontal'){
				if (this.currentDirection == 'right'){
					if (this.position.x > this.origin.x + this.maxMovement){
						this.currentDirection = 'left';
						this.maxMovement = getRandomInt(180);
					}else{
						this.moveRight();
					}
				}
			if (this.currentDirection == 'left'){
					if (this.position.x < this.origin.x - this.maxMovement){
						this.currentDirection = 'right';
						this.maxMovement = getRandomInt(180);
					}else{
						this.moveLeft();
					}
				}
			}
			if (this.movement == 'stationary'){
				this.speedx = 0;
				this.speedy = 0;
			}
			}else{
				this.speedx = 0;
				this.speedy = 0;
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
		var personImg = new Image();
		personImg.src = this.characterSrc;
		ctx.drawImage(personImg, this.position.x,this.position.y,this.width,this.height);
	}


	update(deltaTime){
		if(!deltaTime) return;

		if (!stopAllMovement){
			this.position.x += this.speedx;
			this.position.y += this.speedy;
		}

		if(this.position.x < 0) {
			this.position.x = 0;
			this.currentDirection = 'right';
		}
		if(this.position.x > 600 - this.width) {
			this.position.x = 600 - this.width;
			this.currentDirection = 'left';
		}
		if(this.position.y < 0) {
			this.position.y = 0;
			this.currentDirection = 'up';
		}
		if(this.position.y > 600 - this.height) {
			this.position.y = 600 - this.height;
			this.currentDirection = 'down';
		}
	}
}

class InputHandler {

	constructor(player){
		document.addEventListener('keydown', event => {

			switch(event.keyCode){
				case 37:
					player.moveLeft();
					break;
				case 39:
					player.moveRight();
					break;
				case 40:
					player.moveUp();
					break;
				case 38:
					player.moveDown();
					break;
			}

		});

		document.addEventListener('keyup', event => {

			switch(event.keyCode){
				case 37:
					if(player.speedx <0){
						player.stopx();
					}
					break;
				case 39:
					if(player.speedx >0){
						player.stopx();
					}
					break;
				case 40:
					if(player.speedy >0){
						player.stopy();
					}
					break;
				case 38:
					if(player.speedy <0){
						player.stopy();
					}
					break;
				case 32:
					if (!modeSelected){
						switch(hovered_over_mode){
							case 1:
								mode = "Demo";
								modeSelected = true;
								break;
							case 2:
								mode = "Ranked";
								modeSelected = true;
								break;
						}
					}else{
						if (mode == "Ranked"){
							if (!playerSelected){
								switch(hovered_over_character){
									case 1:
										player.characterCode = 1;
										playerSelected = true;
										break;
									case 2:
										player.characterCode = 2;
										player.maxSpeedy = 3;
										player.maxSpeedx = 3;
										playerSelected = true;
										break;
									case 3:
										player.characterCode = 3;
										playerSelected = true;
										break;
								}
							}else{
								switch(ranked_hovered_over_object){
									case 1:
										currentRoom = "Courtyard";
										player.move_player(GAME_WIDTH/2 - player.width/2, player.height/2 + 10);
										timeOfRoomChange = lastTime;
										break;
									case 2:
										currentRoom = "Day Room";
										player.move_player(player.width/2, GAME_HEIGHT/2 - player.height/2);
										timeOfRoomChange = lastTime;
										break;
									case 3:
										currentRoom = "Courtyard";
										player.move_player(GAME_WIDTH - player.width/2 - 25, GAME_HEIGHT/2 - player.height/2);
										timeOfRoomChange = lastTime;
										break;
									case 4:
										currentRoom = "Cells";
										player.move_player(GAME_WIDTH/2 - player.width/2,GAME_HEIGHT - player.height/2 - 30);
										timeOfRoomChange = lastTime;
										break;
									case 5:
										currentRoom = "Showers";
										player.move_player(player.width/2 + 25, GAME_HEIGHT/2 - player.height/2);
										timeOfRoomChange = lastTime;
										break;
									case 6:
										currentRoom = "Cells";
										player.move_player(GAME_WIDTH - player.width/2 - 25, GAME_HEIGHT/2 - player.height/2);
										timeOfRoomChange = lastTime;
										break;
									case 7:
										currentRoom = "Cafeteria";
										player.move_player(GAME_WIDTH - player.width/2 - 25, GAME_HEIGHT/2 - player.height/2);
										timeOfRoomChange = lastTime;
										break;
									case 8:
										currentRoom = "Courtyard";
										player.move_player(player.width/2 + 25, GAME_HEIGHT/2 - player.height/2);
										timeOfRoomChange = lastTime;
										break;
									case 9:
										timeOfTextStart = lastTime;
										characterSpeaking = 9;
										stopAllMovement = true;
										break;
									case 10:
										if (storageRoomKeyFound==1){
											currentRoom = "Storage Room";
											player.move_player(GAME_WIDTH/2 - player.width/2, player.height/2 + 10);
											timeOfRoomChange = lastTime;
										}else{
											timeOfTextStart = lastTime;
											characterSpeaking = 0;
											stopAllMovement = true;
											speakingReason = "locked";
										}
										break;
									case 11:
										storageRoomKeyFound = 1;
										break;

									//exit hallway to courtyard
									case 12:
										currentRoom = "Courtyard";
										player.move_player(GAME_WIDTH/2 - player.width/2, GAME_HEIGHT - player.height/2 - 30);
										timeOfRoomChange = lastTime;
										break;
									case 13:
										if (distracted==1){
											currentRoom = "Exit Hallway";
											player.move_player(GAME_WIDTH/2 - player.width/2,player.height + 5);
											timeOfRoomChange = lastTime;
										}else{
											timeOfTextStart = lastTime;
											characterSpeaking = 0;
											stopAllMovement = true;
											speakingReason = "distraction";
										}
										break;

									//talk to Ralph
									case 14:
										timeOfTextStart = lastTime;
										characterSpeaking = 14;
										stopAllMovement = true;
										break;
									//talk to Tony
									case 15:
										timeOfTextStart = lastTime;
										characterSpeaking = 15;
										stopAllMovement = true;
										break;

									//storage to cafeteria
									case 16:
										if (storageRoomKeyFound==1){
											currentRoom = "Cafeteria";
											player.move_player(GAME_WIDTH/2 - player.width/2, GAME_HEIGHT - player.height/2 - 30);
											timeOfRoomChange = lastTime;
										}
										break;
									//get escape key in stroage room
									case 17:
										escapeKeyFound = 1;
										break;
									case 18:
										if(wardenKeyFound==1){
											currentRoom = "Warden's Office";
											player.move_player(player.width/2 + 25, GAME_HEIGHT/2 - player.height/2);
											timeOfRoomChange = lastTime;
										}else{
											timeOfTextStart = lastTime;
											characterSpeaking = 0;
											stopAllMovement = true;
											speakingReason = "locked";
										}
										break;
									case 19:
										currentRoom = "Exit Hallway";
										player.move_player(GAME_WIDTH - player.width/2 - 25, GAME_HEIGHT/2 - player.height/2);
										timeOfRoomChange = lastTime;
										break;
									case 20:
										if (escapeKeyFound==1){
											rankedGameFinished = true;
										}else{
											timeOfTextStart = lastTime;
											characterSpeaking = 0;
											stopAllMovement = true;
											speakingReason = "locked";
										}
										break;
									case 21:
										timeOfTextStart = lastTime;
										characterSpeaking = 21;
										stopAllMovement = true;
										randomTextInt = getRandomInt(3);
										break;
									case 22:
										timeOfTextStart = lastTime;
										characterSpeaking = 22;
										stopAllMovement = true;
										randomTextInt = getRandomInt(3);
										break;
									case 23:
										timeOfTextStart = lastTime;
										characterSpeaking = 23;
										stopAllMovement = true;
										randomTextInt = getRandomInt(3);
										break;
									case 24:
										timeOfTextStart = lastTime;
										characterSpeaking = 24;
										stopAllMovement = true;
										randomTextInt = getRandomInt(3);
										break;
									case 25:
										timeOfTextStart = lastTime;
										characterSpeaking = 25;
										stopAllMovement = true;
										randomTextInt = getRandomInt(3);
										break;
									case 26:
										timeOfTextStart = lastTime;
										characterSpeaking = 26;
										stopAllMovement = true;
										randomTextInt = getRandomInt(3);
										break;
									case 27:
										timeOfTextStart = lastTime;
										characterSpeaking = 27;
										stopAllMovement = true;
										break;
									case 28:
										timeOfTextStart = lastTime;
										characterSpeaking = 0;
										stopAllMovement = true;
										speakingReason = "key";
										wardenKeyFound = 1;
										break;
									case 29:
										if (player.characterCode == 2){
											timeOfTextStart = lastTime;
											characterSpeaking = 0;
											stopAllMovement = true;
											speakingReason = "key";
											escapeKeyFound = 1;
										}else{
											timeOfTextStart = lastTime;
											characterSpeaking = 0;
											stopAllMovement = true;
											speakingReason = "character";
										}
										break;
									case 30:
										timeOfTextStart = lastTime;
										characterSpeaking = 30;
										stopAllMovement = true;
										break;
									case 31:
										timeOfTextStart = lastTime;
										characterSpeaking = 31;
										stopAllMovement = true;
										randomTextInt = getRandomInt(3);
										break;
									case 32:
										timeOfTextStart = lastTime;
										characterSpeaking = 32;
										stopAllMovement = true;
										randomTextInt = getRandomInt(3);
										break;
									case 33:
										timeOfTextStart = lastTime;
										characterSpeaking = 33;
										stopAllMovement = true;
										randomTextInt = getRandomInt(3);
										break;
									case 34:
										trophy1found = 1;
										timeOfTextStart = lastTime;
										characterSpeaking = 0;
										stopAllMovement = true;
										speakingReason = "value";
										break;
									case 35:
										trophy2found = 1;
										timeOfTextStart = lastTime;
										characterSpeaking = 0;
										stopAllMovement = true;
										speakingReason = "value";
										break;
									case 36:
										trophy3found = 1;
										timeOfTextStart = lastTime;
										characterSpeaking = 0;
										stopAllMovement = true;
										speakingReason = "value";
										break;
								}
							}
						}else if(mode == "Demo"){
							switch(demo_hovered_over_object){
								case 1:
									//prisoner
									timeOfTextStart = lastTime;
									characterSpeaking = demo_hovered_over_object;
									stopAllMovement = true;
									randomTextInt = getRandomInt(3);
									break;
								case 2:
									//guard
									timeOfTextStart = lastTime;
									characterSpeaking = demo_hovered_over_object;
									stopAllMovement = true;
									randomTextInt = getRandomInt(3);
									break;
								case 3:
									//key
									demoKeyFound1 = true;
									break;
								case 4:
									if (demoKeyFound1){
										currentRoom = "Storage Room";
										player.move_player(player.width + 20, GAME_HEIGHT/2 - player.height/2);
										timeOfRoomChange = lastTime;
									}else{
										timeOfTextStart = lastTime;
										characterSpeaking = 0;
										speakingReason = "locked";
										stopAllMovement = true;
									}
									break;
								case 5:
									if (demoKeyFound1){
										currentRoom = "Exit Hallway";
										player.move_player(GAME_WIDTH - player.width - 20, GAME_HEIGHT/2 - player.height/2);
										timeOfRoomChange = lastTime;
									}
									break;
								case 6:
									//get key from prisoner
									timeOfTextStart = lastTime;
									characterSpeaking = demo_hovered_over_object;
									demoKeyFound2 = true;
									stopAllMovement = true;
									break;
								case 100:
									if(demoKeyFound2){ 
										demoCompleted = true;
									}else{
										timeOfTextStart = lastTime;
										characterSpeaking = 0;
										speakingReason = "locked";
										stopAllMovement = true;
									}
									break;
							}
						}
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

//relates to the first game loop (selectionLoop)
var gap_space = 32;
var selection_width = (GAME_WIDTH - 4 * gap_space)/3;
var selection_height = (GAME_WIDTH - 4 * gap_space)/3;

//refers to generic prioner interactions
let genericPrisoner = ["Move!","Get out of my way!","What do you want!?"];
let nicePrisoner = ["Excuse me", "Move... please.", "What can I do for you?"]

//refers to generic guard interactions
let genericGuard = ["Move along, prisoner!","Stay out of trouble, prisoner!","I'm watching you."]
let niceGuard = ["Hello.","How are you doing today?","Someone giving you trouble?"]

var randomTextInt;

var totaltime = 0;

var currentTimestamp = 0;


//refers to the character that is player is on
var hovered_over_character = 0;
var hovered_over_mode = 0;

var demo_hovered_over_object;
var ranked_hovered_over_object;

//refers to times for temporary text display
var timeOfRoomChange;
var timeOfTextStart;
var timeOfGameStart;
var timeOfGameEnd;
var characterSpeaking;
var stopAllMovement = false;
var speakingReason;

//refers to the player icons
var playerIconHeight = 48;
var playerIconWidth = 35;
var mode;

//refers to width and height of door
var door_height = 10;
var door_width = 45;

//demo related
var demoKeyFound1 = false;
var demoKeyFound2 = false;
let demoKeyData1 = {
	x: 200,
	y: 300,
	height: 10,
	width: 20
}
let demoKeyData2 = {
	x: GAME_WIDTH - 100,
	y: GAME_HEIGHT - 30,
	height: 10,
	width: 20
}

//regular key
let storageKeyData = {
	x: GAME_WIDTH/2 + GAME_WIDTH/6,
	y: GAME_HEIGHT/6,
	height: 10,
	width: 20
}

let escape1KeyData = {
	x: GAME_WIDTH/2 - GAME_WIDTH/6,
	y: GAME_HEIGHT/6 + GAME_HEIGHT/2,
	height: 10,
	width: 20
}

let trophy1Data = {
	x: GAME_WIDTH/2 + GAME_WIDTH/6,
	y: GAME_HEIGHT/3,
	height: 32,
	width: 32
}

let trophy2Data = {
	x: GAME_WIDTH/6,
	y: GAME_HEIGHT/6 + GAME_HEIGHT/2,
	height: 32,
	width: 32
}

let trophy3Data = {
	x: GAME_WIDTH - GAME_WIDTH/6,
	y: GAME_HEIGHT - GAME_HEIGHT/6,
	height: 32,
	width: 32
}

//will be false when items are not touched by the player (demo)
var demoCanInteract1;
var demoCanInteract2;
var demoCanInteract3;

//
var arrow_height = 32;
var arrow_width = 32;

var rankedGameFinished = false;
var gameScore;

let isNewGame = document.getElementById("newgamecheck").value;

//thing that will need to be saved
var spokenToJim = 0;
var spokenToTony = 0;
var storageRoomKeyFound = 0;
var escapeKeyFound = 0;
var distracted = 0;
var wardenKeyFound = 0;
var trophy1found = 0;
var trophy2found = 0;
var trophy3found = 0;
var currentRoom = "";


var playerSelected = false;
var currentRunningTime;
var modeSelected = false;

//key image
const keyImg = new Image();
keyImg.src = "/static/images/key.png";	

//sources
var guard1 = "/static/images/guard1.png";
var guard2 = "/static/images/guard2.png";
var guard3 = "/static/images/guard3.png";

var prisoner1 = "/static/images/prisoner1.png";
var prisoner2 = "/static/images/prisoner2.png";
var prisoner3 = "/static/images/prisoner3.png";

var rightArrow = "/static/images/RightArrow.png";
var leftArrow = "/static/images/LeftArrow.png";
var upArrow = "/static/images/UpArrow.png";
var downArrow = "/static/images/DownArrow.png";

var toilet = "/static/images/toilet.png";
var rock = "/static/images/Cobblestone.png";
var trophy = "/static/images/Trophy.png";

const rightArrowImg = new Image();
rightArrowImg.src = rightArrow;
const leftArrowImg = new Image();
leftArrowImg.src = leftArrow;
const upArrowImg = new Image();
upArrowImg.src = upArrow;
const downArrowImg = new Image();
downArrowImg.src = downArrow;

const toiletImg = new Image();
toiletImg.src = toilet;
const rockImg = new Image();
rockImg.src = rock;
const trophyImg = new Image();
trophyImg.src = trophy;


var possible_start_rooms = ["Cells", "Day Room", "Courtyard"]

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
  }

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

function canPlayerInteract(x_value, y_value, obj_width, obj_height){
	if (!(player.position.y > y_value + obj_height || player.position.x + player.width < x_value || player.position.y + player.height < y_value|| player.position.x > x_value + obj_width)){
		return true; 
	}else{
		return false;
	}	
}


function remove_object(pos_x,pos_y, width, height){
	ctx.clearRect(pos_x,pos_y,width,height);
}

let player = new Player(GAME_WIDTH,GAME_HEIGHT);

let demowanderer1 = new Person(GAME_WIDTH/2 + GAME_WIDTH/6, GAME_HEIGHT/2 - GAME_HEIGHT/4, 'horizontal', 'right', prisoner2);
let demowanderer2 = new Person(GAME_WIDTH/2 - GAME_WIDTH/3, GAME_HEIGHT/2 + GAME_HEIGHT/4, 'vertical', 'down', guard2);
let demowanderer3 = new Person(GAME_WIDTH/2 + GAME_WIDTH/4, GAME_HEIGHT/2 + GAME_HEIGHT/4, 'horizontal', 'right', prisoner1);
let demowanderer4 = new Person(GAME_WIDTH * 0.75 - 30, GAME_HEIGHT/2 + GAME_HEIGHT/4, 'vertical', 'down', prisoner3);

let guardwanderer1 = new Person(GAME_WIDTH/2 + GAME_WIDTH/6, GAME_HEIGHT/2 - GAME_HEIGHT/4, 'stationary', 'null', guard1);
let guardwanderer2 = new Person(GAME_WIDTH/2 + GAME_WIDTH/6, GAME_HEIGHT/2 + GAME_HEIGHT/6, 'horizontal', 'right', guard1);
let guardwanderer4 = new Person(GAME_WIDTH/2 - GAME_WIDTH/8, GAME_HEIGHT/4, 'vertical', 'up', guard3);
let guardwanderer3 = new Person(GAME_WIDTH/2 + GAME_WIDTH/6, GAME_HEIGHT/2 - GAME_HEIGHT/4, 'horizontal', 'left', guard2);
let guardwanderer5 = new Person(GAME_WIDTH/2 + GAME_WIDTH/6, GAME_HEIGHT/2 + GAME_HEIGHT/4, 'vertical', 'down', guard2);
let guardwanderer6 = new Person(GAME_WIDTH/2 + GAME_WIDTH/6, GAME_HEIGHT/2 - GAME_HEIGHT/4, 'horizontal', 'right', guard2);
let guardwanderer7 = new Person(GAME_WIDTH/6, GAME_HEIGHT/2, 'vertical', 'up', guard3);
let guardwanderer8 = new Person(GAME_WIDTH/2 + GAME_WIDTH/6, GAME_HEIGHT/2 + GAME_HEIGHT/4, 'stationary', 'null', guard1);
let guardwanderer9 = new Person(GAME_WIDTH - 30, GAME_HEIGHT/2, 'stationary', 'null', guard1);
let guardwanderer10 = new Person(GAME_WIDTH/8 , GAME_HEIGHT - GAME_HEIGHT/8 - GAME_HEIGHT/16, 'horizontal', 'right', guard2);

let prisonerwanderer1 = new Person(GAME_WIDTH/2 - GAME_WIDTH/6, GAME_HEIGHT/2 + GAME_HEIGHT/4, 'horizontal', 'left', prisoner1);
let prisonerwanderer2 = new Person(GAME_WIDTH/3 - GAME_WIDTH/6, GAME_HEIGHT/3 - GAME_HEIGHT/4, 'horizontal', 'right', prisoner1);
let prisonerwanderer3 = new Person(GAME_WIDTH/2 - GAME_WIDTH/6, GAME_HEIGHT/2 - GAME_HEIGHT/4, 'stationary', 'null', prisoner1);
let prisonerwanderer4 = new Person(100,100, 'stationary', 'null', prisoner2);
let prisonerwanderer5 = new Person(GAME_WIDTH/2 + GAME_WIDTH/6, GAME_HEIGHT/3 - GAME_HEIGHT/8, 'stationary', 'null', prisoner2);
let prisonerwanderer6 = new Person(GAME_WIDTH/2 + GAME_WIDTH/6, GAME_HEIGHT/2 + GAME_HEIGHT/4, 'vertical', 'up', prisoner2);
let prisonerwanderer7 = new Person(100,60, 'stationary', 'null', prisoner3);
let prisonerwanderer8 = new Person(GAME_WIDTH/2 + GAME_WIDTH/6, GAME_HEIGHT - 70, 'horizontal', 'right', prisoner3);
let prisonerwanderer9 = new Person(GAME_WIDTH/2 + GAME_WIDTH/6, GAME_HEIGHT/2 - GAME_HEIGHT/4, 'horizontal', 'right', prisoner3);
let prisonerwanderer10 = new Person(GAME_WIDTH -100, GAME_HEIGHT/8, 'vertical', 'up', prisoner1);
let prisonerwanderer11 = new Person(GAME_WIDTH -100, GAME_HEIGHT/2 + GAME_HEIGHT/8, 'horizontal', 'right', prisoner2);
let prisonerwanderer12 = new Person(GAME_WIDTH -100, GAME_HEIGHT/2 + GAME_HEIGHT/8, 'horizontal', 'right', prisoner2);


new InputHandler(player);


var demoCompleted = false;

let lastTime = 0;

let found_k1 = false;
let found_k2 = false;
let found_k3 = false;

var buffer = 82;

let charcodeInput = document.getElementById("charCode").value;

function modeSelectionLoop(timestamp){
	ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

	let deltaTime = timestamp-lastTime;
	lastTime = timestamp;

	ctx.fillStyle = '#000';
	if (canPlayerInteract(buffer, GAME_HEIGHT/2 - selection_height/2, selection_width, selection_height)){
		ctx.fillRect(buffer-3, GAME_HEIGHT/2 - selection_height/2 - 3, selection_width + 6, selection_height + 6);
		hovered_over_mode = 1;
	}else{
		ctx.fillRect(buffer-1, (GAME_HEIGHT/2 - selection_height/2)-1 , selection_width + 2, selection_height + 2);
	}

	ctx.fillStyle = '#fff';
	ctx.fillRect(buffer, (GAME_HEIGHT/2 - selection_height/2), selection_width, selection_height);

	ctx.fillStyle = '#000';
	ctx.textAlign = 'center';
	ctx.font = "12px Arial";
	ctx.fillText("Play Demo", buffer + selection_width/2,GAME_HEIGHT/2);



	ctx.fillStyle = '#000';
	if (canPlayerInteract(GAME_WIDTH - selection_width - buffer, GAME_HEIGHT/2 - selection_height/2, selection_width, selection_height)){
		ctx.fillRect(GAME_WIDTH - selection_width - buffer - 3, GAME_HEIGHT/2 - selection_height/2 - 3, selection_width + 6, selection_height + 6);
		hovered_over_mode = 2;
	}else{
		ctx.fillRect(GAME_WIDTH - selection_width - buffer - 1, GAME_HEIGHT/2 - selection_height/2 - 1, selection_width + 2, selection_height + 2);
	}

	if (!canPlayerInteract(GAME_WIDTH - selection_width - buffer, GAME_HEIGHT/2 - selection_height/2, selection_width, selection_height) && !canPlayerInteract(buffer, GAME_HEIGHT/2 - selection_height/2, selection_width, selection_height)){
		hovered_over_mode = 0;
	}

	ctx.fillStyle = '#fff';
	ctx.fillRect(GAME_WIDTH - selection_width - buffer, GAME_HEIGHT/2 - selection_height/2, selection_width, selection_height);

	ctx.fillStyle = '#000';
	ctx.textAlign = 'center';
	ctx.font = "12px Arial";
	ctx.fillText("Play Ranked Game", GAME_WIDTH/2 + selection_width/2 + 0.75 * buffer, GAME_HEIGHT/2);

	ctx.fillStyle = '#000';
	ctx.textAlign = 'center';
	ctx.font = "15px Arial";
	ctx.fillText("Move with the arrow keys and press space to select the mode ", GAME_WIDTH/2,GAME_HEIGHT/2 - 150);

	player.update(deltaTime);
	player.draw(ctx);

	if (!modeSelected){
		requestAnimationFrame(modeSelectionLoop)
	}else{
		if (mode == "Demo"){
			player.move_player(GAME_WIDTH/2 - player.width/2, GAME_HEIGHT - player.height - GAME_HEIGHT/6);
			player.characterCode = 1;
			currentRoom = "Exit Hallway";
			demoKeyFound1 = false;
			demoKeyFound2 = false;
			timeOfRoomChange = timestamp;
			demoLoop();
		}
		if (mode == "Ranked"){
			player.move_player(GAME_WIDTH/2 - player.width/2, GAME_HEIGHT - player.height - GAME_HEIGHT/6);

			//if newGame, go into character selection
			if (parseInt(isNewGame)==1){
				characterSelectionLoop();
			}
			else{
				//not new game, straight into

				player.characterCode = parseInt(charcodeInput);
				//change speed of character if strongman
				if (player.characterCode  == 3){
					player.maxSpeedx = 3;
					player.maxSpeedy = 3;
				}

				spokenToJim = parseInt(document.getElementById("spokeJ").value);
				spokenToTony = parseInt(document.getElementById("spokeT").value);
				storageRoomKeyFound = parseInt(document.getElementById("storeroomKey").value);
				escapeKeyFound = parseInt(document.getElementById("escapeKey").value);
				distracted = parseInt(document.getElementById("distracted").value);
				wardenKeyFound = parseInt(document.getElementById("wardenKey").value);
				trophy1found = parseInt(document.getElementById("trophy1").value);
				trophy2found = parseInt(document.getElementById("trophy2").value);
				trophy3found = parseInt(document.getElementById("trophy3").value);


				player.position.x = parseInt(document.getElementById("posX").value);
				player.position.y = parseInt(document.getElementById("posY").value);

				//player.move_player(parseInt(document.getElementById("posX").value),parseInt(document.getElementById("posY").value))

				currentRoom  = document.getElementById("currentRoom").value;

				//player.move_player(GAME_HEIGHT/2 - player.height/2, GAME_WIDTH/2 - player.width/2);
				playerSelected = true;
				timeOfRoomChange = timestamp;
				timeOfGameStart = timestamp;
				gameLoop();
			}
			
		}
	}
}

let urlSelect = document.getElementById("charSelectURL").value;


function characterSelectionLoop(timestamp){

	ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

	let deltaTime = timestamp-lastTime;
	lastTime = timestamp;

	ctx.textAlign = 'center';
	ctx.font = "15px Arial";
	ctx.fillStyle = '#000';
	ctx.fillText("Move with the arrow keys and press space to select your player", GAME_WIDTH/2,GAME_HEIGHT/2 - 150);

	if (canPlayerInteract(gap_space, GAME_HEIGHT/2 - selection_height/2, selection_width, selection_height)){
		ctx.fillStyle = '#000';
		ctx.fillRect(gap_space-3, (GAME_HEIGHT/2 - selection_height/2) -3, selection_width + 6, selection_height + 6);

		//store highlighted character
		hovered_over_character = 1;
					
		//The name of the first character
		ctx.font = "15px Arial";
		ctx.textAlign = 'center';
		ctx.fillText("The Theif", gap_space + selection_width/2,GAME_HEIGHT/2 + 150);

		ctx.font = "12px Arial";
		ctx.fillText("+ Able to steal items", gap_space + selection_width/2,GAME_HEIGHT/2 + 180);
		ctx.fillText("- Poor intelligence",gap_space + selection_width/2,GAME_HEIGHT/2 + 210);
					
	}else{
		//makes the black box smaller -- smaller border
		ctx.fillStyle = '#000';
		ctx.fillRect(gap_space-1, (GAME_HEIGHT/2 - selection_height/2) -1, selection_width + 2, selection_height + 2);
	}
	//with black box, creates a border
	ctx.fillStyle = '#fff';
	ctx.fillRect(gap_space, GAME_HEIGHT/2 - selection_height/2, selection_width, selection_height);

	//display charcacter -- will be replaced with image
	const iconImg1 = new Image();
	iconImg1.src = "/static/images/p1.png";	
	ctx.drawImage(iconImg1,gap_space + selection_width/2 - playerIconWidth/2, GAME_HEIGHT/2 - playerIconHeight/2, playerIconWidth, playerIconHeight);

	if (canPlayerInteract(1 * selection_width + 2 * gap_space, GAME_HEIGHT/2 - selection_height/2, selection_width, selection_height)){
		ctx.fillStyle = '#000';
		ctx.fillRect((1 * selection_width + 2 * gap_space)-3, (GAME_HEIGHT/2 - selection_height/2) - 3, selection_width + 6, selection_height + 6);
					
		//store highlighted character
		hovered_over_character = 2;

		//The name of the second character
		ctx.font = "15px Arial";
		ctx.textAlign = 'center';
		ctx.fillText("The Strong Man", 2 * gap_space + selection_width * 1.5,GAME_HEIGHT/2 + 150);

		ctx.font = "12px Arial";
		ctx.fillText("+ Able to lift heavy objects", 2 * gap_space + selection_width * 1.5,GAME_HEIGHT/2 + 180);
		ctx.fillText("- Poor mobility", 2 * gap_space + selection_width * 1.5,GAME_HEIGHT/2 + 210);
	}else{
		//makes the black box smaller -- smaller border
		ctx.fillStyle = '#000';
		ctx.fillRect((1 * selection_width + 2 * gap_space)-1, (GAME_HEIGHT/2 - selection_height/2) - 1, selection_width + 2, selection_height + 2);;
	}
	//with black box, creates a border
	ctx.fillStyle = '#fff';
	ctx.fillRect(1 * selection_width + 2 * gap_space, GAME_HEIGHT/2 - selection_height/2, selection_width, selection_height);
			
	//display charcacter -- will be repplaced with image
	const iconImg2 = new Image();
	iconImg2.src = "/static/images/p2.png";	
	ctx.drawImage(iconImg2, 2 * gap_space + 1.5 * selection_width - playerIconWidth/2, GAME_HEIGHT/2 - playerIconHeight/2, playerIconWidth, playerIconHeight);

	if (canPlayerInteract(2 * selection_width + 3 * gap_space, GAME_HEIGHT/2 - selection_height/2, selection_width, selection_height)){
		ctx.fillStyle = '#000';
		ctx.fillRect((2 * selection_width + 3 * gap_space) -3, (GAME_HEIGHT/2 - selection_height/2) -3, selection_width + 6, selection_height + 6);
				
		//store highlighted character
		hovered_over_character = 3;

		//The name of the third character
		ctx.font = "15px Arial";
		ctx.textAlign = 'center';
		ctx.fillText("The Manipulator", 3 * gap_space + selection_width * 2.5,GAME_HEIGHT/2 + 150);

		ctx.font = "12px Arial";
		ctx.fillText("+ Able to make people do things", 3 * gap_space + selection_width * 2.5,GAME_HEIGHT/2 + 180);
		ctx.fillText("- Poor Strength", 3 * gap_space + selection_width * 2.5,GAME_HEIGHT/2 + 210);
	}else{
		//makes the black box smaller -- smaller border
		ctx.fillStyle = '#000';
		ctx.fillRect((2 * selection_width + 3 * gap_space) -1, (GAME_HEIGHT/2 - selection_height/2) -1, selection_width + 2, selection_height + 2);
	}
	//with black box, creates a border
	ctx.fillStyle = '#fff';
	ctx.fillRect(2 * selection_width + 3 * gap_space , GAME_HEIGHT/2 - selection_height/2, selection_width, selection_height);

	//display charcacter -- will be repplaced with image
	const iconImg3 = new Image();
	iconImg3.src = "/static/images/p3.png";	
	ctx.drawImage(iconImg3, 3 * gap_space + 2.5 * selection_width - playerIconWidth/2, GAME_HEIGHT/2 - playerIconHeight/2, playerIconWidth, playerIconHeight);

	//if hovered over nothing make sure variable is 0
	if (!canPlayerInteract(1 * selection_width + 2 * gap_space, GAME_HEIGHT/2 - selection_height/2, selection_width, selection_height) && !canPlayerInteract(2 * selection_width + 3 * gap_space, GAME_HEIGHT/2 - selection_height/2, selection_width, selection_height) && !canPlayerInteract(gap_space, GAME_HEIGHT/2 - selection_height/2, selection_width, selection_height)){
		hovered_over_character = 0;
	}



	player.update(deltaTime);
	player.draw(ctx);

	if (!playerSelected){
		requestAnimationFrame(characterSelectionLoop);
	}else{
		//character selected, send data to server
		$.ajax({
			url: urlSelect,
			data: {'character': player.characterCode},
			type: 'POST'
		}).done(function(response){
			console.log(response);
		});

		player.move_player(GAME_HEIGHT/2 - player.height/2, GAME_WIDTH/2 - player.width/2);
		timeOfRoomChange = timestamp;
		timeOfGameStart = timestamp;
		currentRoom = possible_start_rooms[getRandomInt(3)];
		gameLoop();
	}
}

//had to use django context in html file to get url
//as ajax post request wasnt finding url from inside js file
let urlC = document.getElementById("counterURL").value;

let inputTime = document.getElementById("inputTime").value;

//var spokenToJim = 0;
//var spokenToTony = 0;
//var storageRoomKeyFound = 0;
//var escapeKeyFound = 0;
//var distracted = 0;
//var wardenKeyFound = 0;
//var trophy1found = 0;
//var trophy2found = 0;
//var trophy3found = 0;
//var currentRoom;

//, 'current_room':currentRoom, 'wardenKey':wardenKeyFound,
//			'escapeKey':escapeKeyFound, 'storageKey':storageRoomKeyFound, 'spokeT':spokenToTony, 'spokeJ':spokenToJim, 'distracted':distracted,
//			'trophy1':trophy1, 'trophy2':trophy2, 'trophy3':trophy3

$(document).ready(function(){
	$('#save_btn').click(function(){
		//send data every time button is clicked

		totaltime = (inputTime) + (currentTimestamp-timeOfGameStart);

		$.ajax({
			url: urlC,
			data: {'counter':totaltime, 'posX':player.position.x, 'posY':player.position.y,'current_room':currentRoom,'wardenKey':wardenKeyFound,'escapeKey':escapeKeyFound, 'storageKey':storageRoomKeyFound, 'spokeT':spokenToTony, 'spokeJ':spokenToJim, 'trophy1':trophy1found, 'trophy2':trophy2found, 'trophy3':trophy3found, 'distracted':distracted, 'character_code':player.characterCode},
			type: 'POST'
		}).done(function(response){
			console.log(response);
		});

		timeOfGameStart = currentTimestamp;
		
	})
})


function gameLoop(timestamp){

	let deltaTime = timestamp-lastTime;
	lastTime = timestamp;
	currentTimestamp=timestamp;
	

	ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

	//player speaking/thinking
	if (timestamp < timeOfTextStart + 700 && characterSpeaking == 0){
		ctx.font = "12px Arial";
		ctx.textAlign = 'center';
		ctx.fillStyle = "#000";
		if (speakingReason == "locked"){
			ctx.fillText("This door is locked", player.position.x, player.position.y + player.height + 20);
		}
		if (speakingReason == "character"){
			ctx.fillText("I can't do anything here.", player.position.x, player.position.y + player.height + 20);
		}
		if (speakingReason == "distraction"){
			ctx.fillText("I need a distraction.", player.position.x, player.position.y + player.height + 20);
		}
		if (speakingReason == "key"){
			ctx.fillText("I got a key.", player.position.x, player.position.y + player.height + 20);
		}
		if (speakingReason == "value"){
			ctx.fillText("I found something!", player.position.x, player.position.y + player.height + 20);
		}
		if (speakingReason == "stole"){
			ctx.fillText("I stole the key.", player.position.x, player.position.y + player.height + 20);
		}
	}else if(characterSpeaking == 0){
		stopAllMovement = false;
	}

	if (timestamp < timeOfRoomChange + 450){
		ctx.fillStyle = "#000";
		ctx.font = "12px Arial";
		ctx.textAlign = 'center';
		ctx.fillText("Entering the", GAME_WIDTH/2, GAME_HEIGHT/2 -20);
		ctx.font = "15px Arial";
		ctx.fillText(currentRoom, GAME_WIDTH/2, GAME_HEIGHT/2);
	}

	//pairs of door

	ctx.fillStyle = "#0000ff"; //always open
	if (currentRoom == "Courtyard"){
		ctx.fillRect(GAME_WIDTH - door_height, GAME_HEIGHT/2 - door_width/2, door_height, door_width);
	}else if(currentRoom == "Day Room"){
		ctx.fillRect(0, GAME_HEIGHT/2 - door_width/2, door_height, door_width);
	}

	ctx.fillStyle = "#0000ff"; //always open
	if (currentRoom == "Courtyard"){
		ctx.fillRect(GAME_WIDTH/2 - door_width/2, 0, door_width, door_height);
	}else if(currentRoom == "Cells"){
		ctx.fillRect(GAME_WIDTH/2 - door_width/2, GAME_HEIGHT - door_height, door_width, door_height);
	}

	ctx.fillStyle = "#0000ff"; //always open
	if (currentRoom == "Cells"){
		ctx.fillRect(GAME_WIDTH - door_height, GAME_HEIGHT/2 - door_width/2, door_height, door_width);
	}else if(currentRoom == "Showers"){
		ctx.fillRect(0, GAME_HEIGHT/2 - door_width/2, door_height, door_width);
	}

	ctx.fillStyle = "#0000ff"; //always open
	if (currentRoom == "Courtyard"){
		ctx.fillRect(0, GAME_HEIGHT/2 - door_width/2, door_height, door_width);
	}else if(currentRoom == "Cafeteria"){
		ctx.fillRect(GAME_WIDTH - door_height, GAME_HEIGHT/2 - door_width/2, door_height, door_width);
	}

	//sometime open
	if (storageRoomKeyFound==1){
		ctx.fillStyle = "#0000ff"; 
	}else{
		ctx.fillStyle = "#ff0000";
	}
	if (currentRoom == "Cafeteria"){
		ctx.fillRect(GAME_WIDTH/2 - door_width/2, GAME_HEIGHT - door_height, door_width, door_height);
	}else if(currentRoom == "Storage Room"){
		ctx.fillRect(GAME_WIDTH/2 - door_width/2, 0, door_width, door_height);
	}
	
	//open with distaction
	if (distracted==1){
		ctx.fillStyle = "#0000ff"; 
	}else{
		ctx.fillStyle = "#ff0000";
	}
	if (currentRoom == "Exit Hallway"){
		ctx.fillRect(GAME_WIDTH/2 - door_width/2, 0, door_width, door_height);
	}else if(currentRoom == "Courtyard"){
		ctx.fillRect(GAME_WIDTH/2 - door_width/2, GAME_HEIGHT - door_height, door_width, door_height);
	}

	//open with distaction
	if (wardenKeyFound==1){
		ctx.fillStyle = "#0000ff"; 
	}else{
		ctx.fillStyle = "#ff0000";
	}
	if (currentRoom == "Exit Hallway"){
		ctx.fillRect(GAME_WIDTH - door_height, GAME_HEIGHT/2 - door_width/2, door_height, door_width);
	}else if(currentRoom == "Warden's Office"){
		ctx.fillRect(0, GAME_HEIGHT/2 - door_width/2, door_height, door_width);
	}

	if (escapeKeyFound==1){
		ctx.fillStyle = "#0000ff"; 
	}else{
		ctx.fillStyle = "#ff0000";
	}
	if (currentRoom == "Exit Hallway"){
		ctx.fillRect(GAME_WIDTH/2 - door_width/2, GAME_HEIGHT - door_height, door_width, door_height);
	}

	if (currentRoom == "Courtyard"){
		if (distracted==0){
			guardwanderer1.performMovement();
			guardwanderer1.update(deltaTime);
			guardwanderer1.draw(ctx);
		}

		prisonerwanderer1.performMovement();
		prisonerwanderer1.update(deltaTime);
		prisonerwanderer1.draw(ctx);

		prisonerwanderer6.performMovement();
		prisonerwanderer6.update(deltaTime);
		prisonerwanderer6.draw(ctx);

		prisonerwanderer7.performMovement();
		prisonerwanderer7.update(deltaTime);
		prisonerwanderer7.draw(ctx);


		//interact with Jim
		if(canPlayerInteract(prisonerwanderer7.position.x -5, prisonerwanderer7.position.y - 5, prisonerwanderer7.height + 10, prisonerwanderer7.width + 10)){
			ranked_hovered_over_object = 9;
		}

		ctx.drawImage(rockImg, GAME_WIDTH/2 - 100,GAME_HEIGHT/2 - 100, 48,48);

		//interact with rock
		if(canPlayerInteract(GAME_WIDTH/2 - 100,GAME_HEIGHT/2 - 100, 48,48)){
			ranked_hovered_over_object = 29;
		}

		if (timestamp < timeOfTextStart + 1000 && characterSpeaking == 9){
			ctx.font = "12px Arial";
			ctx.textAlign = 'center';
			ctx.fillStyle = "#000";
			if (distracted==0){
				ctx.fillText("Hey, I'll make a distraction if", prisonerwanderer7.position.x + 5, prisonerwanderer7.position.y + prisonerwanderer7.height + 20);
				ctx.fillText("you talk to Tony in the Day Room.", prisonerwanderer7.position.x + 5, prisonerwanderer7.position.y + prisonerwanderer7.height + 30);
			}else{
				ctx.fillText("Let's take this place down!", prisonerwanderer7.position.x + 5, prisonerwanderer7.position.y + prisonerwanderer7.height + 20);
			}
		}else if(characterSpeaking == 9){
			stopAllMovement = false;
			spokenToJim = 1;
		}

		//interact with guard
		if(distracted==0){
			if(canPlayerInteract(guardwanderer1.position.x -5, guardwanderer1.position.y - 5, guardwanderer1.height + 10, guardwanderer1.width + 10)){
				ranked_hovered_over_object = 21;
			}
		}

		if (timestamp < timeOfTextStart + 1000 && characterSpeaking == 21){
			ctx.font = "12px Arial";
			ctx.textAlign = 'center';
			ctx.fillStyle = "#000";
			if (player.characterCode != 3){
				ctx.fillText(genericGuard[randomTextInt], guardwanderer1.position.x + 5, guardwanderer1.position.y + guardwanderer1.height + 20);
			}else{
				ctx.fillText(niceGuard[randomTextInt], guardwanderer1.position.x + 5, guardwanderer1.position.y + guardwanderer1.height + 20);
			}
		}else if(characterSpeaking == 21){
			stopAllMovement = false;
		}

		//interact with prisoners
		if(canPlayerInteract(prisonerwanderer6.position.x -5, prisonerwanderer6.position.y - 5, prisonerwanderer6.height + 10, prisonerwanderer6.width + 10)){
			ranked_hovered_over_object = 22;
		}

		if (timestamp < timeOfTextStart + 700 && characterSpeaking == 22){
			ctx.font = "12px Arial";
			ctx.textAlign = 'center';
			ctx.fillStyle = "#000";
			if (player.characterCode != 3){
				ctx.fillText(genericPrisoner[randomTextInt], prisonerwanderer6.position.x + 5, prisonerwanderer6.position.y + prisonerwanderer6.height + 20);
			}else{
				ctx.fillText(nicePrisoner[randomTextInt], prisonerwanderer6.position.x + 5, prisonerwanderer6.position.y + prisonerwanderer6.height + 20);
			}
		}else if(characterSpeaking == 22){
			stopAllMovement = false;
		}

		if(canPlayerInteract(prisonerwanderer1.position.x -5, prisonerwanderer1.position.y - 5, prisonerwanderer1.height + 10, prisonerwanderer1.width + 10)){
			ranked_hovered_over_object = 23;
		}

		if (timestamp < timeOfTextStart + 700 && characterSpeaking == 23){
			ctx.font = "12px Arial";
			ctx.textAlign = 'center';
			ctx.fillStyle = "#000";
			if (player.characterCode != 3){
				ctx.fillText(genericPrisoner[randomTextInt], prisonerwanderer1.position.x + 5, prisonerwanderer1.position.y + prisonerwanderer1.height + 20);
			}else{
				ctx.fillText(nicePrisoner[randomTextInt], prisonerwanderer1.position.x + 5, prisonerwanderer1.position.y + prisonerwanderer1.height + 20);
			}
		}else if(characterSpeaking == 23){
			stopAllMovement = false;
		}

		//door to day room
		if(canPlayerInteract(GAME_WIDTH - door_height - arrow_width - 10, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width)){
			ranked_hovered_over_object = 2;
			ctx.drawImage(rightArrowImg, GAME_WIDTH - door_height - arrow_width - 10, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width);
		}

		//door to cells
		if(canPlayerInteract(GAME_WIDTH/2 - arrow_width/2, 10, arrow_height, arrow_width)){
			ranked_hovered_over_object = 4;
			ctx.drawImage(upArrowImg, GAME_WIDTH/2 - arrow_height/2, door_height + 10, arrow_height, arrow_width);
		}

		//door to cafeteria
		if(canPlayerInteract(door_height + 5, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width)){
			ranked_hovered_over_object = 7;
			ctx.drawImage(leftArrowImg, door_height + 5, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width);
		}

		//door to exit hallway
		if(canPlayerInteract(GAME_WIDTH/2 - arrow_width/2, GAME_HEIGHT - door_height - arrow_height -10, arrow_width, arrow_height)){
			ranked_hovered_over_object = 13;
			ctx.drawImage(downArrowImg, GAME_WIDTH/2 - arrow_width/2, GAME_HEIGHT - door_height - arrow_height -10, arrow_width, arrow_height);
		}

		if(!canPlayerInteract(GAME_WIDTH - door_height - arrow_width - 10, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width) && !canPlayerInteract(GAME_WIDTH/2 - arrow_height/2, arrow_height + 5, arrow_height, arrow_width) && !canPlayerInteract(door_height + 5, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width) && !canPlayerInteract(prisonerwanderer7.position.x, prisonerwanderer7.position.y, prisonerwanderer7.height, prisonerwanderer7.width) && !canPlayerInteract(GAME_WIDTH/2 - arrow_width/2, GAME_HEIGHT - door_height - arrow_height -10, arrow_width, arrow_height) && !canPlayerInteract(guardwanderer1.position.x -5, guardwanderer1.position.y - 5, guardwanderer1.height + 10, guardwanderer1.width + 10) && !canPlayerInteract(prisonerwanderer6.position.x -5, prisonerwanderer6.position.y - 5, prisonerwanderer6.height + 10, prisonerwanderer6.width + 10) && !canPlayerInteract(prisonerwanderer7.position.x -5, prisonerwanderer7.position.y - 5, prisonerwanderer7.height + 10, prisonerwanderer7.width + 10) && !canPlayerInteract(prisonerwanderer1.position.x -5, prisonerwanderer1.position.y - 5, prisonerwanderer1.height + 10, prisonerwanderer1.width + 10) && !canPlayerInteract(GAME_WIDTH/2 - 100,GAME_HEIGHT/2 - 100, 48,48)){
			ranked_hovered_over_object = 0;
		}

	}else if (currentRoom == "Cells"){

		if (player.position.y < GAME_HEIGHT/3){
			player.position.y = GAME_HEIGHT/3;
		}

		prisonerwanderer2.performMovement();
		prisonerwanderer2.update(deltaTime);
		prisonerwanderer2.draw(ctx);

		prisonerwanderer5.performMovement();
		prisonerwanderer5.update(deltaTime);
		prisonerwanderer5.draw(ctx);

		ctx.fillStyle = "#c0c0c0";
		ctx.fillRect(0, GAME_HEIGHT/3 -5, GAME_WIDTH, 5);

		if (distracted==0){
			guardwanderer2.performMovement();
			guardwanderer2.update(deltaTime);
			guardwanderer2.draw(ctx);
		}

		if (distracted==0){
			if(canPlayerInteract(guardwanderer2.position.x -5, guardwanderer2.position.y - 5, guardwanderer2.height + 10, guardwanderer2.width + 10)){
				ranked_hovered_over_object = 24;
			}
		}

		if (timestamp < timeOfTextStart + 700 && characterSpeaking == 24){
			ctx.font = "12px Arial";
			ctx.textAlign = 'center';
			ctx.fillStyle = "#000";
			if (player.characterCode != 3){
				ctx.fillText(genericGuard[randomTextInt], guardwanderer2.position.x + 5, guardwanderer2.position.y + guardwanderer2.height + 20);
			}else{
				ctx.fillText("Hey man, I got you that thing you wanted.", guardwanderer2.position.x + 5, guardwanderer2.position.y + guardwanderer2.height + 20);
				escapeKeyFound = 1;
			}
		}else if(characterSpeaking == 24){
			stopAllMovement = false;
			if (player.characterCode == 3){
				timeOfTextStart = lastTime;
				characterSpeaking = 0;
				speakingReason = "key";
				stopAllMovement = true;
			}
		}

		//door to courtyard
		if(canPlayerInteract(GAME_WIDTH/2 - arrow_width/2, GAME_HEIGHT - door_height - arrow_height -10, arrow_width, arrow_height)){
			ranked_hovered_over_object = 1;
			ctx.drawImage(downArrowImg, GAME_WIDTH/2 - arrow_width/2, GAME_HEIGHT - door_height - arrow_height -10, arrow_width, arrow_height);
		}

		//door to showers
		if(canPlayerInteract(GAME_WIDTH - door_height - arrow_width - 10, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width)){
			ranked_hovered_over_object = 5;
			ctx.drawImage(rightArrowImg, GAME_WIDTH - door_height - arrow_width - 10, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width);
		}

		if (!canPlayerInteract(GAME_WIDTH/2 - arrow_width/2, GAME_HEIGHT - door_height - arrow_height -10, arrow_width, arrow_height) && !canPlayerInteract(GAME_WIDTH - door_height - arrow_width - 10, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width) && !canPlayerInteract(guardwanderer2.position.x -5, guardwanderer2.position.y - 5, guardwanderer2.height + 10, guardwanderer2.width + 10)){
			ranked_hovered_over_object = 0;
		}

	}else if (currentRoom == "Day Room"){

		if(distracted==1){
			guardwanderer4.performMovement();
			guardwanderer4.update(deltaTime);
			guardwanderer4.draw(ctx);

			guardwanderer3.performMovement();
			guardwanderer3.update(deltaTime);
			guardwanderer3.draw(ctx);

			guardwanderer10.performMovement();
			guardwanderer10.update(deltaTime);
			guardwanderer10.draw(ctx);

			prisonerwanderer11.performMovement();
			prisonerwanderer11.update(deltaTime);
			prisonerwanderer11.draw(ctx);
		}

		guardwanderer9.performMovement();
		guardwanderer9.update(deltaTime);
		guardwanderer9.draw(ctx);

		prisonerwanderer8.performMovement();
		prisonerwanderer8.update(deltaTime);
		prisonerwanderer8.draw(ctx);

		prisonerwanderer10.performMovement();
		prisonerwanderer10.update(deltaTime);
		prisonerwanderer10.draw(ctx);

		prisonerwanderer4.performMovement();
		prisonerwanderer4.update(deltaTime);
		prisonerwanderer4.draw(ctx);

		if(trophy2found==0){
			ctx.drawImage(trophyImg, trophy2Data.x, trophy2Data.y, trophy2Data.width, trophy2Data.height);
		}

		//get trophy
		if (canPlayerInteract(trophy2Data.x, trophy2Data.y, trophy2Data.width, trophy2Data.height)){
			ranked_hovered_over_object = 35;
		}

		//talk to tony
		if (canPlayerInteract(prisonerwanderer4.position.x -5,prisonerwanderer4.position.y -5, prisonerwanderer4.width + 10, prisonerwanderer3.height + 10)){
			ranked_hovered_over_object = 15;
		}

		if (canPlayerInteract(prisonerwanderer8.position.x -5,prisonerwanderer8.position.y -5, prisonerwanderer8.width + 10, prisonerwanderer8.height + 10)){
			ranked_hovered_over_object = 31;
		}

		if (canPlayerInteract(prisonerwanderer10.position.x -5,prisonerwanderer10.position.y -5, prisonerwanderer10.width + 10, prisonerwanderer10.height + 10)){
			ranked_hovered_over_object = 32;
		}

		//talk to prisoner
		if (timestamp < timeOfTextStart + 700 && characterSpeaking == 32){
			ctx.font = "12px Arial";
			ctx.textAlign = 'center';
			ctx.fillStyle = "#000";
			if (player.characterCode != 3){
				ctx.fillText(genericPrisoner[randomTextInt], prisonerwanderer10.position.x + 5, prisonerwanderer10.position.y + prisonerwanderer10.height + 20);
			}else{
				ctx.fillText(nicePrisoner[randomTextInt], prisonerwanderer10.position.x + 5, prisonerwanderer10.position.y + prisonerwanderer10.height + 20);
			}
		}else if(characterSpeaking == 32){
			stopAllMovement = false;
		}

		//talk to prisoner
		if (timestamp < timeOfTextStart + 700 && characterSpeaking == 31){
			ctx.font = "12px Arial";
			ctx.textAlign = 'center';
			ctx.fillStyle = "#000";
			if (player.characterCode != 3){
				ctx.fillText(genericPrisoner[randomTextInt], prisonerwanderer8.position.x + 5, prisonerwanderer8.position.y + prisonerwanderer8.height + 20);
			}else{
				ctx.fillText(nicePrisoner[randomTextInt], prisonerwanderer8.position.x + 5, prisonerwanderer8.position.y + prisonerwanderer8.height + 20);
			}
		}else if(characterSpeaking == 31){
			stopAllMovement = false;
		}

		//can talk to guard
		if(canPlayerInteract(guardwanderer9.position.x -5, guardwanderer9.position.y - 5, guardwanderer9.width + 10, guardwanderer9.height + 10)){
			ranked_hovered_over_object = 30;
		}
		

		//talk to guard (get key if thief)
		if (timestamp < timeOfTextStart + 700 && characterSpeaking == 30){
			ctx.font = "12px Arial";
			ctx.textAlign = 'center';
			ctx.fillStyle = "#000";
			ctx.fillText(". . .", guardwanderer9.position.x + 5, guardwanderer9.position.y + guardwanderer9.height + 20);
		}else if(characterSpeaking == 30){
			stopAllMovement = false;
			if (player.characterCode == 1){
				timeOfTextStart = lastTime;
				characterSpeaking = 0;
				speakingReason = "stole";
				stopAllMovement = true;
				escapeKeyFound = 1;
			}else{
				timeOfTextStart = lastTime;
				characterSpeaking = 0;
				speakingReason = "character";
				stopAllMovement = true;
			}
		}

		if (timestamp < timeOfTextStart + 800 && characterSpeaking == 15){
			ctx.font = "15px Arial";
			ctx.textAlign = 'center';
			ctx.fillStyle = "#000";
			if (spokenToJim==0){
				ctx.fillText("...", prisonerwanderer4.position.x + prisonerwanderer4.width/2, prisonerwanderer4.position.y + prisonerwanderer4.height + 20);
			} else if (distracted==1 && spokenToJim==1){
				ctx.font = "12px Arial";
				ctx.fillText("Let's tear this place apart, man!", prisonerwanderer4.position.x, prisonerwanderer4.position.y + prisonerwanderer4.height + 20);
			}else{
				ctx.font = "12px Arial";
				ctx.fillText("Jim sent you? We need Ralph in", prisonerwanderer4.position.x, prisonerwanderer4.position.y + prisonerwanderer4.height + 20);
				ctx.fillText("the Cafeteria. Talk to him.", prisonerwanderer4.position.x, prisonerwanderer4.position.y + prisonerwanderer4.height + 30);
			}
		}else if(characterSpeaking == 15){
			stopAllMovement = false;
			spokenToTony = 1;
		}

		//door to courtyard
		if(canPlayerInteract(door_height + 5, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width)){
			ranked_hovered_over_object = 3;
			ctx.drawImage(leftArrowImg, door_height + 5, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width);
		}

		if(!canPlayerInteract(door_height + 5, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width) && !canPlayerInteract(prisonerwanderer4.position.x -5,prisonerwanderer4.position.y -5, prisonerwanderer4.width + 10, prisonerwanderer3.height + 10) && !canPlayerInteract(guardwanderer9.position.x -5, guardwanderer9.position.y - 5, guardwanderer9.height + 10, guardwanderer9.width + 10) && !canPlayerInteract(prisonerwanderer8.position.x -5,prisonerwanderer8.position.y -5, prisonerwanderer8.width + 10, prisonerwanderer8.height + 10) && !canPlayerInteract(prisonerwanderer10.position.x -5,prisonerwanderer10.position.y -5, prisonerwanderer10.width + 10, prisonerwanderer10.height + 10) && !canPlayerInteract(trophy2Data.x, trophy2Data.y, trophy2Data.width, trophy2Data.height)){
			ranked_hovered_over_object = 0;
		}

	}else if (currentRoom == "Showers"){

		ctx.drawImage(toiletImg, GAME_WIDTH/6 - 35,40, 35,40);

		ctx.drawImage(toiletImg, 2 * (GAME_WIDTH/6) - 35,40, 35,40);

		ctx.drawImage(toiletImg, 3 * (GAME_WIDTH/6) - 35,40, 35,40);

		ctx.drawImage(toiletImg, 3 * (GAME_WIDTH/6) - 35,GAME_HEIGHT - 90, 35,40);

		ctx.drawImage(toiletImg, 4 * (GAME_WIDTH/6) - 35,GAME_HEIGHT - 90, 35,40);

		//draw key
		if(storageRoomKeyFound==0){
			ctx.drawImage(keyImg, storageKeyData.x, storageKeyData.y, storageKeyData.width, storageKeyData.height);
		}

		if (canPlayerInteract(storageKeyData.x, storageKeyData.y, storageKeyData.width, storageKeyData.height)){
			ranked_hovered_over_object = 11;
		}

		//get key
		if(canPlayerInteract(3 * (GAME_WIDTH/6) - 35,40, 35,40)){
			ranked_hovered_over_object = 28;
		}
		
		//door to cells
		if(canPlayerInteract(door_height + 5, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width)){
			ranked_hovered_over_object = 6;
			ctx.drawImage(leftArrowImg, door_height + 5, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width);
		}

		if(!canPlayerInteract(door_height + 5, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width) && !canPlayerInteract(storageKeyData.x, storageKeyData.y, storageKeyData.width, storageKeyData.height) && !canPlayerInteract(3 * (GAME_WIDTH/6) - 35,40, 35,40)){
			ranked_hovered_over_object = 0;
		}
	}else if (currentRoom == "Cafeteria"){

		if (distracted==0){
			guardwanderer5.performMovement();
			guardwanderer5.update(deltaTime);
			guardwanderer5.draw(ctx);

			guardwanderer7.performMovement();
			guardwanderer7.update(deltaTime);
			guardwanderer7.draw(ctx);
		}

		prisonerwanderer3.performMovement();
		prisonerwanderer3.update(deltaTime);
		prisonerwanderer3.draw(ctx);

		prisonerwanderer12.performMovement();
		prisonerwanderer12.update(deltaTime);
		prisonerwanderer12.draw(ctx);

		//door to courtyard
		if(canPlayerInteract(GAME_WIDTH - door_height - arrow_width - 10, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width)){
			ranked_hovered_over_object = 8;
			ctx.drawImage(rightArrowImg, GAME_WIDTH - door_height - arrow_width - 10, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width);
		}


		//door to storage
		if(canPlayerInteract(GAME_WIDTH/2 - arrow_width/2, GAME_HEIGHT - door_height - arrow_height -10, arrow_width, arrow_height)){
			ranked_hovered_over_object = 10;
			ctx.drawImage(downArrowImg, GAME_WIDTH/2 - arrow_width/2, GAME_HEIGHT - door_height - arrow_height -10, arrow_width, arrow_height);
		}

		//talk to Ralph
		if (canPlayerInteract(prisonerwanderer3.position.x -5,prisonerwanderer3.position.y -5, prisonerwanderer3.width + 10, prisonerwanderer3.height + 10)){
			ranked_hovered_over_object = 14;
		}

		//talk to prisoner
		if (canPlayerInteract(prisonerwanderer12.position.x -5,prisonerwanderer12.position.y -5, prisonerwanderer12.width + 10, prisonerwanderer12.height + 10)){
			ranked_hovered_over_object = 33;
		}

		if (timestamp < timeOfTextStart + 700 && characterSpeaking == 33){
			ctx.font = "12px Arial";
			ctx.textAlign = 'center';
			ctx.fillStyle = "#000";
			if (player.characterCode != 3){
				ctx.fillText(genericPrisoner[randomTextInt], prisonerwanderer12.position.x + 5, prisonerwanderer12.position.y + prisonerwanderer12.height + 20);
			}else{
				ctx.fillText(nicePrisoner[randomTextInt], prisonerwanderer12.position.x + 5, prisonerwanderer12.position.y + prisonerwanderer12.height + 20);
			}
		}else if(characterSpeaking == 33){
			stopAllMovement = false;
		}

		//talk to guard
		if (canPlayerInteract(guardwanderer7.position.x -5,guardwanderer7.position.y -5, guardwanderer7.width + 10, guardwanderer7.height + 10)){
			ranked_hovered_over_object = 25;
		}

		if (timestamp < timeOfTextStart + 700 && characterSpeaking == 25){
			ctx.font = "12px Arial";
			ctx.textAlign = 'center';
			ctx.fillStyle = "#000";
			if (player.characterCode != 3){
				ctx.fillText(genericGuard[randomTextInt], guardwanderer7.position.x + 5, guardwanderer7.position.y + guardwanderer7.height + 20);
			}else{
				ctx.fillText(niceGuard[randomTextInt], guardwanderer7.position.x + 5, guardwanderer7.position.y + guardwanderer7.height + 20);
			}
		}else if(characterSpeaking == 25){
			stopAllMovement = false;
		}

		//talk to second guard
		if (canPlayerInteract(guardwanderer5.position.x -5,guardwanderer5.position.y -5, guardwanderer5.width + 10, guardwanderer5.height + 10)){
			ranked_hovered_over_object = 26;
		}

		if (timestamp < timeOfTextStart + 700 && characterSpeaking == 26){
			ctx.font = "12px Arial";
			ctx.textAlign = 'center';
			ctx.fillStyle = "#000";
			if (player.characterCode != 3){
				ctx.fillText(genericGuard[randomTextInt], guardwanderer5.position.x + 5, guardwanderer5.position.y + guardwanderer5.height + 20);
			}else{
				ctx.fillText(niceGuard[randomTextInt], guardwanderer5.position.x + 5, guardwanderer5.position.y + guardwanderer5.height + 20);
			}
		}else if(characterSpeaking == 26){
			stopAllMovement = false;
		}

		if (timestamp < timeOfTextStart + 800 && characterSpeaking == 14){
			ctx.font = "15px Arial";
			ctx.textAlign = 'center';
			ctx.fillStyle = "#000";
			if (spokenToTony==0){
				ctx.fillText("...", prisonerwanderer3.position.x + prisonerwanderer3.width/2, prisonerwanderer3.position.y + prisonerwanderer3.height + 20);
			}else{
				ctx.font = "12px Arial";
				ctx.fillText("About time! Let's destroy this place.", prisonerwanderer3.position.x, prisonerwanderer3.position.y + prisonerwanderer3.height + 20);
			}
		}else if(characterSpeaking == 14){
			stopAllMovement = false;
			if (spokenToTony==1){
				distracted = 1;
			}
		}

		if(!canPlayerInteract(GAME_WIDTH - door_height - arrow_width - 10, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width) && !canPlayerInteract(GAME_WIDTH/2 - arrow_width/2, GAME_HEIGHT - door_height - arrow_height -10, arrow_width, arrow_height) && !canPlayerInteract(prisonerwanderer3.position.x -5,prisonerwanderer3.position.y -5, prisonerwanderer3.width + 10, prisonerwanderer3.height + 10) && !canPlayerInteract(guardwanderer7.position.x -5,guardwanderer7.position.y -5, guardwanderer7.width + 10, guardwanderer7.height + 10) && !canPlayerInteract(guardwanderer5.position.x -5,guardwanderer5.position.y -5, guardwanderer5.width + 10, guardwanderer5.height + 10) && !canPlayerInteract(prisonerwanderer12.position.x -5,prisonerwanderer12.position.y -5, prisonerwanderer12.width + 10, prisonerwanderer12.height + 10)){
			ranked_hovered_over_object = 0;
		}

	}else if(currentRoom == "Storage Room"){

		if(trophy1found==0){
			ctx.drawImage(trophyImg, trophy1Data.x, trophy1Data.y, trophy1Data.width, trophy1Data.height);
		}
		
		//draw key
		if(escapeKeyFound==0){
			ctx.drawImage(keyImg, escape1KeyData.x, escape1KeyData.y, escape1KeyData.width, escape1KeyData.height);
		}

		//interact with escapekey1
		if(canPlayerInteract(escape1KeyData.x, escape1KeyData.y, escape1KeyData.width, escape1KeyData.height)){
			ranked_hovered_over_object = 17;
		}

		//interact with first trophy
		if(canPlayerInteract(trophy1Data.x, trophy1Data.y, trophy1Data.width, trophy1Data.height)){
			ranked_hovered_over_object = 34;
		}

		//door to cafeteria
		if(canPlayerInteract(GAME_WIDTH/2 - arrow_height/2, door_height + 10, arrow_height, arrow_width)){
			ranked_hovered_over_object = 16;
			ctx.drawImage(upArrowImg, GAME_WIDTH/2 - arrow_height/2, door_height + 10, arrow_height, arrow_width);
		}

		if(!canPlayerInteract(GAME_WIDTH/2 - arrow_height/2, door_height + 10, arrow_height, arrow_width) && !canPlayerInteract(escape1KeyData.x, escape1KeyData.y, escape1KeyData.width, escape1KeyData.height) && !canPlayerInteract(trophy1Data.x, trophy1Data.y, trophy1Data.width, trophy1Data.height)){
			ranked_hovered_over_object = 0;
		}
	}else if(currentRoom == "Exit Hallway"){

		//door to courtyard
		if(canPlayerInteract(GAME_WIDTH/2 - arrow_width/2, 10, arrow_height, arrow_width)){
			ranked_hovered_over_object = 12;
			ctx.drawImage(upArrowImg, GAME_WIDTH/2 - arrow_height/2, door_height + 10, arrow_height, arrow_width);
		}

		//door to warden's office
		if(canPlayerInteract(GAME_WIDTH - door_height - arrow_width - 10, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width)){
			ranked_hovered_over_object = 18;
			ctx.drawImage(rightArrowImg, GAME_WIDTH - door_height - arrow_width - 10, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width);
		}

		//escape dooor
		if(canPlayerInteract(GAME_WIDTH/2 - arrow_width/2, GAME_HEIGHT - door_height - arrow_height -10, arrow_width, arrow_height)){
			ranked_hovered_over_object = 20;
			ctx.drawImage(downArrowImg, GAME_WIDTH/2 - arrow_width/2, GAME_HEIGHT - door_height - arrow_height -10, arrow_width, arrow_height);
		}

		if(!canPlayerInteract(GAME_WIDTH/2 - arrow_width/2, 10, arrow_height, arrow_width) && !canPlayerInteract(GAME_WIDTH - door_height - arrow_width - 10, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width) && !canPlayerInteract(GAME_WIDTH/2 - arrow_width/2, GAME_HEIGHT - door_height - arrow_height -10, arrow_width, arrow_height)){
			ranked_hovered_over_object = 0;
		}

	}else if(currentRoom == "Warden's Office"){

		guardwanderer8.performMovement();
		guardwanderer8.update(deltaTime);
		guardwanderer8.draw(ctx);

		if(!trophy3found){
			ctx.drawImage(trophyImg, trophy3Data.x, trophy3Data.y, trophy3Data.width, trophy3Data.height);
		}

		if(canPlayerInteract(trophy3Data.x, trophy3Data.y, trophy3Data.width, trophy3Data.height)){
			ranked_hovered_over_object = 36;
		}

		if(canPlayerInteract(door_height + 5, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width)){
			ranked_hovered_over_object = 19;
			ctx.drawImage(leftArrowImg, door_height + 5, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width);
		}


		if(canPlayerInteract(guardwanderer8.position.x -5, guardwanderer8.position.y - 5, guardwanderer8.height + 10, guardwanderer8.width + 10)){
			ranked_hovered_over_object = 27;
		}

		if (timestamp < timeOfTextStart + 800 && characterSpeaking == 27){
			ctx.font = "15px Arial";
			ctx.textAlign = 'center';
			ctx.fillStyle = "#000";
			ctx.fillText("z z z", guardwanderer8.position.x + guardwanderer8.width/2, guardwanderer8.position.y + guardwanderer8.height + 20);
		}else if(characterSpeaking == 27){
			stopAllMovement = false;
			if (spokenToTony==1){
				distracted = 1;
			}
		}


		if(!canPlayerInteract(door_height + 5, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width) && !canPlayerInteract(guardwanderer8.position.x -5, guardwanderer8.position.y - 5, guardwanderer8.height + 10, guardwanderer8.width + 10) && !canPlayerInteract(trophy3Data.x, trophy3Data.y, trophy3Data.width, trophy3Data.height)){
			ranked_hovered_over_object = 0;
		}
	}

	player.update(deltaTime);
	player.draw(ctx);

	if(rankedGameFinished){
		if (timestamp - (timeOfGameStart + inputTime) > 80000){
			gameScore = 500000 - 80000;
		}else{
			let time = Math.floor(timestamp - (timeOfGameStart + inputTime));
			gameScore = 500000 - time;
		}
		if (trophy1found==1){
			gameScore = gameScore + 20000;
		}
		if (trophy2found==1){
			gameScore = gameScore + 20000;
		}
		if (trophy3found==1){
			gameScore = gameScore + 100000;
		}
		timeOfGameEnd = timestamp;
		finishedLoop();
	}else{
		requestAnimationFrame(gameLoop);
	}
}

function demoLoop(timestamp){

	let deltaTime =  timestamp - lastTime;
	lastTime = timestamp;

	ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

	if(!demoKeyFound1){
		ctx.textAlign = 'center';
		ctx.font = "15px Arial";
		ctx.fillStyle = '#000';
		ctx.fillText("Move with arrows and press space to interact with people and objects...", GAME_WIDTH/2,GAME_HEIGHT/2 - 70);
		ctx.font = "12px Arial";
		ctx.fillText("like keys to escape!!", GAME_WIDTH/2,GAME_HEIGHT/2 - 50);
	}else{
		if (demoKeyFound1 && currentRoom == "Exit Hallway"  && !demoKeyFound2){
			ctx.textAlign = 'center';
			ctx.font = "15px Arial";
			ctx.fillStyle = '#000';
			ctx.fillText("Collecting keys unlocks doors to move to different rooms!", GAME_WIDTH/2,GAME_HEIGHT/2 - 70);
		}

		if (demoKeyFound1 && currentRoom == "Storage Room"  && !demoKeyFound2){
			ctx.textAlign = 'center';
			ctx.font = "15px Arial";
			ctx.fillStyle = '#000';
			ctx.fillText("Sometimes talking to the right people can be beneficial!" , GAME_WIDTH/2,GAME_HEIGHT/2 - 70);
		}else if((demoKeyFound1 && currentRoom == "Storage Room"  && demoKeyFound2)){
			ctx.textAlign = 'center';
			ctx.font = "15px Arial";
			ctx.fillStyle = '#000';
			ctx.fillText("You've found the final key. Find the exit!" , GAME_WIDTH/2,GAME_HEIGHT/2 - 70);
		}
	}


	if (timestamp < timeOfRoomChange + 450){
		ctx.fillStyle = "#000";
		ctx.font = "12px Arial";
		ctx.textAlign = 'center';
		ctx.fillText("Entering the", GAME_WIDTH/2, GAME_HEIGHT/2 -20);
		ctx.font = "15px Arial";
		ctx.fillText(currentRoom, GAME_WIDTH/2, GAME_HEIGHT/2);
	}

	//player speaking/thinking
	if (timestamp < timeOfTextStart + 700 && characterSpeaking == 0){
		ctx.font = "12px Arial";
		ctx.textAlign = 'center';
		ctx.fillStyle = "#000";
		if (speakingReason == "locked"){
			ctx.fillText("This door is locked", player.position.x, player.position.y + player.height + 20);
		}
	}else if(characterSpeaking == 0){
		stopAllMovement = false;
	}

	if (!demoKeyFound1){
		ctx.fillStyle = "#ff0000";
	}else{
		ctx.fillStyle = "#0000ff";
	}
	if (currentRoom == "Exit Hallway"){
		ctx.fillRect(GAME_WIDTH - door_height, GAME_HEIGHT/2 - door_width/2, door_height, door_width);
	}else if(currentRoom == "Storage Room"){
		ctx.fillRect(0, GAME_HEIGHT/2 - door_width/2, door_height, door_width);
	}

	if (!demoKeyFound2){
		ctx.fillStyle = "#ff0000";
	}else{
		ctx.fillStyle = "#0000ff";
	}
	if (currentRoom == "Exit Hallway"){
		ctx.fillRect(GAME_WIDTH/2 - door_width/2, GAME_HEIGHT - door_height, door_width, door_height);
	}


	if (currentRoom == "Exit Hallway"){
		demowanderer1.performMovement();
		demowanderer1.update(deltaTime);
		demowanderer1.draw(ctx);

		demowanderer2.performMovement();
		demowanderer2.update(deltaTime);
		demowanderer2.draw(ctx);

		//show exit sign if exit is possible
		if (demoKeyFound2){	
			ctx.font = "15px Arial";
			ctx.textAlign = 'center';
			ctx.fillStyle = "#000";
			ctx.fillText("Escape Now", GAME_WIDTH/2, GAME_HEIGHT - door_height - arrow_height - 20);
		}

		//draw key
		if(!demoKeyFound1){
			ctx.drawImage(keyImg, demoKeyData1.x, demoKeyData1.y, demoKeyData1.width, demoKeyData1.height);
		}

		//can interact with prisoner 1
		if (canPlayerInteract(demowanderer1.position.x - 5, demowanderer1.position.y - 5, demowanderer1.width + 10, demowanderer1.height + 10)){
			demo_hovered_over_object = 1;
		}
		if (timestamp < timeOfTextStart + 700 && characterSpeaking == 1){
			ctx.font = "12px Arial";
			ctx.textAlign = 'center';
			ctx.fillStyle = "#000";
			ctx.fillText(genericPrisoner[randomTextInt], demowanderer1.position.x, demowanderer1.position.y + demowanderer2.height + 20);
		}else if(characterSpeaking == 1){
			stopAllMovement = false;
		}

		//can interact with prisoner
		if (canPlayerInteract(demowanderer2.position.x - 5, demowanderer2.position.y - 5, demowanderer2.width + 10, demowanderer2.height + 10)){
			demo_hovered_over_object = 2;
		}

		if (timestamp < timeOfTextStart + 700 && characterSpeaking == 2){
			ctx.font = "12px Arial";
			ctx.textAlign = 'center';
			ctx.fillStyle = "#000";
			ctx.fillText(genericGuard[randomTextInt], demowanderer2.position.x, demowanderer2.position.y + demowanderer2.height + 20);
		}else if(characterSpeaking == 2){
			stopAllMovement = false;
		}

		//can player interact with first key
		if (canPlayerInteract(demoKeyData1.x, demoKeyData1.y, demoKeyData1.width, demoKeyData1.height)){
			demo_hovered_over_object = 3;
		}

		//can player interact with the door
		if(canPlayerInteract(GAME_WIDTH - door_height - arrow_width - 10, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width)){
			demo_hovered_over_object = 4;
			ctx.drawImage(rightArrowImg, GAME_WIDTH - door_height - arrow_width - 10, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width);
		}

		//can interact with the exit
		var showExitArrow;
		if (canPlayerInteract(GAME_WIDTH/2 - arrow_width/2, GAME_HEIGHT - door_height - arrow_height -10, arrow_width, arrow_height)){
			demo_hovered_over_object = 100;
			showExitArrow = true;
		}else if(!demoKeyFound2){
			showExitArrow = false;
		}else{
			showExitArrow = true;
		}

		if(showExitArrow){
			ctx.fillStyle = "#000";
			ctx.drawImage(downArrowImg, GAME_WIDTH/2 - arrow_width/2, GAME_HEIGHT - door_height - arrow_height -10, arrow_width, arrow_height);
		}

		//reset hovered over
		if (!canPlayerInteract(demoKeyData1.x, demoKeyData1.y, demoKeyData1.width, demoKeyData1.height) && !canPlayerInteract(demowanderer2.position.x - 5, demowanderer2.position.y - 5, demowanderer2.width + 10, demowanderer2.height + 10) && !canPlayerInteract(demowanderer1.position.x - 5, demowanderer1.position.y - 5, demowanderer1.width + 10, demowanderer1.height + 10) && !canPlayerInteract(GAME_WIDTH - door_height - arrow_width - 10, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width) && !canPlayerInteract(GAME_WIDTH/2 - arrow_width/2, GAME_HEIGHT - door_height - arrow_height -10, arrow_width, arrow_height)){
			demo_hovered_over_object = 0;
		}
	}
	if (currentRoom == "Storage Room"){
		demowanderer3.performMovement();
		demowanderer3.update(deltaTime);
		demowanderer3.draw(ctx);

		//can player interact with the door
		if(canPlayerInteract(door_height + 10, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width)){
			demo_hovered_over_object = 5;
			ctx.drawImage(leftArrowImg, door_height + 10, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width);
		}

		//can interact with prisoner
		if (canPlayerInteract(demowanderer3.position.x - 5, demowanderer3.position.y - 5, demowanderer3.width + 10, demowanderer3.height + 10)){
			demo_hovered_over_object = 6;
		}

		if (timestamp < timeOfTextStart + 1000 && characterSpeaking == 6){
			ctx.font = "12px Arial";
			ctx.textAlign = 'center';
			ctx.fillStyle = "#000";
			ctx.fillText("Here! Take the key and get out", demowanderer3.position.x, demowanderer3.position.y + demowanderer3.height + 20);
		}else if(characterSpeaking == 6){
			stopAllMovement = false;
		}

		//reset hovered over
		if(!canPlayerInteract(door_height + 10, GAME_HEIGHT/2 - arrow_width/2, arrow_height, arrow_width) && !canPlayerInteract(demoKeyData2.x, demoKeyData2.y, demoKeyData2.width, demoKeyData2.height) && !canPlayerInteract(demowanderer3.position.x - 5, demowanderer3.position.y - 5, demowanderer3.width + 10, demowanderer3.height + 10)){
			demo_hovered_over_object = 0;
		}

	}

	player.update(deltaTime);
	player.draw(ctx);

	

	if (!demoCompleted){
		requestAnimationFrame(demoLoop);
	}else{
		demoCompleted = false;
		mode = null;
		modeSelected = false;
		player.characterCode = 0;
		modeSelectionLoop();
	}
}

let endgameURL = document.getElementById("endgameURL").value;

function finishedLoop(timestamp){
	let deltaTime =  timestamp - lastTime;
	lastTime = timestamp;

	ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

	ctx.font = "21px Arial";
	ctx.textAlign = 'center';
	ctx.fillStyle = "#000";
	ctx.fillText("Congratulations!", GAME_WIDTH/2, GAME_HEIGHT/2 - 10);
	ctx.font = "12px Arial";
	ctx.fillText("Score: " + gameScore, GAME_WIDTH/2, GAME_HEIGHT/2 + 10);
	ctx.fillText("Please wait a moment...", GAME_WIDTH/2, GAME_HEIGHT/2 + 30);


	player.update(deltaTime);
	player.draw(ctx);

	if(timestamp == null){
		requestAnimationFrame(finishedLoop);
	}else{
		if (timestamp < timeOfGameEnd + 10000){
			requestAnimationFrame(finishedLoop);
		}else{
			//send final game data to server
			$.ajax({
					url: endgameURL,
					data: {'finalscore': gameScore},
					type: 'POST'
				}).done(function(response){
					console.log(response);
			});

			//reset all character data
			mode = null;
			modeSelected = false;
			//
			playerSelected=false;
			player.maxSpeedx = 5;
			player.maxSpeedy = 5;
			//
			player.characterCode = 0;
			rankedGameFinished = false;
			spokenToJim = 0;
			spokenToTony = 0;
			storageRoomKeyFound = 0;
			escapeKeyFound = 0;
			distracted = 0;
			wardenKeyFound = 0;
			trophy1found = 0;
			trophy2found = 0;
			trophy3found = 0;
			isNewGame = 1;
			modeSelectionLoop();
		}
	}

	
}

modeSelectionLoop();




