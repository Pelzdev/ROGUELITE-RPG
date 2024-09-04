import {wiki} from "./wiki.js"
import {rndInt, getElementSize, gameW, gameH, portrait} from "./base_functions.js"
import {playerChar, getChar, makePlayerCharDiv} from "./player_char.js"
import {startEvent, endEvent} from "./event.js"

// ELEMENTS 
export const gameStartArea = document.getElementById('game-start-area') // Area shown before clicking start, to be added here is overall player stuff like saving, highscore etc
export const gameDiv = document.getElementById('game')
export const gameRow1 = document.getElementById('game-row-1') // Area when playing, aka seeing the char, battles events etc
export const navbarTop = document.getElementById('button-bar')
export const newGameBtn = document.getElementById('new-game-btn') // Formerly getPlayerCharBtn
export const eventStartBtn = document.getElementById('event-start-btn')
export const popupDiv = document.querySelector('.popup-div')
export const popupHeader = document.querySelector('.popup-header')
export const popupGraphic = document.querySelector('.popup-graphic')
export const popupText = document.querySelector('.popup-text')
// ELEMENTS (Player)
export const playerSpriteInfoCard =  document.querySelector('.player-sprite') // Formerly playerSpriteEl
export const playerSpriteContainer = document.getElementById('pc-img-container')
export const playerHpbarOver = document.querySelector('.pc-hpbar-over')
export const playerHpbarText = document.getElementById('pc-hp-text')
export const playerExpbarOver = document.querySelector('.pc-expbar-over')
export const playerExpbarText = document.getElementById('pc-exp-text')
export const playerCharInfoEl1 = document.getElementById('player-char-info1')
export const playerCharInfoEl2 = document.getElementById('player-char-info2')
export const playerEquipmentDiv = document.querySelector('.pc-eq-info')
// ELEMENTS (Event)
export const eventDiv = document.querySelector('.event-div')
export const eventHeader = document.getElementById('event-header')
export const eventTextContainer = document.querySelector('.event-text-container')
export const eventText = document.querySelector('.event-text')
export const endEventBtn = document.getElementById('event-end-btn')
export const eventSprite = document.querySelector('.event-sprite-img') // The image of the char/creature itself
export const enemySpriteContainer = document.getElementById('enemy-img-container')
export const battleDiv = document.querySelector('.battle-div')
export const windowHeaderBattle = document.querySelector('.window-header-battle')
// GAMEPLAY 
export let currentLocationType = 'woods'
export let currentLocationName = 'Wolfroy Grove'
export let locationBg = `img/location_bg/woods/${rndInt(0,7)}.png`
export let innBg = 'img/location_bg/woods/bg_inn.png'
export let eventsDone = 0
export const hpPerLvlUp = 5
export const sizeMulti = 1.3

newGameBtn.addEventListener("click", () => startNewGame())
eventStartBtn.addEventListener("click", () => startEvent(playerChar))
endEventBtn.addEventListener("click", () => endEvent())

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


function startNewGame () {
    gameStartArea.style.display = 'none' // Hide game start area
    gameRow1.style.display = 'flex' // Show the area for PLAYING aka seeing char, battles etc
    playerCharInfoEl1.style.display = 'inline-block'
    getChar()
    makePlayerCharDiv()
    eventStartBtn.style.display = 'inline'
    newGameBtn.style.display = 'none'
}

export function updateHp (char, hpChange) {
    if (hpChange) {
        char.hpMax += hpChange
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

export function centerPopup () {
    let el = popupDiv
    let elW = getElementSize(el, 'width')
    let elH = getElementSize(el, 'height')
    el.style.top = `${0.5*gameH - elH/2}px`
    el.style.left = `${0.5*gameW - elW/2}px`
    if (!portrait) {
        el.style.top = `${0.5*gameH - elH/2}px`
        el.style.left = `${0.43*gameW - elW/2}px`
    } else {
        el.style.top = `${0.4*gameH - elH/2}px`
        el.style.left = `${0.5*gameW - elW/2}px`
    }
}

export function updateBg (targetDiv, currentEvent) {
    let bgUrl = locationBg
    if (currentEvent === 'inn') bgUrl = innBg

    targetDiv.style.background = `url(${bgUrl}) rgba(0, 0, 0, 0.3)`
    targetDiv.style.backgroundBlendMode = 'multiply'
    targetDiv.style.backgroundSize = 'cover'
    targetDiv.style.backgroundPosition = 'center center'
}

export function fadeOutEl(el) {
    el.classList.add('fade-out')
}

export function togglePopupDiv () {
    document.querySelector('.popup-graphic').innerHTML = ''
    document.querySelector('.popup-text').innerHTML = ''

    if (popupDiv.style.display === 'block') {
        popupDiv.style.display = 'none'
        document.getElementById('button-bar').classList.remove('unclickable')
    }
    else {
        popupDiv.style.display = 'block'
        document.getElementById('button-bar').classList.add('unclickable')
    }      
}

export function addToEventsDone () {
    eventsDone++
}

export function changeLocationBg () {
    let location = ''
    if (currentLocationType === 'woods') location = 'woods'
    locationBg = `img/location_bg/${location}/${rndInt(0,7)}.png`;console.log(`changed BG, eventsDone: ${eventsDone}`);
    updateBg(playerSpriteInfoCard)
}