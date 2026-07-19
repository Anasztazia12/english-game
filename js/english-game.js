// ===================== Data =====================

// Folyamatos igeidők (itt "have" csak étkezés értelemben állhat folyamatosban, "like" pedig
// állapotige, sosem áll folyamatos alakban helyesen, pl. "is liking" nem helyes angol).
const continuousTenses = [
    "present_continuous", "past_continuous", "future_continuous",
    "present_perfect_continuous", "past_perfect_continuous", "future_perfect_continuous"
];

// Szűrő logika: csak értelmes subject-verb-object kombinációk engedélyezése
function isValidSentence(subj, verb, obj, tense) {
    if (continuousTenses.includes(tense)) {
        if (verb === "like") return false;
        if (verb === "have" && !["breakfast", "a cake"].includes(obj)) return false;
    }
    // "The dog" csak "play" (with the ball/friends/in the garden) vagy "have" (a ball/friends) igével-tárggyal helyes
    if (subj === "The dog") {
        if (verb === "have" && ["a ball", "friends"].includes(obj)) return true;
        if (verb === "play" && ["with the ball", "with friends", "in the garden"].includes(obj)) return true;
        return false;
    }
    // "The children" nem "eat" "the ball"-t vagy "friends"-t
    if (["The children", "Anna", "My brother", "He", "She"].includes(subj)) {
        if (["the ball", "friends"].includes(obj) && ["eat"].includes(verb)) return false;
    }
    // "Anna", "My brother", "He", "She" nem "eat" "the ball" vagy "friends"
    if (["Anna", "My brother", "He", "She"].includes(subj) && verb === "eat" && ["the ball", "friends"].includes(obj)) return false;
    // "I", "You", "We", "They" nem "eat" "the ball"
    if (["I", "You", "We", "They"].includes(subj) && verb === "eat" && obj === "the ball") return false;
    // "read" csak "a book", "a letter", "a story"
    if (verb === "read" && !["a book", "a letter", "a story"].includes(obj)) return false;
    // "play with the ball" csak "We", "They", "The children" (a "The dog" esetét fentebb már kezeltük)
    if (verb === "play" && obj === "with the ball" && !["We", "They", "The children"].includes(subj)) return false;
    // "eat" csak "a cake", "breakfast"
    if (verb === "eat" && !["a cake", "breakfast"].includes(obj)) return false;
    // "have" nem "music", "a song", "the piano"
    if (verb === "have" && ["music", "a song", "the piano"].includes(obj)) return false;
    // "go" nem "music", "a song", "the piano", "the ball"
    if (verb === "go" && ["music", "a song", "the piano", "the ball"].includes(obj)) return false;
    // Egyébként engedjük át
    return true;
}
const combos = [
    {subj: ["I","You","He","She","We","They","Anna","My brother","The children"], verb: "go", objs: ["to the park", "to school", "home", "to the garden"]},
    {subj: ["I","You","He","She","We","They","Anna","My brother","The dog"], verb: "eat", objs: ["a cake", "breakfast"]},
    // play (person: music, song, piano; dog: ball, garden, friends)
    {subj: ["I","You","We","They","Anna","My brother","The children"], verb: "play", objs: ["music", "a song", "the piano", "with friends", "in the garden"]},
    {subj: ["He","She"], verb: "play", objs: ["music", "a song", "the piano"]},
    {subj: ["The dog"], verb: "play", objs: ["with the ball", "with friends", "in the garden"]},
    // play with the ball only: We, They, The children
    {subj: ["We","They","The children"], verb: "play", objs: ["with the ball"]},
    {subj: ["I","You","He","She","We","They","Anna","My brother","The children"], verb: "read", objs: ["a book", "a letter", "a story"]},
    {subj: ["I","You","He","She","We","They","Anna","My brother","The children"], verb: "have", objs: ["breakfast", "a book", "homework", "a cake"]},
    {subj: ["The dog"], verb: "have", objs: ["a ball", "friends"]},
    {subj: ["I","You","He","She","We","They","Anna","My brother","The children"], verb: "like", objs: ["music", "a book", "breakfast", "a song", "the ball", "the piano", "the park", "friends"]}
];
// easy: csak egyszerű igeidők
const tensesEasy = ["present_simple", "past_simple", "future_simple"];
// medium: easy + folyamatos igeidők + mindkét jövő (will, going_to)
const tensesMedium = [
    "present_simple", "past_simple", "future_simple",
    "present_continuous", "past_continuous", "future_continuous",
    "going_to", "will"
];
// hard: mind a 12 angol igeidő
const tensesHard = [
    "present_simple", "past_simple", "future_simple",
    "present_continuous", "past_continuous", "future_continuous",
    "present_perfect", "past_perfect", "future_perfect",
    "present_perfect_continuous", "past_perfect_continuous", "future_perfect_continuous",
    "going_to", "will"
];

