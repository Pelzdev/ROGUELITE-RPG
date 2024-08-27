const baseAttr = {
    str: 2, agi: 2, int: 2, chr: 2, lck: 2
}
// SKILLS
const skills = {
    // base skills
    attack: {name: 'attack', target: 'enemy', type: 'damage', attribute: 'str', power: 20, chance: 100, status: null, statusChance: null},
    // physical skills
    eviscerate_1: {name: 'eviscerate I', target: 'enemy', type: 'damage', attribute: 'agi', chance: 20, power: 30, status: 'bleeding', statusChance: 35},
    bash_1: {name: 'bash I', target: 'enemy', type: 'damage', attribute: 'str', chance: 30, power: 40, chance: 30, status: 'stun', statusChance: 30},
    // attribute skills
    gambling_strike_1: {name: 'gambling strike I', target: 'enemy', type: 'damage', attribute: 'lck', chance: 30, power: 40, status: null, statusChance: 0},
    magic_bolt_1: {name: 'magic bolt I', target: 'enemy', type: 'damage', attribute: 'int', chance: 40, power: 40, status: null, statusChance: null},
    scream_1: {name: 'scream I', target: 'enemy',type: 'damage', attribute: 'chr', chance: 30, power: 30, status: 'stun', statusChance: 30},
    heal_self_1: {name: 'heal self I', target: 'self', type: 'heal', attribute: 'int', chance: 20, power: 50, status: null, statusChance: null}
}

