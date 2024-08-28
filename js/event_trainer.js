let trainCost = 0
let attrToTrain = ''

function trainer () {
    attrToTrain = rndFromArr( ['str', 'agi', 'int', 'chr', 'lck'] )
    trainCost = rndInt(25, 35) + playerChar.totalAttr[attrToTrain]

    eventDiv.innerHTML = ''
    eventDiv.style.background = `url("img/events/trainer/bg_${attrToTrain}.png") rgba(0, 0, 0, 0.3)`
    eventDiv.style.backgroundBlendMode = 'multiply'
    eventDiv.style.backgroundSize = 'cover'
    eventDiv.style.backgroundPosition = 'center center'

    let trainerName = ''
    const maxH = 80
    const charHeight = 180
    const spriteH = (charHeight / 200) * maxH

    if (attrToTrain === 'str') trainerName = 'Dolf'.toUpperCase()
    if (attrToTrain === 'agi') trainerName = "Ji'soud".toUpperCase()
    if (attrToTrain === 'int') trainerName = 'Riniya'.toUpperCase()
    if (attrToTrain === 'chr') trainerName = 'Krixi'.toUpperCase()
    if (attrToTrain === 'lck') trainerName = 'Mateo'.toUpperCase()
    
    eventDiv.innerHTML += `<h3 class="window-header">${attrToTrain.toUpperCase()} TRAINER ${trainerName}</h3>`
    eventDiv.innerHTML += `
        <div class="event-sprite-img-container">
            <img class="event-sprite-img" style="height:${spriteH}%" src="img/events/trainer/${attrToTrain}_trainer.png">
        </div>`

    eventText.innerHTML += ``
    eventText.innerHTML = `
        <hr>
        <p class="event-text-row">You found a trainer willing to help!</p><hr>
        <p id="event-text-row">${trainerName} will help you raise your ${attrToTrain.toUpperCase()} attribute for ${trainCost} gold. Do you accept? You have ${playerChar.gold} gold.</p>
        <br>
        <div id="event-btn-container">
            <button class="btn-trainer yes" onclick="trainerYes()">YES</button><button class="btn-trainer no" onclick="trainerNo()">NO</button>
        </div>`

    endEventBtn.style.display = 'inline-block' // end event btn
}

function trainerYes () {
    if (playerChar.gold < trainCost) {
        console.log('not enough gold')
        return
    }
    playerChar.gold -= trainCost
    playerChar.baseAttr[attrToTrain]++
    eventText.innerHTML = `You paid ${trainCost} gold to raise your ${attrToTrain.toUpperCase()} by 1`
    makePlayerCharDiv(playerChar)
}

function trainerNo () {
    eventText.innerHTML = `You decide to leave the trainer.`
}