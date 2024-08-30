// BATTLE EVENT
let enemyType = 'enemy'
let enemy = {}
let enemySprite
const enemyList = ['mouse', 'goblin_bat', 'mouse_assassin', 'goblin', 'boar', 'young_wolf', 'crob', 'boarian_marauder', 'troll_forest']
const enemyLists = {
    level1: ['mouse', 'forest_gecko', 'goblin_bat', 'mouse_assassin', 'goblin'],
    level5: ['mouse_assassin', 'goblin', 'boar', 'rabid_deer', 'young_wolf', 'crob'],
    level8: [ 'boar', 'young_wolf', 'crob', 'boarian_marauder', 'troll_forest']
}

function battle (pc) {
    let rndNum = rndInt(1,10)
    if (pc.level < 5) {
        enemy = structuredClone(enemies[rndFromArr(enemyLists.level1)])
    } else if (pc.level < 8) {
        enemy = structuredClone(enemies[rndFromArr(enemyLists.level5)])
    } else {
        if (rndNum > 9) {
            enemyType = 'adventurer'
            enemy = getChar()
            enemy.isPlayer = false
        }
        enemy = structuredClone(enemies[rndFromArr(enemyLists.level8)])
    }
    // background
    //updateEventBg('battle')
    eventText.innerHTML += `<hr><p class="event-text-row">It's a ${enemy.name.toUpperCase()}... FIGHT!</p><hr>`
    makeBattleDiv(enemy)
}

function makeBattleDiv (enemy) {
    // over 430px height på gameH stanna
    let maxH = 95
    const spriteH = (enemy.height / 200) * maxH

    let html = ''
    html += `
        <p class="window-header">${enemyType.toUpperCase()}</p>
        <hr>
        <p class="enemy-info-line name">lvl ${enemy.level} ${enemy.name.toUpperCase()}</p>
        <hr>
        <div id="enemy-img-container" onclick="doBattleTurns(event)">
            <img id="battle-enemy-img" style="height:${spriteH}%" src="${enemy.img}">
        </div>
        <hr>
        <div class="hp-bar-under enemy-hpbar-under"><div class="hp-bar-over enemy-hpbar-over" style="width:${enemy.hpLeft/enemy.hpMax*100}%"></div><p id="enemy-hp-text">${enemy.hpLeft}/${enemy.hpMax} HP</p></div> 
        
        <div id="battle-text-div"></div>
    `

    eventDiv.innerHTML = html
}

function doBattleTurns() {
    let text = ''
    let attOrder = decideFirstAttacker(playerChar, enemy)
    let first = attOrder[0]
    let second = attOrder[1]

    if (enemy.hpLeft < 1 || playerChar.hpLeft < 1) {
        console.log('cant attack, enemy or you are dead...')
        return
    }
    // FIRST attacker attacks! 
    text += doTurn(first, second)
    // SECOND  attacker attacks!
    if (second.hpLeft > 0) {
        text += doTurn(second, first)
    }
    eventText.innerHTML += text + '<hr>';
    // automatically scroll to the bottom (to see newest text)
    eventText.scrollTop = eventText.scrollHeight;
    eventTextContainer.scrollTop = eventTextContainer.scrollHeight;
}

// NEW BATTLE FUNC
function doTurn(attacker, defender) {
    let textClass = 'enemy'
    if (attacker.isPlayer) textClass = 'player'
    let text = ''
    let power = 0
    let skillUsed = {}
    let target = defender
    let canMove = true
    let statusText = attacker.status
    // Check if statuses that need to be checked before attacking
    canMove = canCharMove(attacker) 
    if (!canMove) text += `<p class="battle-text-row">${attacker.name.toUpperCase()} can't move due to ${attacker.status}</p>`
    if (attacker.status === 'stun') attacker.status = ''
    // If attacker can move, do skill
    if (canMove) {
        text += doSkill(attacker, target, textClass)
    }

    text += proccStatus(attacker) // Check if attacker has STATUS that need to be checked AFTER attacking, and procc it
    text += checkIfDead(defender, attacker, textClass) // Check if defender is dead and act accordingly
    text += checkIfDead(attacker, defender, textClass) // Check if attacker is dead and act accordingly
    updateHp(attacker)
    updateHp(defender)
    return text
}

