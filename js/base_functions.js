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

function getElementSize (el, widthOrHeight) {
    let positionInfo = el.getBoundingClientRect();
    let width = positionInfo.width;
    let height = positionInfo.height;

    console.log(`W:${width}, H:${height}`)
    if (widthOrHeight === 'width') return width
    if (widthOrHeight === 'height') return height 
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