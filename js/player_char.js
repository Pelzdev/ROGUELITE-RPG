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
