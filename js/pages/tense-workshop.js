// ===================== Tense Workshop oldal =====================
// Generált mondatok minden igeidőben + kézzel írt vegyes feladatok

// poss = birtokos névmás (Tom rides HIS bike, the children do THEIR homework)
const TW_PEOPLE = [
    { s: "I", p: "I", poss: "my" }, { s: "You", p: "pl", poss: "your" }, { s: "We", p: "pl", poss: "our", plural: true },
    { s: "They", p: "pl", poss: "their", plural: true }, { s: "He", p: "3", poss: "his" }, { s: "She", p: "3", poss: "her" },
    { s: "Tom", p: "3", poss: "his" }, { s: "My sister", p: "3", poss: "her" },
    { s: "The children", p: "pl", poss: "their", plural: true }, { s: "Our teacher", p: "3", poss: "her" }
];

// Az igealakokat kiírjuk, hogy ne kelljen helyesírási szabályokat programozni.
// Hogy minden mondatnak legyen értelme:
//   habit = a tevékenységhez illő "szokás" időhatározó (Present Simple)
//   long  = órákig tarthat (for two hours, since 10 o'clock)
//   fin   = be lehet fejezni (by tonight, by 6 o'clock)
//   out   = kint történik (nem jöhet "the lights went out" stb.)
//   never = értelmes vele a "has never …" (élmény)
//   {poss} helyére a birtokos névmás kerül; op = tárgy többes számú alanyhoz (their bikes)
const TW_ACTIONS = [
    { v: "read", s: "reads", ing: "reading", past: "read", pp: "read", o: "{poss} comic", op: "{poss} comics", habit: ["every evening", "before bed"], long: true, fin: true },
    { v: "write", s: "writes", ing: "writing", past: "wrote", pp: "written", o: "a letter to {poss} grandma", habit: ["every month"], fin: true, never: true },
    { v: "eat", s: "eats", ing: "eating", past: "ate", pp: "eaten", o: "{poss} lunch", habit: ["at 12 o'clock", "at school"], fin: true },
    { v: "play", s: "plays", ing: "playing", past: "played", pp: "played", o: "football", habit: ["on Saturdays", "after school"], long: true, out: true, never: true },
    { v: "watch", s: "watches", ing: "watching", past: "watched", pp: "watched", o: "a film", habit: ["on Friday evenings"], long: true, fin: true },
    { v: "build", s: "builds", ing: "building", past: "built", pp: "built", o: "a sandcastle", habit: ["every summer"], long: true, fin: true, out: true, never: true },
    { v: "draw", s: "draws", ing: "drawing", past: "drew", pp: "drawn", o: "a dragon", habit: ["in every art lesson"], fin: true, never: true },
    { v: "swim", s: "swims", ing: "swimming", past: "swam", pp: "swum", o: "in the lake", habit: ["every summer"], long: true, out: true, never: true },
    { v: "ride", s: "rides", ing: "riding", past: "rode", pp: "ridden", o: "{poss} bike", op: "{poss} bikes", habit: ["to school every day"], long: true, out: true },
    { v: "make", s: "makes", ing: "making", past: "made", pp: "made", o: "a cake", habit: ["every Sunday"], fin: true, never: true },
    { v: "sing", s: "sings", ing: "singing", past: "sang", pp: "sung", o: "in the school choir", habit: ["every Tuesday"], long: true, never: true },
    { v: "clean", s: "cleans", ing: "cleaning", past: "cleaned", pp: "cleaned", o: "{poss} room", op: "{poss} rooms", habit: ["every Saturday"], long: true, fin: true },
    { v: "drink", s: "drinks", ing: "drinking", past: "drank", pp: "drunk", o: "a glass of milk", habit: ["before bed", "every morning"], fin: true },
    { v: "cook", s: "cooks", ing: "cooking", past: "cooked", pp: "cooked", o: "dinner", habit: ["every evening"], long: true, fin: true, never: true },
    { v: "fly", s: "flies", ing: "flying", past: "flew", pp: "flown", o: "a kite", habit: ["on windy days"], long: true, out: true, never: true },
    { v: "take", s: "takes", ing: "taking", past: "took", pp: "taken", o: "photos of birds", habit: ["at the weekend"], long: true, out: true, never: true },
    { v: "do", s: "does", ing: "doing", past: "did", pp: "done", o: "{poss} homework", habit: ["after school", "every evening"], long: true, fin: true },
    { v: "study", s: "studies", ing: "studying", past: "studied", pp: "studied", o: "for the test", habit: ["every evening"], long: true },
    { v: "walk", s: "walks", ing: "walking", past: "walked", pp: "walked", o: "the dog", habit: ["every morning"], long: true, out: true },
    { v: "paint", s: "paints", ing: "painting", past: "painted", pp: "painted", o: "a picture of the sea", habit: ["in art lessons"], long: true, fin: true, never: true },
    { v: "visit", s: "visits", ing: "visiting", past: "visited", pp: "visited", o: "{poss} grandma", habit: ["every Sunday"], fin: true }
];

