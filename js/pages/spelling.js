// ===================== Spelling oldal =====================
// Sok helyesírási játék: Year 5/6 szavak, szabályok, homofónok

// Kihagyott betűk: a szó betűinek kb. harmadát "_"-re cseréljük (az első betű marad)
function hideLetters(word) {
    const letters = word.split("");
    const count = Math.max(2, Math.round(word.length / 3));
    sample(letters.map((_, i) => i).slice(1), count).forEach(i => { letters[i] = "_"; });
    return letters.join(" ");
}

// Többes szám: [egyes szám, többes szám, szabály]
const PLURALS = [
    ["cat", "cats", "Most nouns: just add -s."],
    ["box", "boxes", "After x, s, ss, sh, ch: add -es."],
    ["church", "churches", "After ch: add -es."],
    ["bus", "buses", "After s: add -es."],
    ["glass", "glasses", "After ss: add -es."],
    ["dish", "dishes", "After sh: add -es."],
    ["fox", "foxes", "After x: add -es."],
    ["baby", "babies", "Consonant + y: change y to i and add -es."],
    ["city", "cities", "Consonant + y: change y to i and add -es."],
    ["party", "parties", "Consonant + y: change y to i and add -es."],
    ["lady", "ladies", "Consonant + y: change y to i and add -es."],
    ["day", "days", "Vowel + y: just add -s."],
    ["toy", "toys", "Vowel + y: just add -s."],
    ["key", "keys", "Vowel + y: just add -s."],
    ["monkey", "monkeys", "Vowel + y: just add -s."],
    ["leaf", "leaves", "Many words ending in -f change to -ves."],
    ["knife", "knives", "Many words ending in -fe change to -ves."],
    ["wolf", "wolves", "Many words ending in -f change to -ves."],
    ["half", "halves", "Many words ending in -f change to -ves."],
    ["life", "lives", "Many words ending in -fe change to -ves."],
    ["roof", "roofs", "Some -f words just add -s: roof → roofs."],
    ["potato", "potatoes", "Some words ending in -o add -es: potatoes, tomatoes, heroes."],
    ["tomato", "tomatoes", "Some words ending in -o add -es: potatoes, tomatoes, heroes."],
    ["hero", "heroes", "Some words ending in -o add -es: potatoes, tomatoes, heroes."],
    ["piano", "pianos", "Some words ending in -o just add -s: pianos, photos."],
    ["photo", "photos", "Some words ending in -o just add -s: pianos, photos."],
    ["child", "children", "Irregular plural – learn it by heart!"],
    ["mouse", "mice", "Irregular plural – learn it by heart!"],
    ["foot", "feet", "Irregular plural – learn it by heart!"],
    ["tooth", "teeth", "Irregular plural – learn it by heart!"],
    ["man", "men", "Irregular plural – learn it by heart!"],
    ["woman", "women", "Irregular plural – learn it by heart!"],
    ["person", "people", "Irregular plural – learn it by heart!"],
    ["goose", "geese", "Irregular plural – learn it by heart!"],
    ["sheep", "sheep", "Some nouns stay the same: one sheep, two sheep."],
    ["fish", "fish", "Some nouns stay the same: one fish, two fish."],
    ["deer", "deer", "Some nouns stay the same: one deer, two deer."],
    ["cactus", "cacti", "Some words from Latin: cactus → cacti."]
];