function generateOrderQuestions(tense, count) {
    let questions = [];
    for (let i = 0; i < count; i++) {
        let subj, verb, obj, verbObj;
        let valid = false;
        while (!valid) {
            const combo = combos[Math.floor(Math.random() * combos.length)];
            subj = combo.subj[Math.floor(Math.random() * combo.subj.length)];
            verbObj = verbs.find(v => v.base === combo.verb);
            verb = combo.verb;
            obj = combo.objs[Math.floor(Math.random() * combo.objs.length)];
            if (!isValidSentence(subj, verb, obj, tense)) continue;
            valid = true;
        }
        let sentence = "";
        if (tense === "present_simple") {
            const verbForm = (["He", "She", "Anna", "My brother", "The dog"].includes(subj) ? verbObj.present[1] : verbObj.present[0]);
            sentence = `${subj} ${verbForm} ${obj}.`;
        } else if (tense === "past_simple") {
            sentence = `${subj} ${verbObj.past} ${obj} yesterday.`;
        } else if (tense === "future_simple") {
            sentence = `${subj} will ${verbObj.base} ${obj} tomorrow.`;
        } else if (tense === "present_continuous") {
            let be = (["He", "She", "Anna", "My brother", "The dog"].includes(subj) ? "is" : (["I"].includes(subj) ? "am" : "are"));
            sentence = `${subj} ${be} ${verbObj.ing} ${obj} now.`;
        } else if (tense === "past_continuous") {
            let was = (["He", "She", "Anna", "My brother", "The dog", "I"].includes(subj) ? "was" : "were");
            sentence = `${subj} ${was} ${verbObj.ing} ${obj} yesterday at 5.`;
        } else if (tense === "future_continuous") {
            sentence = `${subj} will be ${verbObj.ing} ${obj} tomorrow at 5.`;
        } else if (tense === "present_perfect") {
            let have = (["He", "She", "Anna", "My brother", "The dog"].includes(subj) ? "has" : "have");
            sentence = `${subj} ${have} ${verbObj.pp} ${obj} today.`;
        } else if (tense === "past_perfect") {
            sentence = `${subj} had ${verbObj.pp} ${obj} before.`;
        } else if (tense === "future_perfect") {
            sentence = `${subj} will have ${verbObj.pp} ${obj} by tomorrow.`;
        } else if (tense === "present_perfect_continuous") {
            let have = (["He", "She", "Anna", "My brother", "The dog"].includes(subj) ? "has" : "have");
            sentence = `${subj} ${have} been ${verbObj.ing} ${obj} for an hour.`;
        } else if (tense === "past_perfect_continuous") {
            sentence = `${subj} had been ${verbObj.ing} ${obj} before 6.`;
        } else if (tense === "future_perfect_continuous") {
            sentence = `${subj} will have been ${verbObj.ing} ${obj} for two hours by tomorrow.`;
        } else if (tense === "going_to") {
            let be = (["He", "She", "Anna", "My brother", "The dog"].includes(subj) ? "is" : (["I"].includes(subj) ? "am" : "are"));
            sentence = `${subj} ${be} going to ${verbObj.base} ${obj} tomorrow.`;
        } else if (tense === "will") {
            sentence = `${subj} will ${verbObj.base} ${obj} tomorrow.`;
        }
        const words = sentence.replace('.', '').split(' ');
        questions.push({ words, answer: sentence });
    }
    return questions;
}
// english-game.js