// Személy + hozzá illő tevékenység (a {poss} kicserélve). need: "long" / "fin" / "never" szűrő
function pickPA(need, people) {
    const p = pick(people || TW_PEOPLE);
    const base = pick(TW_ACTIONS.filter(a => !need || a[need]));
    return { p, a: Object.assign({}, base, { o: (p.plural && base.op ? base.op : base.o).replace("{poss}", p.poss) }) };
}

const be = p => p.p === "I" ? "am" : p.p === "3" ? "is" : "are";
const was = p => p.p === "pl" ? "were" : "was";
const have = p => p.p === "3" ? "has" : "have";
const doAux = p => p.p === "3" ? "does" : "do";

// Igeidők: név, időhatározók, alak, képlet, és hogy melyik igeidők "biztosan rosszak" ugyanazzal az időhatározóval
const TW_TENSES = {
    present_simple: {
        label: "Present Simple", markers: ["every day", "usually", "on Saturdays"], habit: true,
        form: (p, a) => p.p === "3" ? a.s : a.v,
        formula: "verb / verb + s (he, she, it)", example: "She plays football every day.",
        wrong: ["past_simple", "will", "past_continuous", "present_perfect"]
    },
    present_continuous: {
        label: "Present Continuous", markers: ["right now", "at the moment"],
        form: (p, a) => `${be(p)} ${a.ing}`,
        formula: "am / is / are + -ing", example: "She is playing football right now.",
        wrong: ["present_simple", "past_simple", "present_perfect", "will"]
    },
    past_simple: {
        label: "Past Simple", markers: ["yesterday", "last week", "two days ago"],
        form: (p, a) => a.past,
        formula: "verb + ed / irregular past", example: "She played football yesterday.",
        wrong: ["present_simple", "will", "present_perfect", "present_continuous"]
    },
    past_continuous: {
        label: "Past Continuous", markers: ["at 5 o'clock yesterday", "at this time yesterday"],
        form: (p, a) => `${was(p)} ${a.ing}`,
        formula: "was / were + -ing", example: "She was playing football when it started to rain.",
        wrong: ["present_simple", "will", "present_perfect", "present_continuous"]
    },
    present_perfect: {
        label: "Present Perfect", markers: ["already"],
        form: (p, a) => `${have(p)} ${a.pp}`,
        formula: "have / has + past participle", example: "She has already played football today.",
        wrong: ["present_simple", "will", "present_continuous", "past_continuous"]
    },
    present_perfect_continuous: {
        label: "Present Perfect Continuous", markers: ["for two hours", "since 10 o'clock"], need: "long",
        form: (p, a) => `${have(p)} been ${a.ing}`,
        formula: "have / has been + -ing", example: "She has been playing football for two hours.",
        wrong: ["present_simple", "will", "present_continuous", "future_continuous"]
    },
    past_perfect: {
        label: "Past Perfect", markers: ["before Mum came home", "before the bell rang"],
        form: (p, a) => `had ${a.pp}`,
        formula: "had + past participle", example: "She had played football before Mum came home.",
        wrong: ["present_simple", "will", "present_continuous", "present_perfect"]
    },
    past_perfect_continuous: {
        label: "Past Perfect Continuous", markers: ["for an hour before it started to rain"], need: "long",
        form: (p, a) => `had been ${a.ing}`,
        formula: "had been + -ing", example: "She had been playing for an hour before it started to rain.",
        wrong: ["present_simple", "will", "present_continuous", "present_perfect"]
    },
    will: {
        label: "Future Simple (will)", markers: ["tomorrow", "next weekend"],
        form: (p, a) => `will ${a.v}`,
        formula: "will + verb", example: "She will play football tomorrow.",
        wrong: ["past_simple", "present_perfect", "past_continuous", "present_simple"]
    },
    going_to: {
        label: "Going to (future)", markers: ["next weekend", "tomorrow"],
        form: (p, a) => `${be(p)} going to ${a.v}`,
        formula: "am / is / are going to + verb", example: "She is going to play football next weekend.",
        wrong: ["past_simple", "present_perfect", "past_continuous", "present_simple"]
    },
    future_continuous: {
        label: "Future Continuous", markers: ["at this time tomorrow"],
        form: (p, a) => `will be ${a.ing}`,
        formula: "will be + -ing", example: "She will be playing football at this time tomorrow.",
        wrong: ["past_simple", "present_perfect", "past_continuous", "present_simple"]
    },
    future_perfect: {
        label: "Future Perfect", markers: ["by tonight", "by 6 o'clock"], need: "fin",
        form: (p, a) => `will have ${a.pp}`,
        formula: "will have + past participle", example: "She will have finished her homework by 6 o'clock.",
        wrong: ["past_simple", "present_continuous", "past_continuous", "present_simple"]
    },
    future_perfect_continuous: {
        label: "Future Perfect Continuous", markers: ["for three hours by 6 o'clock"], need: "long",
        form: (p, a) => `will have been ${a.ing}`,
        formula: "will have been + -ing", example: "She will have been playing for three hours by 6 o'clock.",
        wrong: ["past_simple", "present_continuous", "past_continuous", "present_simple"]
    }
};
const TENSE_KEYS = Object.keys(TW_TENSES);
const TENSE_LABELS = TENSE_KEYS.map(k => TW_TENSES[k].label);

