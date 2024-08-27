let getPlayerCharBtn = document.getElementById('get-player-char-btn')
let reRandomizeCharBtn = document.getElementById('re-randomize-char-btn')
let eventStartBtn = document.getElementById('event-start-btn')

let playerEqEl = document.getElementById('player-eq')

let playerCharEl = document.getElementById('player-char')

let eventDiv = document.querySelector('.event-div')
let eventHeader = document.getElementById('event-header')

let eventTextContainer = document.getElementById('event-text-container')
let eventText = document.getElementById('event-text')
let endEventBtn = document.getElementById('event-end-btn') 

// #######################################
let sizeMulti = 1.3 // for char and enemy sprites
let hpPerLvlUp = 5
let playerChar = {}
let currentGameMode = ''

function getPlayerChar () {
    playerCharEl.style.display = 'inline-block'
    playerChar = getChar('human')
    makePlayerCharDiv(playerChar)
    eventStartBtn.style.display = 'inline'
    getPlayerCharBtn.style.display = 'none'
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

function updateHp (char) {
    if (char.hpLeft > char.hpMax) char.hpLeft = char.hpMax
    if (char.hpLeft < 0) char.hpLeft = 0

    let hpBar, hpText
    if (char.isPlayer === true) {
        hpBar = document.querySelector('.pc-hpbar-over')
        hpText = document.querySelector('#pc-hp-text')
    } else {
        hpBar = document.querySelector('.enemy-hpbar-over')
        hpText = document.querySelector('#enemy-hp-text')
    }

    hpBar.style=`width:${char.hpLeft/char.hpMax*270}px`
    hpText.innerHTML = `${char.hpLeft}/${char.hpMax} HP`
}