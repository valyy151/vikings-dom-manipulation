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
			return `${this.name} has received ${damage} points of damage`;
		}
	}

	battleCry() {
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
			return `${this.name} has received ${damage} points of damage`;
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
		} else console.log(`Remaining Health: ${randomViking.health}`);

		this.updateArmies();

		return attack;
	}

	showStatus() {
		if (this.saxonArmy.length === 0) {
			return 'Vikings have won the war of the century!';
		} else if (this.vikingArmy.length === 0) {
			return 'Saxons have fought for their lives and survived another day...';
		} else {
			return 'Vikings and Saxons are still in the midst of battle.';
		}
	}

	showArmies() {
		const vikingDiv = document.getElementById('vikingArmy');
		const saxonDiv = document.getElementById('saxonArmy');

		const createSoldierList = (army, armyDiv) => {
			army.forEach((soldier) => {
				const newUl = document.createElement('ul');
				const newName = document.createElement('li');
				const newStrength = document.createElement('li');
				const newHealth = document.createElement('li');

				newName.classList.add('name');
				newStrength.classList.add('blue');
				newHealth.classList.add('green', 'health');

				newName.textContent = soldier.name;
				newStrength.textContent = soldier.strength;
				newHealth.textContent = soldier.health;

				newUl.append(newName, newStrength, newHealth);
				armyDiv.append(newUl);
			});
		};

		createSoldierList(this.vikingArmy, vikingDiv);
		createSoldierList(this.saxonArmy, saxonDiv);
	}

	updateArmies() {
		const healthLis = document.querySelectorAll('.health');

		for (const li of healthLis) {
			const name = li.parentNode.querySelector('.name').textContent;

			for (const soldier of [...this.vikingArmy, ...this.saxonArmy]) {
				if (soldier.name === name) {
					li.textContent = soldier.health;
					if (soldier.health <= 0) {
						li.parentElement.remove();
					} else if (soldier.health <= 33) {
						li.classList.add('red');
					} else if (soldier.health <= 67) {
						li.classList.add('yellow');
					} else {
						li.classList.add('green');
					}
				}
			}
		}
	}
}
let count = 0;

const viking1 = new Viking('Bjorn', 100, 36);
const viking2 = new Viking('Helga', 100, 18);
const viking3 = new Viking('Eirik', 100, 28);
const viking4 = new Viking('Freya', 100, 15);
const viking5 = new Viking('Skadi', 100, 22);
const viking6 = new Viking('Thora', 100, 15);
const viking7 = new Viking('Leifn', 100, 18);
const viking8 = new Viking('Sigyn', 100, 20);
const viking9 = new Viking('Gunnr', 100, 29);

const saxon1 = new Saxon('Aethel', 100, 17);
const saxon2 = new Saxon('Cynon', 100, 20);
const saxon3 = new Saxon('Eadie', 100, 15);
const saxon4 = new Saxon('Ethel', 100, 16);
const saxon5 = new Saxon('Hilda', 100, 19);
const saxon6 = new Saxon('Leofa', 100, 18);
const saxon7 = new Saxon('Oswin', 100, 15);
const saxon8 = new Saxon('Tilda', 100, 18);
const saxon9 = new Saxon('Wulfr', 100, 24);

const bloodyWar = new War();

const saxonSoldiers = [saxon1, saxon2, saxon3, saxon4, saxon5, saxon6, saxon7, saxon8, saxon9];
const vikingSoldiers = [viking1, viking2, viking3, viking4, viking5, viking6, viking7, viking8, viking9];

saxonSoldiers.forEach((saxon) => bloodyWar.addSaxon(saxon));
vikingSoldiers.forEach((viking) => bloodyWar.addViking(viking));

bloodyWar.showArmies();
