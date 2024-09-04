export const wiki = {
    baseMods: {
        dmg: 5,
        def: 5,
        end: 5, 
        str: 5, 
        agi: 5, 
        dex: 5, 
        int: 5, 
        chr: 5, 
        lck: 5,
        coldRes: 0,
        electricRes: 0,
        fireRes: 0,
        holyRes: 0,
        loveRes: 0,
        natureRes: 0,
        physicalRes: 0,
        poisonRes: 0,
        waterRes: 0
    },
    skills: {
        // base skill (used if other skill isn't)
        attack:             {name: 'attack',        target: 'enemy', isSpell: false, type: 'damage', element: 'physical', attribute: 'str', chance: 100, power: 20,   effect: null,        effectChance: null, critChance: 5},
        // other skills
        bash_1:             {name: 'bash I',        target: 'enemy', isSpell: false, type: 'damage', element: 'physical', attribute: 'str', chance: 30,  power: 30,   effect: 'stun',      effectChance: 25,   critChance: 5},
        bite_1:             {name: 'bite I',        target: 'enemy', isSpell: false, type: 'damage', element: 'physical', attribute: 'agi', chance: 50,  power: 25,   effect: 'bleed',     effectChance: 30,   critChance: 10},
        body_slam_1:        {name: 'body slam I',   target: 'enemy', isSpell: false, type: 'damage', element: 'physical', attribute: 'end', chance: 35,  power: 25,   effect: 'stun',      effectChance: 25,   critChance: 5},
        eviscerate_1:       {name: 'eviscerate I',  target: 'enemy', isSpell: false, type: 'damage', element: 'physical', attribute: 'agi', chance: 30,  power: 30,   effect: 'bleed',     effectChance: 50,   critChance: 5},
        gamble_1:           {name: 'gamble I',      target: 'enemy', isSpell: false, type: 'damage', element: 'physical', attribute: 'lck', chance: 50,  power: 25,   effect: null,        effectChance: 0,    critChance: 20},
        tusk_attack_1:      {name: 'tusk attack I', target: 'enemy', isSpell: false, type: 'damage', element: 'physical', attribute: 'str', chance: 40,  power: 20,   effect: 'bleed',     effectChance: 30,   critChance: 5},
        heal_self_1:        {name: 'heal self I',   target: 'self',  isSpell: true,  type: 'heal',   element: 'holy',     attribute: 'int', chance: 25,  power: 30,   effect: null,        effectChance: null, critChance: 5},
        fire_bolt_1:        {name: 'fire bolt I',   target: 'enemy', isSpell: true,  type: 'damage', element: 'fire',     attribute: 'int', chance: 50,  power: 35,   effect: null,        effectChance: null, critChance: 5},
        ice_bolt_1:         {name: 'ice bolt I',    target: 'enemy', isSpell: true,  type: 'damage', element: 'cold',     attribute: 'int', chance: 50,  power: 35,   effect: null,        effectChance: null, critChance: 5},
        spark_1:            {name: 'spark I',       target: 'enemy', isSpell: true,  type: 'damage', element: 'electric', attribute: 'int', chance: 50,  power: 35,   effect: null,        effectChance: null, critChance: 5},
        siphon_life_1:      {name: 'siphon life I', target: 'enemy', isSpell: true,  type: 'damage', element: 'physical', attribute: 'int', chance: 30,  power: 20,   effect: 'lifesteal', effectChance: 100,  critChance: 5},
        power_shot_1:       {name: 'power shot I',  target: 'enemy', isSpell: false, type: 'damage', element: 'physical', attribute: 'dex', chance: 30,  power: 40,   effect: 'stun',      effectChance: 15,   critChance: 10},
        quick_shot_1:       {name: 'quick shot I',  target: 'enemy', isSpell: false, type: 'damage', element: 'physical', attribute: 'dex', chance: 50,  power: 25,   effect: null,        effectChance: null, critChance: 5},
        scream_1:           {name: 'scream I',      target: 'enemy', isSpell: false, type: 'damage', element: 'physical', attribute: 'chr', chance: 30,  power: 30,   effect: 'stun',      effectChance: 30,   critChance: 5},
        attract_1:          {name: 'attract I',     target: 'enemy', isSpell: true,  type: 'status', element: 'love',     attribute: 'chr', chance: 30,  power: null, effect: 'charm',     effectChance: 100,  critChance: 5},
        rabid_bite_1:       {name: 'rabid bite I',  target: 'enemy', isSpell: false, type: 'damage', element: 'physical', attribute: 'agi', chance: 40,  power: 25,   effect: 'poison',    effectChance: 100,  critChance: 5}
    },
    food: {
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
    },
    eqTypes: ['head', 'weapon', 'body', 'gloves', 'trinket', 'boots'],
    eq: {
        head: {
            wool_cap: {name: 'wool cap',         desc: 'A wool cap.', type: 'head', icon: 'head', rarity: 'common', mods: {}},
        },
        weapon: {
            wooden_sword: {name: 'wooden sword', desc: 'A wooden sword, mostly for training', type: 'weapon', icon: 'weapon', rarity: 'common', mods: {dmg: 2}},
        },
        body: {
            wool_shirt: {name: 'wool shirt',     desc: 'A wool shirt', type: 'body', icon: 'body', rarity: 'common', mods: {}},
        },
        gloves: {
            wool_gloves: {name: 'wool gloves',   desc: 'Wool gloves.', type: 'gloves', icon: 'gloves', rarity: 'common', mods: {}},
        },
        trinket: {
            rabbits_foot: {name: 'rabbits foot', desc: 'A lucky rabbits foot.', type: 'trinket', icon: 'trinket', rarity: 'common', mods: {lck: 2}}
        },
        boots: {
            old_boots: {name: 'old boots',       desc: 'Old boots.', type: 'boots', icon: 'boots', rarity: 'common', mods: {}}
        }
    },
    races: {
        dwarf: {
            name: 'dwarf',
            height: 160,
            mods: {end: 2, str: 2, lck: 1},
            names: {
                male: ['Onos', 'Gular', 'Ognugg', 'Kamegg', 'Agnihm', 'Grulond', 'Irrok', 'Murduk', 'Endok', 'Bhaldun', 'Bundain', 'Thurrigg', 'Kharnus', 'Armdur', 'Harrim', 'Mornom', 'Thogram', 'Brombek', 'Ebren', 'Banram'],
                female: ['Eidi', 'Samma', 'Yduan', 'Simde', 'Gille', 'Gumda', 'Ennolli', 'Brumua', 'Kannu', 'Daza', 'Baerwaen', 'Dimras', 'Raenryl', 'Jyngwyn', 'Tyshdelle', 'Maerryl', 'Bellenura', 'Armera', 'Tyswyn', 'Tiznyss']
            },
            lastNames: ['Goldkin', 'Madreach', 'Halfheart', 'Mighteye', 'Truekind', 'Marblehold', 'Bravestorm', 'Truerock', 'Brohiran', 'Gianthold', 'Silverheart']
        },
        gnome: {
            name: 'gnome',
            height: 150,
            mods: {dex: 2, int: 1, lck: 2},
            names: {
                male: ['Pinik', 'Krickleck', 'Glinkik', 'Finbu', 'Leeni','Ortix', 'Arifan', 'Pippin', 'Sprocket', 'Twiggle', 'Wizzlewort', 'Oswald', 'Glimbol', 'Elrik', 'Oakleaf', 'Zephyr', 'Tinkerspark', 'Bimble', 'Quigley', 'Widget', 'Tinkerbob', 'Tinkertop', 'Jinglehops'],
                female: ['Milbick', 'Gluxilin', 'Nysi', 'Yorhana', 'Follin', 'Myxis', 'Isona', 'Selphina', 'Rosiwyse', 'Krilin', 'Bimble', 'Fizzlina', 'Ember', 'Mira', 'Glimmerdust', 'Jinglebelle', 'Snickerhuff', 'Nibbly', 'Petal', 'Gretel', 'Faeleaf', 'Willow']
            },
            lastNames: ['Luckyfield', 'Togglehold', 'Brassfeast', 'Foruni', 'Darkcord', 'Goldpatch', 'Epenidar', 'Darkbranch', 'Nuserall', 'Tosslepocket']
        },
        highelf: {
            name: 'highelf',
            height: 200,
            mods: {int: 2, agi: 2, chr: 1},
            names: {
                male: ['Aerendil', 'Belthorion', 'Caeldor', 'Diorion', 'Elenion', 'Thalion', 'Aldaril', 'Thalmor', 'Aurelian', 'Galerion', 'Pellril', 'Ravelanar', 'Vingron', 'Angoaril', 'Murian', 'Karved', 'Telve', 'Olqudur', 'Glaon', 'Mithril'],
                female: ['Aelnora', 'Clara', 'Firira', 'Zaonna', 'Garabella', 'Ravielle', 'Astnirya', 'Ayryeminde', 'Elelenya', 'Thramfaere', 'Helmaire', 'Erien', 'Inielina', 'Taalae', 'Tanarie', 'Aurtha', 'Camiril', 'Calmtaire', 'Cirine', 'Niraahil']
            },
            lastNames: ['Brightleaf', 'Mistwalker', 'Duskenvale', 'Windwalker', 'Mistglen', 'Windsong', 'Silverleaf', 'Frostheart', 'Moonshadow', 'Moonsong']
        },
        human: {
            name: 'human',
            height: 180,
            mods: {dex: 2, int: 2, chr: 2},
            names: {
                male: ['Alexander',  'Benjamin', 'Christopher', 'Daniel', 'Ethan',  'Frederick', 'Gabriel', 'Henry', 'Isaac', 'James', 'Arnall', 'Estevan', 'Claude', 'Lenard', 'Kalle', 'Colby', 'Ulises', 'Gary', 'Victor', 'Hubert', 'Aldo'],
                female: ['Amelia', 'Beatrice', 'Charlotte', 'Diana', 'Eleanor',  'Fiona',  'Grace',  'Hannah', 'Isabella', 'Julia', 'Berty', 'Thabita', 'Madison', 'Margot', 'Charline', 'Livia', 'Aubrie', 'Camile', 'Leyla', 'Rosina', 'Chantel', 'Maira', 'Autumn']
            },
            lastNames: ['Holt', 'Cromwell', 'Kirby', 'Stevens', 'Buckley', 'Brooks', 'Whitney', 'Williams', 'Ramsey', 'Hammett', 'Garfield', 'Alston']
        },
        tauren: {
            name: 'tauren',
            height: 200,
            mods: {end: 2, str: 3},
            names: {
                male: ['Anoki', 'Dichali', 'Chibo', 'Matoshkah', 'Giqo', 'Shusta', 'Mojag', 'Vudri', 'Skah', 'Ommioh'],
                female: ['Shania', 'Atepa', 'Tiva', 'Mona', 'Uyo', 'Alameda', 'Taze', 'Tiponi', 'Uwuno', 'Enge']
            },
            lastNames: ['Stonemoon', 'Blacktusk', 'Ironhide', 'Oatshield', 'Spiritmane', 'Fogsong', 'Stonehoof', 'Hillmane', 'Rumblerider', 'Runehorn']
        },
        mouseling: {
            name: 'mouseling',
            height: 140,
            mods: {agi: 3, dex: 1, lck: 1},
            names: {
                male: ['Jasper', 'Munchkin', 'Titan', 'Bandit', 'Noodle', 'Remy', 'Bingo', 'Finnegan', 'Orbit', 'Maverick', 'Dave', 'Charm', 'Cheddar', 'Oak', 'Autumn', 'Hippie', 'Boots', 'Vinnie', 'Cosmo', 'Tigger', 'Milo', 'Skip', 'Nibbles', 'George'],
                female: ['Zara', 'Zelda', 'Hazel', 'Honey', 'Cherry', 'Sky', 'Marigold', 'Dahlia', 'Fifi', 'Flora', 'Suzy', 'Jaffa', 'Sarah', 'Xia', 'Cutie', 'Pumpkin', 'Splash', 'Adele', 'Gladiola', 'Petunia', 'Millie', 'Iris', 'Zoey']
            },
            lastNames: ['']
        },
        orc: {
            name: 'orc',
            height: 185,
            mods: {end: 2, str: 2, agi: 1},
            names: {
                male: ['Gruluk', 'Throg', 'Gornak', 'Morbash', 'Bugrash', 'Wogharod', 'Julakgh', 'Ghamorz', 'Atulg', 'Korgak', 'Rohlegg', 'Dreknir', 'Zanol', 'Throztarak', 'Rorn', 'Krohlme', 'Kogdurm', 'Krakk', 'Crati', 'Grosush', 'Gremdenk'],
                female: ['Atrarim', 'Azrash', 'Borgakh', 'Dushara', 'Ede', 'Geshatis', 'Igruk', 'Kraga', 'Lazara', 'Lursha', 'Ewdi', 'Sata', 'Rohzi', 'Gusu', 'Sena', 'Tohka', 'Ergit', 'Grohta', 'Modi', 'Okida', 'Rane']
            },
            lastNames: ['Clanguard', 'Warbleeder', 'Deadbone', 'Hellshift', 'Strongdrum', 'Sharpwolf', 'Madaxe', 'Steelguard', 'Frostsorrow', 'Vengemane']
        },
        owlin: {
            name: 'owlin',
            height: 170,
            mods: {agi: 2, int: 1, lck: 2},
            names: {
                male: ['Elyndor', 'Celestrion', 'Whiskerwing', 'Vornisarak', 'Stormrider', 'Talonheart', 'Garrick', 'Quillon', 'Moonshadow', 'Skyfeather', 'Silas', 'Aeris', 'Aerithius', 'Songbird', 'Sunwing', 'Hoothgar', 'Hawklyn', 'Ravenshade', 'Thadriel', 'Vireldor', 'Gwyndor'],
                female: ['Saphira', 'Liora', 'Vespera', 'Thalindra', 'Sylara', 'Elysia', 'Willow', 'Callista', 'Aelara', 'Luna', 'Lunaflight', 'Aelaril', 'Moonstone', 'Lunareen', 'Ivy', 'Elianna', 'Kaelith', 'Nyxora', 'Thalia', 'Zenobia', 'Lunara', 'Thissa', 'Eirwynn', 'Aurora']
            },
            lastNames: ['Cloudstrider', 'Skywatcher', 'Skywhisper', 'Featherheart', 'Starcaller', 'Nightwing', 'Songflame', 'Moonshadow', 'Talonstrike', 'Owlheart', 'Feathersong']
        }
    },
    jobs: {
        archer: {
            name: 'archer',
            mods: {str: 1, agi: 1, dex: 3},
            startSkills: ['power_shot_1', 'quick_shot_1']
        },
        bard: {
            name: 'bard',
            mods: {dex: 1, chr: 4},
            startSkills: ['scream_1', 'attract_1']
        },
        gambler: {
            name: 'gambler',
            mods: {dex: 1, chr: 1, lck: 3},
            startSkills: ['gamble_1']
        },
        mage: {
            name: 'mage',
            mods: {int: 4, lck: 1},
            startSkills: ['fire_bolt_1', 'ice_bolt_1', 'spark_1', 'siphon_life_1']
        },
        priest: {
            name: 'priest',
            mods: {int: 3, chr: 1, lck: 1},
            startSkills: ['heal_self_1']
        },
        rogue: {
            name: 'rogue',
            mods: {agi: 3, dex: 1, lck: 1},
            startSkills: ['eviscerate_1']
        },
        warrior: {
            name: 'warrior',
            mods: {end: 2, str: 2, agi: 1},
            startSkills: ['bash_1', 'body_slam_1']
        }
    },
    traits: {
        strong: {
            name: 'the strong',
            mods: {str: 1},
        },
        intelligent: {
            name: 'the intelligent',
            mods: {int: 1},
        },
        quick: {
            name: 'the quick',
            mods: {agi: 1},
        },
        charming: {
            name: 'the charming',
            mods: {chr: 1},
        },
        lucky: {
            name: 'the lucky',
            mods: {lck: 1},
        },
        reckless: {
            name: 'the reckless',
            mods: {str: 2, int: -1},
            bonusAttr: {str: 2, int: -1},
            bonusRes: {}
        },
        savant: {
            name: 'the savant',
            mods: {int: 2, str: -1},
        },
        rash: {
            name: 'the rash',
            mods: {int: 2, str: -1},
        },
        pleasant: {
            name: 'the pleasant',
            mods: {chr: 2, str: -1},
            bonusAttr: {chr: 2, str: -1},
            bonusRes: {}
        }
    },
    enemies: {
        mouse: {
            name: 'Mouse',
            isPlayer: false,
            level: 1, 
            hpMax: 10, 
            hpLeft: 10,
            totalMods: {dmg: 3, def: 3, str: 1, agi: 3, int: 1, chr: 1, lck: 3},
            dmg: 3, def: 3,
            totalAttr: {str: 1, agi: 3, int: 1, chr: 1, lck: 3},
            skills: 'attack', 
            status: '',
            img: 'img/enemies/mouse_small.png',
            height: 60, 
        },
        forest_gecko: {
            name: 'Forest Gecko',
            isPlayer: false,
            level: 1, 
            hpMax: 10, 
            hpLeft: 10,
            totalMods: {dmg: 4, def: 3, end: 1, str: 1, agi: 3, dex: 1, int: 1, chr: 1, lck: 1},
            dmg: 4, def: 3,
            totalAttr: {str: 1, agi: 3, int: 1, chr: 1, lck: 1},
            skills: 'attack',
            status: '',
            img: 'img/enemies/forest_gecko.png',
            height: 100
        },
        goblin_bat: {
            name: 'Goblin Bat',
            isPlayer: false,
            level: 2, 
            hpMax: 15, 
            hpLeft: 15,
            totalMods: {dmg: 4, def: 3, end: 1, str: 2, agi: 4, dex: 1, int: 2, chr: 1, lck: 1},
            dmg: 4, def: 3,
            totalAttr: {str: 2, agi: 4, int: 2, chr: 1, lck: 1},
            skills: 'attack',
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
            totalMods: {dmg: 5, def: 3, end: 2, str: 2, agi: 4, dex: 3, int: 3, chr: 1, lck: 3},
            dmg: 5, def: 3,
            totalAttr: {str: 2, agi: 4, int: 3, chr: 1, lck: 3},
            skills: 'eviscerate_1', 
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
            totalMods: {dmg: 5, def: 4, end: 4, str: 3, agi: 3, dex: 2, int: 2, chr: 1, lck: 1},
            dmg: 5, def: 4,
            totalAttr: {str: 3, agi: 3, int: 2, chr: 1, lck: 1},
            skills: 'attack',
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
            totalMods: {dmg: 6, def: 7, end: 6, str: 6, agi: 5, dex: 1, int: 1, chr: 1, lck: 2},
            dmg: 6, def: 7,
            totalAttr: {str: 6, agi: 5, int: 1, chr: 1, lck: 2},
            skills: 'attack',
            status: '',
            img: 'img/enemies/boar.png',
            height: 110
        },
        rabid_deer: {
            name: 'Rabid Deer',
            isPlayer: false,
            level: 4, 
            hpMax: 50, 
            hpLeft: 50,
            totalMods: {dmg: 7, def: 4, end: 5, str: 5, agi: 6, dex: 1, int: 1, chr: 1, lck: 1},
            dmg: 7, def: 4,
            totalAttr: {str: 5, agi: 6, int: 1, chr: 1, lck: 1},
            skills: 'attack',
            status: '',
            img: 'img/enemies/rabid_deer.png',
            height: 130
        },
        young_wolf: {
            name: 'Young Wolf',
            isPlayer: false,
            level: 4, 
            hpMax: 35, 
            hpLeft: 35,
            totalMods: {dmg: 6, def: 4, end: 4, str: 4, agi: 5, dex: 2, int: 3, chr: 2, lck: 4},
            dmg: 6, def: 4,
            totalAttr: {str: 4, agi: 5, int: 3, chr: 2, lck: 4},
            skills: 'bite_1',
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
            totalMods: {dmg: 6, def: 8, end: 7, str: 3, agi: 2, dex: 2, int: 4, chr: 3, lck: 3},
            dmg: 6, def: 8,
            totalAttr: {str: 3, agi: 2, int: 4, chr: 3, lck: 3},
            skills: 'scream_1',
            status: '',
            img: 'img/enemies/crob2.png',
            height: 110
        },
        boarian_marauder:{
            name: 'Boarian Marauder',
            isPlayer: false,
            level: 6, 
            hpMax: 60, 
            hpLeft: 60,
            totalMods: {dmg: 7, def: 6, end: 7, str: 6, agi: 2, dex: 3, int: 3, chr: 1, lck: 3},
            dmg: 7, def: 6,
            totalAttr: {str: 6, agi: 2, int: 3, chr: 1, lck: 3},
            skills: 'bash_1',
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
            totalMods: {dmg: 10, def: 8, end: 10, str: 7, agi: 2, dex:2, int: 2, chr: 1, lck: 1},
            dmg: 10, def: 8,
            totalAttr: {str: 7, agi: 2, int: 2, chr: 1, lck: 1},
            skills: 'bash_1',
            status: '',
            img: 'img/enemies/bosses/troll_forest.png',
        }
    },
    genderSymbol: {
        male: '<i class="icon-male"></i>',
        female: '<i class="icon-female"></i>'
    },
    numOfCharSprites: {
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
}

// Old before Module
const baseMods = {
    dmg: 5,
    def: 5,
    end: 5, 
    str: 5, 
    agi: 5, 
    dex: 5, 
    int: 5, 
    chr: 5, 
    lck: 5,
    coldRes: 0,
    electricRes: 0,
    fireRes: 0,
    holyRes: 0,
    natureRes: 0,
    physicalRes: 0,
    poisonRes: 0,
    waterRes: 0
}

// SKILLS
const skills = {
    // base skill (used if other skill isn't)
    attack:             {name: 'attack',        target: 'enemy', type: 'damage', attribute: 'str', chance: 100, power: 20,   effect: null,        effectChance: null, critChance: 5},
    // other skills
    bash_1:             {name: 'bash I',        target: 'enemy', type: 'damage', attribute: 'str', chance: 30,  power: 30,   effect: 'stun',      effectChance: 25,   critChance: 5},
    bite_1:             {name: 'bite I',        target: 'enemy', type: 'damage', attribute: 'agi', chance: 50,  power: 25,   effect: 'bleed',     effectChance: 30,   critChance: 10},
    body_slam_1:        {name: 'body slam I',   target: 'enemy', type: 'damage', attribute: 'end', chance: 35,  power: 25,   effect: 'stun',      effectChance: 25,   critChance: 5},
    eviscerate_1:       {name: 'eviscerate I',  target: 'enemy', type: 'damage', attribute: 'agi', chance: 30,  power: 30,   effect: 'bleed',     effectChance: 50,   critChance: 5},
    gamble_1:           {name: 'gamble I',      target: 'enemy', type: 'damage', attribute: 'lck', chance: 50,  power: 25,   effect: null,        effectChance: 0,    critChance: 20},
    tusk_attack_1:      {name: 'tusk attack I', target: 'enemy', type: 'damage', attribute: 'str', chance: 40,  power: 20,   effect: 'bleed',     effectChance: 30,   critChance: 5},
    heal_self_1:        {name: 'heal self I',   target: 'self',  type: 'heal',   attribute: 'int', chance: 25,  power: 30,   effect: null,        effectChance: null, critChance: 5},
    magic_bolt_1:       {name: 'magic bolt I',  target: 'enemy', type: 'damage', attribute: 'int', chance: 50,  power: 35,   effect: null,        effectChance: null, critChance: 5},
    siphon_life_1:      {name: 'siphon life I', target: 'enemy', type: 'damage', attribute: 'int', chance: 30,  power: 20,   effect: 'lifesteal', effectChance: 100,  critChance: 5},
    power_shot_1:       {name: 'power shot I',  target: 'enemy', type: 'damage', attribute: 'dex', chance: 30,  power: 40,   effect: 'stun',      effectChance: 15,   critChance: 10},
    quick_shot_1:       {name: 'quick shot I',  target: 'enemy', type: 'damage', attribute: 'dex', chance: 50,  power: 25,   effect: null,        effectChance: null, critChance: 5},
    scream_1:           {name: 'scream I',      target: 'enemy', type: 'damage', attribute: 'chr', chance: 30,  power: 30,   effect: 'stun',      effectChance: 30,   critChance: 5},
    attract_1:          {name: 'attract I',     target: 'enemy', type: 'status', attribute: 'chr', chance: 30,  power: null, effect: 'charmed',   effectChance: 100,  critChance: 5},
    rabid_bite_1:       {name: 'rabid bite I',  target: 'enemy', type: 'damage', attribute: 'agi', chance: 40,  power: 25,   effect: 'poison',    effectChance: 100,  critChance: 5}
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
const eqTypes = ['head', 'weapon', 'body', 'gloves', 'trinket', 'boots']

const eq = {
    head: {
        wool_cap: {name: 'wool cap',         desc: 'A wool cap.', type: 'head', icon: 'head', rarity: 'common', mods: {}},
    },
    weapon: {
        wooden_sword: {name: 'wooden sword', desc: 'A wooden sword, mostly for training', type: 'weapon', icon: 'weapon', rarity: 'common', mods: {dmg: 2}},
    },
    body: {
        wool_shirt: {name: 'wool shirt',     desc: 'A wool shirt', type: 'body', icon: 'body', rarity: 'common', mods: {}},
    },
    gloves: {
        wool_gloves: {name: 'wool gloves',   desc: 'Wool gloves.', type: 'gloves', icon: 'gloves', rarity: 'common', mods: {}},
    },
    trinket: {
        rabbits_foot: {name: 'rabbits foot', desc: 'A lucky rabbits foot.', type: 'trinket', icon: 'trinket', rarity: 'common', mods: {lck: 2}}
    },
    boots: {
        old_boots: {name: 'old boots',       desc: 'Old boots.', type: 'boots', icon: 'boots', rarity: 'common', mods: {}}
    }
}

const races = {
    dwarf: {
        name: 'dwarf',
        height: 160,
        mods: {end: 2, str: 2, lck: 1},
        names: {
            male: ['Onos', 'Gular', 'Ognugg', 'Kamegg', 'Agnihm', 'Grulond', 'Irrok', 'Murduk', 'Endok', 'Bhaldun', 'Bundain', 'Thurrigg', 'Kharnus', 'Armdur', 'Harrim', 'Mornom', 'Thogram', 'Brombek', 'Ebren', 'Banram'],
            female: ['Eidi', 'Samma', 'Yduan', 'Simde', 'Gille', 'Gumda', 'Ennolli', 'Brumua', 'Kannu', 'Daza', 'Baerwaen', 'Dimras', 'Raenryl', 'Jyngwyn', 'Tyshdelle', 'Maerryl', 'Bellenura', 'Armera', 'Tyswyn', 'Tiznyss']
        },
        lastNames: ['Goldkin', 'Madreach', 'Halfheart', 'Mighteye', 'Truekind', 'Marblehold', 'Bravestorm', 'Truerock', 'Brohiran', 'Gianthold', 'Silverheart']
    },
    gnome: {
        name: 'gnome',
        height: 150,
        mods: {dex: 2, int: 1, lck: 2},
        names: {
            male: ['Pinik', 'Krickleck', 'Glinkik', 'Finbu', 'Leeni','Ortix', 'Arifan', 'Pippin', 'Sprocket', 'Twiggle', 'Wizzlewort', 'Oswald', 'Glimbol', 'Elrik', 'Oakleaf', 'Zephyr', 'Tinkerspark', 'Bimble', 'Quigley', 'Widget', 'Tinkerbob', 'Tinkertop', 'Jinglehops'],
            female: ['Milbick', 'Gluxilin', 'Nysi', 'Yorhana', 'Follin', 'Myxis', 'Isona', 'Selphina', 'Rosiwyse', 'Krilin', 'Bimble', 'Fizzlina', 'Ember', 'Mira', 'Glimmerdust', 'Jinglebelle', 'Snickerhuff', 'Nibbly', 'Petal', 'Gretel', 'Faeleaf', 'Willow']
        },
        lastNames: ['Luckyfield', 'Togglehold', 'Brassfeast', 'Foruni', 'Darkcord', 'Goldpatch', 'Epenidar', 'Darkbranch', 'Nuserall', 'Tosslepocket']
    },
    highelf: {
        name: 'highelf',
        height: 200,
        mods: {int: 2, agi: 2, chr: 1},
        names: {
            male: ['Aerendil', 'Belthorion', 'Caeldor', 'Diorion', 'Elenion', 'Thalion', 'Aldaril', 'Thalmor', 'Aurelian', 'Galerion', 'Pellril', 'Ravelanar', 'Vingron', 'Angoaril', 'Murian', 'Karved', 'Telve', 'Olqudur', 'Glaon', 'Mithril'],
            female: ['Aelnora', 'Clara', 'Firira', 'Zaonna', 'Garabella', 'Ravielle', 'Astnirya', 'Ayryeminde', 'Elelenya', 'Thramfaere', 'Helmaire', 'Erien', 'Inielina', 'Taalae', 'Tanarie', 'Aurtha', 'Camiril', 'Calmtaire', 'Cirine', 'Niraahil']
        },
        lastNames: ['Brightleaf', 'Mistwalker', 'Duskenvale', 'Windwalker', 'Mistglen', 'Windsong', 'Silverleaf', 'Frostheart', 'Moonshadow', 'Moonsong']
    },
    human: {
        name: 'human',
        height: 180,
        mods: {dex: 2, int: 2, chr: 2},
        names: {
            male: ['Alexander',  'Benjamin', 'Christopher', 'Daniel', 'Ethan',  'Frederick', 'Gabriel', 'Henry', 'Isaac', 'James', 'Arnall', 'Estevan', 'Claude', 'Lenard', 'Kalle', 'Colby', 'Ulises', 'Gary', 'Victor', 'Hubert', 'Aldo'],
            female: ['Amelia', 'Beatrice', 'Charlotte', 'Diana', 'Eleanor',  'Fiona',  'Grace',  'Hannah', 'Isabella', 'Julia', 'Berty', 'Thabita', 'Madison', 'Margot', 'Charline', 'Livia', 'Aubrie', 'Camile', 'Leyla', 'Rosina', 'Chantel', 'Maira', 'Autumn']
        },
        lastNames: ['Holt', 'Cromwell', 'Kirby', 'Stevens', 'Buckley', 'Brooks', 'Whitney', 'Williams', 'Ramsey', 'Hammett', 'Garfield', 'Alston']
    },
    tauren: {
        name: 'tauren',
        height: 200,
        mods: {end: 2, str: 3},
        names: {
            male: ['Anoki', 'Dichali', 'Chibo', 'Matoshkah', 'Giqo', 'Shusta', 'Mojag', 'Vudri', 'Skah', 'Ommioh'],
            female: ['Shania', 'Atepa', 'Tiva', 'Mona', 'Uyo', 'Alameda', 'Taze', 'Tiponi', 'Uwuno', 'Enge']
        },
        lastNames: ['Stonemoon', 'Blacktusk', 'Ironhide', 'Oatshield', 'Spiritmane', 'Fogsong', 'Stonehoof', 'Hillmane', 'Rumblerider', 'Runehorn']
    },
    mouseling: {
        name: 'mouseling',
        height: 140,
        mods: {agi: 3, dex: 1, lck: 1},
        names: {
            male: ['Jasper', 'Munchkin', 'Titan', 'Bandit', 'Noodle', 'Remy', 'Bingo', 'Finnegan', 'Orbit', 'Maverick', 'Dave', 'Charm', 'Cheddar', 'Oak', 'Autumn', 'Hippie', 'Boots', 'Vinnie', 'Cosmo', 'Tigger', 'Milo', 'Skip', 'Nibbles', 'George'],
            female: ['Zara', 'Zelda', 'Hazel', 'Honey', 'Cherry', 'Sky', 'Marigold', 'Dahlia', 'Fifi', 'Flora', 'Suzy', 'Jaffa', 'Sarah', 'Xia', 'Cutie', 'Pumpkin', 'Splash', 'Adele', 'Gladiola', 'Petunia', 'Millie', 'Iris', 'Zoey']
        },
        lastNames: ['']
    },
    orc: {
        name: 'orc',
        height: 185,
        mods: {end: 2, str: 2, agi: 1},
        names: {
            male: ['Gruluk', 'Throg', 'Gornak', 'Morbash', 'Bugrash', 'Wogharod', 'Julakgh', 'Ghamorz', 'Atulg', 'Korgak', 'Rohlegg', 'Dreknir', 'Zanol', 'Throztarak', 'Rorn', 'Krohlme', 'Kogdurm', 'Krakk', 'Crati', 'Grosush', 'Gremdenk'],
            female: ['Atrarim', 'Azrash', 'Borgakh', 'Dushara', 'Ede', 'Geshatis', 'Igruk', 'Kraga', 'Lazara', 'Lursha', 'Ewdi', 'Sata', 'Rohzi', 'Gusu', 'Sena', 'Tohka', 'Ergit', 'Grohta', 'Modi', 'Okida', 'Rane']
        },
        lastNames: ['Clanguard', 'Warbleeder', 'Deadbone', 'Hellshift', 'Strongdrum', 'Sharpwolf', 'Madaxe', 'Steelguard', 'Frostsorrow', 'Vengemane']
    },
    owlin: {
        name: 'owlin',
        height: 170,
        mods: {agi: 2, int: 1, lck: 2},
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
        mods: {str: 1, agi: 1, dex: 3},
        startSkills: ['power_shot_1', 'quick_shot_1']
    },
    bard: {
        name: 'bard',
        mods: {dex: 1, chr: 4},
        startSkills: ['scream_1', 'attract_1']
    },
    gambler: {
        name: 'gambler',
        mods: {dex: 1, chr: 1, lck: 3},
        startSkills: ['gamble_1']
    },
    mage: {
        name: 'mage',
        mods: {int: 4, lck: 1},
        startSkills: ['magic_bolt_1', 'siphon_life_1']
    },
    priest: {
        name: 'priest',
        mods: {int: 3, chr: 1, lck: 1},
        startSkills: ['heal_self_1']
    },
    rogue: {
        name: 'rogue',
        mods: {agi: 3, dex: 1, lck: 1},
        startSkills: ['eviscerate_1']
    },
    warrior: {
        name: 'warrior',
        mods: {end: 2, str: 2, agi: 1},
        startSkills: ['bash_1', 'body_slam_1']
    }
}

const traits = {
    strong: {
        name: 'the strong',
        mods: {str: 1},
    },
    intelligent: {
        name: 'the intelligent',
        mods: {int: 1},
    },
    quick: {
        name: 'the quick',
        mods: {agi: 1},
    },
    charming: {
        name: 'the charming',
        mods: {chr: 1},
    },
    lucky: {
        name: 'the lucky',
        mods: {lck: 1},
    },
    reckless: {
        name: 'the reckless',
        mods: {str: 2, int: -1},
        bonusAttr: {str: 2, int: -1},
        bonusRes: {}
    },
    savant: {
        name: 'the savant',
        mods: {int: 2, str: -1},
    },
    rash: {
        name: 'the rash',
        mods: {int: 2, str: -1},
    },
    pleasant: {
        name: 'the pleasant',
        mods: {chr: 2, str: -1},
        bonusAttr: {chr: 2, str: -1},
        bonusRes: {}
    }
}

const enemies = {
    mouse: {
        name: 'Mouse',
        isPlayer: false,
        level: 1, 
        hpMax: 10, 
        hpLeft: 10,
        totalMods: {dmg: 3, def: 3, str: 1, agi: 3, int: 1, chr: 1, lck: 3},
        dmg: 3, def: 3,
        totalAttr: {str: 1, agi: 3, int: 1, chr: 1, lck: 3},
        skills: [skills.attack], 
        status: '',
        img: 'img/enemies/mouse_small.png',
        height: 60, 
    },
    forest_gecko: {
        name: 'Forest Gecko',
        isPlayer: false,
        level: 1, 
        hpMax: 10, 
        hpLeft: 10,
        totalMods: {dmg: 4, def: 3, end: 1, str: 1, agi: 3, dex: 1, int: 1, chr: 1, lck: 1},
        dmg: 4, def: 3,
        totalAttr: {str: 1, agi: 3, int: 1, chr: 1, lck: 1},
        skills: [skills.attack],
        status: '',
        img: 'img/enemies/forest_gecko.png',
        height: 100
    },
    goblin_bat: {
        name: 'Goblin Bat',
        isPlayer: false,
        level: 2, 
        hpMax: 15, 
        hpLeft: 15,
        totalMods: {dmg: 4, def: 3, end: 1, str: 2, agi: 4, dex: 1, int: 2, chr: 1, lck: 1},
        dmg: 4, def: 3,
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
        totalMods: {dmg: 5, def: 3, end: 2, str: 2, agi: 4, dex: 3, int: 3, chr: 1, lck: 3},
        dmg: 5, def: 3,
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
        totalMods: {dmg: 5, def: 4, end: 4, str: 3, agi: 3, dex: 2, int: 2, chr: 1, lck: 1},
        dmg: 5, def: 4,
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
        totalMods: {dmg: 6, def: 7, end: 6, str: 6, agi: 5, dex: 1, int: 1, chr: 1, lck: 2},
        dmg: 6, def: 7,
        totalAttr: {str: 6, agi: 5, int: 1, chr: 1, lck: 2},
        skills: [skills.tusk_attack_1],
        status: '',
        img: 'img/enemies/boar.png',
        height: 110
    },
    rabid_deer: {
        name: 'Rabid Deer',
        isPlayer: false,
        level: 4, 
        hpMax: 50, 
        hpLeft: 50,
        totalMods: {dmg: 7, def: 4, end: 5, str: 5, agi: 6, dex: 1, int: 1, chr: 1, lck: 1},
        dmg: 7, def: 4,
        totalAttr: {str: 5, agi: 6, int: 1, chr: 1, lck: 1},
        skills: [skills.rabid_bite_1],
        status: '',
        img: 'img/enemies/rabid_deer.png',
        height: 130
    },
    young_wolf: {
        name: 'Young Wolf',
        isPlayer: false,
        level: 4, 
        hpMax: 35, 
        hpLeft: 35,
        totalMods: {dmg: 6, def: 4, end: 4, str: 4, agi: 5, dex: 2, int: 3, chr: 2, lck: 4},
        dmg: 6, def: 4,
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
        totalMods: {dmg: 6, def: 8, end: 7, str: 3, agi: 2, dex: 2, int: 4, chr: 3, lck: 3},
        dmg: 6, def: 8,
        totalAttr: {str: 3, agi: 2, int: 4, chr: 3, lck: 3},
        skills: [skills.scream_1],
        status: '',
        img: 'img/enemies/crob2.png',
        height: 110
    },
    boarian_marauder:{
        name: 'Boarian Marauder',
        isPlayer: false,
        level: 6, 
        hpMax: 60, 
        hpLeft: 60,
        totalMods: {dmg: 7, def: 6, end: 7, str: 6, agi: 2, dex: 3, int: 3, chr: 1, lck: 3},
        dmg: 7, def: 6,
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
        totalMods: {dmg: 10, def: 8, end: 10, str: 7, agi: 2, dex:2, int: 2, chr: 1, lck: 1},
        dmg: 10, def: 8,
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
        totalMods: {},
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