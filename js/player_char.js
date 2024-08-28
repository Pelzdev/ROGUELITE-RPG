function getChar (race, job, gender) {
    let char = {
        isPlayer: true,
        hpMax: 100, 
        hpLeft: 100,
        exp: 0, 
        expToLvl: 40, 
        gold: 5,
        food: [food.small_potion],
        status: '',
        race: rndGetPropertyCloned(races),
        job: rndGetPropertyCloned(jobs),
        trait: rndGetPropertyCloned(traits),
        gender: rndFromArr(['male', 'female']),
        level: 1,
        baseAttr: structuredClone(baseAttr),
        buff: false,
        eq: {weapon: structuredClone(eq.weapons.wooden_sword), armor: null, trinket: structuredClone(eq.trinkets.rabbits_foot)}
    }
    char.totalAttr = updateCharTotalAttr(char)
    char.img = getCharSprite(char)
    console.log(char.totalAttr)
    char.name = rndFromArr(races[char.race.name].names[char.gender])
    char.lastName = rndFromArr(races[char.race.name].lastNames)
    char.skills = [structuredClone(skills[char.job.startSkill])]
    char.height = char.race.height

    return char
}

function makePlayerCharDiv (pc) {
    pc.totalAttr = updateCharTotalAttr(pc)
    let statBarPercentMulti = 2 // aka 1 point = 5% of bar filled

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

    let eqTextWeapon = '-'
    let eqTextArmor = '-'
    let eqTextTrinket = '-'
    let weaponImg = ''
    let trinketImg = ''

    if (pc.eq.weapon) {eqTextWeapon = pc.eq.weapon.name.toUpperCase(); trinketImg = pc.eq.weapon.img}
    if (pc.eq.armor) eqTextArmor = pc.eq.armor.name.toUpperCase()
    if (pc.eq.trinket) {eqTextTrinket = pc.eq.trinket.name.toUpperCase(); trinketImg = pc.eq.trinket.img}

    

    const maxH = 85
    const spriteH = (pc.height / 200) * maxH

    let spriteHtml = `
        <div id="pc-img-container">
            <img class="sprite-${pc.race.name}" style="height:${spriteH}%" src="${pc.img}">
        </div>
        <hr>
        <div class="hp-bar-under pc-hpbar-under"><div class="hp-bar-over pc-hpbar-over" style="width:${pc.hpLeft/pc.hpMax*100}%"></div><p id="pc-hp-text">${pc.hpLeft}/${pc.hpMax} HP<p></div>
        <div class="pc-expbar-under"><div class="pc-expbar-over" style="width:${pc.exp/pc.expToLvl*100}%"></div><p id="pc-exp-text">${pc.exp}/${pc.expToLvl} XP<p></div>
    `
    let html = `
        <p class="window-header">PLAYER</p>
        <hr>
        <div class="player-info-section section-1">
            <p class="pc-info-line name">${pc.name.toUpperCase()} ${pc.lastName.toUpperCase()}</p>
            <p class="pc-info-line trait">${pc.trait.name.toUpperCase()} ${pc.race.name.toUpperCase()} ${genderSymbol[pc.gender]}</p>
            <p class="pc-info-line joblvl">lvl ${pc.level} ${pc.job.name.toUpperCase()}</p>
            <br>
            <hr>
            <div class="pc-attr-container">
                STR: ${checkAddZero(pc.totalAttr.str)} <div class="pc-statbar-under"> <div class="pc-statbar-over" style="width:${pc.totalAttr.str*statBarPercentMulti}%;"></div> </div> <br>
                AGI: ${checkAddZero(pc.totalAttr.agi)} <div class="pc-statbar-under"> <div class="pc-statbar-over" style="width:${pc.totalAttr.agi*statBarPercentMulti}%;"></div> </div> <br>
                INT: ${checkAddZero(pc.totalAttr.int)} <div class="pc-statbar-under"> <div class="pc-statbar-over" style="width:${pc.totalAttr.int*statBarPercentMulti}%;"></div> </div> <br>
                CHR: ${checkAddZero(pc.totalAttr.chr)} <div class="pc-statbar-under"> <div class="pc-statbar-over" style="width:${pc.totalAttr.chr*statBarPercentMulti}%;"></div> </div> <br>
                LCK: ${checkAddZero(pc.totalAttr.lck)} <div class="pc-statbar-under"> <div class="pc-statbar-over" style="width:${pc.totalAttr.lck*statBarPercentMulti}%;"></div> </div>
            </div>
            <br>
            <hr>
            <p class="pc-info-line gold">GOLD: ${pc.gold}</p>
            <p class="pc-info-line buff">BUFF: ${buffText}</p>
            <br>
            <hr>
            <div class="consumable-container">
                <div class="consumable-img-container food0" onclick="clickConsumable(0)">${foodImg0}</div>
                <div class="consumable-img-container food1" onclick="clickConsumable(1)">${foodImg1}</div>
                <div class="consumable-img-container food2" onclick="clickConsumable(2)">${foodImg2}</div>
            </div>
        </div>
        <div class="player-info-section section-2">
            <p class="pc-info-line skill-1">Skill 1: ${pc.skills[0].name.toUpperCase()}</p>
            <p class="pc-info-line skill-2">Skill 2: -</p>
            <hr>
            <p class="pc-info-line weapon">Weapon: ${eqTextWeapon} <img src="${weaponImg}" style="vertical-align: bottom;transform:rotate(45deg);height:16px;"></p>
            <p class="pc-info-line armor">Armor: ${eqTextArmor}</p>
            <p class="pc-info-line trinket">Trinket: ${eqTextTrinket} <img src="${trinketImg}" style="vertical-align: bottom;transform:rotate(45deg);height: 16px;"></p>
        </div>
        
    `

    playerSpriteEl.innerHTML = spriteHtml
    playerCharInfoEl.innerHTML = html

    return
}
// Clicking the consumable
function clickConsumable (arrPos) {
    if (!playerChar.food) return
    document.getElementById('button-bar').classList.add('unclickable')

    popupDiv.innerHTML = `
        <br>
        <p style="font-size: 12px;">${playerChar.food[arrPos].name.toUpperCase()}</p>
        <img class="popup-div-img" src="${playerChar.food[arrPos].img}">
        <p>${playerChar.food[arrPos].infoText}</p>
        <br>
        <hr>
        <br>
        <p>Use it?</p>
        <br>
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
    document.getElementById('button-bar').classList.remove('unclickable')
    popupDiv.style.display = 'none'
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

function getCharSprite (char) {
    let numOfAvailebleSprites = numOfCharSprites[char.race.name][char.job.name][char.gender]
    let imgNum = rndInt(0, numOfAvailebleSprites-1)
    //let img = `<img class="sprite-${char.race.name}" style="height:${spriteH}%" src="img/chars/${char.race.name}/${char.job.name}/${char.gender}/${imgNum}.png">`
    return `img/chars/${char.race.name}/${char.job.name}/${char.gender}/${imgNum}.png`
}

function checkAddZero (stat) {
    let numberShown = stat
    if (stat < 10) {
        numberShown = `0${stat}`
    }
    return numberShown
}

function updateCharTotalAttr (char) {
    let arrayOfAttrObj = []
    if (char.eq.weapon) arrayOfAttrObj.push(char.eq.weapon.bonusAttr)
    if (char.eq.armor) arrayOfAttrObj.push(char.eq.armor.bonusAttr)
    if (char.eq.trinket) arrayOfAttrObj.push(char.eq.trinket.bonusAttr)
       
    arrayOfAttrObj.push(char.baseAttr, char.race.bonusAttr, char.job.bonusAttr, char.trait.bonusAttr)
    return multiAddAttr(arrayOfAttrObj)
}

// Use the addAttr function for all attributes given an array of objects containing attributes
function multiAddAttr (objArr, specificAttr) {
    let attrArr = specificAttr || ['str', 'int', 'agi', 'chr', 'lck']
    let totalAttr = {str: 0, int: 0, agi: 0, chr: 0, lck: 0}

    for (let i = 0; i < attrArr.length; i++) {
        totalAttr[attrArr[i]] += addAttr(attrArr[i], objArr)
    }

    return totalAttr
}
