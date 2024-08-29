const baseAttr = {
    end: 5, 
    str: 5, 
    agi: 5, 
    dex: 5, 
    int: 5, 
    chr: 5, 
    lck: 5
}

const baseRes = {
    cold: 0,
    electric: 0,
    fire: 0,
    holy: 0,
    nature: 0,
    physical: 0,
    poison: 0,
    water: 0
}

// SKILLS
const skills = {
    // base skills
    attack:             {name: 'attack',            target: 'enemy', type: 'damage', attribute: 'str', chance: 100, power: 20, status: null,         statusChance: null, critChance: 5},
    // attribute skills
    bash_1:             {name: 'bash I',            target: 'enemy', type: 'damage', attribute: 'str', chance: 30, power: 40, status: 'stun',       statusChance: 30,   critChance: 5},
    bite_1:             {name: 'bite I',            target: 'enemy', type: 'damage', attribute: 'str', chance: 50, power: 30, status: 'bleeding',   statusChance: 30,   critChance: 10},
    eviscerate_1:       {name: 'eviscerate I',      target: 'enemy', type: 'damage', attribute: 'agi', chance: 20, power: 30, status: 'bleeding',   statusChance: 50,   critChance: 5},
    gambling_strike_1:  {name: 'gambling strike I', target: 'enemy', type: 'damage', attribute: 'lck', chance: 50, power: 25, status: null,         statusChance: 0,    critChance: 20},
    tusk_attack_1:      {name: 'tusk attack I',     target: 'enemy', type: 'damage', attribute: 'str', chance: 40, power: 20, status: 'bleeding',   statusChance: 30,   critChance: 5},
    heal_self_1:        {name: 'heal self I',       target: 'self',  type: 'heal',   attribute: 'int', chance: 25, power: 30, status: null,         statusChance: null, critChance: 5},
    magic_bolt_1:       {name: 'magic bolt I',      target: 'enemy', type: 'damage', attribute: 'int', chance: 50, power: 40, status: null,         statusChance: null, critChance: 5},
    power_shot_1:       {name: 'power shot I',      target: 'enemy', type: 'damage', attribute: 'agi', chance: 30, power: 40, status: 'stun',       statusChance: 15,   critChance: 10},
    scream_1:           {name: 'scream I',          target: 'enemy', type: 'damage', attribute: 'chr', chance: 30, power: 30, status: 'stun',       statusChance: 30,   critChance: 5}
}

const food = {
    small_potion: {
        type: 'heal',
        name: 'small potion',  
        ref: 'small_potion', 
        infoText: 'Heals you a little.', 
        gives: 'hpLeft', 
        amount: 25, 
        img: 'img/items/potion_small.png'
    },
    beer: {
        type: 'buff',
        name: 'beer', 
        ref: 'beer',         
        infoText: 'Gives you the DRUNK buff.',          
        gives: 'buff_drunk', 
        amount: null, 
        img: 'img/items/beer.png'
    }
}

const eq = {
    weapons: {
        wooden_sword: {name: 'wooden sword', atk: 2, bonusAttr: {}, desc: 'A wooden sword', img: 'img/items/wooden_sword.png'}
    },
    armors: {},
    trinkets: {
        rabbits_foot: {name: 'rabbits foot', bonusAttr: {lck: 2}, desc: 'A lucky rabbits foot.', img: 'img/items/rabbits_foot.png'}
    }
}

