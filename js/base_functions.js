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