let gameDiv = document.getElementById('game')
let popupDiv = document.querySelector('.popup-div')
let getPlayerCharBtn = document.getElementById('get-player-char-btn')
let reRandomizeCharBtn = document.getElementById('re-randomize-char-btn')
let eventStartBtn = document.getElementById('event-start-btn')

let playerSpriteDiv = document.getElementById('pc-img-container')
let playerSpriteEl = document.getElementById('player-sprite')

let playerEqEl = document.getElementById('player-eq')

let playerCharInfoEl = document.getElementById('player-char-info')

let eventDiv = document.querySelector('.event-div')
let eventHeader = document.getElementById('event-header')

let eventTextContainer = document.getElementById('event-text-container')
let eventText = document.getElementById('event-text')
let endEventBtn = document.getElementById('event-end-btn') 

// ICONS
const icons = {
    gold: '<i class="icon-gold"></i>',
    sword: '<i class="icon-sword"></i>',
    shield: '<i class="icon-shield"></i>',
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
let sizeMulti = 1.3 // for char and enemy sprites
let hpPerLvlUp = 5
let playerChar = {}
let currentEvent = ''
let gameW, gameH
// Location (changes BG etc, will add more later)
let currentLocationType = 'woods'
let currentLocationName = 'Wolfroy Grove'
let locationBg = `img/events/location_bg/woods/${rndInt(0,7)}.png`
let innBg = 'img/events/location_bg/woods/bg_inn.png'

function getPlayerChar () {
    playerCharInfoEl.style.display = 'inline-block'
    playerChar = getChar('human')
    makePlayerCharDiv(playerChar)
    eventStartBtn.style.display = 'inline'
    getPlayerCharBtn.style.display = 'none'
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
    console.log(icons[skill.attribute])
    return icons[skill.attribute]
}

// CHECK PORTRAIT/LANDSCAPE OF DEVICE
document.addEventListener("DOMContentLoaded", function(event){
    console.log(`DOMContentloaded`)
    gameW = getElementSize(gameDiv, 'width')
    gameH = getElementSize(gameDiv, 'height')
    let infoCard = document.getElementsByClassName('info-card');
    const portrait = window.matchMedia("(orientation: portrait)").matches; // returns true if portrait

    if (portrait) {
        console.log('Orientation changed to: Portrait')
    }
    if (!portrait) console.log('Orientation changed to: Landscape') 
});
// Check for orientation change of device
window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
    gameW = getElementSize(gameDiv, 'width')
    gameH = getElementSize(gameDiv, 'height')
    const portrait = e.matches;

    centerPopup(popupDiv)
});

window.onresize = function() { 
    console.log(`Window size changed!, H:${window.innerHeight}, W:${window.innerWidth}`)
    gameW = getElementSize(gameDiv, 'width')
    gameH = getElementSize(gameDiv, 'height')
    centerPopup(popupDiv)
};

function updateEventBg (event) {
    let targetDiv = eventDiv
    let bgUrl = locationBg
    if (event === 'inn') bgUrl = innBg

    targetDiv.style.background = `url(${bgUrl}) rgba(0, 0, 0, 0.3)`
    targetDiv.style.backgroundBlendMode = 'multiply'
    targetDiv.style.backgroundSize = 'cover'
    targetDiv.style.backgroundPosition = 'center center'
}

function updatePlayerBg () {
    let bgUrl = locationBg
    playerSpriteEl.style.background = `url(${bgUrl}) rgba(0, 0, 0, 0.3)`
    playerSpriteEl.style.backgroundBlendMode = 'multiply'
    playerSpriteEl.style.backgroundSize = 'cover'
    playerSpriteEl.style.backgroundPosition = 'center center'
}