const races = {
    dwarf: {
        name: 'dwarf',
        height: 160,
        bonusAttr: {str: 1, lck: 1},
        names: {
            male: ['Onos', 'Gular', 'Ognugg', 'Kamegg', 'Agnihm', 'Grulond', 'Irrok', 'Murduk', 'Endok', 'Bhaldun', 'Bundain', 'Thurrigg', 'Kharnus', 'Armdur', 'Harrim', 'Mornom', 'Thogram', 'Brombek', 'Ebren', 'Banram'],
            female: ['Eidi', 'Samma', 'Yduan', 'Simde', 'Gille', 'Gumda', 'Ennolli', 'Brumua', 'Kannu', 'Daza', 'Baerwaen', 'Dimras', 'Raenryl', 'Jyngwyn', 'Tyshdelle', 'Maerryl', 'Bellenura', 'Armera', 'Tyswyn', 'Tiznyss']
        },
        lastNames: ['Goldkin', 'Madreach', 'Halfheart', 'Mighteye', 'Truekind', 'Marblehold', 'Bravestorm', 'Truerock', 'Brohiran', 'Gianthold', 'Silverheart']
    },
    gnome: {
        name: 'gnome',
        height: 150,
        bonusAttr: {int: 1, lck: 1},
        names: {
            male: ['Pinik', 'Krickleck', 'Glinkik', 'Finbu', 'Leeni','Ortix', 'Arifan', 'Pippin', 'Sprocket', 'Twiggle', 'Wizzlewort', 'Oswald', 'Glimbol', 'Elrik', 'Oakleaf', 'Zephyr', 'Tinkerspark', 'Bimble', 'Quigley', 'Widget', 'Tinkerbob', 'Tinkertop', 'Jinglehops'],
            female: ['Milbick', 'Gluxilin', 'Nysi', 'Yorhana', 'Follin', 'Myxis', 'Isona', 'Selphina', 'Rosiwyse', 'Krilin', 'Bimble', 'Fizzlina', 'Ember', 'Mira', 'Glimmerdust', 'Jinglebelle', 'Snickerhuff', 'Nibbly', 'Petal', 'Gretel', 'Faeleaf', 'Willow']
        },
        lastNames: ['Luckyfield', 'Togglehold', 'Brassfeast', 'Foruni', 'Darkcord', 'Goldpatch', 'Epenidar', 'Darkbranch', 'Nuserall', 'Tosslepocket']
    },
    highelf: {
        name: 'highelf',
        height: 200,
        bonusAttr: {int: 1, agi: 1},
        names: {
            male: ['Aerendil', 'Belthorion', 'Caeldor', 'Diorion', 'Elenion', 'Thalion', 'Aldaril', 'Thalmor', 'Aurelian', 'Galerion', 'Pellril', 'Ravelanar', 'Vingron', 'Angoaril', 'Murian', 'Karved', 'Telve', 'Olqudur', 'Glaon', 'Mithril'],
            female: ['Aelnora', 'Clara', 'Firira', 'Zaonna', 'Garabella', 'Ravielle', 'Astnirya', 'Ayryeminde', 'Elelenya', 'Thramfaere', 'Helmaire', 'Erien', 'Inielina', 'Taalae', 'Tanarie', 'Aurtha', 'Camiril', 'Calmtaire', 'Cirine', 'Niraahil']
        },
        lastNames: ['Brightleaf', 'Mistwalker', 'Duskenvale', 'Windwalker', 'Mistglen', 'Windsong', 'Silverleaf', 'Frostheart', 'Moonshadow', 'Moonsong']
    },
    human: {
        name: 'human',
        height: 180,
        bonusAttr: {int: 1, chr: 1},
        names: {
            male: ['Alexander',  'Benjamin', 'Christopher', 'Daniel', 'Ethan',  'Frederick', 'Gabriel', 'Henry', 'Isaac', 'James', 'Arnall', 'Estevan', 'Claude', 'Lenard', 'Kalle', 'Colby', 'Ulises', 'Gary', 'Victor', 'Hubert', 'Aldo'],
            female: ['Amelia', 'Beatrice', 'Charlotte', 'Diana', 'Eleanor',  'Fiona',  'Grace',  'Hannah', 'Isabella', 'Julia', 'Berty', 'Thabita', 'Madison', 'Margot', 'Charline', 'Livia', 'Aubrie', 'Camile', 'Leyla', 'Rosina', 'Chantel', 'Maira', 'Autumn']
        },
        lastNames: ['Holt', 'Cromwell', 'Kirby', 'Stevens', 'Buckley', 'Brooks', 'Whitney', 'Williams', 'Ramsey', 'Hammett', 'Garfield', 'Alston']
    },
    mouseling: {
        name: 'mouseling',
        height: 140,
        bonusAttr: {agi: 2},
        names: {
            male: ['Jasper', 'Munchkin', 'Titan', 'Bandit', 'Noodle', 'Remy', 'Bingo', 'Finnegan', 'Orbit', 'Maverick', 'Dave', 'Charm', 'Cheddar', 'Oak', 'Autumn', 'Hippie', 'Boots', 'Vinnie', 'Cosmo', 'Tigger', 'Milo', 'Skip', 'Nibbles', 'George'],
            female: ['Zara', 'Zelda', 'Hazel', 'Honey', 'Cherry', 'Sky', 'Marigold', 'Dahlia', 'Fifi', 'Flora', 'Suzy', 'Jaffa', 'Sarah', 'Xia', 'Cutie', 'Pumpkin', 'Splash', 'Adele', 'Gladiola', 'Petunia', 'Millie', 'Iris', 'Zoey']
        },
        lastNames: ['']
    },
    orc: {
        name: 'orc',
        height: 185,
        bonusAttr: {str: 1, agi: 1},
        names: {
            male: ['Gruluk', 'Throg', 'Gornak', 'Morbash', 'Bugrash', 'Wogharod', 'Julakgh', 'Ghamorz', 'Atulg', 'Korgak', 'Rohlegg', 'Dreknir', 'Zanol', 'Throztarak', 'Rorn', 'Krohlme', 'Kogdurm', 'Krakk', 'Crati', 'Grosush', 'Gremdenk'],
            female: ['Atrarim', 'Azrash', 'Borgakh', 'Dushara', 'Ede', 'Geshatis', 'Igruk', 'Kraga', 'Lazara', 'Lursha', 'Ewdi', 'Sata', 'Rohzi', 'Gusu', 'Sena', 'Tohka', 'Ergit', 'Grohta', 'Modi', 'Okida', 'Rane']
        },
        lastNames: ['Clanguard', 'Warbleeder', 'Deadbone', 'Hellshift', 'Strongdrum', 'Sharpwolf', 'Madaxe', 'Steelguard', 'Frostsorrow', 'Vengemane']
    },
    owlin: {
        name: 'owlin',
        height: 170,
        bonusAttr: {agi: 1, lck: 1},
        names: {
            male: ['Elyndor', 'Celestrion', 'Whiskerwing', 'Vornisarak', 'Stormrider', 'Talonheart', 'Garrick', 'Quillon', 'Moonshadow', 'Skyfeather', 'Silas', 'Aeris', 'Aerithius', 'Songbird', 'Sunwing', 'Hoothgar', 'Hawklyn', 'Ravenshade', 'Thadriel', 'Vireldor', 'Gwyndor'],
            female: ['Saphira', 'Liora', 'Vespera', 'Thalindra', 'Sylara', 'Elysia', 'Willow', 'Callista', 'Aelara', 'Luna', 'Lunaflight', 'Aelaril', 'Moonstone', 'Lunareen', 'Ivy', 'Elianna', 'Kaelith', 'Nyxora', 'Thalia', 'Zenobia', 'Lunara', 'Thissa', 'Eirwynn', 'Aurora']
        },
        lastNames: ['Cloudstrider', 'Skywatcher', 'Skywhisper', 'Featherheart', 'Starcaller', 'Nightwing', 'Songflame', 'Moonshadow', 'Talonstrike', 'Owlheart', 'Feathersong']
    }
}

