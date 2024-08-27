function startEvent (pc) {
    let event
    let rndNum = rndInt(1,100)
    if (rndNum <= 15) event = 'inn'
    if (rndNum > 15 && rndNum <= 20) event = 'trainer'
    if (rndNum > 20) event = 'battle'

    if (event === 'battle') {
        if (playerChar.hpLeft > 0) {
            currentGameMode = 'battle'
            eventHeader.innerHTML = 'BATTLE!<hr>'
            eventDiv.classList.add('battle')
            battle(pc)
        }
        else {
            console.log('You are dead...')
            return
        }
    } 

    if (event === 'inn') {
        currentGameMode = 'inn'
        eventHeader.innerHTML = 'INN!<hr>'
        eventDiv.classList.add('inn')
        inn(pc)
    }

    if (event === 'trainer') {
        currentGameMode = 'trainer'
        eventHeader.innerHTML = 'TRAINER!<hr>'
        eventDiv.classList.add('trainer')
        trainer(pc)
    }
    
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
    if (currentGameMode === 'battle') {
        eventDiv.classList.remove('battle')
    }
    if (currentGameMode === 'inn') {
        eventDiv.classList.remove('inn')
    }
    if (currentGameMode === 'trainer') {
        eventDiv.classList.remove('trainer')
    }

    console.log('event leaving:' + currentGameMode)
    if (playerChar.hpLeft < 1) {
        getPlayerCharBtn.style.display = 'inline-block'
        eventStartBtn.style.display = 'none'
    } else {
        eventStartBtn.style.display = 'inline-block'
    }

    eventDiv.style.background = 'none'
    eventDiv.style.backgroundColor = 'rgb(49, 49, 53)'

    currentGameMode = ''
}

function hideElements(...elArr) {
    for (let i = 0; i < elArr.length; i++) {
        elArr[i].style.display = 'none'
    }
}