let trainCost = 0
let attrToTrain = ''
let trainAmount = 1
let extraAttr = null
let attrToTrainText = ''

function trainer (selectedTrainer) {
    let trainerChosen = ''
    let rndNum = rndInt(1, 100)
    if (rndNum <= 13) {trainerChosen = 'thorom'; attrToTrain = 'end'}
    if (rndNum > 13 && rndNum <= 26) {trainerChosen = 'dolf'; attrToTrain = 'str'}
    if (rndNum > 26 && rndNum <= 39) {trainerChosen = 'dahiq'; attrToTrain = 'agi'}
    if (rndNum > 39 && rndNum <= 52) {trainerChosen = 'ginki'; attrToTrain = 'dex'}
    if (rndNum > 52 && rndNum <= 65) {trainerChosen = 'riniya'; attrToTrain = 'int'}
    if (rndNum > 65 && rndNum <= 78) {trainerChosen = 'krixi'; attrToTrain = 'chr'}
    if (rndNum > 78 && rndNum <= 91) {trainerChosen = 'mateo'; attrToTrain = 'lck'}
    if (rndNum > 91 && rndNum <= 100) {trainerChosen = 'christobel'; attrToTrain = 'chr'; extraAttr = 'str'}

    trainCost = rndInt(20, 30) + playerChar.totalAttr[attrToTrain] - playerChar.totalAttr.chr
    // Check for double training
    if (extraAttr) {attrToTrainText = `${attrToTrain} & ${extraAttr}`.toUpperCase(); trainCost = Math.round(trainCost *= 1.5)}
    if (!extraAttr) attrToTrainText = attrToTrain.toUpperCase()

    

    eventDiv.innerHTML = ''
    //update bg
    //updateEventBg('trainer')

    const maxH = 80
    const charHeight = 180
    const spriteH = (charHeight / 200) * maxH
    // disable button to click YES if not enough gold
    let disableYesBtn = `disabled`
    if (playerChar.gold >= trainCost) disableYesBtn = ''
    
    eventDiv.innerHTML += `<p class="window-header">TRAINER</p>`
    eventDiv.innerHTML += `
        <div class="event-sprite-img-container">
            <img class="event-sprite-img" style="height:${spriteH}%" src="img/events/trainer/trainer_${trainerChosen}.png">
        </div>`

    eventText.innerHTML = `
        <hr>
        <p class="event-text-row">You found a trainer!</p><hr>
        <br>
        <p id="event-text-row">${trainerChosen.toUpperCase()} will help you raise your ${attrToTrainText} attribute(s) by ${trainAmount} for ${trainCost} ${icons.gold} (discounted by ${playerChar.totalAttr.chr}). Do you accept? You have ${playerChar.gold} ${icons.gold}.</p>
        <br>
        <div id="event-btn-container">
            <button class="btn-trainer yes ${disableYesBtn}" onclick="trainerYes()">YES</button><button class="btn-trainer no" onclick="trainerNo()">NO</button>
        </div>`

    endEventBtn.style.display = 'inline-block' // end event btn
}

function trainerYes () {
    if (playerChar.gold < trainCost) {
        console.log('not enough gold')
        return
    }
    playerChar.gold -= trainCost
    playerChar.baseAttr[attrToTrain] += trainAmount
    
    if (extraAttr) {
        playerChar.baseAttr[extraAttr] += trainAmount
    }
    // check if you raised ENDURANCE, which will raise your chars HP, then also raise hpLeft
    if (attrToTrain === 'end') {playerChar.hpLeft += trainAmount*5}
    if (extraAttr === 'end') {playerChar.hpLeft += trainAmount*5}

    eventText.innerHTML = `You paid ${trainCost} ${icons.gold} to raise your ${attrToTrainText} by ${trainAmount}`

    makePlayerCharDiv(playerChar)
    extraAttr = null
}

function trainerNo () {
    eventText.innerHTML = `You decide to leave the trainer.`
}
