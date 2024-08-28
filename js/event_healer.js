function potion () {
    eventDiv.innerHTML = ''
    eventDiv.style.background = `url("img/events/healer/bg_healer.png") rgba(0, 0, 0, 0.3)`
    eventDiv.style.backgroundBlendMode = 'multiply'
    eventDiv.style.backgroundSize = 'cover'
    eventDiv.style.backgroundPosition = 'center center'

    const amountRestored = rndInt(40, 60)
    const maxH = 80
    const charHeight = 165
    const spriteH = (charHeight / 200) * maxH
    
    eventDiv.innerHTML += `<h3 class="window-header">HEALER!</h3>`
    eventDiv.innerHTML += `
        <div class="event-sprite-img-container">
            <img class="event-sprite-img" style="height:${spriteH}%" src="img/events/healer/healer_1.png">
        </div>`

    eventText.innerHTML = `
        <hr>
        <p class="event-text-row">You met a healer!</p><hr>
        <p id="event-text-row">He heals you, restoring ${amountRestored} HP.</p>
        <br>
        `
    playerChar.hpLeft += amountRestored
    if (playerChar.hpLeft > playerChar.hpMax) playerChar.hpLeft = playerChar.hpMax
    updateHp(playerChar)

    endEventBtn.style.display = 'inline-block' // end event btn
}