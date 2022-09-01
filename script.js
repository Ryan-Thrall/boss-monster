const heroes = [
  {
    name: 'Slate-Slabrock',
    type: 'dwarf',
    damage: 5,
    health: 100
  },
  {
    name: 'Flint-Ironstag',
    type: 'elf',
    damage: 10,
    health: 50
  }
]
const boss = {
  health: 100,
  maxHealth: 100,
  damage: 5,
  level: 1
}

let teamGold = 0;

function updateHeroHealth() {
  heroes.forEach(hero => {
    let heroName = document.querySelector(`#${hero.name}`)
    let heroHealth = heroName.querySelector(".hero-health")
    heroHealth.innerText = `${hero.health}`
  })
}

function updateGold() {
  heroes.forEach(hero => {
    let heroName = document.querySelector(`#${hero.name}`)
    let heroGold = heroName.querySelector(".hero-gold")
    heroGold.innerText = `${teamGold}`
  })
}

function attack() {
  let comboDamage = heroes.forEach(hero => {
    if (hero.health != 0) {
      boss.health -= hero.damage
    }
  })
  if (boss.health < 0) {
    boss.health = 0
    boss.level++;
    boss.maxHealth *= 1.5;
    boss.health = boss.maxHealth;
    boss.damage += 2;
    teamGold += 5 * boss.level;
    updateGold()
    heroes.forEach(hero => { hero.health += 30 })

  }
  updateBoss()
}
function updateBoss() {
  document.getElementById('bossHealth').innerHTML = `${boss.health}`
  document.getElementById('bossLevel').innerHTML = `${boss.level}`
}

function bossAttack() {
  heroes.forEach(hero => {
    hero.health -= boss.damage
    if (hero.health < 0) {
      hero.health = 0;
    }
  })
  updateHeroHealth()
}

function buyPotion() {

  if (teamGold >= 20) {
    heroes.forEach(hero => {
      hero.health += 20;
    })
    teamGold -= 20;
    updateGold()
    updateHeroHealth()
  }
}

function buyArmor() {
  if (teamGold >= 50) {
    boss.damage -= 2
    teamGold -= 50;
    updateGold()
    updateHeroHealth()
  }
}

function buyPotato() {
  if (teamGold >= 100) {
    teamGold -= 100;
    document.getElementById('potato-sound').play()
    console.log(document.getElementById('po-tato'))
    document.getElementById('po-tato').className = "col-3 pt-3 border border-dark bg-secondary hero d-block";
    heroes.push(
      {
        name: "po-tato",
        type: "potato",
        damage: 25,
        health: 500
      })
    updateGold()
    updateHeroHealth()
  }
}

function makeNoise() {
  document.getElementById('background-sound').play()
}


setInterval(bossAttack, 2000)
setInterval(makeNoise, 1000)



updateHeroHealth()