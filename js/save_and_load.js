import { showGameStartInfo } from "./game_start.js"
import { setPlayerChar, makePlayerCharDiv, playerChar, getTotalMods } from "./player_char.js"
import { makePlayerInfo } from "./player_info.js"
import { newGameBtn, continueGameBtn } from "./main.js"

export function savePlayerChar (playerChar) {
    localStorage.setItem('currentChar', JSON.stringify(playerChar))
}

export function loadCurrentChar () {
    return JSON.parse(localStorage.getItem('currentChar'))
}

export function currentCharExists() {
    if (localStorage.hasOwnProperty('currentChar')) {
        return true
    } else return false
}

export function addCharToHallOfFame (playerChar) {
    let hallOfFamer = structuredClone(playerChar)
    hallOfFamer.score = getPlayerCharScore()
    let hallOfFameArray = JSON.parse(localStorage.getItem('hallOfFameArray')) // load the array
    
    if (!hallOfFameArray) {
        let newArray = [hallOfFamer]
        localStorage.setItem('hallOfFameArray', JSON.stringify(newArray))
    } else {
        console.log('hall of fame array exists')
        hallOfFameArray.push(hallOfFamer)
        hallOfFameArray = sortHallOfFame(hallOfFameArray)
        localStorage.setItem('hallOfFameArray', JSON.stringify(hallOfFameArray))
    }

    return hallOfFameArray
}

export function loadHallOfFame () {
    return JSON.parse(localStorage.getItem('hallOfFameArray'))
}

export function clearGameHistory () {
    localStorage.removeItem("hallOfFameArray")
    localStorage.removeItem("currentChar")
}

// Check if current char on page load
document.addEventListener("DOMContentLoaded", function(event) {
    if (currentCharExists()) {
        showGameStartInfo ()
        setPlayerChar(loadCurrentChar())
        makePlayerCharDiv()
        makePlayerInfo(playerChar)
        if (loadCurrentChar().hpLeft < 1) {
            newGameBtn.style.display = 'inline-block'
            continueGameBtn.style.display = 'none'
        } else {
            newGameBtn.style.display = 'none'
            continueGameBtn.style.display = 'inline-block'
        }
    }
});

// Calculate score of player char (to be used on saveCurrentChar)
function getPlayerCharScore () {
    let score = (playerChar.level * 2) + (playerChar.enemiesKilled) + calcTotalModScore(playerChar)
    return score
}

function calcTotalModScore (playerChar) {
    let score = 0
    let totalMods = getTotalMods(playerChar)
    console.log(Object.keys(totalMods))
    // Loop through all equipment of playerChar
    for (const mod of Object.keys(totalMods)) {
        if (mod.includes('Res')) score += totalMods[mod]
        else score += totalMods[mod] * 2
    }
    console.log(score)
    return Math.round(score)
}

function compareNumbers(a, b) {
    return b.score - a.score;
}

function sortHallOfFame (hallOfFameArray) {
    return hallOfFameArray.sort(compareNumbers)
}