const races = {
    dwarf: {
        name: 'dwarf',
        height: 160,
        dmg: 5, def: 5,
        bonusAttr: {end: 2, str: 2, lck: 1},
        names: {
            male: ['Onos', 'Gular', 'Ognugg', 'Kamegg', 'Agnihm', 'Grulond', 'Irrok', 'Murduk', 'Endok', 'Bhaldun', 'Bundain', 'Thurrigg', 'Kharnus', 'Armdur', 'Harrim', 'Mornom', 'Thogram', 'Brombek', 'Ebren', 'Banram'],
            female: ['Eidi', 'Samma', 'Yduan', 'Simde', 'Gille', 'Gumda', 'Ennolli', 'Brumua', 'Kannu', 'Daza', 'Baerwaen', 'Dimras', 'Raenryl', 'Jyngwyn', 'Tyshdelle', 'Maerryl', 'Bellenura', 'Armera', 'Tyswyn', 'Tiznyss']
        },
        lastNames: ['Goldkin', 'Madreach', 'Halfheart', 'Mighteye', 'Truekind', 'Marblehold', 'Bravestorm', 'Truerock', 'Brohiran', 'Gianthold', 'Silverheart']
    },
    gnome: {
        name: 'gnome',
        height: 150,
        dmg: 5, def: 5,
        bonusAttr: {dex: 2, int: 1, lck: 2},
        names: {
            male: ['Pinik', 'Krickleck', 'Glinkik', 'Finbu', 'Leeni','Ortix', 'Arifan', 'Pippin', 'Sprocket', 'Twiggle', 'Wizzlewort', 'Oswald', 'Glimbol', 'Elrik', 'Oakleaf', 'Zephyr', 'Tinkerspark', 'Bimble', 'Quigley', 'Widget', 'Tinkerbob', 'Tinkertop', 'Jinglehops'],
            female: ['Milbick', 'Gluxilin', 'Nysi', 'Yorhana', 'Follin', 'Myxis', 'Isona', 'Selphina', 'Rosiwyse', 'Krilin', 'Bimble', 'Fizzlina', 'Ember', 'Mira', 'Glimmerdust', 'Jinglebelle', 'Snickerhuff', 'Nibbly', 'Petal', 'Gretel', 'Faeleaf', 'Willow']
        },
        lastNames: ['Luckyfield', 'Togglehold', 'Brassfeast', 'Foruni', 'Darkcord', 'Goldpatch', 'Epenidar', 'Darkbranch', 'Nuserall', 'Tosslepocket']
    },
    highelf: {
        name: 'highelf',
        height: 200,
        dmg: 5, def: 5,
        bonusAttr: {int: 2, agi: 2, chr: 1},
        names: {
            male: ['Aerendil', 'Belthorion', 'Caeldor', 'Diorion', 'Elenion', 'Thalion', 'Aldaril', 'Thalmor', 'Aurelian', 'Galerion', 'Pellril', 'Ravelanar', 'Vingron', 'Angoaril', 'Murian', 'Karved', 'Telve', 'Olqudur', 'Glaon', 'Mithril'],
            female: ['Aelnora', 'Clara', 'Firira', 'Zaonna', 'Garabella', 'Ravielle', 'Astnirya', 'Ayryeminde', 'Elelenya', 'Thramfaere', 'Helmaire', 'Erien', 'Inielina', 'Taalae', 'Tanarie', 'Aurtha', 'Camiril', 'Calmtaire', 'Cirine', 'Niraahil']
        },
        lastNames: ['Brightleaf', 'Mistwalker', 'Duskenvale', 'Windwalker', 'Mistglen', 'Windsong', 'Silverleaf', 'Frostheart', 'Moonshadow', 'Moonsong']
    },
    human: {
        name: 'human',
        height: 180,
        dmg: 5, def: 5,
        bonusAttr: {dex: 2, int: 2, chr: 2},
        names: {
            male: ['Alexander',  'Benjamin', 'Christopher', 'Daniel', 'Ethan',  'Frederick', 'Gabriel', 'Henry', 'Isaac', 'James', 'Arnall', 'Estevan', 'Claude', 'Lenard', 'Kalle', 'Colby', 'Ulises', 'Gary', 'Victor', 'Hubert', 'Aldo'],
            female: ['Amelia', 'Beatrice', 'Charlotte', 'Diana', 'Eleanor',  'Fiona',  'Grace',  'Hannah', 'Isabella', 'Julia', 'Berty', 'Thabita', 'Madison', 'Margot', 'Charline', 'Livia', 'Aubrie', 'Camile', 'Leyla', 'Rosina', 'Chantel', 'Maira', 'Autumn']
        },
        lastNames: ['Holt', 'Cromwell', 'Kirby', 'Stevens', 'Buckley', 'Brooks', 'Whitney', 'Williams', 'Ramsey', 'Hammett', 'Garfield', 'Alston']
    },
    tauren: {
        name: 'tauren',
        height: 200,
        dmg: 5, def: 5,
        bonusAttr: {end: 2, str: 3},
        names: {
            male: ['Anoki', 'Dichali', 'Chibo', 'Matoshkah', 'Giqo', 'Shusta', 'Mojag', 'Vudri', 'Skah', 'Ommioh'],
            female: ['Shania', 'Atepa', 'Tiva', 'Mona', 'Uyo', 'Alameda', 'Taze', 'Tiponi', 'Uwuno', 'Enge']
        },
        lastNames: ['Stonemoon', 'Blacktusk', 'Ironhide', 'Oatshield', 'Spiritmane', 'Fogsong', 'Stonehoof', 'Hillmane', 'Rumblerider', 'Runehorn']
    },
    mouseling: {
        name: 'mouseling',
        height: 140,
        dmg: 5, def: 5,
        bonusAttr: {agi: 3, dex: 1, lck: 1},
        names: {
            male: ['Jasper', 'Munchkin', 'Titan', 'Bandit', 'Noodle', 'Remy', 'Bingo', 'Finnegan', 'Orbit', 'Maverick', 'Dave', 'Charm', 'Cheddar', 'Oak', 'Autumn', 'Hippie', 'Boots', 'Vinnie', 'Cosmo', 'Tigger', 'Milo', 'Skip', 'Nibbles', 'George'],
            female: ['Zara', 'Zelda', 'Hazel', 'Honey', 'Cherry', 'Sky', 'Marigold', 'Dahlia', 'Fifi', 'Flora', 'Suzy', 'Jaffa', 'Sarah', 'Xia', 'Cutie', 'Pumpkin', 'Splash', 'Adele', 'Gladiola', 'Petunia', 'Millie', 'Iris', 'Zoey']
        },
        lastNames: ['']
    },
    orc: {
        name: 'orc',
        height: 185,
        dmg: 5, def: 5,
        bonusAttr: {end: 2, str: 2, agi: 1},
        names: {
            male: ['Gruluk', 'Throg', 'Gornak', 'Morbash', 'Bugrash', 'Wogharod', 'Julakgh', 'Ghamorz', 'Atulg', 'Korgak', 'Rohlegg', 'Dreknir', 'Zanol', 'Throztarak', 'Rorn', 'Krohlme', 'Kogdurm', 'Krakk', 'Crati', 'Grosush', 'Gremdenk'],
            female: ['Atrarim', 'Azrash', 'Borgakh', 'Dushara', 'Ede', 'Geshatis', 'Igruk', 'Kraga', 'Lazara', 'Lursha', 'Ewdi', 'Sata', 'Rohzi', 'Gusu', 'Sena', 'Tohka', 'Ergit', 'Grohta', 'Modi', 'Okida', 'Rane']
        },
        lastNames: ['Clanguard', 'Warbleeder', 'Deadbone', 'Hellshift', 'Strongdrum', 'Sharpwolf', 'Madaxe', 'Steelguard', 'Frostsorrow', 'Vengemane']
    },
    owlin: {
        name: 'owlin',
        height: 170,
        dmg: 5, def: 5,
        bonusAttr: {agi: 2, int: 1, lck: 2},
        names: {
            male: ['Elyndor', 'Celestrion', 'Whiskerwing', 'Vornisarak', 'Stormrider', 'Talonheart', 'Garrick', 'Quillon', 'Moonshadow', 'Skyfeather', 'Silas', 'Aeris', 'Aerithius', 'Songbird', 'Sunwing', 'Hoothgar', 'Hawklyn', 'Ravenshade', 'Thadriel', 'Vireldor', 'Gwyndor'],
            female: ['Saphira', 'Liora', 'Vespera', 'Thalindra', 'Sylara', 'Elysia', 'Willow', 'Callista', 'Aelara', 'Luna', 'Lunaflight', 'Aelaril', 'Moonstone', 'Lunareen', 'Ivy', 'Elianna', 'Kaelith', 'Nyxora', 'Thalia', 'Zenobia', 'Lunara', 'Thissa', 'Eirwynn', 'Aurora']
        },
        lastNames: ['Cloudstrider', 'Skywatcher', 'Skywhisper', 'Featherheart', 'Starcaller', 'Nightwing', 'Songflame', 'Moonshadow', 'Talonstrike', 'Owlheart', 'Feathersong']
    }
}