// Check who gets to attack first
function decideFirstAttacker(char1, char2) {
    let first, second
    if (char1.totalAttr.agi*3 + char1.totalAttr.lck > char2.totalAttr.agi*3 + char2.totalAttr.lck) {
        first = char1; second = char2;
    } else if (char1.totalAttr.agi*3 + char1.totalAttr.lck < char2.totalAttr.agi*3 + char2.totalAttr.lck) {
        first = char2; second = char1;
    } else {
        if (rndInt(0,1) === 1) {
            first = char1
            second = char2
        } else {
            first = char2
            second = char1
        }
    }
    return [first, second]
}


function canCharMove (char) {
    if (char.status === 'stun') {
        return false
    }
    if (char.status === 'charmed') {
        if (rndInt(1,10) < 4) {
            return false
        }
    }
    return true
}

function doSkill (attacker, target, textClass) {
    let critText = ''
    let text = ''
    skillUsed = checkSkillToUse(attacker) // CHECK WHAT SKILL IS USED
    if (skillUsed.target === 'self') target = attacker // Check target of skill
    power = rollPower(skillUsed, attacker, target) // Roll skill damage (TO DO FIX DMG)
    //Check skill type (dmg, heal, status)
    if (skillUsed.type === 'damage') {
        // Check crit
        if (rndInt(1, 100) < (skillUsed.critChance + attacker.totalAttr.lck) ) {
            power = power*2
            critText = 'CRIT!'
        }
        target.hpLeft -= power
        text += `<p class="battle-text-row ${textClass}">${critText} ${attacker.name.toUpperCase()} used ${skillUsed.name.toUpperCase()} on ${target.name.toUpperCase()} for ${power} DMG!</p>` 
    }
    if (skillUsed.type === 'heal') {
        target.hpLeft += power
        if (target.hpLeft > target.hpMax) {target.hpLeft = target.hpMax}
        text += `<p class="battle-text-row ${textClass}">${critText} ${attacker.name.toUpperCase()} used ${skillUsed.name.toUpperCase()} on ${target.name.toUpperCase()} and healed ${power} hp!</p>`
    }
    if (skillUsed.type === 'status') {
        text += `<p class="battle-text-row ${textClass}">${critText} ${attacker.name.toUpperCase()} used ${skillUsed.name.toUpperCase()} on ${target.name.toUpperCase()}!</p>`
    }
    text += checkSkillEffects(skillUsed, attacker, target, power) // Check if skill has EFFECT that can give STATUS or Lifesteal etc and if it is to be used

    return text
}

function checkSkillToUse (attacker) {
    let chosenSkill
    if (rndInt(1,100) < attacker.skills[0].chance) {
        chosenSkill = attacker.skills[0]
    } else {
        chosenSkill = skills.attack
    }
    return chosenSkill
}

function checkSkillEffects(skillUsed, user, target, power) {
    let text = ''
    if (['stun','bleed','charmed', 'poison', 'confused'].includes(skillUsed.effect)) {
        text += checkStatusApplication(skillUsed, target)
    }
    // Check if skill has EFFECT that cannot put status
    if ([skillUsed.effect].includes('lifesteal')) {
        let lifeStolen = Math.round(power/2)
        user.hpLeft += lifeStolen
        text += `<p class="battle-text-row">${user.name.toUpperCase()} stole ${lifeStolen} HP!</p>`
    }
    return text
}

function proccStatus (user) {
    let text = ''
    if (user.status === 'bleed') {
        let bleedDmg = rndInt(1,3)
        text += `<p class="battle-text-row">${user.name.toUpperCase()} is Bleeding and takes ${bleedDmg} dmg</p>`
        user.hpLeft -= bleedDmg
    }
    return text
}

