import {wiki} from "./wiki.js"
import {rndGetPropertyCloned, rndFromArr, rndInt, removeIndexFromArr} from "./base_functions.js"
import {updateBg} from "./main.js"
import {makePlayerInfo} from "./player_info.js"

export const playerSpriteInfoCard =  document.querySelector('.player-sprite') // Formerly playerSpriteEl
export const playerSpriteContainer = document.getElementById('pc-img-container')
export const playerHpbarOver = document.querySelector('.pc-hpbar-over')
export const playerHpbarText = document.getElementById('pc-hp-text')
export const playerExpbarOver = document.querySelector('.pc-expbar-over')
export const playerExpbarText = document.getElementById('pc-exp-text')

export let playerChar = {}

export function setPlayerChar (char) {
    playerChar = char
}

export function getChar (playerOrEnemy) {
    let char = {
        isPlayer: true,
        exp: 0, 
        expToLvl: 40, 
        gold: 50,
        food: [wiki.food.small_potion],
        status: '',
        buff: false,
        enemiesKilled: 0,
        race: rndGetPropertyCloned(wiki.races),
        job: rndGetPropertyCloned(wiki.jobs),
        trait: rndGetPropertyCloned(wiki.traits),
        gender: rndFromArr(['male', 'female']),
        level: 1,
        baseMods: structuredClone(wiki.baseMods), // TESTING
        eq: {
            head: rndInt(1,2) > 1 ? getItem('head') : '',
            weapon: rndInt(1,2) > 1 ? getItem('weapon') : '',
            body: rndInt(1,2) > 1 ? getItem('body') : '',
            gloves: rndInt(1,2) > 1 ? getItem('gloves') : '',
            trinket: rndInt(1,2) > 1 ? getItem('trinket') : '',
            boots: rndInt(1,2) > 1 ? getItem('boots') : '',
        }
    }
    char.totalMods = getTotalMods(char)
    char.hpMax = 50 + (char.totalMods.end * 5) + char.level * 5
    char.hpLeft = char.hpMax
    char.img = getCharSprite(char)
    char.name = rndFromArr(wiki.races[char.race.name].names[char.gender])
    char.lastName = rndFromArr(wiki.races[char.race.name].lastNames)
    char.skills = [getStartSkill(char)]
    char.skills[0].level = 1
    char.height = char.race.height

    if (playerOrEnemy !== 'enemy') {
        playerChar = char
    }
    if (playerOrEnemy === 'enemy') {
        char.isPlayer = false
        return char
    }
}

export function makePlayerCharDiv () {
    //updatePlayerBg()
    updateBg(playerSpriteInfoCard)
    // Make sure attributes, hp etc is up-to-date
    playerChar.totalMods = getTotalMods(playerChar)
    playerChar.hpMax = 50 + (playerChar.totalMods.end * 5) + playerChar.level * 5
    const maxH = 85
    const spriteH = (playerChar.height / 200) * maxH
    // change stuff inside player image container ('.player-sprite')
    let sprite = document.querySelector('.sprite')
    sprite.src =`${playerChar.img}`
    sprite.style.height = `${spriteH}%`
    playerHpbarOver.style.width = `${playerChar.hpLeft/playerChar.hpMax*100}%` 
    playerHpbarText.textContent = `${playerChar.hpLeft}/${playerChar.hpMax} HP` 
    playerExpbarOver.style.width = `${playerChar.exp/playerChar.expToLvl*100}%`
    playerExpbarText.textContent = `${playerChar.exp}/${playerChar.expToLvl} XP`
    makePlayerInfo(playerChar)

    return
}

// Choose start skill for char
function getStartSkill (char) {
    let rndSkill = rndFromArr(char.job.startSkills)
    return structuredClone(wiki.skills[rndSkill])
}

function getCharSprite (char) {
    let numOfAvailebleSprites = wiki.numOfCharSprites[char.race.name][char.job.name][char.gender]
    let imgNum = rndInt(0, numOfAvailebleSprites-1)
    return `img/chars/${char.race.name}/${char.job.name}/${char.gender}/${imgNum}.png`
}
// Calculate modstuff
export function getTotalMods (char) {
    // first all equipment
    let eqTypeArr = wiki.eqTypes
    let arrayOfModObj = []

    for (const item of eqTypeArr) {
        if (char.eq[item]) arrayOfModObj.push(char.eq[item].mods)
    }

    arrayOfModObj.push(char.baseMods, char.race.mods, char.job.mods, char.trait.mods)
    return multiAddMod(arrayOfModObj)
}

