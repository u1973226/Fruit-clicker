class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
		this.score = 0;
		this.froot_n_poison = null;
		//this.pear = null; The pear
		this.rand_time_appearition = 0;
		this.timer;
		this.text;
		this.add_point = 0;
		this.game_over = false;
		this.array_objects = ['Apple', 'Banana', 'Pear', 'Strawberry', 'Poison'];
		this.g_array_objects = ['Golden Apple', 'Golden Banana', 'Golden Pear', 'Golden Strawberry'];
		this.buttons = true;
		this.rect = null;
		this.poison_mode = prompt("Choose poison mode: '-1 points' or 'Game over' ") || "Game over";
    }

    preload (){	
		this.load.image('Apple', '../resources/Apple.png');
		this.load.image('Banana', '../resources/Banana.png');
		this.load.image('Pear', '../resources/Pear 2.png');
		this.load.image('Strawberry', '../resources/Strawberry.png');
		this.load.image('Poison', '../resources/Poison but clearer.png');
		this.load.image('Rectangle', '../resources/rectangulus.png');
		this.load.image('Golden Apple', '../resources/Golden Apple.png');
		this.load.image('Golden Banana', '../resources/Golden Banana.png');
		this.load.image('Golden Pear', '../resources/Golden Pear.png');
		this.load.image('Golden Strawberry', '../resources/Golden Strawberry.png');
	}

    create (){
		this.froot_n_poison = this.physics.add.group();
		this.rand_time_appearition = Phaser.Math.RND.between(2, 5);
		this.cameras.main.setBackgroundColor(0xBFFCFF);

		this.rect = this.physics.add.staticGroup();
		this.rect.create(400, 1000, 'Rectangle').setScale(0.33).refreshBody();
		this.physics.add.overlap(this.froot_n_poison, this.rect, (body1, body2)=>this.bottomZone(body1, body2));

		this.timer = this.time.delayedCall(0, timerCall, [], this);
		
		this.text = this.add.text(25, 550, "Score: " + this.score, {fontSize: '32px', fill: '#000'});


		//This pear was the first falling thing I made. In honor to pear, I decided to keep it in code
		/*this.pear = this.physics.add.sprite(100, 100, 'Pear');
		this.pear.setBounce(0.2);
		this.pear.setCollideWorldBounds(true);*/

		this.resetButton;
		this.exitButton;
		
	}
	
	update (){
		this.text.setText("Score: " + this.score);
		if (this.game_over && this.buttons) {
			this.resetButton = this.add.text(310, 450, 'Play again', {fontSize: '32px', fill:'#000'})
			.setInteractive({ useHandCursor: true })
			.on('pointerover', () => this.resetButton.setStyle({ fill: 'grey'}))
			.on('pointerout', () => {
				this.resetButton.setStyle({ fill: '#000'})
				this.resetButton.setStyle({ fontSize: '32px'})
				this.resetButton.setPosition(310, 450)
			})
			.on('pointerdown', () => {
				this.resetButton.setStyle({ fontSize: '28px'})
				this.resetButton.setPosition(319, 452)
			})
			.on('pointerup', () => {
				this.resetButton.setStyle({ fontSize: '32px'})
				this.resetButton.setPosition(310, 450)
				loadpage("./phasergame.html");
			});

			this.exitButton = this.add.text(310, 500, 'Go to menu', {fontSize: '32px', fill:'#000'})
			.setInteractive({ useHandCursor: true })
			.on('pointerover', () => this.exitButton.setStyle({ fill: 'grey'}))
			.on('pointerout', () => {
				this.exitButton.setStyle({ fill: '#000'})
				this.exitButton.setStyle({ fontSize: '32px'})
				this.exitButton.setPosition(310, 500)
			})
			.on('pointerdown', () => {
				this.exitButton.setStyle({ fontSize: '28px'})
				this.exitButton.setPosition(319, 502)
			})
			.on('pointerup', () => {
				this.exitButton.setStyle({ fontSize: '32px'})
				this.exitButton.setPosition(310, 500)
				loadpage("../index.html")
			});
			this.buttons = false;
		}
	}

	
	bottomZone(froot_n_poison, bottom) {
		if (froot_n_poison.name != 'Poison') this.game_over = true;
		froot_n_poison.disableBody(true, true);
	}


}	

function timerCall() {
	let odds = Phaser.Math.RND.between(0, 100);
	let random_thing;
	if (odds > 85) {
		random_thing = this.g_array_objects[Phaser.Math.RND.between(0, 3)];
	}
	else {
		random_thing = this.array_objects[Phaser.Math.RND.between(0, 4)];
	}
	var thing = this.froot_n_poison.create(Phaser.Math.RND.between(25, 775), -100, random_thing);
		thing.name = random_thing;
		thing.setInteractive({ useHandCursor: true });
		thing.on('pointerdown', () => {
			if (!this.game_over) {
				if (thing.name === 'Poison') {
					thing.disableBody(true,true);
					if (this.poison_mode == '-1 points') this.score -= 1;
					else this.game_over = true;
				}
				else {
					if (odds > 85) this.score += 3;
					else this.score += 1;
					thing.disableBody(true,true);
				}
			}
		})
	
	if (!this.game_over) {
		this.timer = this.time.delayedCall(Phaser.Math.RND.between(500, 2000), timerCall, [], this);
	}
}
