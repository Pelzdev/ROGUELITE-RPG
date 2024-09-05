import {createNode} from "./base_functions.js"
import {navbarTop, popupDiv, popupHeader, popupGraphic, popupText, togglePopupDiv, centerPopup, currentLocationName, playerEquipmentDiv} from "./main.js"
import {playerChar, useConsumable} from "./player_char.js"

document.querySelector('.pc-info-line.skill-0').addEventListener('click', () => clickSkill(playerChar, 0))
document.querySelector('.pc-info-line.skill-1').addEventListener('click', () => clickSkill(playerChar, 1))

const foodSlots = 3
for (let i = 0; i < foodSlots; i++) {
    document.querySelector(`.food-img-${i}`).addEventListener('click', () => clickConsumable(playerChar, i))
}

export function makePlayerInfo (playerChar) {
    let buffText = '-'
    if (playerChar.buff) buffText = playerChar.buff.type

    document.querySelector('.pc-info-line.name').textContent = `${playerChar.name.toUpperCase()} ${playerChar.lastName.toUpperCase()}`
    document.querySelector('.pc-info-line.trait').textContent = `${playerChar.trait.name.toUpperCase()} ${playerChar.race.name.toUpperCase()} ${playerChar.gender.toUpperCase()}`
    document.querySelector('.pc-info-line.joblvl').textContent = `lvl ${playerChar.level} ${playerChar.job.name.toUpperCase()}`
    document.querySelector('.pc-info-line.atk').textContent = `${playerChar.totalMods.dmg}`
    document.querySelector('.pc-info-line.def').textContent = `${playerChar.totalMods.def}`
    makeAttrEl(playerChar, document.querySelector('.pc-attr-container'))
    makeResistanceEl(playerChar, document.querySelector('.res-container'))
    document.querySelector('.pc-info-line.location').textContent = `LOCATION: ${currentLocationName}`
    document.querySelector('.pc-info-line.gold').textContent = `${playerChar.gold}`
    document.querySelector('.pc-info-line.buff').textContent = `BUFF: ${buffText}`
    // SKILLS
    for (let i = 0; i < playerChar.skills.length; i++) {
        document.querySelector(`.pc-info-line.skill-${i}`).textContent = ''
        let skillIcon = createNode('i', {className: `icon-${playerChar.skills[i].element}`})
        let attributeIcon = createNode('i', {className: `icon-${playerChar.skills[i].attribute}`, style: {marginRight: '5px'}})
        let skillText = createNode('span', {textContent: `${playerChar.skills[i].name.toUpperCase()}`})
        document.querySelector(`.pc-info-line.skill-${i}`).append(skillIcon, attributeIcon, skillText)
    }
    makeEqElement(playerChar, playerEquipmentDiv)
    
    for (let i = 0; i < foodSlots; i++) {
        if (playerChar.food[i]) {
            document.querySelector(`.food-img-${i}`).src = `${playerChar.food[i].img}` || ''
        } else  { 
            document.querySelector(`.food-img-${i}`).src = ''
        }
    }
}

function makeAttrEl (pc, parentEl) {
    parentEl.innerHTML = ''
    const statBarPercentMulti = 2 // aka 1 point = 5% of bar filled
    let attrTypes = ['end', 'str', 'agi', 'dex', 'int', 'chr', 'lck']

    attrTypes.forEach((item) => {
        let attrText = createNode('p', { textContent: `${pc.totalMods[item]}`, style: {display: 'inline-block'} })
        let attrIcon = createNode('i', { className: `icon-${item}`} )
        let statBarUnder = createNode('div', {className: 'pc-statbar-under'})
        let statBarOver = createNode('div', {className: 'pc-statbar-over', style: {width: `${pc.totalMods[item]*statBarPercentMulti}%`}})
        statBarUnder.appendChild(statBarOver)

        let attrInfoLine = createNode('div', {className: 'attr-info-line'})
        attrInfoLine.append(attrIcon, attrText, statBarUnder)
        if (pc.totalMods[item] < 10) {
            let addZero = createNode('p', { textContent: '0', style: { color: 'rgba(255,255,255,0.3)', display: 'inline-block' } })
            attrInfoLine.append(addZero)
        }
        attrInfoLine.append(attrText, statBarUnder)
        parentEl.append(attrInfoLine)
    });
}

function makeResistanceEl (pc, parentEl) {
    parentEl.innerHTML = ''
    let resTypes = ['physical', 'fire', 'cold', 'electric', 'water', 'nature', 'poison', 'holy', 'love']

    resTypes.forEach((item) => {
        let modName = `${item}Res`
        let resIcon = createNode('i', {className: `icon-${item}`})
        let resDiv = createNode('div', {textContent: `${pc.totalMods[modName]}%`, style: {display: 'inline-block', width: '49%'}})
        resDiv.prepend(resIcon)
        parentEl.append(resDiv)
    });
}

function makeEqElement (playerChar, targetElement) {
    targetElement.innerHTML = ''
    let eqTypes = ['head', 'weapon', 'body', 'gloves', 'trinket', 'boots']

    eqTypes.forEach((item) => {
        if (playerChar.eq[item]) {
            let lineDiv = createNode('div', {className: `eq-info-line ${item} clickable` })
            lineDiv.addEventListener('click', () => clickEq(playerChar, item))
            let icon = createNode('i', {className: `icon-${item}`})
            let text = createNode('span', {textContent: `${playerChar.eq[item].name}`, className: `${playerChar.eq[item].rarity}` })
            lineDiv.append(icon, text)
            targetElement.append(lineDiv)
        } else {
            let lineDiv = createNode('div', {className: `pc-info-line ${item}`})
            let icon = createNode('i', {className: `icon-${item}`})
            lineDiv.append(icon)
            targetElement.append(lineDiv)
        }
    });
}