// ===================== Data =====================
const subjects = ["I", "You", "He", "She", "We", "They", "My brother", "The dog", "Anna", "The children"];
const verbObjects = {
    go: ["to the park", "to school", "home", "to the garden", "to the piano", "with friends", "fast", "well", "every day", "yesterday", "now", "at school", "in the garden", "in the morning"],
    eat: ["a cake", "breakfast", "a letter", "homework"],
    play: ["music", "a song", "the piano", "the ball", "with friends", "in the garden"],
    read: ["a book", "a letter", "homework", "at school", "in the morning"],
    have: ["breakfast", "a book", "homework", "a cake", "a letter", "music", "a song", "the ball", "the piano", "friends"],
    like: ["music", "a book", "breakfast", "a song", "the ball", "the piano", "a letter", "the park", "friends", "playing", "reading", "eating", "going"]
};
// const objects = Array.from(new Set(Object.values(verbObjects).flat())); // unused, removed
const verbs = [
    { base: "go", present: ["go","goes"], ing:"going", past:"went", pp:"gone" },
    { base: "eat", present:["eat","eats"], ing:"eating", past:"ate", pp:"eaten" },
    { base:"play", present:["play","plays"], ing:"playing", past:"played", pp:"played" },
    { base:"read", present:["read","reads"], ing:"reading", past:"read", pp:"read" },
    { base:"have", present:["have","has"], ing:"having", past:"had", pp:"had" },
    { base:"like", present:["like","likes"], ing:"liking", past:"liked", pp:"liked" }
];
const colors = ["primary", "success", "danger", "warning", "info"];

const QUESTIONS_PER_STEP = 10;

const tenseLabels = {
    present_simple: "Present Simple",
    past_simple: "Past Simple",
    future_simple: "Future Simple",
    present_continuous: "Present Continuous",
    past_continuous: "Past Continuous",
    future_continuous: "Future Continuous",
    present_perfect: "Present Perfect",
    past_perfect: "Past Perfect",
    future_perfect: "Future Perfect",
    present_perfect_continuous: "Present Perfect Continuous",
    past_perfect_continuous: "Past Perfect Continuous",
    future_perfect_continuous: "Future Perfect Continuous",
    going_to: "Going to (future)",
    will: "Will (future)"
};

