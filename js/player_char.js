function getChar (race, job, gender) {
    let char = {
        isPlayer: true,
        hpMax: 100, 
        hpLeft: 100,
        exp: 0, 
        expToLvl: 20, 
        gold: 5, 
        status: '',
        race: rndGetPropertyCloned(races),
        job: rndGetPropertyCloned(jobs),
        trait: rndGetPropertyCloned(traits),
        gender: rndFromArr(['male', 'female']),
        level: 1,
        baseAttr: structuredClone(baseAttr),
    }
    char.totalAttr = multiAddAttr( [char.baseAttr, char.race.bonusAttr, char.job.bonusAttr, char.trait.bonusAttr] )
    char.img = getCharSprite(char)
    char.name = rndFromArr(races[char.race.name].names[char.gender])
    char.lastName = rndFromArr(races[char.race.name].lastNames)
    char.skills = [structuredClone(skills[char.job.startSkill])]

    return char
}

function makePlayerCharDiv (pc) {
    pc.totalAttr = multiAddAttr( [pc.baseAttr, pc.race.bonusAttr, pc.job.bonusAttr, pc.trait.bonusAttr] )
    let statBarPercentMulti = 5 // aka 1 point = 5% of bar filled
    let html = `
        <h3 class="window-header">PLAYER</h3>
        <hr>
        <p class="pc-info-line name">${pc.name.toUpperCase()} ${pc.lastName.toUpperCase()}</p>
        <p class="pc-info-line trait">${pc.trait.name.toUpperCase()}</p>
        <p class="pc-info-line race">${genderSymbol[pc.gender]} ${pc.race.name.toUpperCase()}<p><hr>
        <div class="hp-bar-under pc-hpbar-under"><div class="hp-bar-over pc-hpbar-over" style="width:${pc.hpLeft/pc.hpMax*100}%"></div><p id="pc-hp-text">${pc.hpLeft}/${pc.hpMax} HP<p></div>
        <hr>
        <div id="pc-img-container">${pc.img}</div>
        <hr>
        <p class="pc-info-line joblvl">lvl ${pc.level} ${pc.job.name.toUpperCase()}</p>
        <div class="pc-expbar-under"><div class="pc-expbar-over" style="width:${pc.exp/pc.expToLvl*270}px"></div><p id="pc-exp-text">${pc.exp}/${pc.expToLvl} exp<p></div>
        
    `
    let eqHtml = `
        <h3 class="window-header">EQUIPMENT</h3>
        <hr>
        <p class="pc-eq-line gold">GOLD:${pc.gold}</p>
        <p class="pc-eq-line weapon">WEAP:IRON GREATSWORD</p>
        <hr>
        <h3 class="window-header">ATTRIBUTES</h3>
        <hr>
        <div class="pc-info-stats">
            STR: ${pc.totalAttr.str} <div class="pc-statbar-under"> <div class="pc-statbar-over" style="width:${pc.totalAttr.str*statBarPercentMulti}%;"></div> </div> <br>
            AGI: ${pc.totalAttr.agi} <div class="pc-statbar-under"> <div class="pc-statbar-over" style="width:${pc.totalAttr.agi*statBarPercentMulti}%;"></div> </div> <br>
            INT: ${pc.totalAttr.int} <div class="pc-statbar-under"> <div class="pc-statbar-over" style="width:${pc.totalAttr.int*statBarPercentMulti}%;"></div> </div> <br>
            CHR: ${pc.totalAttr.chr} <div class="pc-statbar-under"> <div class="pc-statbar-over" style="width:${pc.totalAttr.chr*statBarPercentMulti}%;"></div> </div> <br>
            LCK: ${pc.totalAttr.lck} <div class="pc-statbar-under"> <div class="pc-statbar-over" style="width:${pc.totalAttr.lck*statBarPercentMulti}%;"></div> </div>
        </div>
    `
    playerCharEl.innerHTML = html
    playerEqEl.innerHTML = eqHtml

    return
}

function getCharSprite (char) {
    let numOfAvailebleSprites = numOfCharSprites[char.race.name][char.job.name][char.gender]
    let imgNum = rndInt(0, numOfAvailebleSprites-1)
    let img = `<img class="sprite-${char.race.name}" style="height:${char.race.height*sizeMulti}px" src="img/chars/${char.race.name}/${char.job.name}/${char.gender}/${imgNum}.png">`

    return img
}