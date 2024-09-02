function makePlayerInfo (pc) {
    let buffText = '-'
    if (pc.buff) buffText = pc.buff.type

    document.querySelector('.pc-info-line.name').textContent = `${pc.name.toUpperCase()} ${pc.lastName.toUpperCase()}`
    document.querySelector('.pc-info-line.trait').textContent = `${pc.trait.name.toUpperCase()} ${pc.race.name.toUpperCase()} ${pc.gender.toUpperCase()}`
    document.querySelector('.pc-info-line.joblvl').textContent = `lvl ${pc.level} ${pc.job.name.toUpperCase()}`
    document.querySelector('.pc-info-line.atk').textContent = `${pc.race.dmg}`
    document.querySelector('.pc-info-line.def').textContent = `${pc.race.def}`
    makeAttrEl(pc, document.querySelector('.pc-attr-container'))
    makeResistanceEl(pc, document.querySelector('.res-container'))
    document.querySelector('.pc-info-line.location').textContent = `LOCATION: ${currentLocationName}`
    document.querySelector('.pc-info-line.gold').textContent = `${pc.gold}`
    document.querySelector('.pc-info-line.buff').textContent = `BUFF: ${buffText}`
    document.getElementById('pc-skill1-clickable').textContent = `${pc.skills[0].name.toUpperCase()}`
    makeEqElement(pc)
    
    if (pc.food[0]) {
        document.querySelector('.food-img-0').src = `${pc.food[0].img}`
    } else  { 
        document.querySelector('.food-img-0').src = ''
    }
    if (pc.food[1]) {
        document.querySelector('.food-img-1').src = `${pc.food[1].img}` || ''
    } else  { 
        document.querySelector('.food-img-1').src = ''
    }if (pc.food[2]) {
        document.querySelector('.food-img-2').src = `${pc.food[2].img}`
    } else  { 
        document.querySelector('.food-img-2').src = ''
    }
}

function makeAttrEl (pc, parentEl) {
    parentEl.innerHTML = ''
    const statBarPercentMulti = 2 // aka 1 point = 5% of bar filled
    let attrTypes = ['end', 'str', 'agi', 'dex', 'int', 'chr', 'lck']

    attrTypes.forEach((item) => {
        let attrText = createNode('p', { textContent: `${pc.totalAttr[item]}`, style: {display: 'inline-block'} })
        let attrIcon = createNode('i', { className: `icon-${item}`} )
        let statBarUnder = createNode('div', {className: 'pc-statbar-under'})
        let statBarOver = createNode('div', {className: 'pc-statbar-over', style: {width: `${pc.totalAttr[item]*statBarPercentMulti}%`}})
        statBarUnder.appendChild(statBarOver)

        let attrInfoLine = createNode('div', {className: 'attr-info-line'})
        attrInfoLine.append(attrIcon, attrText, statBarUnder)
        if (pc.totalAttr[item] < 10) {
            let addZero = createNode('p', { textContent: '0', style: { color: 'rgba(255,255,255,0.3)', display: 'inline-block' } })
            attrInfoLine.append(addZero)
        }
        attrInfoLine.append(attrText, statBarUnder)
        parentEl.append(attrInfoLine)
    });
}

function makeResistanceEl (pc, parentEl) {
    parentEl.innerHTML = ''
    let resTypes = ['physical', 'fire', 'cold', 'electric', 'water', 'nature', 'poison', 'holy']

    resTypes.forEach((item) => {
        let resIcon = createNode('i', {className: `icon-${item}`})
        let resDiv = createNode('div', {textContent: `${pc.totalRes[item]}%`, style: {display: 'inline-block', width: '49%'}})
        resDiv.prepend(resIcon)
        parentEl.append(resDiv)
    }); 
}

function makeEqElement (pc) {
    let eqDiv = document.querySelector('.pc-eq-info')
    eqDiv.innerHTML = ''
    let eqTypes = ['head', 'weapon', 'body', 'gloves', 'trinket', 'boots']

    eqTypes.forEach((item) => {
        if (pc.eq[item]) {
            lineDiv = createNode('div', {className: `eq-info-line ${item} clickable`, onclick: `clickEq('${item}')`})
            let icon = createNode('i', {className: `icon-${item}`})
            let text = createNode('span', {textContent: `${pc.eq[item].name}`})
            lineDiv.append(icon, text)
        } else {
            let lineDiv = createNode('div', {className: `pc-info-line ${item}`})
            let icon = createNode('i', {className: `icon-${item}`})
            lineDiv.append(icon)
        }
        eqDiv.append(lineDiv)
    });
}

