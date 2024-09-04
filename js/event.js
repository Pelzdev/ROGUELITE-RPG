import {eventDiv, eventHeader, eventTextContainer, eventText, playerCharInfoEl1, playerCharInfoEl2, battleDiv, addToEventsDone, eventsDone, updateBg, eventStartBtn, endEventBtn, changeLocationBg} from "./main.js"
import {rndInt} from "./base_functions.js"
import {trainer} from "./event_trainer.js"
import {battle} from "./event_battle.js"
import {inn} from "./event_inn.js"
import {healer} from "./event_healer.js"
import {makePlayerCharDiv, removePlayerStatus, decreaseBuffDuration, playerCharIsAlive} from "./player_char.js"
import {oracle} from "./event_oracle.js"

export let currentEvent = ''

export function startEvent (playerChar) {
    addToEventsDone()
    let rndNum = rndInt(1,100)
    if (rndNum <= 10) currentEvent = 'inn'
    if (rndNum > 10 && rndNum <= 16) currentEvent = 'healer'
    if (rndNum > 16 && rndNum <= 26) currentEvent = 'trainer'
    if (rndNum > 26 && rndNum <= 30) currentEvent = 'oracle'
    if (rndNum > 30) currentEvent = 'battle'

    updateBg(eventDiv, currentEvent)

    if (currentEvent === 'inn') {
        inn(playerChar)
        eventDiv.style.display = 'inline-block'
    }
    if (currentEvent === 'healer') {
        healer(playerChar)
        eventDiv.style.display = 'inline-block'
    }
    if (currentEvent === 'trainer') {
        trainer(playerChar)
        eventDiv.style.display = 'inline-block'
    }
    if (currentEvent === 'oracle') {
        oracle(playerChar)
        eventDiv.style.display = 'inline-block'
    }
    if (currentEvent === 'battle') {
        if (playerChar.hpLeft > 0) {
            battle(playerChar)
            updateBg(battleDiv, currentEvent)
            battleDiv.style.display = 'inline-block'
        }
        else {
            console.log('You are dead...')
            return
        }
    }

    eventHeader.textContent = `${currentEvent.toUpperCase()}!`

    eventDiv.classList.add(currentEvent)
    
    playerCharInfoEl1.style.display = 'none'
    playerCharInfoEl2.style.display = 'none'
    eventStartBtn.style.display = 'none'
    eventTextContainer.style.display = 'block'
}


export function endEvent(playerChar) {
    if (currentEvent === 'battle') battleDiv.style.display = 'none'
    eventText.innerHTML = '' // empty event text where battle text shows up
    endEventBtn.style.display = 'none' // remove btn to end event since we already clicked it 
    eventDiv.style.display = 'none' // remove event div since we ended event
    eventTextContainer.style.display = 'none'
    // Remove player status
    removePlayerStatus()
    // Remove 1 from buff timeLeft, if it reaches 0, remove buff
    decreaseBuffDuration()

    // Remove the class added for event
    eventDiv.classList.remove(currentEvent)

    
    if (!playerCharIsAlive()) {
        getPlayerCharBtn.style.display = 'inline-block'
        eventStartBtn.style.display = 'none'
    } else {
        eventStartBtn.style.display = 'inline-block'
    }

    if (eventsDone%10 === 0) {
        changeLocationBg()
    }

    currentEvent = ''
    makePlayerCharDiv(playerChar)
    playerCharInfoEl1.style.display = 'block'
    playerCharInfoEl2.style.display = 'block'
}

function hideElements(...elArr) {
    for (let i = 0; i < elArr.length; i++) {
        elArr[i].style.display = 'none'
    }
}
