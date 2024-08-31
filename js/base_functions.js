function rndInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function rndProperty (obj) {
    let keys = Object.keys(obj)
    return obj[keys[keys.length * Math.random() << 0]]
}

function rndFromArr (arr) {
    return arr[rndInt(0, arr.length-1)]
}

// function returns a random value of a property of an object "cloned"
function rndGetPropertyCloned (obj) {
    let keys = Object.keys(obj)
    return structuredClone( obj[keys[keys.length * Math.random() << 0]] )
}

function getHighestAttr (attrObj) {
    let attrKeys = Object.keys(attrObj)
    let highestNum = 0
    let highestAttr = ''

    for (let i = 0; i < attrKeys.length; i++) {
        currentKey = attrKeys[i]
        if (attrObj[currentKey] > highestNum)  {
            highestAttr = currentKey
            highestNum = attrObj[currentKey]
        }
    }

    return highestAttr
}

function pkmnDmgCalc (skill, user, target) {
    let critical = 1
    let random = rndInt(85, 100)/100; console.log(random + ' ' + user.level)
    let power = skill.power
    let dmg = ( (2 * user.level / 5) * power * user.dmg/target.def ) / 50
    console.log(dmg)
    dmg = dmg * critical * random

    console.log(`${skill.name} did ${dmg} dmg`)
}

// DOM stuff
// Check for orientation change of device
window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
    gameW = getElementSize(gameDiv, 'width')
    gameH = getElementSize(gameDiv, 'height')
    portrait = e.matches;

    centerPopup(popupDiv)
});

window.onresize = function() { 
    console.log(`Window size changed!, H:${window.innerHeight}, W:${window.innerWidth}`)
    gameW = getElementSize(gameDiv, 'width')
    gameH = getElementSize(gameDiv, 'height')
    centerPopup(popupDiv)
};

// CHECK PORTRAIT/LANDSCAPE OF DEVICE
document.addEventListener("DOMContentLoaded", function(event){
    console.log(`DOMContentloaded`)
    setTimeout( function(){ window.scrollTo(0, 1); }, 100 );
    gameW = getElementSize(gameDiv, 'width')
    gameH = getElementSize(gameDiv, 'height')

    portrait = window.matchMedia("(orientation: portrait)").matches; // returns true if portrait

    if (portrait) {
        console.log('Orientation changed to: Portrait')
    }
    if (!portrait) {
        
    }
});

function getElementSize (el, widthOrHeight) {
    let positionInfo = el.getBoundingClientRect();
    let width = positionInfo.width;
    let height = positionInfo.height;

    //console.log(`W:${width}, H:${height}`)
    if (widthOrHeight === 'width') return width
    if (widthOrHeight === 'height') return height 
}

function getCenterOfEl (el, xOrY) {
    let centerX = el.offsetLeft + el.offsetWidth / 2;
    let centerY = el.offsetTop + el.offsetHeight / 2;
    //console.log (`Center of ${el} is X: ${centerX} Y ${centerY}`)
    if (xOrY === 'x') return centerX
    if (xOrY === 'y') return centerY
}

function changeInfoCardPos(deviceOrientation) {
    if (deviceOrientation === 'portrait') {
        gameRow1.insertBefore(eventDiv, eventTextContainer)
    } else {
        gameRow1.insertBefore(eventTextContainer, eventDiv)
    }
}