// -ing / -ed: [alap, végződés, eredmény, szabály]
const DOUBLE = "Short word, one vowel + one consonant: double the last letter.";
const DROP_E = "Word ends in -e: drop the e before -ing / -ed.";
const Y_TO_I = "Consonant + y: change y to i before -ed (but keep y before -ing).";
const ING_ED = [
    ["stop", "ing", "stopping", DOUBLE], ["stop", "ed", "stopped", DOUBLE],
    ["run", "ing", "running", DOUBLE], ["swim", "ing", "swimming", DOUBLE],
    ["hop", "ing", "hopping", DOUBLE], ["hope", "ing", "hoping", DROP_E],
    ["make", "ing", "making", DROP_E], ["write", "ing", "writing", DROP_E],
    ["smile", "ing", "smiling", DROP_E], ["dance", "ed", "danced", "Word ends in -e: just add -d."],
    ["try", "ing", "trying", Y_TO_I], ["try", "ed", "tried", Y_TO_I],
    ["cry", "ed", "cried", Y_TO_I], ["carry", "ed", "carried", Y_TO_I],
    ["study", "ed", "studied", Y_TO_I], ["study", "ing", "studying", Y_TO_I],
    ["play", "ed", "played", "Vowel + y: just add -ed."], ["enjoy", "ed", "enjoyed", "Vowel + y: just add -ed."],
    ["begin", "ing", "beginning", "Stress on the last part (be-GIN): double the last letter."],
    ["forget", "ing", "forgetting", "Stress on the last part (for-GET): double the last letter."],
    ["prefer", "ed", "preferred", "Stress on the last part (pre-FER): double the last letter."],
    ["refer", "ing", "referring", "Stress on the last part (re-FER): double the last letter."],
    ["visit", "ed", "visited", "Stress on the first part (VIS-it): don't double."],
    ["garden", "ing", "gardening", "Stress on the first part (GAR-den): don't double."],
    ["open", "ed", "opened", "Stress on the first part (O-pen): don't double."],
    ["listen", "ed", "listened", "Stress on the first part (LIS-ten): don't double."],
    ["travel", "ed", "travelled", "In British English, words ending in -l double the l: travelled."],
    ["cancel", "ed", "cancelled", "In British English, words ending in -l double the l: cancelled."],
    ["plan", "ed", "planned", DOUBLE], ["shop", "ing", "shopping", DOUBLE],
    ["clap", "ed", "clapped", DOUBLE], ["jump", "ed", "jumped", "Two consonants at the end: just add -ed."],
    ["lie", "ing", "lying", "-ie changes to -y before -ing: lie → lying."],
    ["tie", "ing", "tying", "-ie changes to -y before -ing: tie → tying."],
    ["panic", "ed", "panicked", "Words ending in -c add k: panic → panicked."],
    ["picnic", "ing", "picnicking", "Words ending in -c add k: picnic → picnicking."]
];

// Toldalékok: [alap, toldalék, eredmény, szabály]
const SUFFIXES = [
    ["happy", "ness", "happiness", "Consonant + y: change y to i."],
    ["beauty", "ful", "beautiful", "Consonant + y: change y to i. -ful has only one l!"],
    ["care", "ful", "careful", "-ful has only one l."],
    ["hope", "less", "hopeless", "Suffix starts with a consonant: keep the e."],
    ["enjoy", "ment", "enjoyment", "Just add the suffix."],
    ["argue", "ment", "argument", "Tricky! The e is dropped: argument."],
    ["fame", "ous", "famous", "Suffix starts with a vowel: drop the e."],
    ["courage", "ous", "courageous", "Keep the e after g to keep the soft 'j' sound."],
    ["vary", "ous", "various", "y changes to i: various."],
    ["adore", "able", "adorable", "Suffix starts with a vowel: drop the e."],
    ["rely", "able", "reliable", "Consonant + y: change y to i."],
    ["change", "able", "changeable", "Keep the e after g to keep the soft sound."],
    ["notice", "able", "noticeable", "Keep the e after c to keep the soft 's' sound."],
    ["comfort", "able", "comfortable", "Just add the suffix."],
    ["happy", "ly", "happily", "Consonant + y: change y to i."],
    ["gentle", "ly", "gently", "Words ending in -le: change -le to -ly."],
    ["basic", "ly", "basically", "Words ending in -ic: add -ally."],
    ["true", "ly", "truly", "Tricky! Drop the e: truly."],
    ["final", "ly", "finally", "Just add -ly (that makes double l)."],
    ["sad", "ness", "sadness", "Just add -ness."],
    ["kind", "ness", "kindness", "Just add -ness."],
    ["silly", "ness", "silliness", "Consonant + y: change y to i."],
    ["plenty", "ful", "plentiful", "Consonant + y: change y to i."],
    ["mercy", "less", "merciless", "Consonant + y: change y to i."],
    ["govern", "ment", "government", "Just add -ment."],
    ["excite", "ment", "excitement", "Suffix starts with a consonant: keep the e."],
    ["nerve", "ous", "nervous", "Suffix starts with a vowel: drop the e."],
    ["danger", "ous", "dangerous", "Just add -ous."],
    ["hurry", "ed", "hurried", "Consonant + y: change y to i."],
    ["use", "ful", "useful", "Suffix starts with a consonant: keep the e."]
];

