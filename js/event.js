import {updateBg, changeLocationBg, newGameBtn, eventStartBtn} from "./main.js"
import {rndInt, rndFromArr} from "./base_functions.js"
import {trainer} from "./event_trainer.js"
import {battle, gotEqLoot} from "./event_battle.js"
import {inn} from "./event_inn.js"
import {healer} from "./event_healer.js"
import {makePlayerCharDiv, removePlayerStatus, decreaseBuffDuration, playerCharIsAlive, getItem} from "./player_char.js"
import {oracle} from "./event_oracle.js"
import {closePlayerInfoElements, playerCharInfoEl1, playerCharInfoEl2} from "./player_info.js"
import {wiki} from "./wiki.js"
import {changeCurrentEqLoot, chooseEq} from "./choose_eq.js"

export const eventDiv = document.querySelector('.event-div')
export const eventHeader = document.getElementById('event-header')
export const eventTextContainer = document.querySelector('.event-text-container')
export const eventText = document.querySelector('.event-text')
export const endEventBtn = document.getElementById('event-end-btn')
export const eventSprite = document.querySelector('.event-sprite-img') // The image of the char/creature itself
export const enemySpriteContainer = document.getElementById('enemy-img-container')
export const battleDiv = document.querySelector('.battle-div')
export const windowHeaderBattle = document.querySelector('.window-header-battle')

endEventBtn.addEventListener("click", () => endEvent())

export let currentEvent = ''
export let eventsDone = 0
export function addToEventsDone () {
    eventsDone++
}

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
    
    closePlayerInfoElements()
    eventStartBtn.style.display = 'none'
    eventTextContainer.style.display = 'block'
}

export function endEvent(playerChar) {
    emptyAndCloseEventElements(currentEvent)
    // Remove player status
    removePlayerStatus()
    // Remove 1 from buff timeLeft, if it reaches 0, remove buff
    decreaseBuffDuration()
    // Remove the class added for event
    eventDiv.classList.remove(currentEvent)
    
    if (!playerCharIsAlive()) {
        newGameBtn.style.display = 'inline-block'
        eventStartBtn.style.display = 'none'
    } else {
        eventStartBtn.style.display = 'inline-block'
    }

    if (eventsDone%10 === 0) {
        changeLocationBg()
    }

    
    if (currentEvent === 'battle' && gotEqLoot) {
        const eqType = rndFromArr(wiki.eqTypes)
        changeCurrentEqLoot(getItem(eqType))
        chooseEq(playerChar)
        currentEvent = ''
    } else {
        makePlayerCharDiv(playerChar)
        playerCharInfoEl1.style.display = 'block'
        playerCharInfoEl2.style.display = 'block'
        currentEvent = ''
    }
}

export function emptyAndCloseEventElements (currentEvent) {
    if (currentEvent === 'battle') battleDiv.style.display = 'none'
    eventText.innerHTML = '' // empty event text where battle text shows up
    endEventBtn.style.display = 'none' // remove btn to end event since we already clicked it 
    eventDiv.style.display = 'none' // remove event div since we ended event
    eventTextContainer.style.display = 'none'
    eventDiv.classList.remove(currentEvent)
}