// Rövid, gyerekeknek szóló, nyelvtanilag helyes olvasmányok igeidőnként.
// Igeidőnként 4 változat van, hogy ismétlődő gyakorlásnál ne mindig ugyanazt lássa a felhasználó.
const tenseTexts = {
    present_simple: [
        "I go to school every day. My brother reads books every evening. We like our English teacher very much.",
        "Anna plays with her friends in the garden every afternoon. She has a big red ball. The dog likes the ball too.",
        "We eat breakfast together every morning. My brother has cereal, and I have toast. Then we go to school.",
        "The children play in the park every weekend. They like games with a ball. Their dog plays with them too."
    ],
    past_simple: [
        "Yesterday, I went to the park with my brother. We played with a ball for an hour. Then we ate a cake at home.",
        "Anna read a new book yesterday. She liked the story very much. After that, she had dinner with her family.",
        "The children played in the garden yesterday. They had a lot of fun. The dog played with them too.",
        "Yesterday, we went to school early. We had a big breakfast first. Then we read our English books together."
    ],
    future_simple: [
        "Tomorrow, I will go to the park. I will play with my friends there. We will eat a cake after that.",
        "My brother will read a new book tomorrow. He will like the story, I think. Then he will have dinner with us.",
        "Anna will play with the dog tomorrow. The dog will have a lot of fun. They will go to the garden together.",
        "Tomorrow, the children will go to school. They will have an English lesson. After school, they will play in the park."
    ],
    present_continuous: [
        "Look! I am going to the park now. My brother is playing with the dog. We are having a lot of fun.",
        "Anna is reading a book right now. She is eating an apple too. The children are playing in the garden.",
        "We are having breakfast now. My brother is eating a cake. I am reading the newspaper.",
        "The dog is playing with a ball now. Anna is going to the shop. The children are having lunch at school."
    ],
    past_continuous: [
        "Yesterday at five, I was going to the park. My brother was playing with the dog. We were having a great afternoon.",
        "Anna was reading a book at six o'clock. The children were playing in the garden then. Their dog was eating its dinner.",
        "We were having breakfast at eight yesterday. My brother was eating toast. I was reading a story book.",
        "The dog was playing with a ball at that time. Anna was going home. The children were having fun in the park."
    ],
    future_continuous: [
        "This time tomorrow, I will be going to the park. My brother will be playing with the dog. We will be having lots of fun.",
        "Tomorrow at five, Anna will be reading her new book. The children will be playing in the garden. Their dog will be eating its dinner.",
        "This time tomorrow, we will be having breakfast together. My brother will be eating his favourite cereal. I will be reading the morning news.",
        "Tomorrow afternoon, the dog will be playing with a ball. Anna will be going to school. The children will be having a picnic."
    ],
    present_perfect: [
        "I have eaten my breakfast today. My brother has read a new book. We have had a great morning.",
        "Anna has played with the dog today. She has liked every minute of it. The children have gone to the park too.",
        "We have had a busy day today. My brother has eaten a big lunch. I have read three pages of my book.",
        "The children have played in the garden today. Their dog has eaten its dinner. Anna has liked the sunny weather."
    ],
    past_perfect: [
        "Before dinner, I had eaten a snack. My brother had read his book already. We had had a busy day before that.",
        "Anna had played with the dog before lunch. She had liked the game very much. The children had gone home before dark.",
        "We had had breakfast before school. My brother had eaten quickly. I had read my homework the night before.",
        "The dog had eaten its food before Anna came home. The children had played outside before dinner. Anna had liked the surprise before she left."
    ],
    future_perfect: [
        "By tomorrow, I will have eaten all my breakfast. My brother will have read his new book. We will have had a busy week.",
        "By next week, Anna will have played every game. She will have liked most of them. The children will have gone to the park many times.",
        "By tomorrow evening, we will have had dinner together. My brother will have eaten his favourite meal. I will have read two more chapters.",
        "By the weekend, the dog will have eaten all its food. The children will have played outside a lot. Anna will have liked every game."
    ],
    present_perfect_continuous: [
        "I have been playing in the park for an hour. My brother has been reading for a while too. We have been having a lot of fun.",
        "Anna has been reading her book for an hour. The children have been playing outside all morning. Their dog has been eating its treats slowly.",
        "We have been having breakfast for twenty minutes. My brother has been eating very slowly today. I have been reading the same page for ages.",
        "The dog has been playing with its ball for an hour. Anna has been going to the shop and back. The children have been having fun all day."
    ],
    past_perfect_continuous: [
        "I had been playing outside before six yesterday. My brother had been reading for an hour before that. We had been having a great afternoon.",
        "Anna had been reading her book before dinner. The children had been playing in the garden before it got dark. Their dog had been eating its food before they came home.",
        "We had been having breakfast before the phone rang. My brother had been eating slowly before that. I had been reading my book for a while.",
        "The dog had been playing with its ball before it got tired. Anna had been going for a walk before lunch. The children had been having fun before the rain started."
    ],
    future_perfect_continuous: [
        "By tomorrow, I will have been playing this game for two hours. My brother will have been reading for a long time too. We will have been having fun all day.",
        "By next week, Anna will have been reading that book for two hours every day. The children will have been playing outside a lot. Their dog will have been eating well all week.",
        "By tomorrow evening, we will have been having lessons for three hours. My brother will have been eating snacks all day. I will have been reading since morning.",
        "By the end of the trip, the dog will have been playing with its ball for hours. Anna will have been going to the park every day. The children will have been having a wonderful time."
    ],
    going_to: [
        "I am going to go to the park tomorrow. My brother is going to play with the dog. We are going to have a picnic.",
        "Anna is going to read a new book tomorrow. She is going to like it, I am sure. The children are going to go to the park too.",
        "We are going to have breakfast early tomorrow. My brother is going to eat pancakes. I am going to read my favourite book.",
        "The dog is going to play with its ball tomorrow. Anna is going to go to school. The children are going to have a fun day."
    ],
    will: [
        "I will go to my friend's house tomorrow. My brother will play football there. We will have a great time.",
        "Anna will read her book on the bus tomorrow. She will like the new story. The children will go to the zoo next week.",
        "We will have a party tomorrow. My brother will eat a big piece of cake. I will read a poem for everyone.",
        "The dog will play in the garden tomorrow. Anna will go to her grandmother's house. The children will have lots of fun there."
    ]
};

