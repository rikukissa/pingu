Sound.play('PleasantGreens');

var game = {
	points: 0,
	health: 3,
	level: 1,
	draw: function() {
		$("canvas").drawText({
		  fillStyle: "#fff",
		  x: 10, y: 10,
		  text: "points: " + this.points + " | health: " + this.health,
		  align: "left",
		  baseline: "top",
		  font: "bold 11px Tahoma"
		});	
	},
	restart: function() {
		enemies = [];
		elements = [];
		terrain.x = 0;
		game.health = 3;
		game.points = 0;
		loadMap(game.level);
	}			
};
var canvas = {
	height: 627,
	width: 968,
	frame: 0
}

var terrain = {
	img: 'terrain.png',
	x: 0,
	y: 0,
	width: 0,
	height: 627,
	sx: 0, sy: 0,
	ground: 616,
};

var player = {
	img: 'pingu.png',
	x: 440,
	y: terrain.ground,
	width: 56,
	height: 75,
	sx: 0, sy: 0,
	onbox: false,
	jump: false,
	start: 0,
	direction: 'right',
	collides: false,
	draw: function() {
		$("canvas").drawImage({
			source: "style/" + this.img,
			x: this.x, y: this.y - this.height,
			sWidth: this.width,
			sHeight: this.height,
			sx: this.sx, sy: this.sy,	
			fromCenter: false,
			cropFromCenter: false
		});	
	},
	animate: function() {
		if ((canvas.frame) % 8 == 0) { 
			if (this.direction == 'right') {
				this.sx = this.width;
			} else if (this.direction == 'left') {
				this.sx = this.width * 4;	
			}
		} else if ((canvas.frame) % 4 == 0) {
			if (keydown.right) {
				this.sx = this.width * 2;
			} else {
				this.sx = this.width * 3;			
			}	
		}	
	}	
};

var elements = [];
function element(o) {
	o = o || {};
	o.sx = 0;
	o.sy = 0;
	o.active = true;	
	o.direction = 'left';
	o.draw = function() {
		$("canvas").drawImage({
		  source: "style/" + o.img,
		  x: o.x + terrain.x, y: o.y - o.height,
		  width: o.width,
		  height: o.height,
		  fromCenter: false
		});	
	};	
	return o;
}	
function draw(o) {
	if (o.active) {
		$("canvas").drawImage({
			source: "style/" + o.img,
			x: o.x + terrain.x, y: o.y - o.height,
			sWidth: o.width,
			sHeight: o.height,
			sx: o.sx, sy: o.sy,	
			fromCenter: false,
			cropFromCenter: false
		});
	}
}	
function animate(o) {
	if (o.type == 'polarbear') {
		
		elements.forEach(function(element) {
			if (element.type == 'box' && collision(o,element) && o.direction == 'left') {
				o.direction = 'right';
			} else if (element.type == 'box' && collision(o,element) && o.direction == 'right') {
				o.direction = 'left';
			}		
		});				
		if(canvas.frame % 5 == 0) {
			if(o.direction == 'left') {
				o.x -= 8;
				if(canvas.frame % 5 == 0)
					o.sx = 0;			
				if(canvas.frame % 10 == 0)
					o.sx = o.width;
				if(canvas.frame % 15 == 0)
					o.sx = o.width * 2;					
			} else if (o.direction == 'right') {
				o.x += 8;
				if(canvas.frame % 5 == 0)
					o.sx = o.width * 3;			
				if(canvas.frame % 10 == 0)
					o.sx = o.width * 4;
				if(canvas.frame % 15 == 0)
					o.sx = o.width * 5;	
			}	
		}	
	}		
};

function loadMap(level) {
	
	var top = 0;
	var left = 0;
	var img;
	var width;
	var height;
	var type;
	
	$('canvas').css({'background':'url("map/map'+level+'.png") repeat-x'});
		
	$.get('map/map' + level + '.txt', function(data) {
		var data = data;
		var rows = data.split("\n");
		for(row in rows) {
			objs = rows[row].split("");
			for(obj in objs) {
				if(objects[objs[obj]] != undefined) {
					type = objects[objs[obj]]['type'];	
					img = objects[objs[obj]]['img'];	
					width = objects[objs[obj]]['width'];	
					height = objects[objs[obj]]['height'];	
					
					elements.push(element({
						x: left, 
						y: top,
						type: type,
						img: img,
						height: height,
						width: width
					}));					
						
				} else if (objs[obj] == 's') {
					player.x = left + 8;
					player.y = top - 8;
				} 
				
				type = '';	
				img = '';
				width = '';
				height = '';			
				left += 88;
				terrain.width = left;
			}
			left = 0;
			top += 88;		
		}
	});
}	
loadMap(1);
Number.prototype.clamp = function(min, max) {
	return Math.min(Math.max(this, min), max);
};


