// Soldier
class Soldier {
	constructor(health, strength) {
		this.health = health;
		this.strength = strength;
	}
	attack() {
		return this.strength;
	}

	receiveDamage(damage) {
		this.health -= damage;
	}
}

// Viking
class Viking extends Soldier {
	constructor(name, health, strength) {
		super(health, strength);
		this.name = name;
	}

	receiveDamage(damage) {
		this.health -= damage;
		if (this.health <= 0) {
			console.log(`${this.name} has died in act of combat`);
			return `${this.name} has died in act of combat`;
		} else if (this.health > 0) {
			console.log(`${this.name} has received ${damage} points of damage`);
			return `${this.name} has received ${damage} points of damage`;
		}
	}

	battleCry() {
		console.log('TO VALHALLA!');
		return 'Odin Owns You All!';
	}
}

// Saxon
class Saxon extends Soldier {
	constructor(name, health, strength) {
		super(health, strength);
		this.name = name;
	}
	receiveDamage(damage) {
		this.health -= damage;
		if (this.health <= 0) {
			console.log(`${this.name} has died in combat`);
			return `${this.name} has died in combat`;
		} else if (this.health > 0) {
			console.log(`${this.name} has received ${damage} points of damage`);
			// return `${this.name} has received ${damage} points of damage`;
			return;
		}
	}
}

// War
class War {
	constructor() {
		this.vikingArmy = [];
		this.saxonArmy = [];
	}

	addViking(Viking) {
		this.vikingArmy.push(Viking);
	}

	addSaxon(Saxon) {
		this.saxonArmy.push(Saxon);
	}

	randomViking() {
		return this.vikingArmy[Math.floor(Math.random() * this.vikingArmy.length)];
	}

	randomSaxon() {
		return this.saxonArmy[Math.floor(Math.random() * this.saxonArmy.length)];
	}

	vikingAttack() {
		let randomSaxon = this.randomSaxon();
		let randomViking = this.randomViking();

		let attack = randomSaxon.receiveDamage(randomViking.strength);

		if (randomSaxon.health <= 0) {
			this.saxonArmy.splice(randomSaxon, 1);
		} else console.log(`Remaining Health: ${randomSaxon.health}`);
		this.updateArmies();
		return attack;
	}

	saxonAttack() {
		let randomSaxon = this.randomSaxon();
		let randomViking = this.randomViking();

		let attack = randomViking.receiveDamage(randomSaxon.strength);

		if (randomViking.health <= 0) {
			this.vikingArmy.splice(randomViking, 1);
		} else if (randomViking.health <= 20) {
			randomViking.battleCry();
			console.log(`Remaining Health: ${randomViking.health}`);
		} else console.log(`Remaining Health: ${randomViking.health}`);
		this.updateArmies();
		return attack;
	}

	armiesAttack(typeOfAttack) {
		let randomSaxon = this.randomSaxon();
		let randomViking = this.randomViking();

		if (typeOfAttack === 'Viking') {
			randomSaxon.receiveDamage(randomViking.strength);
			if (randomSaxon.health <= 0) {
				this.saxonArmy.splice(randomSaxon, 1);
			}
		} else if (typeOfAttack === 'Saxon') {
			randomViking.receiveDamage(randomSaxon.strength);
			if (randomViking.health <= 0) {
				this.vikingArmy.splice(randomViking, 1);
			}
		}
	}

	showStatus() {
		if (this.saxonArmy.length === 0) {
			return 'Vikings have won the war of the century!';
		} else if (this.vikingArmy.length === 0) {
			return 'Saxons have fought for their lives and survived another day...';
		} else {
			return 'Vikings and Saxons are still in the thick of battle.';
		}
	}

