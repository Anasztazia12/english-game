// ===================== Vocabulary oldal =====================
// Year 5/6 kötelező szavak jelentése + rendhagyó igék

function scramble(word) {
    let s = word;
    for (let tries = 0; s === word && tries < 20; tries++) s = shuffle(word.split("")).join("");
    return s;
}
function naivePast(base) { return base.endsWith("e") ? base + "d" : base + "ed"; }
function verbForms(v) { return `${v.base} → ${v.past.join("/")} → ${v.pp.join("/")}`; }

// Mondatok rendhagyó igékkel: [mondat, helyes alak(ok), magyarázat]
const VERB_SENTENCES = [
    ["Yesterday I ___ (see) a fox in the garden.", "saw", "see → saw → seen"],
    ["We ___ (go) to the beach last summer.", "went", "go → went → gone"],
    ["Have you ever ___ (eat) sushi?", "eaten", "After 'have', use the past participle: eat → ate → eaten"],
    ["She has ___ (write) three stories this week.", "written", "After 'has', use the past participle: write → wrote → written"],
    ["Tom ___ (break) his arm last year.", "broke", "break → broke → broken"],
    ["I have ___ (lose) my keys again!", "lost", "lose → lost → lost"],
    ["They ___ (buy) a new car last month.", "bought", "buy → bought → bought"],
    ["Mum ___ (make) pancakes this morning.", "made", "make → made → made"],
    ["He ___ (run) all the way home.", "ran", "run → ran → run"],
    ["I have never ___ (fly) in a plane.", "flown", "fly → flew → flown"],
    ["The bird ___ (fly) away.", "flew", "fly → flew → flown"],
    ["We have ___ (know) each other for years.", "known", "know → knew → known"],
    ["Mrs Smith ___ (teach) us maths last year.", "taught", "teach → taught → taught"],
    ["I ___ (think) it was a good idea.", "thought", "think → thought → thought"],
    ["Who has ___ (take) my pencil?", "taken", "take → took → taken"],
    ["The children ___ (sing) a song at the concert last night.", "sang", "sing → sang → sung"],
    ["Have you ___ (drink) all the milk?", "drunk", "drink → drank → drunk"],
    ["He ___ (catch) the ball with one hand.", "caught", "catch → caught → caught"],
    ["The cat has ___ (hide) under the bed.", "hidden", "hide → hid → hidden"],
    ["We ___ (swim) in the sea yesterday.", "swam", "swim → swam → swum"],
    ["I ___ (feel) sick after the ride.", "felt", "feel → felt → felt"],
    ["She has ___ (choose) a red dress.", "chosen", "choose → chose → chosen"],
    ["Our team has ___ (win) the cup!", "won", "win → won → won"],
    ["Dad ___ (drive) us to school this morning.", "drove", "drive → drove → driven"],
    ["I ___ (forget) my homework at home yesterday.", "forgot", "forget → forgot → forgotten"],
    ["Have you ___ (speak) to the teacher?", "spoken", "speak → spoke → spoken"],
    ["The baby ___ (sleep) for three hours last night.", "slept", "sleep → slept → slept"],
    ["He ___ (bring) flowers for his grandma.", "brought", "bring → brought → brought"],
    ["The lake has ___ (freeze)! We can skate on it.", "frozen", "freeze → froze → frozen"],
    ["I ___ (tell) you the truth yesterday!", "told", "tell → told → told"],
    ["She ___ (wear) her new shoes to the party.", "wore", "wear → wore → worn"],
    ["Somebody has ___ (steal) my bike!", "stolen", "steal → stole → stolen"],
    ["The sun ___ (rise) at six o'clock this morning.", "rose", "rise → rose → risen"],
    ["I have ___ (read) this book twice.", "read", "read → read → read (but the past forms sound like 'red')"],
    ["The bell ___ (ring) and everyone ran outside.", "rang", "ring → rang → rung"]
];

