// BATTLE EVENT
let enemy = {}

function battle (pc) {
    enemy = rndGetPropertyCloned(enemies)
    // background
    //eventDiv.style.background = `url("img/events/battle/bg_woods.png") rgba(0, 0, 0, 0.3)`
    //eventDiv.style.backgroundBlendMode = 'multiply'
    //eventDiv.style.backgroundSize = 'cover'
    //eventDiv.style.backgroundPosition = 'center center'
    eventText.innerHTML += `<p class="event-text-row">It's a ${enemy.name.toUpperCase()}... FIGHT!</p><hr>`

    makeBattleDiv(enemy)
}

function makeBattleDiv (enemy) {
    let statBarMult = 17
    const maxH = 99
    const spriteH = (enemy.height / 200) * maxH
    console.log(spriteH + '%')

    let html = ''
    html += `
        <h3 class="window-header">ENEMY</h3>
        <hr>
        <p class="enemy-info-line name">${enemy.name.toUpperCase()}</p>
        <hr>
        <div id="enemy-img-container" onclick="doBattleTurn(event)">
            <img id="battle-enemy-img" style="height:${spriteH}%" src="${enemy.img}">
        </div>
        <hr>
        <div class="hp-bar-under enemy-hpbar-under"><div class="hp-bar-over enemy-hpbar-over" style="width:${enemy.hpLeft/enemy.hpMax*100}%"></div><p id="enemy-hp-text">${enemy.hpLeft}/${enemy.hpMax} HP</p></div> 
        <p class="enemy-info-line joblvl">lvl ${enemy.level}</p> 
        <div id="battle-text-div"></div>
    `

    eventDiv.innerHTML = html
}

function doBattleTurn() {
    let text = ''
    let attOrder = decideFirstAttacker(playerChar, enemy)
    let first = attOrder[0]
    let second = attOrder[1]

    if (enemy.hpLeft < 1 || playerChar.hpLeft < 1) {
        console.log('cant attack, enemy or you are dead...')
        return
    }
    // FIRST attacker attacks!
    text += doSkill(first, second)
    // SECOND  attacker attacks!
    if (second.hpLeft > 0) {
        text += doSkill(second, first)
    }
    eventText.innerHTML += text + '<hr>';
    // automatically scroll to the bottom (to see newest text)
    eventText.scrollTop = eventText.scrollHeight;
    eventTextContainer.scrollTop = eventTextContainer.scrollHeight;
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

function doSkill(attacker, defender) {
    let text = ''
    let power = 0
    let skillUsed = {}
    let target = defender
    let critText = ''
    // Check if statuses that need to be checked before attacking
    if (attacker.status === 'stun') {
        text += `<p id="battle-text-row">${attacker.name} has status ${attacker.status} and cannot move.</p>`
        attacker.status = ''
        return text
    }
    // CHECK WHAT SKILL IS USED
    if (rndInt(1,100) < attacker.skills[0].chance) {
        skillUsed = attacker.skills[0]
    } else {
        skillUsed = skills.attack
    }
    // Check target of skill
    if (skillUsed.target === 'self') target = attacker
    // Roll skill damage (TO DO FIX DMG)
    power = rollPower(skillUsed, attacker, target)
    // Check crit
    if (rndInt(1, 100) < (5 + attacker.totalAttr.lck) ) {
        power = power*2
        critText = 'CRIT!'
    }
    if (skillUsed.type === 'damage') {
        target.hpLeft -= power
        text += `<p id="battle-text-row">${critText} ${attacker.name.toUpperCase()} used ${skillUsed.name.toUpperCase()} on ${target.name} for ${power} DMG!</p>` 
    }
    if (skillUsed.type === 'heal') {
        target.hpLeft += power
        if (target.hpLeft > target.hpMax) {target.hpLeft = target.hpMax}
        text += `<p id="battle-text-row">${critText} ${attacker.name.toUpperCase()} used ${skillUsed.name.toUpperCase()} on ${target.name} and healed ${power} hp!</p>`
    }
    // check if skill has status/effect and if it is to be used
    if (skillUsed.status != null) {
        text += checkStatusApplication(skillUsed, defender)
    }
    // Check if STATUS that need to be checked after attacking
    if (attacker.status === 'bleeding') {
        let bleedDmg = rndInt(1,2)
        text += `<p id="battle-text-row">${attacker.name.toUpperCase()} has status ${attacker.status} and takes ${bleedDmg} dmg</p>`
        attacker.hpLeft -= bleedDmg
    }
    // Check if defender is dead and act accordingly
    if (defender.hpLeft <= 0) {
        defender.hpLeft = 0
        text +=  `<p id="battle-text-row">${defender.name.toUpperCase()} DIED!</p>`
        endEventBtn.style.display = 'inline-block'

        if (attacker.isPlayer === true && attacker.hpLeft > 0) {
            text += giveExpAndUpdate(attacker, defender)
        }
    }
    // Check if attacker is dead and act accordingly
    if (attacker.hpLeft <= 0) {
        attacker.hpLeft = 0
        text +=  `<p id="battle-text-row">${attacker.name.toUpperCase()} DIED!</p>`
        endEventBtn.style.display = 'inline-block'

        if (defender.isPlayer === true && defender.hpLeft > 0) {
            text += giveExpAndUpdate(defender, attacker)
        }
    }

    updateHp(attacker)
    updateHp(defender)

    return text
}

// function to return possible effect including turn time for effect. Or 0/null if no effect
function checkStatusApplication (skill, target) {
    text = ''
    console.log('checking effect: ' + skill.status + ' from skill: ' + skill.name)
    if (rndInt(1,100) < skill.statusChance) {
        target.status = skill.status
        text = `<p id="battle-text-row">${target.name} is now affected by ${skill.status.toUpperCase()}</p>`
        return text
    }
    return ''
}

function rollPower(skill, user, target)  {
    let attrMulti = 1
    if (skill.attribute != null) attrMulti = 1 + (user.totalAttr[skill.attribute] / 10)
    let power = Math.round(skill.power/5 * attrMulti)

    return power
}

// char is always playerChar
function giveExpAndUpdate(char, enemy) {
    let expBar, expText
    expBar = document.querySelector('.pc-expbar-over')
    expText = document.querySelector('#pc-exp-text')

    givenGold = rndInt(enemy.level, enemy.level*4)
    givenExp = rndInt(enemy.givesExp-1, enemy.givesExp+1)
    
    let text = `<p id="battle-text-row">${char.name} got ${givenExp} exp and ${givenGold} gold for winning!</p>`

    char.gold += givenGold

    // If levelup
    if (char.exp + givenExp >= char.expToLvl) {
        let overkillExp = (char.exp + givenExp) - char.expToLvl
        char.level++
        char.exp = overkillExp
        char.expToLvl = Math.floor(char.expToLvl * 1.2)
        char.hpMax += hpPerLvlUp
        char.hpLeft += hpPerLvlUp
        if (char.hpLeft > char.hpMax) {char.hpLeft = char.hpMax}
        text += `<p id="battle-text-row">${char.name} LEVELED UP! to level ${char.level}</p>`
    } else {
        char.exp += givenExp
    }

    makePlayerCharDiv(char)

    return text
}
