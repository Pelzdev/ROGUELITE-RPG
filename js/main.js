import {rndInt, getElementSize, gameW, gameH, portrait} from "./base_functions.js"
import {playerChar, getChar, makePlayerCharDiv, playerSpriteInfoCard} from "./player_char.js"
import {startEvent} from "./event.js"
import {playerCharInfoEl1, playerCharInfoEl2, showFullPlayerInfo} from "./player_info.js"
import {savePlayerChar, addCharToHallOfFame} from "./save_and_load.js"
import {showGameStartInfo, gameStartArea} from "./game_start.js"

// ELEMENTS 
export const gameDiv = document.getElementById('game')
export const navbarTop = document.getElementById('button-bar')
export const newGameBtn = document.getElementById('new-game-btn') // Formerly getPlayerCharBtn
export const continueGameBtn = document.getElementById('continue-game-btn') // 
export const backToStartBtn = document.getElementById('back-to-start-btn')
export const gameRow1 = document.getElementById('game-row-1') // Area when playing, aka seeing the char, battles events etc
export const eventStartBtn = document.getElementById('event-start-btn')
export const popupDiv = document.querySelector('.popup-div')
export const popupHeader = document.querySelector('.popup-header')
export const popupGraphic = document.querySelector('.popup-graphic')
export const popupText = document.querySelector('.popup-text')

// GAMEPLAY 
export let currentLocationType = 'woods'
export let currentLocationName = 'Wolfroy Grove'
export let locationBg = `img/location_bg/woods/${rndInt(0,7)}.png`
export let innBg = 'img/location_bg/woods/bg_inn.png'
export const hpPerLvlUp = 5
export const sizeMulti = 1.3

newGameBtn.addEventListener('click', () => startNewGame())
eventStartBtn.addEventListener('click', () => startEvent(playerChar))

backToStartBtn.addEventListener('click', function () {
    clickBackToStartBtn()
})

continueGameBtn.addEventListener('click', function () {
    clickContinueGameBtn()
})

function startNewGame () {
    backToStartBtn.style.display = 'inline-block'
    gameStartArea.style.display = 'none' // Hide game start area
    gameRow1.style.display = 'flex' // Show the area for PLAYING aka seeing char, battles etc
    playerSpriteInfoCard.style.display = 'inline-block'
    playerCharInfoEl1.style.display = 'inline-block'
    playerCharInfoEl2.style.display = 'inline-block'
    getChar()
    makePlayerCharDiv()
    eventStartBtn.style.display = 'inline'
    newGameBtn.style.display = 'none'
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
    document.querySelector('.popup-header').innerHTML = ''
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

export function changeLocationBg () {
    let location = ''
    if (currentLocationType === 'woods') location = 'woods'
    locationBg = `img/location_bg/${location}/${rndInt(0,7)}.png`
    updateBg(playerSpriteInfoCard)
}

function clickBackToStartBtn () {
    savePlayerChar(playerChar)
    gameStartArea.style.display = 'block' // Show game start area
    //closeFullPlayerInfo()
    backToStartBtn.style.display = 'none'
    eventStartBtn.style.display = 'none'
    gameRow1.style.display = 'none'

    if (playerChar.hpLeft < 1) {
        newGameBtn.style.display = 'inline-block' // Show start new game button if char is dead
        addCharToHallOfFame(playerChar)
    }
    if (playerChar.hpLeft > 0) continueGameBtn.style.display = 'inline-block' // Show continue game button if char is alive
    showGameStartInfo()
}

function clickContinueGameBtn () {
    continueGameBtn.style.display = 'none'
    backToStartBtn.style.display = 'inline-block'
    gameStartArea.style.display = 'none'
    eventStartBtn.style.display = 'inline-block'
    showFullPlayerInfo()
    gameRow1.style.display = 'flex'
}