	showArmies() {
		const vikingDiv = document.getElementById('vikingArmy');
		const saxonDiv = document.getElementById('saxonArmy');

		for (this.viking of this.vikingArmy) {
			const newH1 = document.createElement('h1');
			const newUl = document.createElement('ul');
			const newName = document.createElement('li');
			const newStrength = document.createElement('li');
			const newHealth = document.createElement('li');

			newH1.classList.add('h1');
			newUl.classList.add('ul');
			newName.classList.add('name');

			newStrength.classList.add('blue');
			newHealth.classList.add('green');
			newHealth.classList.add('health');

			newName.append(this.viking.name);
			newHealth.append(this.viking.health);
			newStrength.append(this.viking.strength);

			newUl.append(newName, newStrength, newHealth);

			vikingDiv.append(newUl);
		}

		for (this.saxon of this.saxonArmy) {
			const newH1 = document.createElement('h1');
			const newUl = document.createElement('ul');
			const newName = document.createElement('li');
			const newStrength = document.createElement('li');
			const newHealth = document.createElement('li');

			newH1.classList.add('h1');
			newUl.classList.add('ul');
			newName.classList.add('name');

			newStrength.classList.add('blue');
			newHealth.classList.add('green');
			newHealth.classList.add('health');

			newName.append(this.saxon.name);
			newStrength.append(this.saxon.strength);
			newHealth.append(this.saxon.health);

			newUl.append(newName, newStrength, newHealth);

			saxonDiv.append(newUl);
		}
		return;
	}

	updateArmies() {
		const everyHealthLi = document.querySelectorAll('.health');

		for (const li of everyHealthLi) {
			const nameOfViking = li.parentNode.querySelector('li.name').textContent;
			for (const viking of this.vikingArmy) {
				if (viking.name === nameOfViking) {
					li.textContent = viking.health;
					break;
				}
			}
		}

		for (const li of everyHealthLi) {
			const nameOfsaxon = li.parentNode.querySelector('li.name').textContent;
			for (const saxon of this.saxonArmy) {
				if (saxon.name === nameOfsaxon) {
					li.textContent = saxon.health;
					break;
				}
			}
		}
	}
}

const viking1 = new Viking('Bjorn', 100, 30);
const viking2 = new Viking('Helga', 100, 20);
const viking3 = new Viking('Eirik', 100, 30);
const viking4 = new Viking('Freya', 100, 20);
const viking5 = new Viking('Skadi', 100, 20);
const viking6 = new Viking('Thora', 100, 20);
const viking7 = new Viking('Leifn', 100, 30);
const viking8 = new Viking('Sigyn', 100, 20);
const viking9 = new Viking('Gunnr', 100, 25);

const saxon1 = new Saxon('Aethel', 100, 20);
const saxon2 = new Saxon('Cynon', 100, 15);
const saxon3 = new Saxon('Eadie', 100, 25);
const saxon4 = new Saxon('Ethel', 100, 25);
const saxon5 = new Saxon('Hilda', 100, 20);
const saxon6 = new Saxon('Leofa', 100, 15);
const saxon7 = new Saxon('Oswin', 100, 40);
const saxon8 = new Saxon('Tilda', 100, 15);
const saxon9 = new Saxon('Wulfr', 100, 35);

const bloodyWar = new War();

bloodyWar.addSaxon(saxon1);
bloodyWar.addSaxon(saxon2);
bloodyWar.addSaxon(saxon3);
bloodyWar.addSaxon(saxon4);
bloodyWar.addSaxon(saxon5);
bloodyWar.addSaxon(saxon6);
bloodyWar.addSaxon(saxon7);
bloodyWar.addSaxon(saxon8);
bloodyWar.addSaxon(saxon9);

bloodyWar.addViking(viking1);
bloodyWar.addViking(viking2);
bloodyWar.addViking(viking3);
bloodyWar.addViking(viking4);
bloodyWar.addViking(viking5);
bloodyWar.addViking(viking6);
bloodyWar.addViking(viking7);
bloodyWar.addViking(viking8);
bloodyWar.addViking(viking9);

bloodyWar.showArmies();