function randomSentence(tenseKey) {
    const t = TW_TENSES[tenseKey];
    const { p, a } = pickPA(t.need);
    // Present Simple-nél a tevékenységhez illő szokás-időhatározó kell (rides his bike to school every day)
    return { p, a, t, marker: pick(t.habit ? a.habit : t.markers), form: t.form(p, a) };
}

// Időhatározó-nyomozó: a mondatban van időhatározó, a gyerek kiválasztja az igealakot
function timeDetectiveQ() {
    const key = pick(TENSE_KEYS.filter(k => k !== "going_to" && k !== "past_perfect_continuous" && k !== "future_perfect_continuous"));
    const { p, a, t, marker, form } = randomSentence(key);
    const wrong = t.wrong.map(w => TW_TENSES[w].form(p, a)).filter(f => f !== form);
    return choiceQ(`${p.s} ___ ${a.o} <b>${marker}</b>. <span class="q-hint">(${a.v})</span>`, form, wrong,
        `<b>${marker}</b> → ${t.label}: ${t.formula}`);
}

function verbDoctorQ() {
    const key = pick(TENSE_KEYS);
    const { p, a, t, marker, form } = randomSentence(key);
    return typeQ(`${p.s} ___ (${a.v}) ${a.o} <b>${marker}</b>.`, form, `${t.label}: ${t.formula}`,
        { choices: TENSE_KEYS.map(k => TW_TENSES[k].form(p, a)), hint: `Use the <b>${t.label}</b>. Write the full form (no short forms like 's or 're).` });
}