const jobs = {
    bard: {
        name: 'bard',
        bonusAttr: {chr: 2},
        attack: [2,3],
        startSkill: 'scream_1'
    },
    gambler: {
        name: 'gambler',
        bonusAttr: {lck: 2},
        attack: [0,5],
        startSkill: 'gambling_strike_1'
    },
    mage: {
        name: 'mage',
        bonusAttr: {int: 2},
        attack: [1,2],
        startSkill: 'magic_bolt_1'
    },
    priest: {
        name: 'priest',
        bonusAttr: {int: 1, chr: 1},
        attack: [2,2],
        startSkill: 'heal_self_1'
    },
    rogue: {
        name: 'rogue',
        bonusAttr: {agi: 1, lck: 1},
        attack: [2,4],
        startSkill: 'eviscerate_1'
    },
    warrior: {
        name: 'warrior',
        bonusAttr: {str: 1, agi: 1},
        attack: [2,5],
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
        givesExp: 3, 
        height: 60, 
        hpMax: 8, 
        hpLeft: 8,
        totalAttr: {str: 1, agi: 3, int: 1, chr: 1, lck: 3},
        skills: [skills.attack], 
        status: '',
        img: 'img/enemies/mouse_small.png',
    },
    mouse_assassin: {
        name: 'Mouse Assasin',
        isPlayer: false,
        level: 3, 
        givesExp: 10, 
        height: 80, 
        hpMax: 15, 
        hpLeft: 15,
        totalAttr: {str: 1, agi: 4, int: 1, chr: 1, lck: 3},
        skills: [skills.eviscerate_1], 
        status: '',
        img: 'img/enemies/mouse_assassin.png',
    },
    goblin: {
        name: 'Goblin',
        isPlayer: false,
        level: 2, 
        givesExp: 5, 
        height: 130, 
        hpMax: 15, 
        hpLeft: 15,
        totalAttr: {str: 2, agi: 2, int: 1, chr: 1, lck: 5},
        skills: [skills.attack],
        status: '',
        img: 'img/enemies/goblin_warrior_small.png',
    }
}

const genderSymbol = {
    male: '&#9794;',
    female: '&#9792;'
}

const numOfCharSprites = {
    dwarf: {
        bard: {female: 4, male: 7}, // 
        gambler: {female: 7, male: 11}, //
        mage: {female: 4, male: 11}, //
        priest: {female: 6, male: 5}, //
        rogue: {female: 7, male: 5}, //
        warrior: {female: 5, male: 6} //
    },
    gnome: {
        bard: {female: 7, male: 8}, // 
        gambler: {female: 7, male: 12}, //
        mage: {female: 10, male: 13}, //
        priest: {female: 6, male: 7}, //
        rogue: {female: 7, male: 11}, //
        warrior: {female: 8, male: 8} //
    },
    highelf: {
        bard: {female: 7, male: 6}, //
        gambler: {female: 8, male: 7}, //
        mage: {female: 6, male: 6}, //
        priest: {female: 13, male: 7}, //
        rogue: {female: 5, male: 7}, //
        warrior: {female: 5, male: 5} //
    },
    human: {
        bard: {female: 4, male: 4}, //
        gambler: {female: 6, male: 7}, //
        mage: {female: 6, male: 5}, //
        priest: {female: 9, male: 7}, //
        rogue: {female: 6, male: 4}, //
        warrior: {female: 8, male: 6} //
    },
    mouseling: {
        bard: {female: 8, male: 11}, //
        gambler: {female: 9, male: 10}, //
        mage: {female: 11, male: 8}, //
        priest: {female: 8, male: 7}, //
        rogue: {female: 12, male: 8}, //
        warrior: {female: 7, male: 9} //
    },
    orc: {
        bard: {female: 5, male: 6}, //
        gambler: {female: 8, male: 8}, //
        mage: {female: 11, male: 12}, //
        priest: {female: 6, male: 10}, //
        rogue: {female: 7, male: 8}, //
        warrior: {female: 12, male: 6} //
    },
    // OWLBOY DESIGN
    owlin: {
        bard: {female: 9, male: 7}, //
        gambler: {female: 8, male: 8}, //
        mage: {female: 15, male: 13}, //
        priest: {female: 7, male: 9}, //
        rogue: {female: 11, male: 12}, //
        warrior: {female: 16, male: 11} //
    }
}