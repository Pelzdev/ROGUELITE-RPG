function startEvent (pc) {
    eventsDone++
    let rndNum = rndInt(1,100)
    if (rndNum <= 10) currentEvent = 'inn'
    if (rndNum > 10 && rndNum <= 16) currentEvent = 'healer'
    if (rndNum > 16 && rndNum <= 26) currentEvent = 'trainer'
    if (rndNum > 26 && rndNum <= 30) currentEvent = 'oracle'
    if (rndNum > 30) currentEvent = 'battle'
    updateBg(eventDiv, currentEvent)

    if (currentEvent === 'inn') {
        inn(pc)
        eventDiv.style.display = 'inline-block'
    }
    if (currentEvent === 'healer') {
        healer(pc)
        eventDiv.style.display = 'inline-block'
    }
    if (currentEvent === 'trainer') {
        trainer(pc)
        eventDiv.style.display = 'inline-block'
    }
    if (currentEvent === 'oracle') {
        oracle(pc)
        eventDiv.style.display = 'inline-block'
    }
    if (currentEvent === 'battle') {
        if (playerChar.hpLeft > 0) {
            battle(pc)
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


function endEvent() {
    if (currentEvent === 'battle') battleDiv.style.display = 'none'
    eventText.innerHTML = '' // empty event text where battle text shows up
    endEventBtn.style.display = 'none' // remove btn to end event since we already clicked it 
    eventDiv.style.display = 'none' // remove event div since we ended event
    eventTextContainer.style.display = 'none'
    // Remove player status
    playerChar.status = ''
    // Remove 1 from buff timeLeft, if it reaches 0, remove buff
    if (playerChar.buff) {
        playerChar.buff.timeLeft--
        if (playerChar.buff.timeLeft < 1) playerChar.buff = null
    }

    // Remove the class added for event
    eventDiv.classList.remove(currentEvent)

    if (playerChar.hpLeft < 1) {
        getPlayerCharBtn.style.display = 'inline-block'
        eventStartBtn.style.display = 'none'
    } else {
        eventStartBtn.style.display = 'inline-block'
    }

    if (eventsDone%10 === 0) {
        let location = ''
        if (currentLocationType === 'woods') location = 'woods'
        locationBg = `img/location_bg/${location}/${rndInt(0,7)}.png`;console.log(`changed BG, eventsDone: ${eventsDone}`);
        updateBg(playerSpriteEl)
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