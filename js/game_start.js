import { createNode } from "./base_functions.js";
import { clearGameHistory, loadCurrentChar, loadHallOfFame } from "./save_and_load.js"

export const gameStartArea = document.getElementById('game-start-area') // Area shown before clicking start, to be added here is overall player stuff like saving, highscore etc
export const gameStartMain = document.getElementById('game-start-main')

document.querySelector('.clear-history-btn').addEventListener('click', function () {
    clearGameHistory()
})

export function showGameStartInfo () {
    console.log(loadHallOfFame())
    let currentChar = loadCurrentChar()
    let deadText = ''
    if (currentChar.hpLeft < 1) deadText = '(DEAD)'

    gameStartMain.innerHTML = ''
    let header = createNode('h3', {textContent: 'WELCOME TO ROGUELITE'})
    let text =  createNode('p', {textContent: `Current char: ${currentChar.name} ${deadText}`})
    gameStartMain.append(header, text)
}