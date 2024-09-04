import {rndInt, rndFromArr, createNode} from "./base_functions.js"
import {wiki} from "./wiki.js"
import {eventTextContainer, eventText, windowHeaderBattle, updateHp, fadeOutEl, endEventBtn, hpPerLvlUp} from "./main.js"
import {playerChar, makePlayerCharDiv} from "./player_char.js"
import {endEvent} from "./event.js"

// BATTLE EVENT
let enemyImgContainer = document.getElementById('enemy-img-container')
enemyImgContainer.addEventListener("click", function (e) {
    e.preventDefault()
    doBattleTurns(playerChar)
});

let enemyType = 'enemy'
let enemy = {}
const enemyLists = {
    level1: ['mouse', 'forest_gecko', 'goblin_bat', 'mouse_assassin', 'goblin'],
    level5: ['forest_gecko', 'goblin_bat', 'mouse_assassin', 'goblin', 'boar', 'rabid_deer', 'young_wolf', 'crob'],
    level8: ['mouse_assassin', 'goblin', 'boar', 'young_wolf', 'crob', 'boarian_marauder', 'troll_forest']
}

function makeBattleDiv (enemy) {
    let maxH = 95
    const spriteH = (enemy.height / 200) * maxH
    let enemyImg = document.getElementById('battle-enemy-img')
    // Add ability to click the enemy container
    //document.getElementById('enemy-img-container').style.cursor = 'pointer'
    //document.getElementById('enemy-img-container').style.pointerEvents = 'auto'

    windowHeaderBattle.textContent = `${enemyType.toUpperCase()}`
    document.querySelector('.enemy-info-line').textContent = `lvl ${enemy.level} ${enemy.name.toUpperCase()}`
    enemyImg.classList.remove('fade-out')
    enemyImg.src = `${enemy.img}`
    enemyImg.style.height = `${spriteH}%`
    document.querySelector('.enemy-hpbar-over').style.width = `${enemy.hpLeft/enemy.hpMax*100}%`
    document.getElementById('enemy-hp-text').textContent = `${enemy.hpLeft}/${enemy.hpMax} HP`
}

export function battle (pc) {
    let rndNum = rndInt(1,10)
    if (pc.level < 5) {
        enemy = structuredClone(wiki.enemies[rndFromArr(enemyLists.level1)])
    } else if (pc.level < 8) {
        enemy = structuredClone(wiki.enemies[rndFromArr(enemyLists.level5)])
    } else {
        if (rndNum > 9) {
            enemyType = 'adventurer'
            enemy = getChar()
            enemy.isPlayer = false
        }
        enemy = structuredClone(wiki.enemies[rndFromArr(enemyLists.level8)])
    }
    
    let text = `It's a ${enemy.name.toUpperCase()}... FIGHT!`
    eventText.append(createP(text, 'event-text-row'))
    makeBattleDiv(enemy)
}

function doBattleTurns(playerChar) {
    if (playerChar.hpLeft < 1 || enemy.hpLeft < 1) {
        endEvent(playerChar)
    }
    let text = ''
    let attOrder = decideFirstAttacker(playerChar, enemy)
    let first = attOrder[0]
    let second = attOrder[1]

    if (enemy.hpLeft < 1 || playerChar.hpLeft < 1) {
        eventText.append(createNode('p', {className: 'battle-text-row', textContent: 'You cannot attack.'}))
        return
    }
    // FIRST attacker attacks! 
    doTurn(first, second)
    // SECOND  attacker attacks!
    if (second.hpLeft > 0) {
        doTurn(second, first)
    }
   
    // automatically scroll to the bottom (to see newest text)
    eventText.scrollTop = eventText.scrollHeight; // FIX DOESNT WORK NOW
    eventTextContainer.scrollTop = eventTextContainer.scrollHeight; // FIX DOESNT WORK NOW
}