function multiAddMod (objArr) {
    let modArr = Object.keys(wiki.baseMods)
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

// ITEM CREATION/GENERATION
export function getItem(type, rarity) {
    let eqType
    if (type) eqType = type
    else eqType = rndFromArr(wiki.eqTypes) // is it head, body, boots etc?
     
    let itemArr = Object.keys(wiki.eq[eqType]) // array of the different baseitems of the eqType
    let item = structuredClone( wiki.eq[eqType][rndFromArr(itemArr)] )

    if (rarity) item.rarity = rarity
    else item.rarity = rollRarity()

    let numOfMods = 0
    if (item.rarity === 'uncommon') numOfMods = 1
    if (item.rarity === 'magic') numOfMods = 2
    if (item.rarity === 'rare') numOfMods = 4
    if (item.rarity === 'epic') numOfMods = 6

    for (let i = 0; i < numOfMods; i++) {
        getMod(item)
    }

    return item
}

function rollRarity () {
    let rndNum = rndInt(0, 100)
    let rarity = ''

    if (rndNum < 45) {
        rarity = 'common';
    } else if (rndNum < 75) {
        rarity = 'uncommon'
    } else if (rndNum < 90) {
        rarity = 'magic'
    } else if (rndNum < 98) {
        rarity = 'rare'
    } else {
        rarity = 'epic'
    }

    return rarity
}

function getMod (item) {
    item.modTiers = {}
    // Set available mods to random from
    let availableMods = Object.keys(wiki.baseMods)
    // Remove weapon mods from non-weapons
    if (item.type !== 'weapon') {
        removeIndexFromArr('dmg', availableMods)
    }
    // Remove already used mods
    for (const mod of Object.keys(item.mods)) {
        if (mod !== 'dmg') availableMods = removeIndexFromArr(mod, availableMods)
    }
    // Choose mod from available mods (after filtering availableMods)
    let mod = rndFromArr(availableMods)
    // Check tier of mod roll
    let multiplier = 1
    let rndNum = rndInt(1,10)
    if (rndNum >= 6 && rndNum <= 7) {multiplier = 1.33}
    else if (rndNum >= 8 && rndNum <= 9) {multiplier = 1.66}
    else {multiplier = 2}
    
    let roll = rndInt(1,3) * multiplier
    if (mod.includes('Res')) roll = rndInt(1, 10) * multiplier// Resistances can roll differently, will add to rolls later

    item.mods[mod] = Math.round(roll)
}

export function removePlayerStatus () {
    playerChar.status = ''
}

export function decreaseBuffDuration () {
    if (playerChar.buff) {
        playerChar.buff.timeLeft--
        if (playerChar.buff.timeLeft < 1) playerChar.buff = null
    }
}

export function playerCharIsAlive() {
    if (playerChar.hpLeft > 0)
        return true
    else
        return false
}

export function addPlayerHpMax (amount) {
    playerChar.hpMax += amount
    playerChar.hpLeft += amount
    updateHp(playerChar)
}

export function updatePlayerMod (mod, changeAmount) {
    playerChar.baseMods[mod] += changeAmount
}
// Using the consumable
export function useConsumable (consumable, arrPos) {
    let gives = playerChar.food[arrPos].gives // hpLeft, exp etc
    let type = playerChar.food[arrPos].type
    let amount = playerChar.food[arrPos].amount
    
    console.log(`${gives} ${type} ${amount}`)

    if (gives === 'hpLeft') {
        playerChar.hpLeft += amount
        updateHp(playerChar)
    }
    if (gives === 'buff_drunk') {
        playerChar.buff = {type: 'drunk', timeLeft: 3}
        makePlayerCharDiv(playerChar)
    }

    playerChar.food[arrPos] = null,
    document.querySelector(`.food-img-${arrPos}`).src = ''
}

export function updateHp (char, hpChange) {
    if (hpChange) {
        char.hpLeft += hpChange
    }
    
    if (char.hpLeft > char.hpMax) char.hpLeft = char.hpMax
    if (char.hpLeft < 0) char.hpLeft = 0

    let hpBar, hpText
    if (char.isPlayer === true) {
        hpBar = playerHpbarOver
        hpText = playerHpbarText
    } else {
        hpBar = document.querySelector('.enemy-hpbar-over')
        hpText = document.querySelector('#enemy-hp-text')
    }

    hpBar.style=`width:${char.hpLeft/char.hpMax*100}%`
    hpText.textContent = `${char.hpLeft}/${char.hpMax} HP`
}