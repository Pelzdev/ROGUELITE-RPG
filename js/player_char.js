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
    }
    char.totalAttr = multiAddAttr( [char.baseAttr, char.race.bonusAttr, char.job.bonusAttr, char.trait.bonusAttr] )
    char.img = getCharSprite(char)
    console.log(char.img)
    char.name = rndFromArr(races[char.race.name].names[char.gender])
    char.lastName = rndFromArr(races[char.race.name].lastNames)
    char.skills = [structuredClone(skills[char.job.startSkill])]
    char.height = char.race.height

    return char
}

function makePlayerCharDiv (pc) {
    pc.totalAttr = multiAddAttr( [pc.baseAttr, pc.race.bonusAttr, pc.job.bonusAttr, pc.trait.bonusAttr] )
    let statBarPercentMulti = 5 // aka 1 point = 5% of bar filled
    let foodImg0 = ''
    let foodImg1 = ''
    if (pc.food[0]) {
        foodImg0 =  `<img src="${pc.food[0].img}" style="height: 32px;">`
    } else {foodImg1 = ''}
    if (pc.food[1]) {
        foodImg1 =  `<img src="${pc.food[1].img}" style="height: 32px;">`
    } else {foodImg1 = ''}

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
        <p class="pc-info-line name">${pc.name.toUpperCase()} ${pc.lastName.toUpperCase()}</p>
        <p class="pc-info-line trait">${pc.trait.name.toUpperCase()} ${pc.race.name.toUpperCase()} ${genderSymbol[pc.gender]}</p>
        <p class="pc-info-line joblvl">lvl ${pc.level} ${pc.job.name.toUpperCase()}</p>
        <hr>
        <div class="pc-info-stats">
            STR: ${checkAddZero(pc.totalAttr.str)} <div class="pc-statbar-under"> <div class="pc-statbar-over" style="width:${pc.totalAttr.str*statBarPercentMulti}%;"></div> </div> <br>
            AGI: ${checkAddZero(pc.totalAttr.agi)} <div class="pc-statbar-under"> <div class="pc-statbar-over" style="width:${pc.totalAttr.agi*statBarPercentMulti}%;"></div> </div> <br>
            INT: ${checkAddZero(pc.totalAttr.int)} <div class="pc-statbar-under"> <div class="pc-statbar-over" style="width:${pc.totalAttr.int*statBarPercentMulti}%;"></div> </div> <br>
            CHR: ${checkAddZero(pc.totalAttr.chr)} <div class="pc-statbar-under"> <div class="pc-statbar-over" style="width:${pc.totalAttr.chr*statBarPercentMulti}%;"></div> </div> <br>
            LCK: ${checkAddZero(pc.totalAttr.lck)} <div class="pc-statbar-under"> <div class="pc-statbar-over" style="width:${pc.totalAttr.lck*statBarPercentMulti}%;"></div> </div>
        </div>
        <hr>
        <p class="pc-eq-line gold">GOLD:${pc.gold}</p>
        <div class="consumable-container">
            <div class="consumable-img-container food0" onclick="clickConsumable(0)">${foodImg0}</div>
            <div class="consumable-img-container food1" onclick="clickConsumable(1)">${foodImg1}</div>
        </div>
        <div class="consumable-info" style="border: 1px solid gray; display:none;"></div>
    `

    playerSpriteEl.innerHTML = spriteHtml
    playerCharInfoEl.innerHTML = html

    return
}

function clickConsumable (arrPos) {
    if (!playerChar.food) return
    document.getElementById('button-bar').classList.add('unclickable')

    popupDiv.innerHTML = `
        <h3>${playerChar.food[arrPos].name}</h3>
        <img class="popup-div-img" src="${playerChar.food[arrPos].img}">
        <p>${playerChar.food[arrPos].infoText}</p>
        <hr>
        <p>Use it?</p><br>
        <button class="btn-medium" onclick="useConsumable('yes', ${arrPos})">Yes</button><button class="btn-medium" onclick="useConsumable('no')">No</button>
    ` 
    popupDiv.style.display = 'block'
    centerPopup(popupDiv)
    //' top: calc(50% - 150px);
    //left: calc(50% - 150px);
}

function useConsumable (answer, arrPos) {
    let arrInt = parseInt(arrPos)
    if (answer === 'no') {
        
    }
    if (answer === 'yes') {
        let givesBonusTo = playerChar.food[arrInt].givesBonusTo
        let amount = playerChar.food[arrInt].amount
        playerChar[givesBonusTo] += amount
        playerChar.food[arrInt] = null,
        document.querySelector(`.consumable-img-container.food${arrPos}`).innerHTML = ''
        updateHp(playerChar)
    }
    document.getElementById('button-bar').classList.remove('unclickable')
    popupDiv.style.display = 'none'
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