function clickEq (playerChar, eqClicked) {
    togglePopupDiv()
    centerPopup(popupDiv)
    let header = popupHeader
    let item = playerChar.eq[eqClicked]

    // HEADER
    let headerText = createNode('span', { textContent: item.name, className: item.rarity })
    header.append(headerText)
    // GRAPHIC / ICON
    let graphic = createNode( 'i', { className: `icon-${item.icon}`, style: {fontSize: '24px'} } )
    popupGraphic.append(graphic)
    // Item type, rarity then mods, making sure dmg, def is top if those exist
    let textDiv = document.querySelector('.popup-text')
    textDiv.append( createNode('p', { textContent: `Type: ${item.type.toUpperCase()}`, style: {marginTop: '10px'}}) )
    textDiv.append( createNode('p', {textContent: `Rarity: ${item.rarity.toUpperCase()}`, style:{marginBottom: '10px'}}) )
    
    // Add that checks everything
    for (const key of Object.keys(item.mods)) {
        if (key === 'dmg' || key === 'def') textDiv.append( createNode('p', {textContent: `+ ${item.mods[key]} ${key.toUpperCase()}`}) )
    }
    for (const key of Object.keys(item.mods)) {
        if ((!key.includes('Res')) && key !== 'dmg' && key !== 'def') {
            textDiv.append( createNode('p', {textContent: `+ ${item.mods[key]} ${key.toUpperCase()}`}) )
        }
    }
    for (const key of Object.keys(item.mods)) {
        if (key.includes('Res') && key != 'dmg' && key != 'def') {
            let keyWithoutRes = key.slice(0, -3) // Remove last 3 letters aka. 'Res'
            let resLine = createNode('div', {className: ''})
            let uncoloredText1 = createNode('span', { textContent: `+ ${item.mods[key]}% ` } )
            let coloredText = createNode('span', {textContent: keyWithoutRes.toUpperCase()})
            coloredText.className = keyWithoutRes
            let uncoloredText2 = createNode('span', {textContent: ' RES'})
            resLine.append(uncoloredText1, coloredText, uncoloredText2)
            textDiv.append(resLine)
        }
    }
    
    let btn = createNode('button', { className: 'btn-medium',textContent: 'OK' })
    btn.addEventListener('click', () => togglePopupDiv())
    textDiv.append(btn) 
}

// CLICKING skills etc on char screen
function clickSkill (playerChar, arrPos) {
    if (!playerChar.skills[arrPos]) return
    navbarTop.classList.add('unclickable')
    popupDiv.style.display = 'block'
    centerPopup(popupDiv)

    popupGraphic.innerHTML = ''
    popupText.innerHTML = ''

    let skill = playerChar.skills[arrPos]
    let dmgOrHealText = 'DAMAGE'
    if (skill.type === 'heal') dmgOrHealText = 'HEAL'
    let effectText = '-'
    if (skill.effect) effectText = `${skill.effectChance}% chance to ${skill.effect.toUpperCase()}`
    
    popupHeader.textContent = skill.name.toUpperCase()
    let elementGraphic = createNode('i', {className: `icon-${skill.element}`, style: {fontSize: '24px', marginRight: '5px'}})
    let attributeGraphic = createNode('i', {className: `icon-${skill.attribute}`, style: {fontSize: '24px'}})
    popupGraphic.append(elementGraphic, attributeGraphic)

    popupText.append( createNode('p', {textContent: `${dmgOrHealText}: ${skill.power || '-'}`, style: {marginBottom: '5px'}}) )
    popupText.append( createNode('p', {textContent: `Chance to use: ${skill.chance}%`}) )
    popupText.append( createNode('p', {textContent: `Crit: ${skill.critChance}%`}) )
    popupText.append( createNode('p', {textContent: `Extra effect: ${effectText}`}) )
    if (skill.type === 'damage' || skill.type === 'heal') {
        let text = `${skill.type.toUpperCase()} boosted by ${skill.attribute.toUpperCase()}`
        popupText.append( createNode('p', {textContent: text}) ) 
    }
    let btn = createNode('button', {className: 'btn-medium',textContent: 'OK'})
    btn.addEventListener('click', () => togglePopupDiv())
    popupText.append(btn)
}

// CONSUMABLE STUFF
// Clicking the consumable
function clickConsumable (playerChar, arrPos) {
    console.log('clicked on consumable on arrPos: ' + arrPos)
    console.log(playerChar.food)
    if (!playerChar.food[arrPos]) return
    togglePopupDiv()
    centerPopup(popupDiv)

    document.querySelector('.popup-header').textContent = playerChar.food[arrPos].name
    
    let graphic = createNode('img', { src: playerChar.food[arrPos].img, style:{width: '24px'} })
    popupGraphic.append(graphic)
    popupText.append(createNode('p', {textContent: playerChar.food[arrPos].infoText}) )

    let btnYes = createNode('button', { className: 'btn-medium', textContent: 'YES' })
    btnYes.addEventListener('click', () => consumableChoice(playerChar, 'yes', arrPos))
    let btnNo = createNode('button', { className: 'btn-medium', textContent: 'NO' })
    btnNo.addEventListener('click', () => consumableChoice(playerChar, 'no', arrPos))
    popupText.append(btnYes, btnNo)

}
// Choosing whether or not to use consumable/food
function consumableChoice (playerChar, answer, arrPos) {
    let arrInt = parseInt(arrPos)
    if (answer === 'no') {
        
    }
    if (answer === 'yes') {
        useConsumable(playerChar.food[arrPos], arrInt) 
    }
    togglePopupDiv()
}

