import {globalVars, updateBg} from "./main.js"
import {rndInt} from "./base_functions.js"
import {trainer} from "./event_trainer.js"
import {battle} from "./event_battle.js"
import {inn} from "./event_inn.js"
import {healer} from "./event_healer.js"
import {makePlayerCharDiv} from "./player_char.js"
import {oracle} from "./event_oracle.js"

export function startEvent (pc) {
    globalVars.eventsDone++
    let rndNum = rndInt(1,100)
    if (rndNum <= 10) globalVars.currentEvent = 'inn'
    if (rndNum > 10 && rndNum <= 16) globalVars.currentEvent = 'healer'
    if (rndNum > 16 && rndNum <= 26) globalVars.currentEvent = 'trainer'
    if (rndNum > 26 && rndNum <= 30) globalVars.currentEvent = 'oracle'
    if (rndNum > 30) globalVars.currentEvent = 'battle'
    updateBg(globalVars.eventDiv, globalVars.currentEvent)

    pc.gold = 100

    if (globalVars.currentEvent === 'inn') {
        inn(pc)
        globalVars.eventDiv.style.display = 'inline-block'
    }
    if (globalVars.currentEvent === 'healer') {
        healer(pc)
        globalVars.eventDiv.style.display = 'inline-block'
    }
    if (globalVars.currentEvent === 'trainer') {
        trainer(pc)
        globalVars.eventDiv.style.display = 'inline-block'
    }
    if (globalVars.currentEvent === 'oracle') {
        oracle(pc)
        globalVars.eventDiv.style.display = 'inline-block'
    }
    if (globalVars.currentEvent === 'battle') {
        if (globalVars.playerChar.hpLeft > 0) {
            battle(pc)
            updateBg(globalVars.battleDiv, globalVars.currentEvent)
            globalVars.battleDiv.style.display = 'inline-block'
        }
        else {
            console.log('You are dead...')
            return
        }
    }

    globalVars.eventHeader.textContent = `${globalVars.currentEvent.toUpperCase()}!`

    globalVars.eventDiv.classList.add(globalVars.currentEvent)
    
    globalVars.playerCharInfoEl1.style.display = 'none'
    globalVars.playerCharInfoEl2.style.display = 'none'
    globalVars.eventStartBtn.style.display = 'none'
    globalVars.eventTextContainer.style.display = 'block'

}


export function endEvent() {
    if (globalVars.currentEvent === 'battle') globalVars.battleDiv.style.display = 'none'
    globalVars.eventText.innerHTML = '' // empty event text where battle text shows up
    globalVars.endEventBtn.style.display = 'none' // remove btn to end event since we already clicked it 
    globalVars.eventDiv.style.display = 'none' // remove event div since we ended event
    globalVars.eventTextContainer.style.display = 'none'
    // Remove player status
    globalVars.playerChar.status = ''
    // Remove 1 from buff timeLeft, if it reaches 0, remove buff
    if (globalVars.playerChar.buff) {
        globalVars.playerChar.buff.timeLeft--
        if (globalVars.playerChar.buff.timeLeft < 1) globalVars.playerChar.buff = null
    }

    // Remove the class added for event
    globalVars.eventDiv.classList.remove(globalVars.currentEvent)

    if (globalVars.playerChar.hpLeft < 1) {
        globalVars.getPlayerCharBtn.style.display = 'inline-block'
        globalVars.eventStartBtn.style.display = 'none'
    } else {
        globalVars.eventStartBtn.style.display = 'inline-block'
    }

    if (globalVars.eventsDone%10 === 0) {
        let location = ''
        if (globalVars.currentLocationType === 'woods') location = 'woods'
        globalVars.locationBg = `img/location_bg/${location}/${rndInt(0,7)}.png`;console.log(`changed BG, eventsDone: ${globalVars.eventsDone}`);
        updateBg(globalVars.playerSpriteEl)
    }

    globalVars.currentEvent = ''
    makePlayerCharDiv(globalVars.playerChar)
    globalVars.playerCharInfoEl1.style.display = 'block'
    globalVars.playerCharInfoEl2.style.display = 'block'
}

function hideElements(...elArr) {
    for (let i = 0; i < elArr.length; i++) {
        elArr[i].style.display = 'none'
    }
}