const jobs = {
    archer: {
        name: 'archer',
        bonusAttr: {str: 1, agi: 1, dex: 3},
        startSkill: 'power_shot_1'
    },
    bard: {
        name: 'bard',
        bonusAttr: {dex: 1, chr: 4},
        startSkill: 'scream_1'
    },
    gambler: {
        name: 'gambler',
        bonusAttr: {dex: 1, chr: 1, lck: 3},
        startSkill: 'gambling_strike_1'
    },
    mage: {
        name: 'mage',
        bonusAttr: {int: 4, lck: 1},
        startSkill: 'magic_bolt_1'
    },
    priest: {
        name: 'priest',
        bonusAttr: {int: 3, chr: 1, lck: 1},
        startSkill: 'heal_self_1'
    },
    rogue: {
        name: 'rogue',
        bonusAttr: {agi: 3, dex: 1, lck: 1},
        startSkill: 'eviscerate_1'
    },
    warrior: {
        name: 'warrior',
        bonusAttr: {end: 2, str: 2, agi: 1},
        startSkill: 'bash_1'
    }
}

const traits = {
    strong: {
        name: 'the strong',
        bonusAttr: {str: 1}
    },
    intelligent: {
        name: 'the intelligent',
        bonusAttr: {int: 1}
    },
    quick: {
        name: 'the quick',
        bonusAttr: {agi: 1}
    },
    charming: {
        name: 'the charming',
        bonusAttr: {chr: 1}
    },
    lucky: {
        name: 'the lucky',
        bonusAttr: {lck: 1}
    },
    reckless: {
        name: 'the reckless',
        bonusAttr: {str: 2, int: -1}
    },
    savant: {
        name: 'the savant',
        bonusAttr: {int: 2, str: -1}
    },
    rash: {
        name: 'the rash',
        bonusAttr: {agi: 2, int: -1}
    },
    pleasant: {
        name: 'the pleasant',
        bonusAttr: {chr: 2, str: -1}
    }
}

