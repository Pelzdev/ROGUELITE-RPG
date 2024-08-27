function startEvent (pc) {
    let rndNum = rndInt(1,100)
    if (rndNum <= 10) currentEvent = 'inn'
    if (rndNum > 10 && rndNum <= 20) currentEvent = 'potion'
    if (rndNum > 20 && rndNum <= 27) currentEvent = 'trainer'
    if (rndNum > 27) currentEvent = 'battle'

    if (currentEvent === 'inn') {
        inn(pc)
    }
    if (currentEvent === 'potion') {
        potion(pc)
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

    playerChar.status = ''

    // Remove the class added for event
    if (currentEvent === 'battle') {
        eventDiv.classList.remove('battle')
    }
    if (currentEvent === 'inn') {
        eventDiv.classList.remove('inn')
    }
    if (currentEvent === 'trainer') {
        eventDiv.classList.remove('trainer')
    }

    if (playerChar.hpLeft < 1) {
        getPlayerCharBtn.style.display = 'inline-block'
        eventStartBtn.style.display = 'none'
    } else {
        eventStartBtn.style.display = 'inline-block'
    }

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