// Ugyanazok a játékok bármelyik szólistával (Year 3–4 vagy Year 5–6)
function wordGames(list, prefix) {
    const others = w => list.filter(x => x !== w);
    return [
        {
            id: `${prefix}-meaning`, title: "What does it mean?", emoji: "🤔",
            intro: "Read the word and choose the right meaning.",
            make: () => list.map(w => choiceQ(`What does <b>${w.word}</b> mean?`, w.meaning, sample(others(w), 3).map(x => x.meaning)))
        },
        {
            id: `${prefix}-fits`, title: "Which word fits?", emoji: "🧩",
            intro: "Choose the word that completes the sentence.",
            make: () => list.map(w => choiceQ(w.sentence, w.word, sample(others(w), 3).map(x => x.word), `<b>${w.word}</b> = ${w.meaning}`))
        },
        {
            id: `${prefix}-guess`, title: "Guess the word", emoji: "🔎",
            intro: "Read the meaning and type the word. Be careful with the spelling!",
            make: () => list.map(w => typeQ(`Which word means: <b>${w.meaning}</b>?`, w.word, fillSentence(w.sentence, w.word),
                { hint: `It starts with <b>${w.word[0]}</b> and has <b>${w.word.length}</b> letters.` }))
        },
        {
            id: `${prefix}-unscramble`, title: "Unscramble", emoji: "🔀",
            intro: "The letters are mixed up. Put them in order and type the word.",
            make: () => list.map(w => typeQ(`Unscramble: <span class="letters">${scramble(w.word).toUpperCase().split("").join(" ")}</span>`,
                w.word, null, { hint: `Clue: ${w.meaning}` }))
        },
        {
            id: `${prefix}-match`, title: "Word or meaning?", emoji: "🔁",
            intro: "Sometimes you get a word, sometimes a meaning. Choose the matching pair!",
            make: () => list.map(w => Math.random() < 0.5
                ? choiceQ(`Which word means <b>${w.meaning}</b>?`, w.word, sample(others(w), 3).map(x => x.word))
                : choiceQ(`Which word means <b>${w.meaning}</b>? <div class="q-hint">(Watch the spelling!)</div>`, w.word, w.wrong))
        },
        { id: `${prefix}-list`, title: "Word list", emoji: "📋", custom: area => renderWordList(area, list) }
    ];
}

function renderWordList(area, list) {
    area.innerHTML = `
        <input type="text" class="answer-input mb-2" id="word-search" placeholder="🔍 Search a word…" autocomplete="off">
        <div class="table-wrap"><table class="ref-table">
            <thead><tr><th>Word</th><th>Meaning</th><th></th></tr></thead>
            <tbody id="ref-rows"></tbody>
        </table></div>`;
    const rows = document.getElementById("ref-rows");
    const draw = filter => {
        rows.innerHTML = list.filter(w => w.word.toLowerCase().includes(filter)).map(w =>
            `<tr><td><b>${w.word}</b></td><td>${w.meaning}</td><td><button class="btn btn-info btn-sm say-btn" data-say="${w.word}">🔊</button></td></tr>`
        ).join("");
        rows.querySelectorAll(".say-btn").forEach(b => b.onclick = () => speak(b.dataset.say));
    };
    document.getElementById("word-search").oninput = e => draw(e.target.value.trim().toLowerCase());
    draw("");
}

function renderVerbTable(area) {
    area.innerHTML = `
        <input type="text" class="answer-input mb-2" id="verb-search" placeholder="🔍 Search a verb…" autocomplete="off">
        <div class="table-wrap"><table class="ref-table">
            <thead><tr><th>Base form</th><th>Past simple</th><th>Past participle</th><th></th></tr></thead>
            <tbody id="ref-rows"></tbody>
        </table></div>`;
    const rows = document.getElementById("ref-rows");
    const draw = filter => {
        rows.innerHTML = IRREGULAR_VERBS.filter(v => v.base.includes(filter)).map(v =>
            `<tr><td><b>${v.base}</b></td><td>${v.past.join(" / ")}</td><td>${v.pp.join(" / ")}</td>
             <td><button class="btn btn-info btn-sm say-btn" data-say="${v.base}, ${v.past.join(", ")}, ${v.pp.join(", ")}">🔊</button></td></tr>`
        ).join("");
        rows.querySelectorAll(".say-btn").forEach(b => b.onclick = () => speak(b.dataset.say));
    };
    document.getElementById("verb-search").oninput = e => draw(e.target.value.trim().toLowerCase());
    draw("");
}

