let trainCost = 30
let attrToTrain = 'str'

function trainer () {
    eventDiv.innerHTML = ''
    eventDiv.style.background = `url("img/events/trainer/bg_trainer.png") rgba(0, 0, 0, 0.3)`
    eventDiv.style.backgroundBlendMode = 'multiply'
    eventDiv.style.backgroundSize = 'cover'
    eventDiv.style.backgroundPosition = 'center center'

    const maxH = 60
    const charHeight = 180
    const spriteH = (charHeight / 200) * maxH

    eventDiv.innerHTML += `<h3 class="window-header">STRENGTH TRAINER GONZALO</h3>`
    eventDiv.innerHTML += `
        <div id="trainer-img-container">
            <img id="event-trainer-img" style="height:${spriteH}%" src="img/events/trainer/str_trainer.png">
        </div>`

    eventText.innerHTML += ``
    eventText.innerHTML = `
        <hr>
        <p class="event-text-row">You found a trainer willing to help!</p><hr>
        <p id="event-text-row">Gonzalo the Strength Trainer will help you raise the power of your ${attrToTrain.toUpperCase()} attribute for ${trainCost} gold. Do you accept? You have ${playerChar.gold} gold.</p>
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

}