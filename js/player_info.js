function makePlayerInfo (pc) {
    let buffText = '-'
    if (pc.buff) buffText = pc.buff.type

    let foodImg0 = ''
    let foodImg1 = ''
    let foodImg2 = ''
    if (pc.food[0]) {
        foodImg0 =  `<img src="${pc.food[0].img}" style="height: 32px;">`
    } else {foodImg1 = ''}
    if (pc.food[1]) {
        foodImg1 =  `<img src="${pc.food[1].img}" style="height: 32px;">`
    } else {foodImg1 = ''}
    if (pc.food[2]) {
        foodImg2 =  `<img src="${pc.food[2].img}" style="height: 32px;">`
    } else {foodImg2 = ''}


    const maxH = 85

    let infoText1 = `
        <div class="player-info-section-1">
            <p class="pc-info-line name">${pc.name.toUpperCase()} ${pc.lastName.toUpperCase()}</p>
            <p class="pc-info-line trait">${pc.trait.name.toUpperCase()} ${pc.race.name.toUpperCase()} ${genderSymbol[pc.gender]}</p>
            <p class="pc-info-line joblvl">lvl ${pc.level} ${pc.job.name.toUpperCase()}</p>
            <p class="pc-info-line atkdef">${icons.weapon} ${pc.race.dmg} ${icons.shield} ${pc.race.def}</p>
            <hr>
            <div class="pc-attr-stats-container">
                <div class="pc-attr-container" style="width:62%;">
                    ${makeAttrEl(pc)}
                </div>
                <div class="res-container">
                    <p>Resists:</p>
                    ${makeResistanceEl(pc)}
                </div>
            </div>
            <hr>
            <p class="pc-info-line location">LOCATION: ${currentLocationName}</p>
            <p class="pc-info-line gold">${icons.gold} ${pc.gold}</p>
            <p class="pc-info-line buff">BUFF: ${buffText}</p>
            <hr>
        </div>`
    let infoText2 = `
        <div class="player-info-section-2">
            <p class="pc-info-line skill-1">Skill 1: <span class="clickable" onclick="clickSkill(0)">${icons[pc.skills[0].attribute]} ${pc.skills[0].name.toUpperCase()}</span></p>
            <p class="pc-info-line skill-2">Skill 2: -</p>
            <hr>
            ${makeEqElement(pc)}
            <hr>
            <div class="consumable-container">
                <div class="consumable-img-container food0" onclick="clickConsumable(0)">${foodImg0}</div>
                <div class="consumable-img-container food1" onclick="clickConsumable(1)">${foodImg1}</div>
                <div class="consumable-img-container food2" onclick="clickConsumable(2)">${foodImg2}</div>
            </div>
        </div>`

    playerCharInfoEl1.innerHTML = infoText1
    playerCharInfoEl2.innerHTML = infoText2

    return
}

function makeAttrEl (pc) {
    const statBarPercentMulti = 2 // aka 1 point = 5% of bar filled
    let attrHTML = ''
    let attrTypes = ['end', 'str', 'agi', 'dex', 'int', 'chr', 'lck']

    attrTypes.forEach((item) => {
        attrHTML += `${icons[item]} ${item.toUpperCase()} ${checkAddZero(pc.totalAttr[item])} <div class="pc-statbar-under"><div class="pc-statbar-over" style="width:${pc.totalAttr[item]*statBarPercentMulti}%;"></div></div><br>`
    });

    return attrHTML
}

function makeResistanceEl (pc) {
    let resHTML = ''
    let resTypes = ['physical', 'fire', 'cold', 'electric', 'water', 'nature', 'poison', 'holy']

    let index = 1
    resTypes.forEach((item) => {
        if (index % 2 !== 0)  resHTML += `<p>`
        resHTML +=`${icons[item]}${pc.totalRes[item]}%`
        if (index % 2 === 0)  resHTML +=`</p>`
        index++
    });
    if (index % 2 !== 0) resHTML += '</p>'
    return resHTML
}

function makeEqElement (pc) {
    let eqHTML = ''
    let eqTypes = ['head', 'weapon', 'body', 'gloves', 'trinket', 'boots']

    eqTypes.forEach((item) => {
        if (pc.eq[item]) {
            eqHTML += `<p class="pc-info-line head">${item.toUpperCase()}: <span class="clickable" onclick="clickEq('${item}')">${icons[item]} ${pc.eq[item].name.toUpperCase()}</span></p>`
        } else {
            eqHTML += `<p class="pc-info-line head">Head: </p>`
        }
    });

    return eqHTML
}

function clickEq (eqClicked) {
    console.log(eqClicked)
    document.getElementById('button-bar').classList.add('unclickable')
    popupDiv.innerHTML = `
        <br>
        <p style="font-size: 12px;">${playerChar.eq[eqClicked].name.toUpperCase()}</p>
        <br>
        <p style="font-size:24px;"><i class="icon-${playerChar.eq[eqClicked].icon}"></i></p>
        <br>
        <p>Type: ${playerChar.eq[eqClicked].type.toUpperCase()}</p>
        <br><hr>
        <br>
        <p>Rarity: COMMON</p>
        <br><hr><br><br>
        <button class="btn-medium" onclick="closePopup()">BACK</button>
    ` 
    popupDiv.style.display = 'block'
    centerPopup(popupDiv)
}

// CONSUMABLE STUFF
// Clicking the consumable
function clickConsumable (arrPos) {
    if (!playerChar.food[arrPos]) return
    document.getElementById('button-bar').classList.add('unclickable')
    popupDiv.innerHTML = `
        <br>
        <p style="font-size: 12px;">${playerChar.food[arrPos].name.toUpperCase()}</p>
        <img class="popup-div-img" src="${playerChar.food[arrPos].img}">
        <p>${playerChar.food[arrPos].infoText}</p><br><hr><br>
        <p>Use it?</p><br>
        <button class="btn-medium" onclick="consumableChoice('yes', ${arrPos})">Yes</button><button class="btn-medium" onclick="consumableChoice('no')">No</button>
    ` 
    popupDiv.style.display = 'block'
    centerPopup(popupDiv)
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
    document.querySelector(`.consumable-img-container.food${arrPos}`).innerHTML = ''
}