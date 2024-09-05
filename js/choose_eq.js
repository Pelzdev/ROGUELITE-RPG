import {createNode, rndGetPropertyCloned} from "./base_functions.js"
import {gameRow1, eventStartBtn} from "./main.js"
import {playerChar, makePlayerCharDiv, playerSpriteInfoCard, playerSpriteContainer} from "./player_char.js"
import {emptyAndCloseEventElements, currentEvent} from "./event.js"
import {showFullPlayerInfo} from "./player_info.js"
import {wiki} from "./wiki.js"

// What current loot is
let currentEqLoot
export function changeCurrentEqLoot (item) {
    currentEqLoot = item
}
// Define buttons for eqChoiceClick(), used in chooseEq()
let oldItemBtn = createNode('button', { textContent: 'KEEP YOURS', style: {display: 'inline-block', marginRight: '10px'}} )
oldItemBtn.addEventListener('click', () => eqChoiceClick('old'))
let newItemBtn = createNode('button', { textContent: 'TAKE NEW', style: {display: 'inline-block'}} )
newItemBtn.addEventListener('click', () => eqChoiceClick('new'))

export function chooseEq (playerChar) {
    // Close everything that is should be closed
    emptyAndCloseEventElements(currentEvent)
    playerSpriteInfoCard.style.display = 'none'
    // Make elements etc
    let newDiv = createNode('div', {className: 'compare-eq-window', style: {width: '100%', textAlign: 'center'}})
    let text = createNode('p', {textContent: 'You got loot! Take the item you want to keep.', style: {marginBottom: '20px'}})
    // Make looted item element
    let newItemDiv = createEqItemDiv(currentEqLoot)
    // Make button div to choose item
    let btnDiv = createNode('div', {className: 'btn-medium', style: {display: 'block', width: '100%', marginTop: '20px'}})
    // Check if player has item in that slot
    let currentItemDiv = ''
    if (playerChar.eq[currentEqLoot.type]) {
        currentItemDiv = createEqItemDiv(playerChar.eq[currentEqLoot.type])
        newItemBtn.textContent = 'TAKE NEW'
        btnDiv.append(oldItemBtn, newItemBtn)
        newDiv.append(text, currentItemDiv, newItemDiv, btnDiv)
    } else {
        newItemBtn.textContent = 'TAKE'
        btnDiv.append(newItemBtn)
        newDiv.append(text, newItemDiv, btnDiv)
    }
    gameRow1.append(newDiv)
}

function eqChoiceClick (choice) {
    if (choice === 'old') {
        makePlayerCharDiv(playerChar)
    }
    if (choice === 'new') {
        playerChar.eq[currentEqLoot.type] = currentEqLoot
        makePlayerCharDiv(playerChar)
    }
    document.querySelector('.compare-eq-window').remove()
    showFullPlayerInfo()
    eventStartBtn.style.display = 'inline-block'
}

function createEqItemDiv (item) {
    // Make new element
    let container = createNode('div', {className: 'compare-eq-container', style: {display: 'inline-block', verticalAlign: 'top', width: '33%', margin: 'auto', border: '1px solid black 4px', textAlign: 'center'}})
    //let header = createNode('h3', {className: 'compare-eq-header'})
    let header = createNode('h3', {className: 'compare-eq-header'})
    //let graphic = createNode('div', {className: 'compare-eq-graphic'})
    let graphic = createNode('div', {className: 'compare-eq-graphic'})
    //let textDiv = createNode('div', {className: 'compare-eq-container'})
    let textDiv = createNode('div', {className: 'compare-eq-text'})
    // HEADER
    let headerText = createNode('span', { textContent: item.name, className: item.rarity })
    header.append(headerText)
    // GRAPHIC / ICON
    let itemIcon = createNode( 'i', { className: `icon-${item.icon}`, style: {fontSize: '24px'} } )
    graphic.append(itemIcon)
    // Item type, rarity then mods, making sure dmg, def is top if those exist
    textDiv.append( createNode('p', { textContent: `Type: ${item.type.toUpperCase()}`, style: {marginTop: '10px'} }) )
    textDiv.append( createNode('p', { textContent: `Rarity: ${item.rarity.toUpperCase()}`, style:{marginBottom: '10px'}}) )

    // Add that checks everything
    for (const key of Object.keys(item.mods)) {
        if (key === 'dmg' || key === 'def') textDiv.append( createNode('p', {textContent: `+ ${item.mods[key]} ${key.toUpperCase()}`}) )
    }
    for (const key of Object.keys(item.mods)) {
        if ((!key.includes('Res')) && key !== 'dmg' && key !== 'def') {
            textDiv.append( createNode('p', {textContent: `+ ${item.mods[key]} ${key.toUpperCase()}`}) )
        }
    }
    for (const key of Object.keys(item.mods)) {
        if (key.includes('Res') && key != 'dmg' && key != 'def') {
            let keyWithoutRes = key.slice(0, -3) // Remove last 3 letters aka. 'Res'
            let resLine = createNode('div', {className: ''})
            let uncoloredText1 = createNode('span', { textContent: `+ ${item.mods[key]}% ` } )
            let coloredText = createNode('span', {textContent: keyWithoutRes.toUpperCase()})
            coloredText.className = keyWithoutRes
            let uncoloredText2 = createNode('span', {textContent: ' RES'})
            resLine.append(uncoloredText1, coloredText, uncoloredText2)
            textDiv.append(resLine)
        }
    }
    container.append(header, graphic, textDiv)

    return container
}

