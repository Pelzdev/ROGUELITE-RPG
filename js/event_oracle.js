
let oracleName = 'Xander'

function oracle () {
    eventDiv.innerHTML = ''

    const maxH = 80
    const charHeight = 190
    const spriteH = (charHeight / 200) * maxH

    let skillArrPos = 0
    
    eventDiv.innerHTML += `<p class="window-header">ORACLE!</p>`
    eventDiv.innerHTML += `
        <div class="event-sprite-img-container">
            <img class="event-sprite-img" style="height:${spriteH}%" src="img/events/oracle/0.png">
        </div>`

    eventText.innerHTML = `
        <hr>
        <p class="event-text-row">You met an Oracle!</p><hr>
        <br>
        <p id="event-text-row">${oracleName.toUpperCase()} will empower your <br>${playerChar.skills[0].name.toUpperCase()} skill.</p>
        <br>
        <div id="event-btn-container">
            <button class="btn-small yes" onclick="upgradeSkill(${skillArrPos})">PROCEED</button>
        </div>`
}

function upgradeSkill (arrPos) {
    let skill = playerChar.skills[arrPos]
    let oldSkill = structuredClone(playerChar.skills[arrPos])
    let text = ''

    if ([1,5,10].includes(skill.level)) {
        //console.log(`${skill.name} has 1 roman numeral`)
        skill.name = skill.name.slice(0, -1)
    }
    if ([2,4,6,9,11,15].includes(skill.level)) {
        //console.log(`${skill.name} has 2 roman numerals`)
        skill.name = skill.name.slice(0, -2)
    }
    if ([3,7,12,14].includes(skill.level)) {
        //console.log(`${skill.name} has 3 roman numerals`)
        skill.name = skill.name.slice(0, -3)
    }
    if ([8,13,17].includes(skill.level)) {
        //console.log(`${skill.name} has 4 roman numerals`)
        skill.name = skill.name.slice(0, -4)
    }
    // Add correct roman numeral to name, give skill +1 level, make text
    skill.name += romanNumerals[skill.level + 1]
    skill.level++
    text += `<br><p class="event-text-row">${oracleName} upgraded ${oldSkill.name.toUpperCase()} to ${skill.name.toUpperCase()}!</p>`

    if(skill.power) {
        let healOrDmg = 'Damage'
        if (skill.type === 'heal') healOrDmg = 'Heal'
        skill.power += 5
        text += `<p class="event-text-row">Damage upgraded from ${oldSkill.power} to ${skill.power}!</p>`
    }
    if(!skill.power) {
        skill.power = 10
        skill.type = 'damage'
        text += `<p class="event-text-row">This skill now does damage. Damage upgraded from 0 to ${skill.power}!</p>`
    }

    eventText.innerHTML = text;
    endEventBtn.style.display = 'inline-block' // end event btn
}

let romanNumerals = {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'VI',
    5: 'V',
    6: 'VI',
    7: 'VII',
    8: 'VIII',
    9: 'IX',
    10: 'X',
    11: 'XI',
    12: 'XII',
    13: 'XIII',
    14: 'XIV',
    15: 'XV'
}