function spotTenseQ() {
    const key = pick(TENSE_KEYS);
    const { p, a, t, marker, form } = randomSentence(key);
    return choiceQ(`Which tense is this?<br><i>${p.s} ${form} ${a.o} ${marker}.</i>`, t.label,
        TENSE_LABELS.filter(l => l !== t.label), `${t.label}: ${t.formula}`);
}

// Tagadás: helyes és tipikusan rossz tagadó mondatok
function negativeQ() {
    const { p, a } = pickPA();
    const S = p.s;
    const kind = pick(["ps", "past", "pc", "pp", "will"]);
    let positive, right, wrong, explain;
    if (kind === "ps") {
        const d = doAux(p), other = d === "does" ? "don't" : "doesn't", h = pick(a.habit);
        positive = `${S} ${p.p === "3" ? a.s : a.v} ${a.o} ${h}.`;
        right = `${S} ${d}n't ${a.v} ${a.o} ${h}.`;
        wrong = [`${S} ${other} ${a.v} ${a.o} ${h}.`, `${S} ${d}n't ${a.s} ${a.o} ${h}.`, `${S} not ${p.p === "3" ? a.s : a.v} ${a.o} ${h}.`];
        explain = "Present Simple negative: <b>don't / doesn't + verb</b> (no -s after doesn't!)";
    } else if (kind === "past") {
        positive = `${S} ${a.past} ${a.o} yesterday.`;
        right = `${S} didn't ${a.v} ${a.o} yesterday.`;
        wrong = [`${S} didn't ${a.past} ${a.o} yesterday.`, `${S} don't ${a.v} ${a.o} yesterday.`, `${S} not ${a.past} ${a.o} yesterday.`];
        explain = "Past Simple negative: <b>didn't + verb</b> (the verb goes back to its base form).";
    } else if (kind === "pc") {
        const b = be(p);
        const neg = b === "am" ? "am not" : b + "n't";
        positive = `${S} ${b} ${a.ing} ${a.o} right now.`;
        right = `${S} ${neg} ${a.ing} ${a.o} right now.`;
        wrong = [`${S} ${doAux(p)}n't ${a.ing} ${a.o} right now.`, `${S} not ${a.ing} ${a.o} right now.`, `${S} ${b} ${a.ing} not ${a.o} right now.`];
        explain = "Present Continuous negative: <b>am not / isn't / aren't + -ing</b>.";
    } else if (kind === "pp") {
        const h = have(p);
        positive = `${S} ${h} already ${a.pp} ${a.o}.`;
        right = `${S} ${h}n't ${a.pp} ${a.o} yet.`;
        wrong = [`${S} ${h}n't ${a.past} ${a.o} yet.`, `${S} didn't ${a.pp} ${a.o} yet.`, `${S} not ${h} ${a.pp} ${a.o} yet.`];
        explain = "Present Perfect negative: <b>haven't / hasn't + past participle</b> … <b>yet</b>.";
    } else {
        positive = `${S} will ${a.v} ${a.o} tomorrow.`;
        right = `${S} won't ${a.v} ${a.o} tomorrow.`;
        wrong = [`${S} will ${a.v} not ${a.o} tomorrow.`, `${S} won't ${a.s} ${a.o} tomorrow.`, `${S} don't will ${a.v} ${a.o} tomorrow.`];
        explain = "Future negative: <b>won't (will not) + verb</b>.";
    }
    return choiceQ(`Make it negative:<br><i>${positive}</i>`, right, wrong, explain);
}

