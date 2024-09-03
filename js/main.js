import {wiki} from "./wiki.js"
import {rndInt, getElementSize} from "./base_functions.js"
import {getChar, makePlayerCharDiv} from "./player_char.js"
import {startEvent, endEvent} from "./event.js"

// ELEMENTS 
export const globalVars = {
    gameDiv: document.getElementById('game'),
    gameStartArea: document.getElementById('game-start-area'), // Start "menu" area
    gameRow1: document.getElementById('game-row-1'), // Area when playing, aka seeing the char, battles events etc
    popupDiv: document.querySelector('.popup-div'),
    // TOP/MAIN BUTTONS
    getPlayerCharBtn: document.getElementById('get-player-char-btn'),
    eventStartBtn: document.getElementById('event-start-btn'),
    // PLAYER
    playerSpriteDiv: document.getElementById('pc-img-container'),
    playerSpriteEl: document.querySelector('.player-sprite'),
    playerCharInfoEl1: document.getElementById('player-char-info1'),
    playerCharInfoEl2: document.getElementById('player-char-info2'),
    // EVENT
    eventDiv: document.querySelector('.event-div'),
    eventHeader: document.getElementById('event-header'),
    eventTextContainer: document.getElementById('event-text-container'),
    eventText: document.getElementById('event-text'),
    endEventBtn: document.getElementById('event-end-btn'),
    // BATTLE
    battleDiv: document.querySelector('.battle-div'),
    gameW: 0, 
    gameH: 0,
    portrait: false,
    landscape: true,
    // CHAR stuff
    sizeMulti: 1.3, // for char and enemy sprites
    hpPerLvlUp: 5,
    playerChar: {},
    currentEvent: '',
    eventsDone: 0,
    // Location (changes BG etc, will add more later)
    currentLocationType: 'woods',
    currentLocationName: 'Wolfroy Grove',
    locationBg: `img/location_bg/woods/${rndInt(0,7)}.png`,
    innBg: 'img/location_bg/woods/bg_inn.png',
}

document.getElementById('get-player-char-btn').addEventListener("click", () => getPlayerChar())
document.getElementById('event-start-btn').addEventListener("click", () => startEvent(globalVars.playerChar))
document.getElementById('event-end-btn').addEventListener("click", () => endEvent())

// ICONS
const icons = {
    gold: '<i class="icon-gold"></i>',
    heart: '<i class="icon-heart"></i>',
    weapon: '<i class="icon-weapon"></i>',
    shield: '<i class="icon-shield"></i>',
    amulet: '<i class="icon-amulet"></i>',
    body: '<i class="icon-body"></i>',
    gloves: '<i class="icon-gloves"></i>',
    head: '<i class="icon-head"></i>',
    ring: '<i class="icon-ring"></i>',
    trinket: '<i class="icon-trinket"></i>',
    boots: '<i class="icon-boots"></i>',
    blood: '<i class="icon-blood"></i>',
    charmed: '<i class="icon-charmed"></i>',
    love: '<i class="icon-love"></i>',
    sleep: '<i class="icon-sleep"></i>',
    stunned: '<i class="icon-stunned"></i>',
    cold: '<i class="icon-cold"></i>',
    electric: '<i class="icon-electric"></i>',
    fire: '<i class="icon-fire"></i>',
    holy: '<i class="icon-holy"></i>',
    nature: '<i class="icon-nature"></i>',
    physical: '<i class="icon-physical"></i>',
    poison: '<i class="icon-poison"></i>',
    water: '<i class="icon-water"></i>',
    chr: '<i class="icon-chr"></i>',
    dex: '<i class="icon-dex"></i>',
    end: '<i class="icon-end"></i>',
    int: '<i class="icon-int"></i>',
    lck: '<i class="icon-lck"></i>',
    str: '<i class="icon-str"></i>',
    agi: '<i class="icon-agi"></i>'
}

// #######################################


function getPlayerChar () {
    globalVars.gameStartArea.style.display = 'none' // Hide game start area
    globalVars.gameRow1.style.display = 'flex' // Show the area for PLAYING aka seeing char, battles etc
    globalVars.playerCharInfoEl1.style.display = 'inline-block'
    globalVars.playerCharInfoEl1.style.display = 'inline-block' // CHECK THIS
    globalVars.playerChar = getChar('human')
    makePlayerCharDiv(globalVars.playerChar)
    globalVars.eventStartBtn.style.display = 'inline'
    globalVars.getPlayerCharBtn.style.display = 'none'
}

export function updateHp (char) {
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

    hpBar.style=`width:${char.hpLeft/char.hpMax*100}%`
    hpText.innerHTML = `${char.hpLeft}/${char.hpMax} HP`
}

export function centerPopup (el) {
    let elW = getElementSize(el, 'width')
    let elH = getElementSize(el, 'height')
    el.style.top = `${0.5*globalVars.gameH - elH/2}px`
    el.style.left = `${0.5*globalVars.gameW - elW/2}px`
    if (!globalVars.portrait) {
        el.style.top = `${0.5*globalVars.gameH - elH/2}px`
        el.style.left = `${0.43*globalVars.gameW - elW/2}px`
    } else {
        el.style.top = `${0.4*globalVars.gameH - elH/2}px`
        el.style.left = `${0.5*globalVars.gameW - elW/2}px`
    }
    
}

export function getSkillIcon (skill) {
    return icons[skill.attribute]
}

export function updateBg (targetDiv, event) {
    let bgUrl = globalVars.locationBg
    if (event === 'inn') bgUrl = globalVars.innBg

    targetDiv.style.background = `url(${bgUrl}) rgba(0, 0, 0, 0.3)`
    targetDiv.style.backgroundBlendMode = 'multiply'
    targetDiv.style.backgroundSize = 'cover'
    targetDiv.style.backgroundPosition = 'center center'
}

export function fadeOutEl(el) {
    el.classList.add('fade-out')
}