const enemies = {
    mouse: {
        name: 'Mouse',
        isPlayer: false,
        level: 1, 
        hpMax: 10, 
        hpLeft: 10,
        dmg: 1, def: 1,
        totalAttr: {str: 1, agi: 3, int: 1, chr: 1, lck: 3},
        skills: [skills.attack], 
        status: '',
        img: 'img/enemies/mouse_small.png',
        height: 60, 
    },
    goblin_bat: {
        name: 'Goblin Bat',
        isPlayer: false,
        level: 2, 
        hpMax: 15, 
        hpLeft: 15,
        dmg: 2, def: 1,
        totalAttr: {str: 2, agi: 4, int: 2, chr: 1, lck: 1},
        skills: [skills.attack],
        status: '',
        img: 'img/enemies/goblin_bat.png',
        height: 60
    },
    mouse_assassin: {
        name: 'Mouse Assasin',
        isPlayer: false,
        level: 3, 
        hpMax: 25, 
        hpLeft: 25,
        dmg: 4, def: 2,
        totalAttr: {str: 2, agi: 4, int: 3, chr: 1, lck: 3},
        skills: [skills.eviscerate_1], 
        status: '',
        img: 'img/enemies/mouse_assassin.png',
        height: 80
    },
    goblin: {
        name: 'Goblin',
        isPlayer: false,
        level: 3, 
        hpMax: 30, 
        hpLeft: 30,
        dmg: 3, def: 3,
        totalAttr: {str: 3, agi: 3, int: 2, chr: 1, lck: 1},
        skills: [skills.attack],
        status: '',
        img: 'img/enemies/goblin_warrior_small.png',
        height: 130
    },
    boar: {
        name: 'Boar',
        isPlayer: false,
        level: 4, 
        hpMax: 50, 
        hpLeft: 50,
        dmg: 4, def: 4,
        totalAttr: {str: 6, agi: 5, int: 1, chr: 1, lck: 2},
        skills: [skills.tusk_attack_1],
        status: '',
        img: 'img/enemies/boar.png',
        height: 110
    },
    young_wolf: {
        name: 'Young Wolf',
        isPlayer: false,
        level: 4, 
        hpMax: 35, 
        hpLeft: 35,
        dmg: 5, def: 2,
        totalAttr: {str: 4, agi: 5, int: 3, chr: 2, lck: 4},
        skills: [skills.bite_1],
        status: '',
        img: 'img/enemies/young_wolf.png',
        height: 100
    },
    crob: {
        name: 'Crob',
        isPlayer: false,
        level: 5, 
        hpMax: 45, 
        hpLeft: 45,
        dmg: 2, def: 5,
        totalAttr: {str: 3, agi: 2, int: 4, chr: 3, lck: 3},
        skills: [skills.scream_1],
        status: '',
        img: 'img/enemies/crob.png',
        height: 110
    },
    boarian_marauder:{
        name: 'Boarian Marauder',
        isPlayer: false,
        level: 6, 
        hpMax: 60, 
        hpLeft: 60,
        dmg: 5, def: 5,
        totalAttr: {str: 6, agi: 2, int: 3, chr: 1, lck: 3},
        skills: [skills.bash_1],
        status: '',
        img: 'img/enemies/boarian_marauder.png',
        height: 110
    },
    troll_forest: {
        name: 'Forest Troll',
        isPlayer: false,
        level: 8, 
        givesExp: 40, 
        height: 200, 
        hpMax: 80, 
        hpLeft: 80,
        dmg: 6, def: 6,
        totalAttr: {str: 7, agi: 2, int: 2, chr: 1, lck: 1},
        skills: [skills.bash_1],
        status: '',
        img: 'img/enemies/bosses/troll_forest.png',
    }
}

