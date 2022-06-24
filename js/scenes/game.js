class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
		this.score = 0;
		this.froot_n_poison = null;
		this.pear = null;
		this.rand_time_appearition = 0;
		this.timer;
		this.text;
		this.game_over = false;
		this.array_objects = ['Apple', 'Banana', 'Pear', 'Strawberry', 'Poison'];
    }

    preload (){	
		this.load.image('Apple', '../resources/Apple.png');
		this.load.image('Banana', '../resources/Banana.png');
		this.load.image('Pear', '../resources/Pear 2.png');
		this.load.image('Strawberry', '../resources/Strawberry.png');
		this.load.image('Poison', '../resources/Poison but clearer.png');
	}

    create (){	
		this.rand_time_appearition = Phaser.Math.RND.between(2, 5);
		this.cameras.main.setBackgroundColor(0xBFFCFF);

		this.text = this.add.text(32, 32);
		this.text2 = this.add.text(64, 64);
		this.timer = this.time.delayedCall(0, timerCall, [], this);
		/*
		this.timer = this.time.addEvent({ delay: 5000, repeat: 2, loop: true});
		 this.add.text(25, 25, this.timer.time, {fontSize: '32px', fill: '#000'});
		*/

		let score =  "Score: " + this.score;
		this.add.text(25, 550, score, {fontSize: '32px', fill: '#000'});

		this.pear = this.physics.add.sprite(100, 100, 'Pear');
		this.pear.setBounce(0.2);
		this.pear.setCollideWorldBounds(true);

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
				loadpage("../")
			});
			
		let game_over = false;
		let i = 0;
		
	}
	
	update (){
		this.text.setText('Event Progress: ' + this.timer.getProgress().toString().substr(0, 4));
	}


}	

function timerCall() {
	this.physics.add.sprite(Phaser.Math.RND.between(25, 775), 100, this.array_objects[Phaser.Math.RND.between(0, 4)])
	if (!this.game_over) {
		this.timer = this.time.delayedCall(Phaser.Math.RND.between(500, 2000), timerCall, [], this);
	}
}

function gameOver() {
	game_over = true;
}