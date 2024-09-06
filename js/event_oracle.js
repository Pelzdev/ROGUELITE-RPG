import {eventText, endEventBtn} from "./event.js"
import {playerChar} from "./player_char.js"
import {createNode, rndFromArr, removeIndexFromArr, rndInt} from "./base_functions.js"
import {wiki} from "./wiki.js"

let oracleName = 'Xander'
let eventBtnDiv = ''

export function oracle () {
    const maxH = 80
    const charHeight = 190
    const spriteH = (charHeight / 200) * maxH

    let newOrUpgradeSkill = 'upgrade'
    let text = ''
    let skillArrPos = 0
    let newSkill = '' 

    if (!playerChar.skills[1]) {newOrUpgradeSkill = 'new'}
    else {skillArrPos = rndInt(0,1)}

    document.querySelector('.event-sprite-img').style.height = `${spriteH}%`
    document.querySelector('.event-sprite-img').src = 'img/events/oracle/0.png'
    eventBtnDiv = createNode('div', {className: 'event-btn-div', style: {textAlign: 'center'}})
    let btn = createNode('button', {className: 'btn-medium', textContent: 'PROCEED'})
    if (newOrUpgradeSkill === 'upgrade') {
        text = createNode('p', {textContent: `${oracleName.toUpperCase()} will empower your ${playerChar.skills[skillArrPos].name.toUpperCase()} skill.`})
        btn.addEventListener('click', () => upgradeSkill(playerChar, skillArrPos))
    }
    if (newOrUpgradeSkill === 'new') {
        newSkill = getRndAvailableSkill()
        text = createNode('p', {textContent: `${oracleName.toUpperCase()} will teach you the skill ${newSkill.name.toUpperCase()}.`})
        btn.addEventListener('click', () => giveNewSkill(playerChar, newSkill))
    }
    
    eventBtnDiv.append(btn)
    eventText.append(text, eventBtnDiv)
}

function upgradeSkill (playerChar, arrPos) {
    eventBtnDiv.style.display = 'none'
    let text = ''
    let skill = playerChar.skills[arrPos]
    let oldSkill = structuredClone(playerChar.skills[arrPos])

    if ([1,5,10].includes(skill.level)) {
        skill.name = skill.name.slice(0, -1)
    }
    if ([2,4,6,9,11,15,20].includes(skill.level)) {
        skill.name = skill.name.slice(0, -2)
    }
    if ([3,7,12,14,16].includes(skill.level)) {
        skill.name = skill.name.slice(0, -3)
    }
    if ([8,13,17,19].includes(skill.level)) {
        skill.name = skill.name.slice(0, -4)
    }
    if ([18].includes(skill.level)) {
        skill.name = skill.name.slice(0, -5)
    }
    // Add correct roman numeral to name, give skill +1 level, make text
    skill.name += romanNumerals[skill.level + 1]
    skill.level++
    text = createNode('p', {textContent: `${oracleName} upgraded ${oldSkill.name.toUpperCase()} to ${skill.name.toUpperCase()}!`})
    eventText.append(text)

    if(skill.power) {
        let healOrDmg = 'Damage'
        if (skill.type === 'heal') healOrDmg = 'Heal'
        skill.power += 5
        text = createNode('p', {textContent: `Damage upgraded from ${oldSkill.power} to ${skill.power}.`})
        eventText.append(text)
    }
    if(!skill.power) {
        skill.power = 10
        skill.type = 'damage'
        text = createNode('p', {textContent: `This skill now does damage. Damage upgraded from 0 to ${skill.power}.`})
        eventText.append(text)
    }
    endEventBtn.style.display = 'inline-block' // end event btn
}

const romanNumerals = {1: 'I', 2: 'II', 3: 'III', 4: 'VI', 5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X', 11: 'XI',12: 'XII',13: 'XIII',14: 'XIV',15: 'XV',16: 'XVI', 17: 'XVII', 18: 'XVIII', 19: 'XIX', 20: 'XX'}

function giveNewSkill (playerChar, newSkill) {
    playerChar.skills[1] = newSkill
    playerChar.skills[1].level = 1
    eventBtnDiv.style.display = 'none'
    let text = createNode('p', {textContent: `${oracleName} taught you ${newSkill.name.toUpperCase()}!`})
    eventText.append(text)
    endEventBtn.style.display = 'inline-block' // end event btn
}

function getRndAvailableSkill () {
    // make array of skills excluding 'attack' and the skill player already has
    let availableSkills = removeIndexFromArr('attack', Object.keys(wiki.skills))
    availableSkills = removeIndexFromArr(playerChar.skills[0], availableSkills)
    let newSkill = structuredClone(wiki.skills[rndFromArr(availableSkills)])

    return newSkill
}