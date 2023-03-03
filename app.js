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
		super.receiveDamage(damage);
		if (this.health <= 0) {
			console.log(`${this.name} has died in act of combat`);
			const vikingList = document.querySelectorAll('#vikingArmy ul');
			vikingList.forEach((li) => {
				if (li.firstChild.textContent === this.name) {
					li.remove();
				}
			});
		} else {
			console.log(`${this.name} has received ${damage} points of damage`);
		}
	}

	battleCry() {
		console.log('ODIN OWNS YOU ALL!!!');
	}
}

// Saxon
class Saxon extends Soldier {
	constructor(name, health, strength) {
		super(health, strength);
		this.name = name;
	}

	receiveDamage(damage) {
		super.receiveDamage(damage);
		if (this.health <= 0) {
			console.log(`${this.name} has died in combat`);
			const saxonList = document.querySelectorAll('#saxonArmy ul');
			saxonList.forEach((li) => {
				if (li.firstChild.textContent === this.name) {
					li.remove();
				}
			});
		} else {
			console.log(`${this.name} has received ${damage} points of damage`);
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

		randomSaxon.receiveDamage(randomViking.strength);

		if (randomSaxon.health <= 0) {
			let index = this.saxonArmy.indexOf(randomSaxon);
			this.saxonArmy.splice(index, 1);
		} else {
			console.log(`Remaining Health: ${randomSaxon.health}`);
		}

		this.updateArmies();

		return randomViking.strength;
	}

	saxonAttack() {
		let randomSaxon = this.randomSaxon();
		let randomViking = this.randomViking();

		randomViking.receiveDamage(randomSaxon.strength);

		if (randomViking.health <= 0) {
			let index = this.vikingArmy.indexOf(randomViking);
			this.vikingArmy.splice(index, 1);
		} else if (randomViking.health <= 20) {
			randomViking.battleCry();
			console.log(`Remaining Health: ${randomViking.health}`);
		}
		console.log(`Remaining Health: ${randomViking.health}`);

		this.updateArmies();
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

	renderArmies() {
		const vikingDiv = document.getElementById('vikingArmy');
		const saxonDiv = document.getElementById('saxonArmy');
		const vikingHealthSum = document.querySelector('#vikingHealthSum');
		const saxonHealthSum = document.querySelector('#saxonHealthSum');

		//Function that creates either a viking or a saxon army from the data, and renders it on the page
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
		//Calling the function above on the 2 armies
		createSoldierList(this.vikingArmy, vikingDiv);
		createSoldierList(this.saxonArmy, saxonDiv);

		//Displaying the total health of the armies
		let vikingTotalHealth = 0;
		let saxonTotalHealth = 0;
		this.vikingArmy.forEach((soldier) => {
			vikingTotalHealth += soldier.health;
		});
		this.saxonArmy.forEach((soldier) => {
			saxonTotalHealth += soldier.health;
		});
		vikingHealthSum.textContent = vikingTotalHealth;
		saxonHealthSum.textContent = saxonTotalHealth;
	}

	updateArmies() {
		//Loops through every soldier and accumulates their health to update as total health of the army
		let vikingTotalHealth = 0;
		let saxonTotalHealth = 0;
		this.vikingArmy.forEach((soldier) => {
			vikingTotalHealth += soldier.health;
		});
		this.saxonArmy.forEach((soldier) => {
			saxonTotalHealth += soldier.health;
		});
		document.querySelector('#vikingHealthSum').textContent = vikingTotalHealth;
		document.querySelector('#saxonHealthSum').textContent = saxonTotalHealth;

		//Changes colors of the health numbers depending on how damaged the army is
		if (vikingTotalHealth <= 334) {
			document.querySelector('#vikingHealthSum').classList.add('red');
		} else if (vikingTotalHealth <= 667) {
			document.querySelector('#vikingHealthSum').classList.add('yellow');
		} else {
			document.querySelector('#vikingHealthSum').classList.add('green');
		}
		if (saxonTotalHealth <= 334) {
			document.querySelector('#saxonHealthSum').classList.add('red');
		} else if (saxonTotalHealth <= 667) {
			document.querySelector('#saxonHealthSum').classList.add('yellow');
		} else {
			document.querySelector('#saxonHealthSum').classList.add('green');
		}

		//Changes colors of the soldiers' health depending on how damaged they are
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

//Starting a war and drafting the soldiers
const bloodyWar = new War();

const saxonSoldiers = [saxon1, saxon2, saxon3, saxon4, saxon5, saxon6, saxon7, saxon8, saxon9];
const vikingSoldiers = [viking1, viking2, viking3, viking4, viking5, viking6, viking7, viking8, viking9];

saxonSoldiers.forEach((saxon) => bloodyWar.addSaxon(saxon));
vikingSoldiers.forEach((viking) => bloodyWar.addViking(viking));

bloodyWar.renderArmies();

//Buttons for attacking the armiess
const attackSaxons = document.getElementById('attackSaxons');
const attackVikings = document.getElementById('attackVikings');

// attackSaxons.addEventListener('click', () => {
// 	bloodyWar.vikingAttack();
// });

// attackVikings.addEventListener('click', () => {
// 	bloodyWar.saxonAttack();
// });

const startGameButton = document.getElementById('startGame');
const selectTeam = document.getElementById('teamSelect');

const section = document.getElementById('section');
const article = document.getElementById('article');
const vikingDiv = document.getElementById('vikingDiv');
const saxonDiv = document.getElementById('saxonDiv');

let playerTeam;
let enemyTeam;

startGameButton.addEventListener('click', () => {
	if (selectTeam.value == 1) {
		console.log('Value 1');
		playerTeam = 'Vikings';
		enemyTeam = 'Saxons';
		console.log(`Your Team is ${playerTeam} and the Enemy Team is ${enemyTeam}`);
		article.style.display = 'none';
		section.style.display = 'flex';
		vikingDiv.style.order = 1;
	} else if (selectTeam.value == 2) {
		playerTeam = 'Saxons';
		enemyTeam = 'Vikings';
		console.log(`Your Team is ${playerTeam} and the Enemy Team is ${enemyTeam}`);
		article.style.display = 'none';
		section.style.display = 'flex';
		saxonDiv.style.order = 1;
	}
});
