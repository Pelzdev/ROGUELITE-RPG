import { showGameStartInfo } from "./game_start.js"
import { setPlayerChar, makePlayerCharDiv, playerChar } from "./player_char.js"
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
    let hallOfFameArray = JSON.parse(localStorage.getItem('hallOfFameArray')) // load the array
    
    if (!hallOfFameArray) {
        let newArray = [playerChar]
        localStorage.setItem('hallOfFameArray', JSON.stringify(newArray))
    } else {
        console.log('hall of fame array exists')
        hallOfFameArray.push(playerChar)
        localStorage.setItem('hallOfFameArray', JSON.stringify(hallOfFameArray))
    }

    return hallOfFameArray
}

export function loadHallOfFame () {
    return JSON.parse(localStorage.getItem('hallOfFameArray'))
}

export function clearGameHistory () {
    localStorage.removeItem("hallOfFameArray")
}


// Check if current char on page load
document.addEventListener("DOMContentLoaded", function(event) {
    if (currentCharExists()) {
        showGameStartInfo ()
        setPlayerChar(loadCurrentChar())
        makePlayerCharDiv()
        makePlayerInfo(playerChar)
        newGameBtn.style.display = 'none'
        continueGameBtn.style.display = 'inline-block'
    }
});