let difficulty = 'easy';
let currentTense = null;
let currentStep = 'fill'; // 'fill' vagy 'order'
let fillQuestions = [];
let orderQuestions = [];
let current = 0;
let fillScore = 0;
let orderScore = 0;

// ===================== SEGÉD FUNKCIÓK =====================
const allScreens = ['start-area', 'difficulty-select', 'tense-select', 'text-area', 'game-area', 'game-nav', 'final-actions'];
function hideAllScreens() {
    allScreens.forEach(id => document.getElementById(id).style.display = 'none');
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('feedback').className = '';
    document.getElementById('next-btn').style.display = 'none';
}

function showDifficultySelect() {
    hideAllScreens();
    document.getElementById('difficulty-select').style.display = '';
}

function chooseDifficulty(newDiff) {
    difficulty = newDiff;
    hideAllScreens();
    showTenseSelect();
}

function tensesForDifficulty() {
    if (difficulty === 'easy') return tensesEasy;
    if (difficulty === 'medium') return tensesMedium;
    return tensesHard;
}

function showTenseSelect() {
    const tenses = tensesForDifficulty();
    const container = document.getElementById('tense-buttons');
    container.innerHTML = '';
    tenses.forEach((t, i) => {
        const btn = document.createElement('button');
        btn.textContent = tenseLabels[t];
        btn.className = "btn btn-" + colors[i % colors.length] + " m-2";
        btn.onclick = () => chooseTense(t);
        container.appendChild(btn);
    });
    document.getElementById('tense-select').style.display = '';
}

function chooseTense(t) {
    currentTense = t;
    hideAllScreens();
    showReadingText();
}

function showReadingText() {
    const texts = tenseTexts[currentTense];
    const text = texts[Math.floor(Math.random() * texts.length)];
    document.getElementById('text-title').textContent = tenseLabels[currentTense];
    document.getElementById('reading-text').textContent = text;
    document.getElementById('text-area').style.display = '';
}

function startFillPractice() {
    fillQuestions = generateFillQuestions(currentTense, QUESTIONS_PER_STEP);
    orderQuestions = generateOrderQuestions(currentTense, QUESTIONS_PER_STEP);
    current = 0;
    fillScore = 0;
    orderScore = 0;
    currentStep = 'fill';
    answerLocked = false;
    orderAnswerLocked = false;
    hideAllScreens();
    document.getElementById('game-area').style.display = '';
    document.getElementById('game-nav').style.display = '';
    showQuestion();
}

function goHome() {
    hideAllScreens();
    document.getElementById('start-area').style.display = '';
}

function backToTense() { hideAllScreens(); showTenseSelect(); }
function backToDifficulty() { hideAllScreens(); document.getElementById('difficulty-select').style.display = ''; }

