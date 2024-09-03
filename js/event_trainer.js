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

    trainCost = rndInt(20, 30) + playerChar.totalMods[attrToTrain] - playerChar.totalMods.chr
    // Check for double training
    if (extraAttr) {attrToTrainText = `${attrToTrain} & ${extraAttr}`.toUpperCase(); trainCost = Math.round(trainCost *= 1.5)}
    if (!extraAttr) attrToTrainText = attrToTrain.toUpperCase()

    const maxH = 80
    const charHeight = 180
    const spriteH = (charHeight / 200) * maxH
    // disable button to click YES if not enough gold
    let disableYesBtn = `disabled`
    if (playerChar.gold >= trainCost) disableYesBtn = ''

    endEventBtn.style.display = 'inline-block' // end event btn

    document.querySelector('.event-sprite-img').style.height = `${spriteH}%`
    document.querySelector('.event-sprite-img').src = `img/events/trainer/trainer_${trainerChosen}.png`
    let text = createNode('span', {textContent: `You found a trainer! ${trainerChosen.toUpperCase()} will help you raise your ${attrToTrainText} attribute(s) by ${trainAmount} for ${trainCost} ` })
    let icon = createNode('i', {className: 'icon-gold'})
    let text2 = createNode('span', {textContent: ` (discounted by ${playerChar.totalMods.chr}).`})
    let br = createNode('br', {className: null})
    let text3 = createNode('span', {textContent: ` Do you accept? You have ${playerChar.gold} `})
    let icon2 = createNode('i', {className: 'icon-gold'})
    
    let btnDiv = createNode('div', {className: 'event-btn-div', style: {display: 'inline-block'}})
    let btnYes = createNode('button', {className: `btn-medium ${disableYesBtn}`, textContent: 'YES', onclick: "trainerYes()"})
    let btnNo = createNode('button', {className: 'btn-medium', textContent: 'NO', onclick: "trainerNo()"})
    btnDiv.append(btnYes, btnNo)
    eventText.append(text, icon, text2, br, text3, icon2, btnDiv)
}

function trainerYes () {
    document.querySelector('.event-btn-div').style.display = 'none'
    playerChar.gold -= trainCost
    playerChar.baseAttr[attrToTrain] += trainAmount
    
    if (extraAttr) {
        playerChar.baseAttr[extraAttr] += trainAmount
    }
    // check if you raised ENDURANCE, which will raise your chars HP, then also raise hpLeft
    if (attrToTrain === 'end') {playerChar.hpLeft += trainAmount*5}
    if (extraAttr === 'end') {playerChar.hpLeft += trainAmount*5}

    let br = createNode('br', {className: null})
    let text = createNode('span', {textContent: ` You paid ${trainCost} `})
    let icon = createNode('i', {className:  'icon-gold'})
    let text2 = createNode('span', {textContent: ` to raise your ${attrToTrainText} by ${trainAmount}.` })
    eventText.append(br, text, icon, text2)

    makePlayerCharDiv(playerChar)
    extraAttr = null
}

function trainerNo () {
    document.querySelector('.event-btn-div').style.display = 'none'
    let text = createNode('p', {textContent: 'You decide to leave the trainer.'})
    eventText.append(text)
}