// Nehéz végződések: [szótő, helyes, rossz végződések, szabály]
const ENDINGS = [
    ["deli", "cious", ["tious"], "After a vowel we usually write -cious: delicious."],
    ["vi", "cious", ["tious"], "After a vowel we usually write -cious: vicious."],
    ["pre", "cious", ["tious"], "After a vowel we usually write -cious: precious."],
    ["spa", "cious", ["tious"], "Space → spacious (the c stays)."],
    ["gra", "cious", ["tious"], "Grace → gracious (the c stays)."],
    ["ambi", "tious", ["cious"], "Ambition → ambitious (the t stays)."],
    ["cau", "tious", ["cious"], "Caution → cautious (the t stays)."],
    ["nutri", "tious", ["cious"], "Nutrition → nutritious (the t stays)."],
    ["infec", "tious", ["cious"], "Infection → infectious (the t stays)."],
    ["offi", "cial", ["tial"], "After a vowel we usually write -cial: official."],
    ["spe", "cial", ["tial"], "After a vowel we usually write -cial: special."],
    ["so", "cial", ["tial"], "After a vowel we usually write -cial: social."],
    ["artifi", "cial", ["tial"], "After a vowel we usually write -cial: artificial."],
    ["par", "tial", ["cial"], "After a consonant we usually write -tial: partial."],
    ["essen", "tial", ["cial"], "After a consonant we usually write -tial: essential."],
    ["confiden", "tial", ["cial"], "After a consonant we usually write -tial: confidential."],
    ["ini", "tial", ["cial"], "Tricky word – learn it: initial."],
    ["observ", "ant", ["ent"], "Observation → observant (a in the related word)."],
    ["import", "ant", ["ent"], "Importance → important."],
    ["eleg", "ant", ["ent"], "Elegance → elegant."],
    ["relev", "ant", ["ent"], "Relevance → relevant."],
    ["confid", "ent", ["ant"], "Confidence → confident."],
    ["innoc", "ent", ["ant"], "Innocence → innocent."],
    ["obedi", "ent", ["ant"], "Obedience → obedient."],
    ["independ", "ent", ["ant"], "Independence → independent."],
    ["toler", "ance", ["ence"], "Tolerant → tolerance."],
    ["subst", "ance", ["ence"], "Learn it: substance."],
    ["assist", "ance", ["ence"], "Assistant → assistance."],
    ["refer", "ence", ["ance"], "Learn it: reference."],
    ["exist", "ence", ["ance"], "Learn it: existence."],
    ["comfort", "able", ["ible"], "If you can hear a whole word before it (comfort), it's usually -able."],
    ["enjoy", "able", ["ible"], "If you can hear a whole word before it (enjoy), it's usually -able."],
    ["reli", "able", ["ible"], "Rely → reliable."],
    ["valu", "able", ["ible"], "Value → valuable."],
    ["ador", "able", ["ible"], "Adore → adorable."],
    ["vis", "ible", ["able"], "If there's no whole word before it (vis-), it's usually -ible."],
    ["poss", "ible", ["able"], "If there's no whole word before it (poss-), it's usually -ible."],
    ["horr", "ible", ["able"], "If there's no whole word before it (horr-), it's usually -ible."],
    ["terr", "ible", ["able"], "If there's no whole word before it (terr-), it's usually -ible."],
    ["incred", "ible", ["able"], "If there's no whole word before it, it's usually -ible."],
    ["respons", "ible", ["able"], "Learn it: responsible."],
    ["ac", "tion", ["sion", "ssion", "cian"], "Act → action: -tion is the most common ending."],
    ["inven", "tion", ["sion", "ssion", "cian"], "Invent → invention."],
    ["televi", "sion", ["tion", "ssion", "cian"], "After a vowel, the 'zhun' sound is -sion: television."],
    ["deci", "sion", ["tion", "ssion", "cian"], "Decide → decision."],
    ["explo", "sion", ["tion", "ssion", "cian"], "Explode → explosion."],
    ["discu", "ssion", ["tion", "sion", "cian"], "Discuss → discussion (ss stays)."],
    ["permi", "ssion", ["tion", "sion", "cian"], "Permit → permission (-mit becomes -mission)."],
    ["musi", "cian", ["tion", "sion", "ssion"], "Jobs from words ending in -ic use -cian: music → musician."],
    ["electri", "cian", ["tion", "sion", "ssion"], "Jobs from words ending in -ic use -cian: electric → electrician."],
    ["magi", "cian", ["tion", "sion", "ssion"], "Jobs from words ending in -ic use -cian: magic → magician."]
];

