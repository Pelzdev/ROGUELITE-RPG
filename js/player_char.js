function getChar (race, job, gender) {
    let char = {
        isPlayer: true,
        exp: 0, 
        expToLvl: 40, 
        gold: 5,
        food: [food.small_potion],
        status: '',
        buff: false,
        race: rndGetPropertyCloned(races),
        job: jobs[cheatedJob] || rndGetPropertyCloned(jobs), // cheated job stuff for testing
        trait: rndGetPropertyCloned(traits),
        gender: rndFromArr(['male', 'female']),
        level: 1,
        baseAttr: structuredClone(baseAttr),
        baseRes: structuredClone(baseRes),
        eq: {
            weapon: structuredClone(eq.weapon.wooden_sword), 
            body: structuredClone(eq.body.leather_armor), 
            trinket: structuredClone(eq.trinket.rabbits_foot)}
    }
    char.totalAttr = updateCharTotalAttr(char)
    char.hpMax = 50 + (char.totalAttr.end * 5) + char.level * 5
    char.hpLeft = char.hpMax
    char.totalRes = char.baseRes
    char.img = getCharSprite(char)
    char.name = rndFromArr(races[char.race.name].names[char.gender])
    char.lastName = rndFromArr(races[char.race.name].lastNames)
    char.skills = [getStartSkill(char)]
    char.skills[0].level = 1
    char.height = char.race.height
    char.dmg = char.race.dmg
    char.def = char.race.def

    getSkillIcon(char.skills[0])
    return char
}

function makePlayerCharDiv (pc) {
    //updatePlayerBg()
    updateBg(playerSpriteEl)
    // Make sure attributes, hp etc is up-to-date
    pc.totalAttr = updateCharTotalAttr(pc)
    pc.hpMax = 50 + (pc.totalAttr.end * 5) + pc.level * 5

    makePlayerInfo(pc)

    const maxH = 85
    const spriteH = (pc.height / 200) * maxH


    let spriteHtml = `
        <div id="pc-img-container">
            <img class="sprite-${pc.race.name}" style="height:${spriteH}%" src="${pc.img}">
        </div>
        <div class="pc-hp-expbar-container style="text-align:center">
            <div class="hp-bar-under pc-hpbar-under">
                <div class="hp-bar-over pc-hpbar-over" style="width:${pc.hpLeft/pc.hpMax*100}%"></div>
                <p id="pc-hp-text">${pc.hpLeft}/${pc.hpMax} HP<p>
            </div>
            <div class="pc-expbar-under">
                <div class="pc-expbar-over" style="width:${pc.exp/pc.expToLvl*100}%"></div>
                <p id="pc-exp-text">${pc.exp}/${pc.expToLvl} XP<p>
            </div>
        </div>
    `
    makePlayerInfo(pc)
    playerSpriteEl.innerHTML = spriteHtml
    return
}

// CLICKING skills etc on char screen
function clickSkill (arrPos) {
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
    popupDiv.innerHTML = `
        <br>
        <p style="font-size: 12px;">${skill.name.toUpperCase()}</p>
        <br>
        <p style="font-size:24px;"><i class="icon-${skill.attribute}"></i></p>
        <br>
        <p>Type: ${skill.type.toUpperCase()}</p>
        <br><hr>
        <br>
        <p>Chance to use: ${skill.chance}%</p>
        <p>${dmgOrHealText}: ${skill.power || '-'}</p>
        <p>Crit chance: ${skill.critChance}%</p>
        <br>
        <p>Extra effect: ${effectText}</p>
        ${boostedText}
        <br><hr><br><br>
        <button class="btn-medium" onclick="closePopup()">BACK</button>
    ` 

    popupDiv.style.display = 'block'
    centerPopup(popupDiv)
}

function closePopup () {
    document.getElementById('button-bar').classList.remove('unclickable')
    popupDiv.style.display = 'none'
}

// Choose start skill for char
function getStartSkill (char) {
    let rndSkill = rndFromArr(char.job.startSkills)
    return structuredClone(skills[rndSkill])
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
        numberShown = `<span style="color: rgba(255,255,255,0.2)">0</span>${stat}`
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
    let attrArr = specificAttr || ['end', 'str', 'int', 'agi', 'dex', 'chr', 'lck']
    let totalAttr = {end: 0, str: 0, int: 0, agi: 0, dex: 0, chr: 0, lck: 0}

    for (let i = 0; i < attrArr.length; i++) {
        totalAttr[attrArr[i]] += addAttr(attrArr[i], objArr)
    }

    return totalAttr
}

// Add together the attributes with the same name for an array of objects containing attributes
function addAttr(attr, objArr) {
    let totalAttr = 0
    for (let i = 0; i < objArr.length; i++) {
        if (attr in objArr[i]) {
            totalAttr += objArr[i][attr]
        }
    }

    return totalAttr
}