function checkIfDead (char, charsEnemy, textClass) {
    let text = ''
    if (char.hpLeft <= 0) {
        char.hpLeft = 0
        text +=  `<p class="battle-text-row ${textClass}">${char.name.toUpperCase()} DIED!</p>`
        endEventBtn.style.display = 'inline-block'
        if (char.isPlayer) {char.food[0] = null; char.food[1] = null}

        if (charsEnemy.isPlayer === true && charsEnemy.hpLeft > 0) {
            text += giveExpAndUpdate(charsEnemy, char)
        }
    }
    return text
}

// function to return possible effect including turn time for effect. Or 0/null if no effect
function checkStatusApplication (skill, target) {
    let text = ''
    console.log('checking effect: ' + skill.effect + ' from skill: ' + skill.name)
    if (rndInt(1,100) <= skill.effectChance) {
        if (target.status === skill.effect) {
            text = `<p id="battle-text-row">${target.name.toUpperCase()} is already affected by ${skill.effect.toUpperCase()}</p>`
        } else {
            target.status = skill.effect
            text = `<p id="battle-text-row">${target.name.toUpperCase()} is now affected by ${skill.effect.toUpperCase()}</p>`
        }
        return text
    }
    return ''
}

function rollPower(skill, user, target)  {
    let attrMulti = 1
    let attributeUsed = ''
    if (skill.attribute === 'best') {
        attributeUsed = getHighestAttr(user.totalAttr)
        attrMulti = 1 + (user.totalAttr[attributeUsed] / 10)
    }
    else if (skill.attribute != null) {
        attributeUsed = skill.attribute
        attrMulti = 1 + (user.totalAttr[attributeUsed] / 10)
    }
    let powerBaseLine = Math.round(skill.power/5 * attrMulti)
    let power = rndInt(powerBaseLine-1, powerBaseLine+1)
    return power
}

// char is always playerChar
function giveExpAndUpdate(char, enemy) {
    let text = ''
    expBar = document.querySelector('.pc-expbar-over')
    expText = document.querySelector('#pc-exp-text')
    let givenGold = rndInt(enemy.level, enemy.level*4)
    let expFormula = Math.floor( (enemy.level * 3) + (enemy.hpMax/3) *  (1 + (char.totalAttr.int / 10) ) )
    let givenExp = rndInt(expFormula-2, expFormula+2)
    
    // Check drops potion etc
    if (getFirstEmptyfoodSlot(char) != 'none' && rndInt(1,10) > 8) {
        let foodType = food['small_potion']
        giveFood(char, foodType)
        text += `<p id="battle-text-row">${char.name} got a ${foodType.name}</p>`
    }
   
    text += `<p id="battle-text-row">${char.name} got ${givenExp} exp and ${givenGold} ${icons.gold}!</p>`
    char.gold += givenGold

    // If levelup
    text += checkLevelUp(char, givenExp)

    makePlayerCharDiv(char)

    return text
}

function giveFood (char, foodType) {
    let emptyFoodSlot = getFirstEmptyfoodSlot(char)

    if (emptyFoodSlot != 'none') {
        char.food[emptyFoodSlot] = foodType
    }
}

function checkLevelUp (char, givenExp) {
    let text = ''
    if (char.exp + givenExp >= char.expToLvl) {
        let overkillExp = (char.exp + givenExp) - char.expToLvl
        let attrSelected = rndFromArr( ['str', 'agi', 'int', 'chr', 'lck'] )
        let raiseAmount = rndFromArr( [1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,2] )

        char.level++
        char.exp = overkillExp
        char.expToLvl = Math.floor(char.expToLvl * 1.2)
        char.hpMax += hpPerLvlUp
        char.hpLeft += hpPerLvlUp
        char.baseAttr[attrSelected]++

        if (char.hpLeft > char.hpMax) {char.hpLeft = char.hpMax}
        text += `
            <p id="battle-text-row">${char.name} LVL UP! </p>
            <p id="battle-text-row">${char.name} is now lvl ${char.level}.
            <p id="battle-text-row">${char.name}'s ${attrSelected.toUpperCase()} +${raiseAmount}</p>
        `
    } else {
        char.exp += givenExp
    }
    return text
}

function getFirstEmptyfoodSlot (char) {
    if (!char.food[0]) {return 0} 
    if (!char.food[1]) {return 1}
    if (!char.food[2]) {return 2}
    return 'none'
}