// ie / ei: [helyes, rossz]
const IE_EI = [
    ["believe", "beleive"], ["field", "feild"], ["piece", "peice"], ["achieve", "acheive"],
    ["chief", "cheif"], ["thief", "theif"], ["niece", "neice"], ["shield", "sheild"],
    ["friend", "freind"], ["fierce", "feirce"], ["receive", "recieve"], ["ceiling", "cieling"],
    ["deceive", "decieve"], ["receipt", "reciept"], ["perceive", "percieve"],
    ["weird", "wierd"], ["seize", "sieze"], ["protein", "protien"], ["their", "thier"],
    ["neighbour", "nieghbour"], ["eight", "ieght"], ["weight", "wieght"], ["height", "hieght"],
    ["science", "sceince"], ["ancient", "anceint"]
];
const IE_RULE = "Rule: <b>i before e, except after c</b> (when it sounds like 'ee'). Watch out for exceptions: weird, seize, protein, their, eight, height, science.";

// -ough szavak: [helyes, rossz alakok, jelentés]
const OUGH = [
    ["though", ["tho", "thow"], "but; even if"],
    ["through", ["thru", "throo"], "from one side to the other"],
    ["thought", ["thort", "thawt"], "past of 'think'"],
    ["tough", ["tuff", "tugh"], "hard; difficult"],
    ["cough", ["coff", "cogh"], "what you do when you have a cold"],
    ["rough", ["ruff", "rugh"], "not smooth"],
    ["enough", ["enuff", "enugh"], "as much as you need"],
    ["dough", ["dogh", "dowe"], "a mix of flour and water for bread"],
    ["bought", ["bort", "bawt"], "past of 'buy'"],
    ["brought", ["brort", "braught"], "past of 'bring'"],
    ["fought", ["fawt", "foght"], "past of 'fight'"],
    ["drought", ["drout", "drowt"], "a long time with no rain"],
    ["plough", ["plogh", "plouw"], "a farm tool for digging fields"],
    ["thorough", ["thurrow", "thorogh"], "careful and complete"],
    ["ought", ["awt", "oght"], "should"],
    ["borough", ["burra", "boro"], "a town or part of a city"]
];

// Néma betűk: a "_" helyére jön a néma betű
const SILENT = [
    ["_nife", "k"], ["_nee", "k"], ["_nock", "k"], ["_night", "k"], ["_now", "k"],
    ["_rite", "w"], ["_rong", "w"], ["_rist", "w"], ["_rap", "w"], ["an_wer", "w"], ["s_ord", "w"],
    ["lam_", "b"], ["thum_", "b"], ["clim_", "b"], ["com_", "b"], ["dou_t", "b"],
    ["i_land", "s"], ["cas_le", "t"], ["lis_en", "t"], ["whis_le", "t"], ["fas_en", "t"],
    ["_nome", "g"], ["si_n", "g"], ["_our", "h"], ["_onest", "h"], ["g_ost", "h"],
    ["r_yme", "h"], ["w_ale", "h"], ["autum_", "n"], ["colum_", "n"],
    ["ha_f", "l"], ["ca_m", "l"], ["ta_k", "l"], ["sa_mon", "l"], ["recei_t", "p"], ["We_nesday", "d"]
];
const SILENT_LETTERS = ["k", "w", "b", "s", "t", "g", "h", "n", "l", "p", "d"];