// Kérdés: szórendi feladat
function lowerSubject(s) { return ["I", "Tom"].includes(s) ? s : s.charAt(0).toLowerCase() + s.slice(1); }
function questionQ() {
    // kérdésben "I" helyett a többi személy, és a "you" a kérdezett (your bike)
    const { p, a } = pickPA(null, TW_PEOPLE.filter(x => !["I", "We"].includes(x.s)));
    const s = lowerSubject(p.s);
    const kind = pick(["ps", "past", "pc", "pp", "will", "going_to"]);
    const q = {
        ps: [`${capitalize(doAux(p))} ${s} ${a.v} ${a.o} ${pick(a.habit)}?`, "Present Simple: <b>Do / Does</b> + subject + verb?"],
        past: [`Did ${s} ${a.v} ${a.o} yesterday?`, "Past Simple: <b>Did</b> + subject + verb?"],
        pc: [`${capitalize(be(p))} ${s} ${a.ing} ${a.o} right now?`, "Present Continuous: <b>Am / Is / Are</b> + subject + -ing?"],
        pp: [`${capitalize(have(p))} ${s} already ${a.pp} ${a.o}?`, "Present Perfect: <b>Have / Has</b> + subject + (already) + past participle?"],
        will: [`Will ${s} ${a.v} ${a.o} tomorrow?`, "Future: <b>Will</b> + subject + verb?"],
        going_to: [`${capitalize(be(p))} ${s} going to ${a.v} ${a.o} next weekend?`, "Going to: <b>Am / Is / Are</b> + subject + going to + verb?"]
    }[kind];
    return orderQ("Put the words in order to make a question.", q[0], q[1]);
}

// Vegyes igeidős mondatok: [mondat, elfogadott válaszok, magyarázat]
const MIXED_TENSES = [
    ["Look! It ___ (snow)!", ["is snowing"], "Look! → Present Continuous"],
    ["Water ___ (boil) at 100 degrees.", ["boils"], "A fact → Present Simple"],
    ["Yesterday we ___ (visit) the zoo.", ["visited"], "yesterday → Past Simple"],
    ["I ___ (live) in this town since 2018.", ["have lived", "have been living"], "since + still true → Present Perfect"],
    ["While I ___ (walk) home, it started to rain.", ["was walking"], "An action in progress in the past → Past Continuous"],
    ["By the time we arrived, the film ___ (already start).", ["had already started"], "Earlier than another past action → Past Perfect"],
    ["Next summer we ___ (go) to Italy. We've already bought the tickets.", ["are going to go", "are going", "will go"], "A plan → going to / Present Continuous (will go is also OK)"],
    ["I think it ___ (rain) tomorrow.", ["will rain"], "I think… → Future Simple (will)"],
    ["She usually ___ (get up) at 7 o'clock.", ["gets up"], "usually → Present Simple"],
    ["Have you ever ___ (see) a ghost?", ["seen"], "Have you ever…? → past participle"],
    ["Shh! The baby ___ (sleep).", ["is sleeping"], "Happening now → Present Continuous"],
    ["When I was little, I ___ (not like) vegetables.", ["didn't like", "did not like"], "Past Simple negative: didn't + verb"],
    ["We ___ (wait) for the bus for twenty minutes now!", ["have been waiting"], "Started in the past and still going → Present Perfect Continuous"],
    ["This time next week, I ___ (lie) on a beach.", ["will be lying"], "This time next week → Future Continuous"],
    ["By 2030, scientists ___ (find) a cure.", ["will have found"], "By + future time → Future Perfect"],
    ["Tom ___ (break) his leg last winter.", ["broke"], "last winter → Past Simple"],
    ["Have you ___ (finish) your homework yet?", ["finished"], "Have you…yet? → past participle"],
    ["My grandparents ___ (meet) in 1970.", ["met"], "in 1970 → Past Simple"],
    ["Look at those dark clouds! It ___ (rain).", ["is going to rain"], "We can see it coming → going to"],
    ["The sun ___ (rise) in the east.", ["rises"], "A fact → Present Simple"],
    ["I ___ (read) this book twice already.", ["have read"], "already → Present Perfect"],
    ["At 9 o'clock last night, I ___ (watch) TV.", ["was watching"], "At a time in the past → Past Continuous"],
    ["She was tired because she ___ (run) for an hour.", ["had been running", "had run"], "Before a past moment, for a long time → Past Perfect Continuous"],
    ["My mum ___ (work) in a hospital.", ["works"], "A permanent fact → Present Simple"],
    ["Listen! Someone ___ (knock) at the door.", ["is knocking"], "Listen! → Present Continuous"],
    ["We ___ (not go) to school tomorrow. It's a holiday.", ["aren't going", "are not going", "won't go", "will not go"], "Future negative"]
];