// NEW BATTLE FUNC
function doTurn(attacker, defender) {
    let textClass = 'enemy'
    if (attacker.isPlayer) textClass = 'player'
    let text = ''
    let target = defender
    // Check if statuses that need to be checked before attacking
    let canMove = canCharMove(attacker) 
    if (!canMove) eventText.append(createP(`${attacker.name.toUpperCase()} can't move due to ${attacker.status}`, 'battle-text-row'))
    //if (!canMove) text += `<p class="battle-text-row">${attacker.name.toUpperCase()} can't move due to ${attacker.status}</p>`
    if (attacker.status === 'stun') attacker.status = ''
    // If attacker can move, do skill
    if (canMove) {
        doSkill(attacker, target, textClass)
    }
    proccStatus(attacker) // Check if attacker has STATUS that need to be checked AFTER attacking, and procc it
    checkIfDead(defender, attacker, textClass) // Check if defender is dead and act accordingly
    checkIfDead(attacker, defender, textClass) // Check if attacker is dead and act accordingly
    updateHp(attacker)
    updateHp(defender)
}

function createP (text, className, idName) {
    let newP = document.createElement('p')
    newP.textContent = text
    if (className) newP.className = className
    if (idName) newP.id = idName

    return newP
}

// Check who gets to attack first
function decideFirstAttacker(char1, char2) {
    let first, second
    if (char1.totalMods.agi*3 + char1.totalMods.lck > char2.totalMods.agi*3 + char2.totalMods.lck) {
        first = char1; second = char2;
    } else if (char1.totalMods.agi*3 + char1.totalMods.lck < char2.totalMods.agi*3 + char2.totalMods.lck) {
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
    if (char.status === 'charm') {
        if (rndInt(1,10) < 4) {
            return false
        }
    }
    return true
}

function doSkill (attacker, target, textClass) {
    let critText = ''
    let text = ''
    let textClassAdd = 'battle-text-row'
    let skillUsed = checkSkillToUse(attacker) // CHECK WHAT SKILL IS USED

    if (skillUsed.target === 'self') target = attacker // Check target of skill
    let power = rollPower(skillUsed, attacker, target) // Roll skill damage (TO DO FIX DMG)
    //Check skill type (dmg, heal, status)
    if (skillUsed.type === 'damage') {
        // Check crit
        if (rndInt(1, 100) < (skillUsed.critChance + attacker.totalMods.lck) ) {
            power = power*2
            critText = 'CRIT!'
        }
        target.hpLeft -= power
        text = `${critText} ${attacker.name.toUpperCase()} used ${skillUsed.name.toUpperCase()} on ${target.name.toUpperCase()} for ${power} DMG!`
        eventText.append(createP(text, `${textClass} ${textClassAdd}`))
    }

    if (skillUsed.type === 'heal') {
        target.hpLeft += power
        if (target.hpLeft > target.hpMax) {target.hpLeft = target.hpMax}
        text = `${critText} ${attacker.name.toUpperCase()} used ${skillUsed.name.toUpperCase()} on ${target.name.toUpperCase()} and healed ${power} hp!`
        eventText.append(createP(text, `${textClass} ${textClassAdd}`))
    }

    if (skillUsed.type === 'status') {
        text = `${critText} ${attacker.name.toUpperCase()} used ${skillUsed.name.toUpperCase()} on ${target.name.toUpperCase()}!`
        eventText.append(createP(text, `${textClass} ${textClassAdd}`))
    }
    text += checkSkillEffects(skillUsed, attacker, target, power) // Check if skill has EFFECT that can give STATUS or Lifesteal etc and if it is to be used
}

function checkSkillToUse (attacker) {
    let chosenSkill
    if (rndInt(1,100) < attacker.skills[0].chance) {
        chosenSkill = attacker.skills[0]
    } else {
        chosenSkill = wiki.skills.attack
    }
    return chosenSkill
}

function checkSkillEffects(skillUsed, user, target, power) {
    let text = ''
    if (['stun','bleed','charm', 'poison', 'confused'].includes(skillUsed.effect)) {
        checkStatusApplication(skillUsed, target)
    }
    // Check if skill has EFFECT that cannot put status
    if ([skillUsed.effect].includes('lifesteal')) {
        let lifeStolen = Math.round(power/2)
        user.hpLeft += lifeStolen
        text = `${user.name.toUpperCase()} stole ${lifeStolen} HP!`
        eventText.append(createP(text, 'battle-text-row'))
    }
}

function proccStatus (user) {
    let text = ''
    if (user.status === 'bleed') {
        let bleedDmg = rndInt(1,3)
        text = `${user.name.toUpperCase()} is Bleeding and takes ${bleedDmg} dmg`
        eventText.append(createP(text, 'battle-text-row'))
        user.hpLeft -= bleedDmg
    }
}

function checkIfDead (char, charsEnemy, textClass) {
    let text = ''
    if (char.hpLeft <= 0) {
        char.hpLeft = 0
        text =  `${char.name.toUpperCase()} DIED!`
        eventText.append(createP(text, `${textClass} battle-text-row`))
        endEventBtn.style.display = 'inline-block'
        if (char.isPlayer) {
            char.food = []
        }
        if (charsEnemy.isPlayer === true && charsEnemy.hpLeft > 0) {
            giveExpAndUpdate(charsEnemy, char)
            fadeOutEl(document.getElementById('battle-enemy-img'))
        }
        // Remove ability to click the enemy container
        //document.getElementById('enemy-img-container').style.cursor = 'default'
        //document.getElementById('enemy-img-container').style.pointerEvents = 'none'
    }
}

// function to return possible effect including turn time for effect. Or 0/null if no effect
function checkStatusApplication (skill, target) {
    let text = ''
    if (rndInt(1,100) <= skill.effectChance) {
        if (target.status === skill.effect) {
            text = `${target.name.toUpperCase()} is already affected by ${skill.effect.toUpperCase()}`
            eventText.append(createP(text, 'battle-text-row'))
        } else {
            target.status = skill.effect
            text = `${target.name.toUpperCase()} is now affected by ${skill.effect.toUpperCase()}`
            eventText.append(createP(text, 'battle-text-row'))
        }
    }
}

function rollPower(skill, user, target)  {
    let userDmg = user.totalMods.dmg
    let targetDef = target.totalMods.def

    let attrMulti = 1
    let attributeUsed = ''
    let dmgVary = 1
    if (skill.attribute === 'best') {
        attributeUsed = getHighestAttr(user.totalMods) // FIX
        attrMulti = 1 + ((user.totalMods[attributeUsed] / 10))
    }
    else if (skill.attribute != null) {
        attributeUsed = skill.attribute
        attrMulti = 1 + (user.totalMods[attributeUsed] / 10)
    }
    let powerCalc = (skill.power + (userDmg*5)) / (targetDef* 3) // if pow 30, attr 10, user.dmg 5, enemy.def 2: 7,5
    if (skill.type === 'heal') powerCalc = skill.power/4
    let power = 1 + Math.round(rndInt(powerCalc*0.75, powerCalc))
    return power
}

// char is always playerChar
function giveExpAndUpdate(char, enemy) {
    let text = ''
    let givenGold = rndInt(enemy.level, enemy.level*4)
    let expFormula = Math.floor( (enemy.level * 3) + (enemy.hpMax/3) *  (1 + (char.totalMods.int / 10) ) )
    let givenExp = rndInt(expFormula-2, expFormula+2)
    
    // Check drops potion etc
    if (getFirstEmptyfoodSlot(char) != 'none' && rndInt(1,10) > 7) {
        let foodType = wiki.food['small_potion']
        giveFood(char, foodType)
        text = `${char.name} got a ${foodType.name}`
        eventText.append(createP(text, 'battle-text-row'))
    }
   
    text = `${char.name} got ${givenExp} exp and ${givenGold} gold!`
    eventText.append(createP(text, 'battle-text-row'))

    char.gold += givenGold
    // If levelup
    checkLevelUp(char, givenExp)
    makePlayerCharDiv(char)
}

export function giveFood (char, foodType) {
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
        char.baseMods[attrSelected]++

        if (char.hpLeft > char.hpMax) {char.hpLeft = char.hpMax}
        text = createP(`${char.name} LVL UP!`, 'battle-text-row')
        eventText.append(text)
        text = createP(`${char.name} is now lvl ${char.level}.`, 'battle-text-row')
        eventText.append(text)
        text = createP(`${char.name}'s ${attrSelected.toUpperCase()} +${raiseAmount}`, 'battle-text-row')
        eventText.append(text)
    } else {
        char.exp += givenExp
    }
}

export function getFirstEmptyfoodSlot (char) {
    if (!char.food[0]) {return 0} 
    if (!char.food[1]) {return 1}
    if (!char.food[2]) {return 2}
    return 'none'
}