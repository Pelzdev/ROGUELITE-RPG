function healer () {
    eventDiv.innerHTML = ''
    //updateEventBg('healer')

    const amountRestored = rndInt(40, 60)
    const maxH = 80
    const charHeight = 165
    const spriteH = (charHeight / 200) * maxH
    
    eventDiv.innerHTML += `<p class="window-header">HEALER!</p>`
    eventDiv.innerHTML += `
        <div class="event-sprite-img-container">
            <img class="event-sprite-img" style="height:${spriteH}%" src="img/events/healer/healer_1.png">
        </div>`

    eventText.innerHTML = `
        <hr>
        <p class="event-text-row">You met healer Brevenin!!</p><hr>
        <p id="event-text-row">He heals you, restoring ${amountRestored} HP.</p>
        <br>
        `
    playerChar.hpLeft += amountRestored
    if (playerChar.hpLeft > playerChar.hpMax) playerChar.hpLeft = playerChar.hpMax
    updateHp(playerChar)

    endEventBtn.style.display = 'inline-block' // end event btn
}