// Válaszlehetőségek a vegyes feladatokhoz (ugyanabban a sorrendben, mint MIXED_TENSES).
// Csak olyan alakok, amelyek az adott mondatban biztosan rosszak.
const MIXED_CHOICES = [
    ["snows", "snowed", "was snowing"], ["is boiling", "boiled", "boil"], ["visit", "have visited", "were visiting"],
    ["lived", "live", "am living"], ["walked", "am walking", "walk"], ["already started", "has already started", "already starts"],
    ["go", "went", "have gone"], ["rains", "rained", "is raining"], ["get up", "is getting up", "got up"],
    ["saw", "see", "seeing"], ["sleeps", "slept", "sleep"], ["don't like", "didn't liked", "not liked"],
    ["wait", "waited", "are waiting"], ["lay", "am lying", "lying"], ["found", "have found", "finds"],
    ["breaks", "has broken", "break"], ["finish", "finishing", "finishes"], ["meet", "have met", "meets"],
    ["rains", "rained", "rain"], ["rise", "rose", "is rise"], ["reads", "am reading", "reading"],
    ["watch", "am watching", "watches"], ["runs", "is running", "run"], ["work", "working", "is work"],
    ["knocks", "knocked", "knock"], ["not go", "don't going", "isn't going"]
];

// Időhatározók és igeidők: [jelzőszó, igeidő kulcs]
const SIGNAL_WORDS = [
    ["every day", "present_simple"], ["usually / often / always", "present_simple"],
    ["now / right now / at the moment", "present_continuous"], ["Look! / Listen!", "present_continuous"],
    ["yesterday", "past_simple"], ["last week / last year", "past_simple"], ["… ago (two days ago)", "past_simple"],
    ["in 2010", "past_simple"], ["at 5 o'clock yesterday", "past_continuous"],
    ["while … (an action in progress in the past)", "past_continuous"],
    ["already / yet / just", "present_perfect"], ["ever / never", "present_perfect"],
    ["for two hours / since this morning (still going)", "present_perfect_continuous"],
    ["by the time … (in the past)", "past_perfect"], ["tomorrow / I think … / probably", "will"],
    ["Look at those clouds! (we can see it coming)", "going_to"],
    ["this time tomorrow", "future_continuous"], ["by 6 o'clock tonight", "future_perfect"]
];

function renderTenseTable(area) {
    area.innerHTML = `
        <div class="table-wrap"><table class="ref-table">
            <thead><tr><th>Tense</th><th>Form</th><th>Example</th><th>Signal words</th></tr></thead>
            <tbody>${TENSE_KEYS.map(k => {
                const t = TW_TENSES[k];
                return `<tr><td><b>${t.label}</b></td><td>${t.formula}</td><td><i>${t.example}</i></td><td>${t.markers.join(", ")}</td></tr>`;
            }).join("")}</tbody>
        </table></div>`;
}

