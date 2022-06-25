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
    }

    preload (){	
		this.load.image('Apple', '../resources/Apple.png');
		this.load.image('Banana', '../resources/Banana.png');
		this.load.image('Pear', '../resources/Pear 2.png');
		this.load.image('Strawberry', '../resources/Strawberry.png');
		this.load.image('Poison', '../resources/Poison but clearer.png');
	}

    create (){
		this.froot_n_poison = this.physics.add.group();
		this.rand_time_appearition = Phaser.Math.RND.between(2, 5);
		this.cameras.main.setBackgroundColor(0xBFFCFF);

		this.timer = this.time.delayedCall(0, timerCall, [], this);
		
		this.text = this.add.text(25, 550, "Score: " + this.score, {fontSize: '32px', fill: '#000'});

		//This pear was the first falling thing I made. In honor to pear, I decided to keep it in code
		/*this.pear = this.physics.add.sprite(100, 100, 'Pear');
		this.pear.setBounce(0.2);
		this.pear.setCollideWorldBounds(true);*/

		if (this.game_over) {
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
		}
			
		
		let i = 0;
		
	}
	
	update (){
		this.text.setText("Score: " + this.score);
	}


}	

function timerCall() {
	let random_thing = this.array_objects[Phaser.Math.RND.between(0, 4)];
	this.froot_n_poison.create(Phaser.Math.RND.between(25, 775), -100, random_thing);
	this.froot_n_poison.children.iterate((thing) => {
		thing.name = random_thing;
		thing.setInteractive({ useHandCursor: true });
		thing.on('pointerdown', () => {
			if (!this.game_over && thing.name != 'Poison') {
				thing.disableBody(true,true);
				this.score = this.score + 1;
			}
		})
	});
	if (!this.game_over) {
		this.timer = this.time.delayedCall(Phaser.Math.RND.between(500, 2000), timerCall, [], this);
	}
}

function gameOver() {
	game_over = true;
}