// Homofónok: [mondat, helyes, a csoport többi tagja, magyarázat]
const HOMOPHONES = [
    ["The children put on ___ coats.", "their", ["there", "they're"], "their = belonging to them"],
    ["___ is a cat on the roof.", "There", ["Their", "They're"], "there = in that place / there is"],
    ["___ going to the zoo tomorrow.", "They're", ["Their", "There"], "they're = they are"],
    ["I have ___ brothers.", "two", ["to", "too"], "two = the number 2"],
    ["We went ___ the park.", "to", ["two", "too"], "to = towards"],
    ["This soup is ___ hot!", "too", ["to", "two"], "too = more than enough / also"],
    ["___ bag is on the floor.", "Your", ["You're"], "your = belonging to you"],
    ["___ my best friend!", "You're", ["Your"], "you're = you are"],
    ["The dog wagged ___ tail.", "its", ["it's"], "its = belonging to it (no apostrophe!)"],
    ["___ raining again!", "It's", ["Its"], "it's = it is"],
    ["___ are you going?", "Where", ["Wear", "Were", "We're"], "where = which place"],
    ["What will you ___ to the party?", "wear", ["where", "were", "we're"], "wear = to have clothes on"],
    ["They ___ playing outside.", "were", ["where", "wear", "we're"], "were = past of 'are'"],
    ["Hurry up – ___ late!", "we're", ["were", "where", "wear"], "we're = we are"],
    ["Can you ___ the music?", "hear", ["here"], "hear = with your ears"],
    ["Come over ___!", "here", ["hear"], "here = this place"],
    ["I ___ the answer!", "know", ["no"], "know = to have the information"],
    ["There are ___ biscuits left.", "no", ["know"], "no = not any"],
    ["Please ___ your name here.", "write", ["right"], "write = with a pen"],
    ["Turn ___ at the corner.", "right", ["write"], "right = the opposite of left / correct"],
    ["___ coat is this?", "Whose", ["Who's"], "whose = belonging to who?"],
    ["___ coming to the party?", "Who's", ["Whose"], "who's = who is"],
    ["Can I have a ___ of cake?", "piece", ["peace"], "piece = a part of something"],
    ["The war ended and there was ___.", "peace", ["piece"], "peace = no war, quiet"],
    ["Press the ___ to stop the bike.", "brake", ["break"], "brake = it stops a vehicle"],
    ["Be careful – don't ___ the glass!", "break", ["brake"], "break = to smash into pieces"],
    ["The ___ is sunny today.", "weather", ["whether"], "weather = rain, sun, wind…"],
    ["I don't know ___ to laugh or cry.", "whether", ["weather"], "whether = if"],
    ["We are not ___ to run in the corridor.", "allowed", ["aloud"], "allowed = permitted"],
    ["Read the poem ___.", "aloud", ["allowed"], "aloud = so others can hear"],
    ["We walked ___ the old church.", "past", ["passed"], "past = going by something"],
    ["She ___ her exam!", "passed", ["past"], "passed = the verb 'pass' in the past"],
    ["I ___ a strange noise.", "heard", ["herd"], "heard = past of 'hear'"],
    ["A ___ of cows was in the field.", "herd", ["heard"], "herd = a group of animals"],
    ["You need ___ to make bread.", "flour", ["flower"], "flour = white powder for baking"],
    ["She picked a beautiful ___ in the garden.", "flower", ["flour"], "flower = a plant with petals"],
    ["I ___ the ball over the fence.", "threw", ["through"], "threw = past of 'throw'"],
    ["We walked ___ the forest.", "through", ["threw"], "through = from one side to the other"],
    ["There are seven days in a ___.", "week", ["weak"], "week = seven days"],
    ["After being ill, I felt very ___.", "weak", ["week"], "weak = not strong"],
    ["Nice to ___ you!", "meet", ["meat"], "meet = to see someone"],
    ["Vegetarians don't eat ___.", "meat", ["meet"], "meat = food from animals"],
    ["The ___ in the story had a black cat.", "witch", ["which"], "witch = a woman with magic powers"],
    ["___ ice cream do you want?", "Which", ["Witch"], "which = what one?"],
    ["I need to ___ the piano every day.", "practise", ["practice"], "British English: practise = verb, practice = noun"],
    ["Football ___ is on Tuesday.", "practice", ["practise"], "British English: practice = noun, practise = verb"],
    ["Can you give me some ___?", "advice", ["advise"], "advice = noun, advise = verb"],
    ["I ___ you to wear a coat.", "advise", ["advice"], "advise = verb, advice = noun"],
    ["I was ___ because there was nothing to do.", "bored", ["board"], "bored = not interested"],
    ["Write the answer on the ___.", "board", ["bored"], "board = a flat piece of wood or a whiteboard"],
    ["I'm going to ___ a new bike.", "buy", ["by", "bye"], "buy = to pay for something"],
    ["The book was written ___ Roald Dahl.", "by", ["buy", "bye"], "by = who did it"],
    ["We sailed on the ___.", "sea", ["see"], "sea = lots of salty water"],
    ["I can't ___ without my glasses.", "see", ["sea"], "see = with your eyes"]
];