function generateFillQuestions(tense, count) {
    let questions = [];
    for (let i = 0; i < count; i++) {
        let subj, verb, obj, verbObj;
        let valid = false;
        while (!valid) {
            const combo = combos[Math.floor(Math.random() * combos.length)];
            subj = combo.subj[Math.floor(Math.random() * combo.subj.length)];
            verbObj = verbs.find(v => v.base === combo.verb);
            verb = combo.verb;
            obj = combo.objs[Math.floor(Math.random() * combo.objs.length)];
            if (!isValidSentence(subj, verb, obj, tense)) continue;
            valid = true;
        }
        let answer, sentence;
        if (tense === "present_simple") {
            answer = (["He", "She", "Anna", "My brother", "The dog"].includes(subj) ? verbObj.present[1] : verbObj.present[0]);
            sentence = `${subj} <span class='blank-line'></span> ${obj}.`;
        } else if (tense === "present_continuous") {
            let be = (["He", "She", "Anna", "My brother", "The dog"].includes(subj) ? "is" : (["I"].includes(subj) ? "am" : "are"));
            answer = be + " " + verbObj.ing;
            sentence = `${subj} <span class='blank-line'></span> ${obj} now.`;
        } else if (tense === "past_simple") {
            answer = verbObj.past;
            sentence = `${subj} <span class='blank-line'></span> ${obj} yesterday.`;
        } else if (tense === "past_continuous") {
            let was = (["He", "She", "Anna", "My brother", "The dog", "I"].includes(subj) ? "was" : "were");
            answer = was + " " + verbObj.ing;
            sentence = `${subj} <span class='blank-line'></span> ${obj} yesterday at 5.`;
        } else if (tense === "future_simple") {
            answer = "will " + verbObj.base;
            sentence = `${subj} <span class='blank-line'></span> ${obj} tomorrow.`;
        } else if (tense === "future_continuous") {
            answer = "will be " + verbObj.ing;
            sentence = `${subj} <span class='blank-line'></span> ${obj} tomorrow at 5.`;
        } else if (tense === "present_perfect") {
            answer = (["He", "She", "Anna", "My brother", "The dog"].includes(subj) ? "has" : "have") + " " + verbObj.pp;
            sentence = `${subj} <span class='blank-line'></span> ${obj} today.`;
        } else if (tense === "past_perfect") {
            answer = "had " + verbObj.pp;
            sentence = `${subj} <span class='blank-line'></span> ${obj} before.`;
        } else if (tense === "future_perfect") {
            answer = "will have " + verbObj.pp;
            sentence = `${subj} <span class='blank-line'></span> ${obj} by tomorrow.`;
        } else if (tense === "present_perfect_continuous") {
            let have = (["He", "She", "Anna", "My brother", "The dog"].includes(subj) ? "has" : "have");
            answer = have + " been " + verbObj.ing;
            sentence = `${subj} <span class='blank-line'></span> ${obj} for an hour.`;
        } else if (tense === "past_perfect_continuous") {
            answer = "had been " + verbObj.ing;
            sentence = `${subj} <span class='blank-line'></span> ${obj} before 6.`;
        } else if (tense === "future_perfect_continuous") {
            answer = "will have been " + verbObj.ing;
            sentence = `${subj} <span class='blank-line'></span> ${obj} for two hours by tomorrow.`;
        } else if (tense === "going_to") {
            let be = (["He", "She", "Anna", "My brother", "The dog"].includes(subj) ? "is" : (["I"].includes(subj) ? "am" : "are"));
            answer = be + " going to " + verbObj.base;
            sentence = `${subj} <span class='blank-line'></span> ${obj} tomorrow.`;
        } else if (tense === "will") {
            answer = "will " + verbObj.base;
            sentence = `${subj} <span class='blank-line'></span> ${obj} tomorrow.`;
        }
        const options = new Set([answer]);
        while (options.size < 3) {
            const forms = [
                verbObj.base, verbObj.past, verbObj.ing, verbObj.present[0], verbObj.present[1],
                "will " + verbObj.base, "will be " + verbObj.ing,
                (["He", "She", "Anna", "My brother", "The dog"].includes(subj) ? "is" : (["I"].includes(subj) ? "am" : "are")) + " going to " + verbObj.base,
                (["He", "She", "Anna", "My brother", "The dog"].includes(subj) ? "has" : "have") + " " + verbObj.pp,
                "had " + verbObj.pp,
                "will have " + verbObj.pp,
                (["He", "She", "Anna", "My brother", "The dog"].includes(subj) ? "has" : "have") + " been " + verbObj.ing,
                "had been " + verbObj.ing,
                "will have been " + verbObj.ing
            ];
            if (["present_continuous", "past_continuous", "future_continuous", "present_perfect_continuous", "past_perfect_continuous", "future_perfect_continuous"].includes(tense)) {
                forms.push(verbObj.ing);
            }
            options.add(forms[Math.floor(Math.random() * forms.length)]);
        }
        questions.push({ sentence, options: Array.from(options), answer });
    }
    return questions;
}