const bosses = {
    troll_forest: {
        name: 'Forest Troll',
        isPlayer: false,
        level: 8, 
        givesExp: 40, 
        height: 200, 
        hpMax: 80, 
        hpLeft: 80,
        totalAttr: {str: 7, agi: 2, int: 2, chr: 1, lck: 1},
        skills: [skills.bash_1],
        status: '',
        img: 'img/enemies/bosses/troll_forest.png',
    }
}

const genderSymbol = {
    male: '<i class="icon-male"></i>',
    female: '<i class="icon-female"></i>'
}

const numOfCharSprites = {
    dwarf: {
        archer: {female: 2, male: 2}, //
        bard: {female: 4, male: 7}, // 
        gambler: {female: 7, male: 11}, //
        mage: {female: 4, male: 11}, //
        priest: {female: 6, male: 5}, //
        rogue: {female: 5, male: 3}, //
        warrior: {female: 5, male: 6} //
    },
    gnome: {
        archer: {female: 2, male: 2}, //
        bard: {female: 7, male: 8}, // 
        gambler: {female: 7, male: 12}, //
        mage: {female: 10, male: 13}, //
        priest: {female: 6, male: 7}, //
        rogue: {female: 5, male: 8}, //
        warrior: {female: 8, male: 8} //
    },
    highelf: {
        archer: {female: 2, male: 3}, //
        bard: {female: 7, male: 6}, //
        gambler: {female: 8, male: 7}, //
        mage: {female: 6, male: 6}, //
        priest: {female: 13, male: 7}, //
        rogue: {female: 3, male: 4}, //
        warrior: {female: 5, male: 5} //
    },
    human: {
        archer: {female: 2, male: 1}, //
        bard: {female: 4, male: 4}, //
        gambler: {female: 6, male: 7}, //
        mage: {female: 6, male: 5}, //
        priest: {female: 9, male: 7}, //
        rogue: {female: 4, male: 3}, //
        warrior: {female: 8, male: 6} //
    },
    mouseling: {
        archer: {female: 2, male: 2}, //
        bard: {female: 8, male: 11}, //
        gambler: {female: 9, male: 10}, //
        mage: {female: 11, male: 8}, //
        priest: {female: 8, male: 7}, //
        rogue: {female: 10, male: 6}, //
        warrior: {female: 7, male: 9} //
    },
    orc: {
        archer: {female: 2, male: 3}, //
        bard: {female: 5, male: 6}, //
        gambler: {female: 8, male: 8}, //
        mage: {female: 11, male: 12}, //
        priest: {female: 6, male: 10}, //
        rogue: {female: 5, male: 5}, //
        warrior: {female: 12, male: 6} //
    },
    // OWLBOY DESIGN
    tauren: {
        archer: {female: 3, male: 4}, //
        bard: {female: 6, male: 6}, //
        gambler: {female: 7, male: 6}, //
        mage: {female: 7, male: 6}, //
        priest: {female: 9, male: 8}, //
        rogue: {female: 4, male: 5}, //
        warrior: {female: 17, male: 9} //
    },
    owlin: {
        archer: {female: 4, male: 5}, //
        bard: {female: 9, male: 7}, //
        gambler: {female: 8, male: 8}, //
        mage: {female: 15, male: 13}, //
        priest: {female: 7, male: 9}, //
        rogue: {female: 7, male: 7}, //
        warrior: {female: 16, male: 11} //
    }
}