// Helyesírási játékok bármelyik szólistához (Year 3–4 vagy Year 5–6)
function spellingGames(list, prefix) {
    return [
        {
            id: `${prefix}-correct`, title: "Correct spelling", emoji: "✔️",
            intro: "Only one spelling is correct. Can you find it?",
            make: () => list.map(w => choiceQ(
                `Which spelling is correct? <div class="q-hint">(${w.meaning})</div>`, w.word, w.wrong, fillSentence(w.sentence, w.word)))
        },
        {
            id: `${prefix}-missing`, title: "Missing letters", emoji: "🕳️",
            intro: "Some letters are missing. Type the <b>whole word</b>.",
            make: () => list.map(w => typeQ(
                `<span class="letters">${hideLetters(w.word)}</span>`, w.word, fillSentence(w.sentence, w.word),
                { hint: `Clue: ${w.meaning}` }))
        },
        {
            id: `${prefix}-listen`, title: "Listen and spell", emoji: "🎧",
            intro: "Listen to the word and type it. Press <b>🔊 Listen again</b> to hear it again.<br>(Turn your sound on!)",
            make: () => list.map(w => listenQ(
                `${w.word}. ${fillSentence(w.sentence, w.word)} ${w.word}.`,
                `Listen and type the word.<div class="q-hint">${w.sentence}</div>`, w.word, `${w.word} = ${w.meaning}`))
        },
        {
            id: `${prefix}-spot`, title: "Spot the mistake", emoji: "🕵️",
            intro: "One word in the sentence is spelled wrong. Click on it!",
            make: () => list.map(w => {
                const wrong = pick(w.wrong);
                const sentence = fillSentence(w.sentence, wrong);
                const wrongWord = sentence.startsWith(capitalize(wrong)) ? capitalize(wrong) : wrong;
                const others = sentence.split(/\s+/)
                    .map(x => x.replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, ""))
                    .filter(x => /^[A-Za-z']{3,}$/.test(x) && x !== wrongWord);
                return choiceQ(`<i>${sentence}</i>`, wrongWord, others, `The correct spelling is <b>${w.word}</b>.`);
            })
        },
        {
            id: `${prefix}-fix`, title: "Fix the word", emoji: "🔧",
            intro: "The word is spelled wrong. Type it correctly!",
            make: () => list.map(w => typeQ(
                `Fix the spelling: <span class="letters wrong-ans">${pick(w.wrong)}</span>`, w.word, fillSentence(w.sentence, w.word),
                { hint: `Clue: ${w.meaning}` }))
        }
    ];
}

QuizApp.init({
    name: "spelling",
    sections: [
        {
            title: "Year 5 & 6 Spelling", emoji: "📘",
            desc: "The statutory spelling words for Years 5 and 6.",
            games: spellingGames(YEAR56_WORDS, "sp")
        },
        {
            title: "Year 3 & 4 Spelling", emoji: "📗",
            desc: "The Year 3 & 4 words – you need them in Year 5 too!",
            games: spellingGames(YEAR34_WORDS, "sp34")
        },
        {
            title: "Spelling Rules", emoji: "📏",
            desc: "Learn the rules – then the tricky words get easier!",
            games: [
                {
                    id: "sp-plurals", title: "Plurals", emoji: "👥",
                    intro: "Type the plural (more than one).<br>cat → cat<b>s</b> &nbsp; box → box<b>es</b> &nbsp; baby → bab<b>ies</b> &nbsp; leaf → lea<b>ves</b> &nbsp; child → <b>children</b>",
                    make: () => PLURALS.map(([s, p, rule]) => typeQ(`one <b>${s}</b> → two ___`, p, rule))
                },
                {
                    id: "sp-inged", title: "Adding -ing and -ed", emoji: "➕",
                    intro: "Add <b>-ing</b> or <b>-ed</b> and type the new word.<br>stop → sto<b>pp</b>ing &nbsp; make → mak<b>ing</b> &nbsp; cry → cr<b>ied</b> &nbsp; visit → visit<b>ed</b>",
                    make: () => ING_ED.map(([b, suf, res, rule]) => typeQ(`<b>${b}</b> + <b>${suf}</b> = ?`, res, rule))
                },
                {
                    id: "sp-suffix", title: "Suffixes", emoji: "🧱",
                    intro: "Add the suffix and type the new word.<br>happy + ness → happ<b>i</b>ness &nbsp; fame + ous → fam<b>ous</b> &nbsp; care + ful → care<b>ful</b>",
                    make: () => SUFFIXES.map(([b, suf, res, rule]) => typeQ(`<b>${b}</b> + <b>${suf}</b> = ?`, res, rule))
                },
                {
                    id: "sp-endings", title: "Tricky endings", emoji: "🎯",
                    intro: "Choose the correct ending:<br><b>-cious / -tious</b>, <b>-cial / -tial</b>, <b>-ant / -ent</b>, <b>-ance / -ence</b>, <b>-able / -ible</b>, <b>-tion / -sion / -ssion / -cian</b>",
                    make: () => ENDINGS.map(([stem, end, wrong, rule]) => choiceQ(
                        `Complete the word: <b>${stem}___</b>`, end, wrong, `<b>${stem}${end}</b> – ${rule}`))
                },
                {
                    id: "sp-ie", title: "ie or ei?", emoji: "🔤",
                    intro: IE_RULE,
                    make: () => IE_EI.map(([right, wrong]) => choiceQ("Which spelling is correct?", right, [wrong], IE_RULE))
                },
                {
                    id: "sp-ough", title: "-ough words", emoji: "🌀",
                    intro: "<b>-ough</b> can sound in many different ways: though, through, thought, tough, cough, plough…",
                    make: () => OUGH.map(([right, wrong, meaning]) => choiceQ(
                        `Which spelling is correct? <div class="q-hint">(${meaning})</div>`, right, wrong))
                },
                {
                    id: "sp-silent", title: "Silent letters", emoji: "🤫",
                    intro: "Some letters are written but not said: <b>k</b>nife, <b>w</b>rite, lam<b>b</b>, cas<b>t</b>le, <b>h</b>our.<br>Find the missing silent letter!",
                    make: () => SILENT.map(([pattern, letter]) => choiceQ(
                        `Which silent letter is missing? <span class="letters">${pattern}</span>`, letter,
                        SILENT_LETTERS.filter(l => l !== letter), `<b>${pattern.replace("_", letter)}</b>`))
                }
            ]
        },
        {
            title: "Homophones", emoji: "👂",
            desc: "Words that sound the same but are spelled differently.",
            games: [
                {
                    id: "sp-homophones", title: "Homophones", emoji: "🎭",
                    intro: "Choose the right word.<br><b>there</b> (place) / <b>their</b> (belonging to them) / <b>they're</b> (they are)<br><b>to</b> / <b>too</b> / <b>two</b> &nbsp; <b>its</b> / <b>it's</b> &nbsp; <b>your</b> / <b>you're</b>",
                    count: 15,
                    make: () => HOMOPHONES.map(([s, a, others, e]) => choiceQ(s, a, others, e))
                }
            ]
        }
    ]
});