// ===================== DISPLAY =====================
function showQuestion(){
    const area = document.getElementById('game-area');
    area.innerHTML='';
    const btnColors = [...colors].sort(()=>Math.random()-0.5);
    // Question counter
    let total = (currentStep==='fill') ? fillQuestions.length : orderQuestions.length;
    const stepLabel = currentStep==='fill' ? 'Fill in the blank' : 'Sentence order';
    area.innerHTML += `<div style="font-weight:bold; margin-bottom:4px;">${tenseLabels[currentTense]} &ndash; ${stepLabel}</div>`;
    area.innerHTML += `<div style="font-weight:bold; margin-bottom:10px;">Question ${current+1} / ${total}</div>`;

    if(currentStep==='fill'){
        const q = fillQuestions[current];
        const sentence = q.sentence.replace('___','<span id="blank"></span>');
        area.innerHTML+=`<p>${sentence}</p>`;
        q.options.forEach((opt,i)=>{
            const btn=document.createElement('button');
            btn.textContent=opt;
            btn.className="btn btn-"+btnColors[i]+" m-2";
            btn.onclick=()=>checkFillAnswer(opt);
            area.appendChild(btn);
        });
    } else if(currentStep==='order'){
        const q = orderQuestions[current];
        const shuffled = [...q.words].sort(()=>Math.random()-0.5);
        area.innerHTML+='<div id="word-bank"></div><div id="sentence"></div>';
        const bank = document.getElementById('word-bank');
        shuffled.forEach((word,i)=>{
            const btn=document.createElement('button');
            btn.textContent=word;
            btn.className="btn btn-"+btnColors[i]+" m-2";
            btn.onclick=()=>pickWord(btn);
            bank.appendChild(btn);
        });
    }
}

let answerLocked = false;
function checkFillAnswer(selected){
    if(answerLocked) return;
    answerLocked = true;
    const q = fillQuestions[current];
    const feedback = document.getElementById('feedback');
    if(selected===q.answer){
        feedback.textContent='🎉 Correct! ⭐';
        feedback.className = 'correct';
        if(!q.answeredCorrectly) {
            fillScore++;
            q.answeredCorrectly = true;
        }
    } else {
        feedback.textContent='❌ Try again!';
        feedback.className = 'wrong';
    }
    setTimeout(()=>{
        if(current < fillQuestions.length-1){
            current++;
            feedback.textContent='';
            feedback.className = '';
            answerLocked = false;
            showQuestion();
        } else {
            feedback.textContent='';
            feedback.className = '';
            showFillStepComplete();
        }
    }, 2000);
}

function showFillStepComplete(){
    const area = document.getElementById('game-area');
    area.innerHTML = `
        <div style="font-weight:bold; margin-bottom:4px;">${tenseLabels[currentTense]} &ndash; Fill in the blank done! 🎉</div>
        <div style="font-size:1.3rem; margin: 10px 0 18px;">⭐ Score: ${fillScore} / ${fillQuestions.length}</div>
        <button class="btn btn-primary m-2" id="continue-to-order-btn">▶️ Continue to Sentence Order</button>
    `;
    document.getElementById('continue-to-order-btn').onclick = startOrderPractice;
}

