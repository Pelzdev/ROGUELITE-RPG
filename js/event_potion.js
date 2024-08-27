function potion () {
    eventDiv.innerHTML = ''
    eventDiv.style.background = `url("img/events/potion/bg_potion.png") rgba(0, 0, 0, 0.3)`
    eventDiv.style.backgroundBlendMode = 'multiply'
    eventDiv.style.backgroundSize = 'cover'
    eventDiv.style.backgroundPosition = 'center center'

    const amountRestored = rndInt(15,50)
    const maxH = 60
    const itemHeight = 150
    const spriteH = (itemHeight / 200) * maxH
    
    eventDiv.innerHTML += `<h3 class="window-header">POTION!</h3>`
    eventDiv.innerHTML += `
        <div id="trainer-img-container">
            <img id="event-trainer-img" style="height:${spriteH}%" src="img/events/potion/potion_red.png">
        </div>`

    eventText.innerHTML = `
        <hr>
        <p class="event-text-row">You found a HP potion!</p><hr>
        <p id="event-text-row">You drink the potion and restore ${amountRestored} HP.</p>
        <br>
        `
    playerChar.hpLeft += amountRestored
    if (playerChar.hpLeft > playerChar.hpMax) playerChar.hpLeft = playerChar.hpMax
    updateHp(playerChar)

    endEventBtn.style.display = 'inline-block' // end event btn
}