// ---------- Két igeidő összehasonlítása (véletlen mondatokkal) ----------
function simpleOrContinuousQ() {
    const { p, a } = pickPA();
    const ps = TW_TENSES.present_simple.form(p, a), pc = TW_TENSES.present_continuous.form(p, a);
    if (Math.random() < 0.5) {
        const m = pick(a.habit);
        return choiceQ(`${p.s} ___ ${a.o} <b>${m}</b>.`, ps, [pc], "A habit or routine → <b>Present Simple</b>.");
    }
    const m = pick(["right now", "at the moment", "now"]);
    return choiceQ(`${p.s} ___ ${a.o} <b>${m}</b>.`, pc, [ps], "Happening now → <b>Present Continuous</b> (am / is / are + -ing).");
}

// in: csak bent történhet (pl. kint úszás közben nem "a bird flew into the room")
// out: csak kint; ing: a was/were + -ing alak a rossz válaszhoz
const INTERRUPTIONS = [
    { s: "the phone", v: "ring", past: "rang", ing: "ringing", rest: "", in: true },
    { s: "the lights", v: "go", past: "went", ing: "going", rest: " out", in: true },
    { s: "the doorbell", v: "ring", past: "rang", ing: "ringing", rest: "", in: true },
    { s: "a bird", v: "fly", past: "flew", ing: "flying", rest: " into the room", in: true },
    { s: "it", v: "start", past: "started", ing: "starting", rest: " to rain" },
    { s: "Mum", v: "come", past: "came", ing: "coming", rest: " home", in: true },
    { s: "a dog", v: "run", past: "ran", ing: "running", rest: " past", out: true },
    { s: "a strong wind", v: "blow", past: "blew", ing: "blowing", rest: " through the trees", out: true }
];
function whenWhileQ() {
    const { p, a } = pickPA();
    const i = pick(INTERRUPTIONS.filter(x => a.out ? !x.in : !x.out));
    const long = `${was(p)} ${a.ing}`;
    if (Math.random() < 0.5) {
        return choiceQ(`<b>While</b> ${lowerSubject(p.s)} ___ (${a.v}) ${a.o}, ${i.s} ${i.past}${i.rest}.`, long, [`${be(p)} ${a.ing}`, `${was(p) === "was" ? "were" : "was"} ${a.ing}`],
            "The long action in progress → <b>Past Continuous</b> (was / were + -ing). <b>While</b> often goes with it.");
    }
    return choiceQ(`${p.s} ${long} ${a.o} <b>when</b> ${i.s} ___ (${i.v})${i.rest}.`, i.past, [`will ${i.v}`, i.s === "the lights" ? "go" : i.v === "fly" ? "flies" : i.v + "s"],
        "The short action that interrupts → <b>Past Simple</b>. <b>When</b> often goes with it.");
}

function pastOrPerfectQ() {
    const m = pick(["past", "never", "just", "already"]);
    // "has never …" csak élmény-szerű tevékenységgel értelmes (never made a cake, de nem: never eaten his lunch)
    const { p, a } = pickPA(m === "never" ? "never" : null);
    if (m === "past") {
        const t = pick(["yesterday", "last weekend", "two days ago"]);
        return choiceQ(`${p.s} ___ ${a.o} <b>${t}</b>. <span class="q-hint">(${a.v})</span>`, a.past, [`${have(p)} ${a.pp}`],
            `A finished time in the past (<b>${t}</b>) → <b>Past Simple</b>.`);
    }
    return choiceQ(`${p.s} ___ ${a.o}. <span class="q-hint">(${m} + ${a.v})</span>`, `${have(p)} ${m} ${a.pp}`, [`${have(p)} ${m} ${a.ing}`, `${have(p)} ${m} ${a.past}`, `${have(p)} ${m} ${a.v}`],
        `<b>${m}</b> → <b>Present Perfect</b> (have / has + ${m} + past participle).`);
}

const repeat = (fn, n) => Array.from({ length: n }, fn);