function startOrderPractice(){
    current = 0;
    currentStep = 'order';
    orderAnswerLocked = false;
    showQuestion();
}

function pickWord(btn){
    const sentenceDiv = document.getElementById('sentence');
    const bank = document.getElementById('word-bank');
    // If the button is in the word bank, move to sentence
    if (btn.parentElement === bank) {
        sentenceDiv.append(btn);
        btn.onclick = () => pickWord(btn); // allow toggling
        btn.style.margin = '0 4px';
        btn.classList.remove('btn-outline-success');
        btn.classList.add('btn-warning');
    } else {
        // If the button is in the sentence, move back to word bank
        bank.append(btn);
        btn.onclick = () => pickWord(btn);
        btn.style.margin = '';
        btn.classList.remove('btn-warning');
        btn.classList.add('btn-outline-success');
    }
    checkOrderAnswer();
}

let orderAnswerLocked = false;
function checkOrderAnswer(){
    if(orderAnswerLocked) return;
    const sentenceDiv=document.getElementById('sentence');
    const words=Array.from(sentenceDiv.children).map(b=>b.textContent);
    const q=orderQuestions[current];
    const feedback=document.getElementById('feedback');
    if(words.length===q.words.length){
        orderAnswerLocked = true;
        const userSentence=words.join(' ') + '.';
        if(userSentence===q.answer){
            feedback.textContent='🎉 Correct! ⭐';
            feedback.className = 'correct';
            if(!q.answeredCorrectly) {
                orderScore++;
                q.answeredCorrectly = true;
            }
        } else {
            feedback.textContent='❌ Try again!';
            feedback.className = 'wrong';
        }
        setTimeout(()=>{
            if(current < orderQuestions.length-1){
                current++;
                feedback.textContent='';
                feedback.className = '';
                orderAnswerLocked = false;
                showQuestion();
            } else {
                showFinalScore();
            }
        }, 2000);
    } else { feedback.textContent=''; feedback.className = ''; }
}

function showFinalScore(){
    const total = fillQuestions.length + orderQuestions.length;
    const score = fillScore + orderScore;
    const feedback = document.getElementById('feedback');
    document.getElementById('game-area').style.display='none';
    document.getElementById('game-nav').style.display='none';
    let starCount, tail;
    if(score >= 17){
        starCount = 3; tail = 'Congratulations! 🏆';
    } else if(score >= 13){
        starCount = 2; tail = 'Keep up the good work!';
    } else if(score >= 7){
        starCount = 1; tail = 'Keep practicing!';
    } else {
        starCount = 0; tail = 'Try again!';
    }
    const stars = '⭐'.repeat(starCount) + '☆'.repeat(3 - starCount);
    let message = `<span class='stars'>${stars}</span><span class='score'>${tenseLabels[currentTense]} &ndash; Your score: ${score} / ${total}.</span> ${tail}`;
    // List correct answers (full sentences)
    const fillAnswers = fillQuestions.map((q,i)=>{
        let s = q.sentence.replace("<span class='blank-line'></span>", `<b>${q.answer}</b>`);
        return `${i+1}. ${s}`;
    }).join('<br>');
    const orderAnswers = orderQuestions.map((q,i)=>`${i+1}. ${q.answer}`).join('<br>');
    const answers = `<div class='answers-list'><b>Fill in the blank:</b><br>${fillAnswers}<br><br><b>Sentence order:</b><br>${orderAnswers}</div>`;
    feedback.innerHTML = message + answers;
    feedback.className = '';
    document.getElementById('next-btn').style.display='none';
    document.getElementById('final-actions').style.display='';
}

function nextQuestion(){
    // Not used anymore, auto-advance is implemented
}
