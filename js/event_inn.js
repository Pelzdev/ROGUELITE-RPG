import {rndInt, createNode} from "./base_functions.js"
import {globalVars} from "./main.js"
import {getFirstEmptyfoodSlot, giveFood} from "./event_battle.js"
import {wiki} from "./wiki.js"
import { makePlayerCharDiv } from "./player_char.js"

// INN EVENT
let innCost = 15
let innHeal = 25

export function inn (pc) {
    innCost = rndInt(15,25)
    innHeal = rndInt(25, 40)

    const maxH = 80
    const charHeight = 180
    const spriteH = (charHeight / 200) * maxH

    // disable button to click YES if not enough gold
    let disableYesBtn = `disabled`
    if (pc.gold >= innCost) disableYesBtn = ''
    // Image sprite
    document.querySelector('.event-sprite-img').style.height = `${spriteH}%`
    document.querySelector('.event-sprite-img').src = 'img/events/inn/innkeeper.png'
    // Event text in text-div
    let text1 = createNode('span', {textContent: `The inn looks inviting. Do you want to pay innkeeper Aerion ${innCost} `})
    let icon = createNode('i', {className:  'icon-gold icon-inn-1'})
    let text2 = createNode('span', {textContent: ` (discounted by ${pc.totalMods.chr}), to stay the night? You have ${pc.gold}. `})
    let icon2 = createNode('i', {className:  'icon-gold icon-inn-2'})
    // Buttons inside text-div
    let btnDiv = createNode('div', {className: 'event-btn-div', style: {display: 'inline-block'}})
    let btnYes = createNode('button', {className: `btn-medium ${disableYesBtn}`, textContent: 'YES'})
    btnYes.addEventListener('click', () => innYes(pc))
    let btnNo = createNode('button', {className: 'btn-medium', textContent: 'NO'})
    btnNo.addEventListener('click', () => innNo(pc))
    btnDiv.append(btnYes, btnNo)

    globalVars.eventText.append(text1, icon, text2, icon2, btnDiv)
    
    globalVars.endEventBtn.style.display = 'inline-block' // end event btn
}

function innYes (pc) {
    document.querySelector('.event-btn-div').style.display = 'none'
    pc.gold -= innCost
    pc.hpLeft += 25
    if (pc.hpLeft > pc.hpMax) {
        pc.hpLeft = pc.hpMax
    }
    let br = createNode('br', {className: null})
    let text = createNode('span', {textContent: ` You paid ${innCost} `})
    let icon = createNode('i', {className:  'icon-gold'})
    let text2 = createNode('span', {textContent: ` to stay the night... You wake up refreshed.` })
    globalVars.eventText.append(br, text, icon, text2)

    if (getFirstEmptyfoodSlot(pc) != 'none') {
        let foodType = wiki.food['small_potion']
        giveFood(pc, foodType)
        let text = createNode('p', {textContent: `You got a ${foodType.name} to take with you!`})
        globalVars.eventText.append(text)
    }
    
    makePlayerCharDiv(pc)
}

function innNo() {
    document.querySelector('.event-btn-div').style.display = 'none'
    let text = createNode('p', {textContent: 'You decide to leave the inn.'})
    globalVars.eventText.append(text)
}