function clickEq (eqClicked) {
    let item = playerChar.eq[eqClicked]

    document.querySelector('.popup-graphic').innerHTML = ''
    document.querySelector('.popup-text').innerHTML = ''
    document.getElementById('button-bar').classList.add('unclickable')
  
    popupDiv.style.display = 'block'
    centerPopup(popupDiv)
    // HEADER
    document.querySelector('.popup-header').textContent = item.name
    // GRAPHIC / ICON
    let graphic = createNode( 'i', { className: `icon-${item.icon}`, style: {fontSize: '24px'} } )
    document.querySelector('.popup-graphic').append(graphic)

    let textDiv = document.querySelector('.popup-text')
    textDiv.append( makeParagraph(`Type: ${item.type}`))
    textDiv.append( makeParagraph(`Rarity: ${item.rarity}`))

    if (item.dmg > 0) textDiv.append( createNode('p', {textContent: `dmg: ${item.dmg}`}) )
    if (item.def > 0) textDiv.append( createNode('p', {textContent: `dmg: ${item.def}`}) )

    let btn = createNode('button', { className: 'btn-medium',textContent: 'OK', onclick: 'closePopup()' })
    textDiv.append(btn)
}

// CLICKING skills etc on char screen
function clickSkill (arrPos) {
    document.querySelector('.popup-graphic').innerHTML = ''
    document.querySelector('.popup-text').innerHTML = ''

    let skill = playerChar.skills[arrPos]
    let dmgOrHealText = 'Damage'
    if (skill.type === 'heal') dmgOrHealText = 'Heal'
    let effectText = '-'
    if (skill.effect) effectText = `${skill.effectChance}% chance to ${skill.effect.toUpperCase()}`
    let boostedText = ''
    if (skill.type === 'damage' || skill.type === 'heal') {
        boostedText = `<p>${skill.type.toUpperCase()} boosted by ${icons[skill.attribute]} ${skill.attribute.toUpperCase()}</p>`
    }

    document.getElementById('button-bar').classList.add('unclickable')

    popupDiv.style.display = 'block'
    centerPopup(popupDiv)
    
    document.querySelector('.popup-header').textContent = skill.name
    let graphic = createNode('i', {className: `icon-${skill.attribute}`, style: {fontSize: '24px'}})
    document.querySelector('.popup-graphic').append(graphic)

    let textDiv = document.querySelector('.popup-text')
    textDiv.append( createNode('p', {textContent: `Type: ${skill.type}`}) ) 
    textDiv.append( createNode('p', {textContent: `Chance to use: ${skill.chance}%`}) )
    textDiv.append( createNode('p', {textContent: `${dmgOrHealText}: ${skill.power || '-'}`}) )
    textDiv.append( createNode('p', {textContent: `Crit: ${skill.critChance}`}) )
    textDiv.append( createNode('p', {textContent: `Extra effect: ${effectText}`}) )
    if (skill.type === 'damage' || skill.type === 'heal') {
        let text = `${skill.type.toUpperCase()} boosted by ${skill.attribute.toUpperCase()}`
        textDiv.append(makeParagraph(text))
    }
    let btn = createNode('button', {className: 'btn-medium',textContent: 'OK', onclick: 'closePopup()'})
    textDiv.append(btn)
}

// CONSUMABLE STUFF
// Clicking the consumable
function clickConsumable (arrPos) {
    if (!playerChar.food[arrPos]) return
    document.querySelector('.popup-graphic').innerHTML = ''
    document.querySelector('.popup-text').innerHTML = ''
    document.getElementById('button-bar').classList.add('unclickable')
    
    popupDiv.style.display = 'block'
    centerPopup(popupDiv)

    document.querySelector('.popup-header').textContent = playerChar.food[arrPos].name
    
    let graphic = createNode('img', { src: playerChar.food[arrPos].img, style:{width: '24px'} })

    let textDiv = document.querySelector('.popup-text')
    textDiv.append(graphic, makeParagraph(playerChar.food[arrPos].infoText))

    let btnYes = createNode('button', { className: 'btn-medium', textContent: 'YES', onclick: `consumableChoice('yes', ${arrPos})` })
    let btnNo = createNode('button', { className: 'btn-medium', textContent: 'NO', onclick: `consumableChoice('no', ${arrPos})` })
    textDiv.append(btnYes, btnNo)

}
// Choosing whether or not to use consumable/food
function consumableChoice (answer, arrPos) {
    let arrInt = parseInt(arrPos)
    if (answer === 'no') {
        
    }
    if (answer === 'yes') {
        useConsumable(arrInt) 
    }
    closePopup()
}
// Using the consumable
function useConsumable (arrPos) {
    let gives = playerChar.food[arrPos].gives
    let type = playerChar.food[arrPos].type
    let amount = playerChar.food[arrPos].amount
    
    if (type === 'heal') {
        playerChar[gives] += amount
        updateHp(playerChar)
    }
    if (gives === 'buff_drunk') {
        playerChar.buff = {type: 'drunk', timeLeft: 3}
        makePlayerCharDiv(playerChar)
    }

    playerChar.food[arrPos] = null,
    document.querySelector(`.food-img-${arrPos}`).src = ''
}