QuizApp.init({
    name: "vocabulary",
    sections: [
        {
            title: "Year 5 & 6 Words", emoji: "📘",
            desc: "The 100 words every Year 5 and Year 6 pupil must know.",
            games: wordGames(YEAR56_WORDS, "voc")
        },
        {
            title: "Year 3 & 4 Words", emoji: "📗",
            desc: "The 100 Year 3 & 4 words – you still need them in Year 5!",
            games: wordGames(YEAR34_WORDS, "voc34")
        },
        {
            title: "Irregular Verbs", emoji: "🔁",
            desc: "Irregular verbs don't take -ed in the past. You have to learn them by heart!",
            games: [
                {
                    id: "irr-past", title: "Past simple", emoji: "⏪",
                    intro: "Choose the <b>past simple</b> form.<br>Example: <i>go → <b>went</b></i> (Yesterday I went to school.)",
                    make: () => IRREGULAR_VERBS.map(v => choiceQ(
                        `What is the <b>past simple</b> of <b>${v.base}</b>?`, v.past.join(" / "),
                        [naivePast(v.base), v.pp[0], v.base, v.past[0] + "ed", v.base + "s"].filter(x => !v.past.includes(x)),
                        verbForms(v)))
                },
                {
                    id: "irr-pp", title: "Past participle", emoji: "✅",
                    intro: "Choose the <b>past participle</b> (3rd form). We use it after <i>have / has / had</i>.<br>Example: <i>go → went → <b>gone</b></i> (She has gone home.)",
                    make: () => IRREGULAR_VERBS.map(v => choiceQ(
                        `What is the <b>past participle</b> of <b>${v.base}</b>?`, v.pp.join(" / "),
                        [naivePast(v.base), v.past[0], v.base, v.pp[0] + "ed", v.base + "en"].filter(x => !v.pp.includes(x)),
                        verbForms(v)))
                },
                {
                    id: "irr-type", title: "Type the form", emoji: "⌨️",
                    intro: "Type the form of the verb. Spelling counts!",
                    make: () => IRREGULAR_VERBS.map(v => Math.random() < 0.5
                        ? typeQ(`Type the <b>past simple</b> of <b>${v.base}</b>.`, v.past, verbForms(v))
                        : typeQ(`Type the <b>past participle</b> of <b>${v.base}</b>.`, v.pp, verbForms(v)))
                },
                {
                    id: "irr-sentences", title: "Verbs in sentences", emoji: "📝",
                    intro: "Type the correct form of the verb in brackets.<br>Past time word (yesterday, last…) → <b>past simple</b><br>After <i>have / has</i> → <b>past participle</b>",
                    make: () => VERB_SENTENCES.map(([s, a, e]) => typeQ(s, a, e))
                },
                {
                    id: "irr-regular", title: "Regular or irregular?", emoji: "⚖️",
                    intro: "<b>Regular</b> verbs add <b>-ed</b> in the past (play → played).<br><b>Irregular</b> verbs change in a different way (go → went).",
                    make: () => [
                        ...sample(REGULAR_VERBS, 10).map(v => choiceQ(`Is <b>${v.base}</b> regular or irregular?`, "Regular", ["Irregular"], `${v.base} → ${v.past}`)),
                        ...sample(IRREGULAR_VERBS, 10).map(v => choiceQ(`Is <b>${v.base}</b> regular or irregular?`, "Irregular", ["Regular"], verbForms(v)))
                    ]
                },
                { id: "irr-table", title: "Verb table", emoji: "📋", custom: renderVerbTable }
            ]
        }
    ]
});
