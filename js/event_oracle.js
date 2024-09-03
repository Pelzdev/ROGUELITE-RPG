import {globalVars} from "./main.js"
import {createNode} from "./base_functions.js"

let oracleName = 'Xander'

export function oracle () {
    let pc = globalVars.playerChar
    const maxH = 80
    const charHeight = 190
    const spriteH = (charHeight / 200) * maxH

    let skillArrPos = 0
    
    document.querySelector('.event-sprite-img').style.height = `${spriteH}%`
    document.querySelector('.event-sprite-img').src = 'img/events/oracle/0.png'
    let text = createNode('p', {textContent: `${oracleName.toUpperCase()} will empower your ${pc.skills[0].name.toUpperCase()} skill.`})
    let btnDiv = createNode('div', {className: 'event-btn-div', style: {textAlign: 'center'}})
    let btn = createNode('button', {className: 'btn-medium', textContent: 'PROCEED'})
    btn.addEventListener('click', () => upgradeSkill(pc, skillArrPos))
    btnDiv.append(btn)
    globalVars.eventText.append(text, btnDiv)
}

function upgradeSkill (pc, arrPos) {
    document.querySelector('.event-btn-div').style.display = 'none'
    let text = ''
    let skill = pc.skills[arrPos]
    let oldSkill = structuredClone(pc.skills[arrPos])

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
    text = createNode('p', {textContent: `${oracleName} upgraded ${oldSkill.name.toUpperCase()} to ${skill.name.toUpperCase()}!`})
    globalVars.eventText.append(text)

    if(skill.power) {
        let healOrDmg = 'Damage'
        if (skill.type === 'heal') healOrDmg = 'Heal'
        skill.power += 5
        text = createNode('p', {textContent: `Damage upgraded from ${oldSkill.power} to ${skill.power}.`})
        globalVars.eventText.append(text)
    }
    if(!skill.power) {
        skill.power = 10
        skill.type = 'damage'
        text = createNode('p', {textContent: `This skill now does damage. Damage upgraded from 0 to ${skill.power}.`})
        globalVars.eventText.append(text)
    }

    globalVars.endEventBtn.style.display = 'inline-block' // end event btn
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
