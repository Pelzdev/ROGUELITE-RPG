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
        job: rndGetPropertyCloned(jobs),
        trait: rndGetPropertyCloned(traits),
        gender: rndFromArr(['male', 'female']),
        level: 1,
        baseAttr: structuredClone(baseAttr),
        baseRes: structuredClone(baseRes),
        eq: {
            head: structuredClone(eq.head.wool_cap),
            weapon: structuredClone(eq.weapon.wooden_sword),
            body: structuredClone(eq.body.wool_shirt),
            gloves: structuredClone(eq.gloves.wool_gloves),
            trinket: structuredClone(eq.trinket.rabbits_foot),
            boots: structuredClone(eq.boots.old_boots)
        }
    }
    char.totalAttr = getCharTotalAttr(char)
    char.hpMax = 50 + (char.totalAttr.end * 5) + char.level * 5
    char.hpLeft = char.hpMax
    char.totalRes = getCharTotalRes(char)
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
    pc.totalAttr = getCharTotalAttr(pc)
    pc.hpMax = 50 + (pc.totalAttr.end * 5) + pc.level * 5

    const maxH = 85
    const spriteH = (pc.height / 200) * maxH

    // change stuff inside player image container ('.player-sprite')
    let sprite = document.querySelector('.sprite')
    sprite.src =`${pc.img}`
    sprite.style.height = `${spriteH}%`
    document.querySelector('.pc-hpbar-over').style.width = `${pc.hpLeft/pc.hpMax*100}%` 
    document.getElementById('pc-hp-text').textContent = `${pc.hpLeft}/${pc.hpMax} HP` 
    document.querySelector('.pc-expbar-over').style.width = `${pc.exp/pc.expToLvl*100}%`
    document.getElementById('pc-exp-text').textContent = `${pc.exp}/${pc.expToLvl} XP`
    
    makePlayerInfo(pc)

    return
}

function closePopup () {
    document.querySelector('.popup-graphic').textContent = null
    document.querySelector('.popup-text').textContent = null
    popupDiv.style.display = 'none'
    document.getElementById('button-bar').classList.remove('unclickable')
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
// Multi add together objects of attribute property:value
function getCharTotalAttr (char) {
    let eqTypeArr = eqTypes
    let arrayOfAttrObj = []
    eqTypeArr.forEach((item) => {
        if (char.eq[item]) arrayOfAttrObj.push(char.eq[item].bonusAttr)
    });
       
    arrayOfAttrObj.push(char.baseAttr, char.race.bonusAttr, char.job.bonusAttr, char.trait.bonusAttr)
    return multiAddAttr(arrayOfAttrObj)
}
// Use the addAttr function for all attributes given an array of objects containing attributes
function multiAddAttr (objArr) {
    let attrArr = Object.keys(baseAttr)
    //let attrArr = ['end', 'str', 'int', 'agi', 'dex', 'chr', 'lck']
    let totalAttr = {end: 0, str: 0, int: 0, agi: 0, dex: 0, chr: 0, lck: 0}

    attrArr.forEach((item) => {
        totalAttr[item] += addAttr(item, objArr)
    }); 

    return totalAttr
}
// Add together the attributes with the same name for an array of objects containing attributes
function addAttr(attr, objArr) {
    let totalAttr = 0

    for (const property in objArr) {
        if (attr in objArr[property]) {
            totalAttr += objArr[property][attr]
        }
    }

    return totalAttr
}
// Multi add together objects of resistance property:value
function getCharTotalRes(char) {
    let eqTypeArr = eqTypes
    
    let arrayOfAttrObj = []
    eqTypeArr.forEach((item) => {
        if (char.eq[item]) arrayOfAttrObj.push(char.eq[item].bonusRes)
    });
       
    arrayOfAttrObj.push(char.baseRes, char.race.bonusRes, char.job.bonusRes, char.trait.bonusRes)
    return multiAddRes(arrayOfAttrObj)
}

function multiAddRes (objArr) {
    let resArr = Object.keys(baseRes)
    let totalRes = {cold: 0, electric: 0, fire: 0, holy: 0, nature: 0, physical: 0, poison: 0, water: 0}

    resArr.forEach((item) => {
        totalRes[item] += addAttr(item, objArr)
    }); 

    return totalRes
}

function addRes (res, objArr) {
    let totalRes = 0
    for (const property in objArr) {
        if (res in objArr[property]) {
            totalRes += objArr[property][res]
        }
    }
    return totalRes
}


