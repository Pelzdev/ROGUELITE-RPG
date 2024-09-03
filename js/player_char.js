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
        baseMods: structuredClone(baseMods), // TESTING
        eq: {
            head: structuredClone(eq.head.wool_cap),
            weapon: structuredClone(eq.weapon.wooden_sword),
            body: structuredClone(eq.body.wool_shirt),
            gloves: structuredClone(eq.gloves.wool_gloves),
            trinket: structuredClone(eq.trinket.rabbits_foot),
            boots: structuredClone(eq.boots.old_boots)
        }
    }
    char.totalMods = getTotalMods(char)
    char.hpMax = 50 + (char.totalMods.end * 5) + char.level * 5
    char.hpLeft = char.hpMax
    char.img = getCharSprite(char)
    char.name = rndFromArr(races[char.race.name].names[char.gender])
    char.lastName = rndFromArr(races[char.race.name].lastNames)
    char.skills = [getStartSkill(char)]
    char.skills[0].level = 1
    char.height = char.race.height

    getSkillIcon(char.skills[0])
    return char
}

function makePlayerCharDiv (pc) {
    //updatePlayerBg()
    updateBg(playerSpriteEl)
    // Make sure attributes, hp etc is up-to-date
    pc.totalMods = getTotalMods(pc)
    pc.hpMax = 50 + (pc.totalMods.end * 5) + pc.level * 5

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
// Calculate modstuff
function getTotalMods (char) {
    // first all equipment
    let eqTypeArr = eqTypes
    let arrayOfModObj = []

    for (const item of eqTypeArr) {
        if (char.eq[item]) arrayOfModObj.push(char.eq[item].mods)
    }

    arrayOfModObj.push(char.baseMods, char.race.mods, char.job.mods, char.trait.mods)
    return multiAddMod(arrayOfModObj)
}

function multiAddMod (objArr) {
    let modArr = Object.keys(baseMods)
    let allMods = {}

    for (const item of modArr) {
        allMods[item] = 0
        allMods[item] += addMod(item, objArr)
    }

    return allMods
}

function addMod (mod, objArr) {
    let totalValue = 0
    for (const key of Object.keys(objArr)) {
        if (objArr[key][mod]) totalValue += objArr[key][mod]
    }
    return totalValue
}
// Item creation
function getItem(type, rarity) {
    let rndNum = rndInt(0,100)
    if (rndNum < 40) {}
        
}