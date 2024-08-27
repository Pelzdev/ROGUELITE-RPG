// INN EVENT
let innCost = 15
let innHeal = 20

function inn (pc) {
    eventDiv.innerHTML = ''
    eventDiv.style.background = `url("img/events/inn/bg_inn.png") rgba(0, 0, 0, 0.3)`
    eventDiv.style.backgroundBlendMode = 'multiply'
    eventDiv.style.backgroundSize = 'cover'
    eventDiv.style.backgroundPosition = 'center center'
    
    eventDiv.innerHTML += `<h3 class="window-header">FAIRVIEW INN</h3>`
    eventDiv.innerHTML += `
        <div id="innkeeper-img-container">
            <img id="event-innkeeper-img" style="height:${170*sizeMulti}px" src="img/events/inn/innkeeper.png">
        </div>`

    eventText.innerHTML += `<p class="event-text-row">You found an inn!</p><hr>`
    eventText.innerHTML = `
    <p id="inn-text-row">The inn looks inviting. Do you want to pay innkeeper Aerion ${innCost} gold to stay the night?</p>
    <br>
    <div id="event-btn-container">
        <button class="btn-inn yes" onclick="innYes()">YES</button><button class="btn-inn no" onclick="innNo()">NO</button>
    </div>
    `

    endEventBtn.style.display = 'inline-block' // end event btn
    //makeBattleDiv(enemy)
}

function innYes () {
    if (playerChar.gold < innCost) {
        console.log('not enough gold')
        return
    }
    console.log('selected inn yes')
    playerChar.gold -= innCost
    eventText.innerHTML = `You paid ${innCost} gold to stay the night... You wake up refreshed.`
    playerChar.hpLeft += 25
    if(playerChar.hpLeft > playerChar.hpMax) {playerChar.hpLeft = playerChar.hpMax}
    makePlayerCharDiv(playerChar)
}

function innNo() {
    console.log('selected inn no')
    eventText.innerHTML = `You decide to leave the inn.`
}