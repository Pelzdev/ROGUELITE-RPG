import {rndInt, createNode} from "./base_functions.js"
import {eventText, updateHp, endEventBtn} from "./main.js"
import {playerChar} from "./player_char.js"

export function healer () {
    const amountRestored = rndInt(30, 45)
    const maxH = 80
    const charHeight = 165
    const spriteH = (charHeight / 200) * maxH
    
    document.querySelector('.event-sprite-img').style.height = `${spriteH}%`
    document.querySelector('.event-sprite-img').src = 'img/events/healer/healer_1.png'
    let text = createNode('p', {textContent: 'You met healer Brevenin!'})
    let text2 = createNode('p', {textContent: `He heals you, restoring ${amountRestored} HP.`})
    eventText.append(text, text2)

    updateHp(playerChar, amountRestored)

    endEventBtn.style.display = 'inline-block' // end event btn
}