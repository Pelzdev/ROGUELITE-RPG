function startEvent (pc, chosenEvent) {
    eventDiv.innerHTML = ''
    let rndNum = rndInt(1,100)
    if (rndNum <= 10) currentEvent = 'inn'
    if (rndNum > 10 && rndNum <= 18) currentEvent = 'healer'
    if (rndNum > 18 && rndNum <= 30) currentEvent = 'trainer'
    if (rndNum > 30) currentEvent = 'battle'

    if (currentEvent === 'inn') {
        inn(pc)
    }
    if (currentEvent === 'healer') {
        healer(pc)
    }
    if (currentEvent === 'trainer') {
        trainer(pc)
    }
    if (currentEvent === 'battle') {
        if (playerChar.hpLeft > 0) {
            battle(pc)
        }
        else {
            console.log('You are dead...')
            return
        }
    }

    eventHeader.innerHTML = `${currentEvent.toUpperCase()}!`
    eventDiv.classList.add(currentEvent)
    
    playerCharInfoEl.style.display = 'none'
    eventStartBtn.style.display = 'none'
    eventTextContainer.style.display = 'block'
    eventDiv.style.display = 'inline-block'
}


function endEvent() {
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

    if (rndInt(0,4)) {
        locationBg = `img/events/location_bg/woods/${rndInt(0,7)}.png`;console.log('changed BG!');
        updateEventBg('player')
    }
    makePlayerCharDiv(playerChar)
    playerCharInfoEl.style.display = 'inline-block'
    eventDiv.style.background = 'none'
    eventDiv.style.backgroundColor = 'rgb(49, 49, 53)'

    currentEvent = ''
}

function hideElements(...elArr) {
    for (let i = 0; i < elArr.length; i++) {
        elArr[i].style.display = 'none'
    }
}