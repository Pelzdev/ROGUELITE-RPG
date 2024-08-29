let trainCost = 0
let attrToTrain = ''
let trainAmount = 1
let extraAttr = null
let attrToTrainText = ''

function trainer (selectedTrainer) {
    let trainerChosen = ''
    let rndNum = rndInt(1, 100)
    if (rndNum <= 18) {trainerChosen = 'dolf'; attrToTrain = 'str'}
    if (rndNum > 18 && rndNum <= 36) {trainerChosen = 'dahiq'; attrToTrain = 'agi'}
    if (rndNum > 36 && rndNum <= 54) {trainerChosen = 'riniya'; attrToTrain = 'int'}
    if (rndNum > 54 && rndNum <= 72) {trainerChosen = 'krixi'; attrToTrain = 'chr'}
    if (rndNum > 72 && rndNum <= 90) {trainerChosen = 'mateo'; attrToTrain = 'lck'}
    if (rndNum > 90 && rndNum <= 100) {trainerChosen = 'christobel'; attrToTrain = 'chr'; extraAttr = 'str'}

    trainerChosen = 'christobel'; attrToTrain = 'chr'; extraAttr = 'str'
    trainCost = rndInt(20, 30) + playerChar.totalAttr[attrToTrain] - playerChar.totalAttr.chr
    // Check for double training
    if (extraAttr) {attrToTrainText = `${attrToTrain} & ${extraAttr}`.toUpperCase(); trainCost = Math.round(trainCost *= 1.5)}
    if (!extraAttr) attrToTrainText = attrToTrain.toUpperCase()

    eventDiv.innerHTML = ''
    eventDiv.style.background = `url("img/events/trainer/bg_${trainerChosen}.png") rgba(0, 0, 0, 0.5)`
    eventDiv.style.backgroundBlendMode = 'multiply'
    eventDiv.style.backgroundSize = 'cover'
    eventDiv.style.backgroundPosition = 'center bottom'

    const maxH = 80
    const charHeight = 180
    const spriteH = (charHeight / 200) * maxH
    
    eventDiv.innerHTML += `<p class="window-header">TRAINER</p>`
    eventDiv.innerHTML += `
        <div class="event-sprite-img-container">
            <img class="event-sprite-img" style="height:${spriteH}%" src="img/events/trainer/trainer_${trainerChosen}.png">
        </div>`

    eventText.innerHTML += ``
    eventText.innerHTML = `
        <hr>
        <p class="event-text-row">You found a trainer willing to help!</p><hr>
        <p id="event-text-row">${trainerChosen.toUpperCase()} will help you raise your ${attrToTrainText} attribute(s) by ${trainAmount} for ${trainCost} ${goldIcon} (discounted by ${playerChar.totalAttr.chr}). Do you accept? You have ${playerChar.gold} ${goldIcon}.</p>
        <br>
        <div id="event-btn-container">
            <button class="btn-trainer yes" onclick="trainerYes()">YES</button><button class="btn-trainer no" onclick="trainerNo()">NO</button>
        </div>`

    endEventBtn.style.display = 'inline-block' // end event btn
}

function trainerYes () {
    console.log(extraAttr)
    if (playerChar.gold < trainCost) {
        console.log('not enough gold')
        return
    }
    playerChar.gold -= trainCost
    playerChar.baseAttr[attrToTrain] += trainAmount
    if (extraAttr) {
        playerChar.baseAttr[extraAttr] += trainAmount
    }
    eventText.innerHTML = `You paid ${trainCost} ${goldIcon} to raise your ${attrToTrainText} by ${trainAmount}`
    makePlayerCharDiv(playerChar)
    extraAttr = null
}

function trainerNo () {
    eventText.innerHTML = `You decide to leave the trainer.`
}