function ontop(a,b) {
	if (
		a.x - terrain.x + a.width > b.x &&
		a.x - terrain.x < b.x + b.width &&
		a.y == b.y - b.height
	) {
		return true;
	} else 
		return false;
}

function collision(a,b) {
	if (a != player) {
		if (
			a.x + a.width >= b.x &&
			a.x <= b.x + b.width &&
			a.y - a.height < b.y &&
			a.y > b.y - b.height
		) {
			return true;
		} else 
			return false;
	} else {
		if (
			a.x - terrain.x + a.width >= b.x && 
			a.x - terrain.x <= b.x + b.width &&
			a.y - a.height < b.y &&
			a.y > b.y - b.height
		) {
			return true;
		} else 
			return false;	
	}
}

function update() {

	// Key listening
	if (keydown.right) {
		player.direction = 'right';
		player.animate();
		if (player.collides != 'right') {
			terrain.x -= 8;
		}
	}		

	if(keydown.left) {
		player.direction = 'left';
		player.animate();
		if (player.collides != 'left') {
			terrain.x += 8;
		}	
	}	

	if(keydown.up || keydown.space) { 
		if (!player.jump) {		
			player.start = canvas.frame;
			player.jump = true;	
			Sound.play('jump');
		}
	}
	
	// Jump functions
	if(player.jump) {
		
		if(player.start + 12 >= canvas.frame) // If less than 12 or 12 frames since the jump initiated
			player.y -= 8; // Lifts player 8 pixels per frame
		else if(player.start + 18 < canvas.frame && !player.ontop) { // If more than 18 frames sinces the jump initiated
			player.y += 8; // Lowers the player 8 pixels per frame
		}		
		
		if (player.y == terrain.ground) // If player is on the ground
			player.jump = false; 
		else if (player.ontop) { // If player is on top of an object
			player.jump = false;
		}	
		
		// Keep the player from falling lower than the ground
		//if (player.y > terrain.ground) { // If player is below ground
		//	player.jump = false;
		//	player.y = terrain.ground; // Lifts the player back to the ground
		//}				
						 	
	} else if (!player.jump) {	// If jump is not true
		if(player.y < terrain.ground && !player.ontop) // If player is higher that the ground and player is not on top of an object
			player.y += 8;
	}
	
	
	// Limit for the player movement area
	//player.x = player.x.clamp(0, 968);
	// Limit for the map length
	
	terrain.x = terrain.x.clamp((terrain.width * -1 + canvas.width),0);		

	player.ontop = false;
	player.collides = false;
	
	elements.forEach(function(element) {
		draw(element);
		animate(element);
		
		if (element.type == 'polarbear' && collision(player,element) && element.active) {
			element.active = false;
			game.health -= 1;
			player.jump = true;
			player.start = canvas.frame;			
		}		
		if (element.type == 'polarbear' && ontop(player,element) && element.active) {
			element.active = false;
			game.points += 10;
		}			
		if (element.type == 'box' && ontop(player,element))
			player.ontop = true;	
		if (element.type == 'icecream' && collision(player,element) && element.active) {
			element.active = false;
			game.points += 100;
		}
		if (element.type == 'box' && player.direction == 'right' && collision(player,element))
			player.collides = 'right';
		else if (element.type == 'box' && player.direction == 'left' && collision(player,element))	
			player.collides = 'left';	
		
		if (element.type == 'spikes' && collision(player,element)) {
			player.jump = true;
			player.start = canvas.frame;
			game.health -= 1;
		}
		
		if (element.type == 'exit' && collision(player,element)) {
			if(game.level < 2) {
				game.level += 1;
				game.restart();
			}
		}		
	});	
	if (game.health < 0) {
		game.restart();
	}	
		
	canvas.frame += 1;		
}

setInterval(function() {
		$("canvas").clearCanvas();
		//game.info();
		update();		
		player.draw();
		game.draw();
}, 1000 / 30);