QuizApp.init({
    name: "tense-workshop",
    sections: [
        {
            title: "Tense Games", emoji: "⏰",
            desc: "Practise all the English tenses. Look for the <b>signal words</b> – they tell you which tense to use!",
            games: [
                {
                    id: "tw-detective", title: "Time detective", emoji: "🕵️",
                    intro: "Find the <b>time word</b> in the sentence, then choose the right verb form.<br><i>every day</i> → Present Simple · <i>right now</i> → Present Continuous · <i>yesterday</i> → Past Simple · <i>already</i> → Present Perfect · <i>tomorrow</i> → will",
                    make: () => repeat(timeDetectiveQ, 10)
                },
                {
                    id: "tw-doctor", title: "Verb doctor", emoji: "🩺",
                    intro: "Type the verb in the tense shown. Use the full form (<i>is playing</i>, not <i>'s playing</i>).",
                    make: () => repeat(verbDoctorQ, 10)
                },
                {
                    id: "tw-spot", title: "Spot the tense", emoji: "🔎",
                    intro: "Read the sentence and choose its tense.",
                    make: () => repeat(spotTenseQ, 10)
                },
                {
                    id: "tw-negative", title: "Make it negative", emoji: "🚫",
                    intro: "<b>don't / doesn't</b> + verb &nbsp;·&nbsp; <b>didn't</b> + verb &nbsp;·&nbsp; <b>isn't / aren't / am not</b> + -ing &nbsp;·&nbsp; <b>haven't / hasn't</b> + past participle &nbsp;·&nbsp; <b>won't</b> + verb",
                    make: () => repeat(negativeQ, 10)
                },
                {
                    id: "tw-questions", title: "Ask a question", emoji: "❓",
                    intro: "Put the words in order. In questions, the <b>helping verb comes first</b>: <i><b>Does</b> Tom play…? <b>Did</b> you go…? <b>Are</b> they reading…?</i>",
                    make: () => repeat(questionQ, 10)
                },
                {
                    id: "tw-simple-cont", title: "Simple or continuous?", emoji: "🔁",
                    intro: "<b>Present Simple</b> – habits, routines: <i>I play football every day.</i><br><b>Present Continuous</b> – happening now: <i>I am playing football right now.</i>",
                    make: () => repeat(simpleOrContinuousQ, 10)
                },
                {
                    id: "tw-when-while", title: "When and while", emoji: "⚡",
                    intro: "<b>Past Continuous</b> = the long action: <i>I <b>was reading</b>…</i><br><b>Past Simple</b> = the short action that interrupts: <i>…when the phone <b>rang</b>.</i>",
                    make: () => repeat(whenWhileQ, 10)
                },
                {
                    id: "tw-past-perfect", title: "Past or present perfect?", emoji: "🕰️",
                    intro: "<b>Past Simple</b> – a finished time: <i>I visited Paris <b>last year</b>.</i><br><b>Present Perfect</b> – no exact time (ever, never, just, already): <i>I <b>have never visited</b> Paris.</i>",
                    make: () => repeat(pastOrPerfectQ, 10)
                },
                {
                    id: "tw-mixed", title: "Mixed tenses", emoji: "🌈",
                    intro: "Every sentence needs a different tense. Read the clues carefully and type the verb.",
                    make: () => MIXED_TENSES.map(([s, a, e], i) => typeQ(s, a, e, { choices: MIXED_CHOICES[i] }))
                },
                {
                    id: "tw-signal", title: "Signal words", emoji: "🚥",
                    intro: "Which tense goes with these words?",
                    make: () => SIGNAL_WORDS.map(([w, k]) => choiceQ(
                        `Which tense goes with <b>${w}</b>?`, TW_TENSES[k].label,
                        TENSE_LABELS.filter(l => l !== TW_TENSES[k].label), `${TW_TENSES[k].label}: <i>${TW_TENSES[k].example}</i>`))
                },
                { id: "tw-table", title: "Tense table", emoji: "📋", custom: renderTenseTable }
            ]
        }
    ]
});
