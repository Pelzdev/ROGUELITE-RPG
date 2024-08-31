// ELEMENTS 
let gameDiv = document.getElementById('game')
let gameStartArea = document.getElementById('game-start-area') // Start "menu" area
let gameRow1 = document.getElementById('game-row-1') // Area when playing, aka seeing the char, battles events etc
let popupDiv = document.querySelector('.popup-div')
// TOP/MAIN BUTTONS
let getPlayerCharBtn = document.getElementById('get-player-char-btn')
let eventStartBtn = document.getElementById('event-start-btn')
// PLAYER
let playerSpriteDiv = document.getElementById('pc-img-container')
let playerSpriteEl = document.querySelector('.player-sprite')
let playerCharInfoEl1 = document.getElementById('player-char-info1')
let playerCharInfoEl2 = document.getElementById('player-char-info2')
// EVENT
let eventDiv = document.querySelector('.event-div')
let eventHeader = document.getElementById('event-header')
let eventTextContainer = document.getElementById('event-text-container')
let eventText = document.getElementById('event-text')
let endEventBtn = document.getElementById('event-end-btn') 

// ICONS
const icons = {
    gold: '<i class="icon-gold"></i>',
    heart: '<i class="icon-heart"></i>',
    sword: '<i class="icon-sword"></i>',
    shield: '<i class="icon-shield"></i>',
    amulet: '<i class="icon-amulet"></i>',
    armor: '<i class="icon-armor"></i>',
    gloves: '<i class="icon-gloves"></i>',
    helmet: '<i class="icon-helmet"></i>',
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

// for testing
let cheatedJob = null

// #######################################
let gameW, gameH
let portrait, landscape
let sizeMulti = 1.3 // for char and enemy sprites

let hpPerLvlUp = 5
let playerChar = {}
let currentEvent = ''
let eventsDone = 0
// Location (changes BG etc, will add more later)
let currentLocationType = 'woods'
let currentLocationName = 'Wolfroy Grove'
let locationBg = `img/location_bg/woods/${rndInt(0,7)}.png`
let innBg = 'img/location_bg/woods/bg_inn.png'

function getPlayerChar () {
    gameStartArea.style.display = 'none' // Hide game start area
    gameRow1.style.display = 'flex' // Show the area for PLAYING aka seeing char, battles etc
    playerCharInfoEl1.style.display = 'inline-block'
    playerCharInfoEl1.style.display = 'inline-block'
    playerChar = getChar('human')
    makePlayerCharDiv(playerChar)
    eventStartBtn.style.display = 'inline'
    getPlayerCharBtn.style.display = 'none'
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

    hpBar.style=`width:${char.hpLeft/char.hpMax*100}%`
    hpText.innerHTML = `${char.hpLeft}/${char.hpMax} HP`
}

function centerPopup (el) {
    let elW = getElementSize(el, 'width')
    let elH = getElementSize(el, 'height')
    el.style.top = `${0.5*gameH - elH/2}px`
    el.style.left = `${0.5*gameW - elW/2}px`
}
function getSkillIcon (skill) {
    return icons[skill.attribute]
}

function updateBg (targetDiv, event) {
    let bgUrl = locationBg
    if (event === 'inn') bgUrl = innBg

    targetDiv.style.background = `url(${bgUrl}) rgba(0, 0, 0, 0.3)`
    targetDiv.style.backgroundBlendMode = 'multiply'
    targetDiv.style.backgroundSize = 'cover'
    targetDiv.style.backgroundPosition = 'center center'
}
// Animation for attack right now, more to come
function animation (type, targetEl, time) {
    time = time || 100
    let x = getCenterOfEl(targetEl, 'x')
    let y = getCenterOfEl(targetEl, 'y')
    let iconSize = 64
    let html = ''
    let bg = ''

    if (type === 'damageEnemy') {
        bg = targetEl.style.background
        html = `<i class="icon-sword attack-animation" style="position:absolute; z-index:10; font-size:${iconSize}px; top:${y-(iconSize/2)}px; left:${x-(iconSize/2)}px;"></i>`
    }

    eventDiv.innerHTML +=  html

    setTimeout(function () {
        targetEl.style.background = bg
        document.querySelector('.attack-animation').remove()
    }, time);
}

function fadeOutEl(el) {
    el.classList.add('fade-out')
}

