// ===================== Data =====================

// Szűrő logika: csak értelmes subject-verb-object kombinációk engedélyezése
function isValidSentence(subj, verb, obj) {
    // "The dog" csak "play" vagy "have" igével és "the ball" vagy "friends" tárggyal
    if (subj === "The dog") {
        if (["play", "have"].includes(verb)) {
            if (["the ball", "friends"].includes(obj)) return true;
            // "The dog" játszhat "with friends", "in the garden"
            if (verb === "play" && ["with friends", "in the garden"].includes(obj)) return true;
        }
        return false;
    }
    // "The children" nem "eat" vagy "have" "the ball"
    if (["The children", "Anna", "My brother", "He", "She"].includes(subj)) {
        if (["the ball", "friends"].includes(obj) && ["eat"].includes(verb)) return false;
    }
    // "Anna", "My brother", "He", "She" nem "eat" "the ball" vagy "friends"
    if (["Anna", "My brother", "He", "She"].includes(subj) && verb === "eat" && ["the ball", "friends"].includes(obj)) return false;
    // "I", "You", "We", "They" nem "eat" "the ball"
    if (["I", "You", "We", "They"].includes(subj) && verb === "eat" && obj === "the ball") return false;
    // "read" csak "a book", "a letter", "homework"
    if (verb === "read" && !["a book", "a letter", "homework"].includes(obj)) return false;
    // "play the ball" csak "We", "They", "The children"
    if (verb === "play" && obj === "the ball" && !["We", "They", "The children", "The dog"].includes(subj)) return false;
    // "eat" csak "a cake", "breakfast"
    if (verb === "eat" && !["a cake", "breakfast"].includes(obj)) return false;
    // "have" nem "music", "a song", "the piano"
    if (verb === "have" && ["music", "a song", "the piano"].includes(obj)) return false;
    // "go" nem "music", "a song", "the piano", "the ball"
    if (verb === "go" && ["music", "a song", "the piano", "the ball"].includes(obj)) return false;
    // "like" bármit, de "the ball" csak ha nem "eat"
    // Egyébként engedjük át
    return true;
}
const combos = [
    {subj: ["I","You","He","She","We","They","Anna","My brother","The children"], verb: "go", objs: ["to the park", "to school", "home", "to the garden"]},
    {subj: ["I","You","He","She","We","They","Anna","My brother","The dog"], verb: "eat", objs: ["a cake", "breakfast"]},
    // play (person: music, song, piano; dog: ball, garden, friends)
    {subj: ["I","You","We","They","Anna","My brother","The children"], verb: "play", objs: ["music", "a song", "the piano", "with friends", "in the garden"]},
    {subj: ["He","She"], verb: "play", objs: ["music", "a song", "the piano"]},
    {subj: ["The dog"], verb: "play", objs: ["the ball", "with friends", "in the garden"]},
    // play with the ball only: We, They, The children
    {subj: ["We","They","The children"], verb: "play", objs: ["the ball"]},
    {subj: ["I","You","He","She","We","They","Anna","My brother","The children"], verb: "read", objs: ["a book", "a letter", "homework"]},
    {subj: ["I","You","He","She","We","They","Anna","My brother","The children"], verb: "have", objs: ["breakfast", "a book", "homework", "a cake"]},
    {subj: ["The dog"], verb: "have", objs: ["a ball", "friends"]},
    {subj: ["I","You","He","She","We","They","Anna","My brother","The children"], verb: "like", objs: ["music", "a book", "breakfast", "a song", "the ball", "the piano", "the park", "friends"]}
];
const tensesEasy = ["present_simple"];
const tensesHard = ["present_simple", "past_simple", "future_simple", "present_continuous", "past_continuous", "future_continuous"];

function generateOrderQuestions(difficulty) {
    let questions = [];
    const tenses = (difficulty === 'easy') ? tensesEasy : tensesHard;
    for (let i=0;i<20;i++){
        let subj, verb, obj, verbObj, tense;
        let valid = false;
        while (!valid) {
            const combo = combos[Math.floor(Math.random()*combos.length)];
            subj = combo.subj[Math.floor(Math.random()*combo.subj.length)];
            verbObj = verbs.find(v => v.base === combo.verb);
            verb = combo.verb;
            obj = combo.objs[Math.floor(Math.random()*combo.objs.length)];
            tense = tenses[Math.floor(Math.random()*tenses.length)];
            if (!isValidSentence(subj, verb, obj)) continue;
            valid = true;
        }
        let sentence = "";
        if(tense === "present_simple") {
            const verbForm = (["He","She","Anna","My brother","The dog"].includes(subj) ? verbObj.present[1]:verbObj.present[0]);
            sentence = `${subj} ${verbForm} ${obj}.`;
        } else if(tense === "past_simple") {
            sentence = `${subj} ${verbObj.past} ${obj} yesterday.`;
        } else if(tense === "future_simple") {
            sentence = `${subj} will ${verbObj.base} ${obj} tomorrow.`;
        } else if(tense === "present_continuous") {
            let be = (["He","She","Anna","My brother","The dog"].includes(subj) ? "is" : (["I"].includes(subj) ? "am" : "are"));
            sentence = `${subj} ${be} ${verbObj.ing} ${obj} now.`;
        } else if(tense === "past_continuous") {
            let was = (["He","She","Anna","My brother","The dog","I"].includes(subj) ? "was" : "were");
            sentence = `${subj} ${was} ${verbObj.ing} ${obj} yesterday at 5.`;
        } else if(tense === "future_continuous") {
            sentence = `${subj} will be ${verbObj.ing} ${obj} tomorrow at 5.`;
        }
        const words = sentence.replace('.', '').split(' ');
        questions.push({words, answer: sentence});
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
    { base: "go", present: ["go","goes"], ing:"going", past:"went" },
    { base: "eat", present:["eat","eats"], ing:"eating", past:"ate" },
    { base:"play", present:["play","plays"], ing:"playing", past:"played" },
    { base:"read", present:["read","reads"], ing:"reading", past:"read" },
    { base:"have", present:["have","has"], ing:"having", past:"had" },
    { base:"like", present:["like","likes"], ing:"liking", past:"liked" }
];
const colors = ["primary", "success", "danger", "warning", "info"];

let mode = 'fill';
let difficulty = 'easy';
let fillQuestions = [];
let orderQuestions = [];
let current = 0;
let fillScore = 0;
let orderScore = 0;

// ===================== SEGÉD FUNKCIÓK =====================
function showModeSelect() {
    document.getElementById('start-area').style.display='none';
    document.getElementById('mode-select').style.display='';
    document.getElementById('difficulty-select').style.display='none';
    document.getElementById('game-area').style.display='none';
    document.getElementById('game-nav').style.display='none';
    document.getElementById('feedback').textContent='';
    document.getElementById('next-btn').style.display='none';
}

function chooseMode(selectedMode) {
    mode = selectedMode;
    document.getElementById('mode-select').style.display='none';
    document.getElementById('difficulty-select').style.display='';
}

function chooseDifficulty(newDiff) {
    difficulty = newDiff;
    fillQuestions = generateFillQuestions(difficulty);
    orderQuestions = generateOrderQuestions(difficulty);
    current = 0;
    fillScore = 0;
    orderScore = 0;
    document.getElementById('difficulty-select').style.display='none';
    document.getElementById('game-area').style.display='';
    document.getElementById('game-nav').style.display='';
    showQuestion();
}

function goHome() {
    document.getElementById('start-area').style.display='';
    document.getElementById('mode-select').style.display='none';
    document.getElementById('difficulty-select').style.display='none';
    document.getElementById('game-area').style.display='none';
    document.getElementById('game-nav').style.display='none';
    document.getElementById('feedback').textContent='';
    document.getElementById('next-btn').style.display='none';
}

function backToMode() { document.getElementById('difficulty-select').style.display='none'; document.getElementById('mode-select').style.display=''; document.getElementById('game-area').style.display='none'; document.getElementById('game-nav').style.display='none'; }
function backToDifficulty() { document.getElementById('game-area').style.display='none'; document.getElementById('game-nav').style.display='none'; document.getElementById('difficulty-select').style.display=''; }

function generateFillQuestions(difficulty) {
    let questions = [];
    const tenses = (difficulty === 'easy') ? tensesEasy : tensesHard;
    for (let i=0;i<20;i++){
        let subj, verb, obj, verbObj, tense;
        let valid = false;
        while (!valid) {
            const combo = combos[Math.floor(Math.random()*combos.length)];
            subj = combo.subj[Math.floor(Math.random()*combo.subj.length)];
            verbObj = verbs.find(v => v.base === combo.verb);
            verb = combo.verb;
            obj = combo.objs[Math.floor(Math.random()*combo.objs.length)];
            tense = tenses[Math.floor(Math.random()*tenses.length)];
            if (!isValidSentence(subj, verb, obj)) continue;
            valid = true;
        }
        let answer, sentence;
        if(tense==="present_simple"){
            answer = (["He","She","Anna","My brother","The dog"].includes(subj) ? verbObj.present[1]:verbObj.present[0]);
            sentence = `${subj} <span class='blank-line'></span> ${obj}.`;
        }
        else if(tense==="present_continuous"){
            let be = (["He","She","Anna","My brother","The dog"].includes(subj) ? "is" : (["I"].includes(subj) ? "am" : "are"));
            answer = be + " " + verbObj.ing;
            sentence = `${subj} <span class='blank-line'></span> ${obj} now.`;
        }
        else if(tense==="past_simple"){
            answer = verbObj.past;
            sentence = `${subj} <span class='blank-line'></span> ${obj} yesterday.`;
        }
        else if(tense==="past_continuous"){
            let was = (["He","She","Anna","My brother","The dog","I"].includes(subj) ? "was" : "were");
            answer = was + " " + verbObj.ing;
            sentence = `${subj} <span class='blank-line'></span> ${obj} yesterday at 5.`;
        }
        else if(tense==="future_simple"){
            answer = "will " + verbObj.base;
            sentence = `${subj} <span class='blank-line'></span> ${obj} tomorrow.`;
        }
        else if(tense==="future_continuous"){
            answer = "will be " + verbObj.ing;
            sentence = `${subj} <span class='blank-line'></span> ${obj} tomorrow at 5.`;
        }
        const options = new Set([answer]);
        while(options.size<3){
            const forms = [verbObj.base, verbObj.past, verbObj.ing, verbObj.present[0], verbObj.present[1], "will "+verbObj.base, "will be "+verbObj.ing];
            if(tense==="present_continuous" || tense==="past_continuous" || tense==="future_continuous") {
                forms.push(verbObj.ing);
            }
            options.add(forms[Math.floor(Math.random()*forms.length)]);
        }
        questions.push({sentence, options:Array.from(options), answer});
    }
    return questions;
}

// ===================== DISPLAY =====================
function showQuestion(){
    const area = document.getElementById('game-area');
    area.innerHTML='';
    const btnColors = [...colors].sort(()=>Math.random()-0.5);
    // Question counter
    let total = (mode==='fill') ? fillQuestions.length : orderQuestions.length;
    area.innerHTML += `<div style="font-weight:bold; margin-bottom:10px;">Question ${current+1} / ${total}</div>`;

    if(mode==='fill'){
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
    } else if(mode==='order'){
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
        feedback.textContent='Correct!';
        feedback.style.color='green';
        if(!q.answeredCorrectly) {
            fillScore++;
            q.answeredCorrectly = true;
        }
    } else {
        feedback.textContent='Wrong!';
        feedback.style.color='red';
    }
    // Always go to next after 2s
    setTimeout(()=>{
        if(current < fillQuestions.length-1){
            current++;
            feedback.textContent='';
            answerLocked = false;
            showQuestion();
        } else {
            showFinalScore('fill');
        }
    }, 2000);
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
            feedback.textContent='Correct!';
            feedback.style.color='green';
            if(!q.answeredCorrectly) {
                orderScore++;
                q.answeredCorrectly = true;
            }
        } else {
            feedback.textContent='Wrong!';
            feedback.style.color='red';
        }
        setTimeout(()=>{
            if(current < orderQuestions.length-1){
                current++;
                feedback.textContent='';
                orderAnswerLocked = false;
                showQuestion();
            } else {
                showFinalScore('order');
            }
        }, 2000);
    } else { feedback.textContent=''; }
}

function showFinalScore(modeType){
    const total = (modeType==='fill')?fillQuestions.length:orderQuestions.length;
    const score = (modeType==='fill')?fillScore:orderScore;
    const feedback = document.getElementById('feedback');
    let message = `Your score: ${score} / ${total}. `;
    if(score >= 17){
        message += 'Congratulations!';
    } else if(score >= 13){
        message += 'Keep up the good work!';
    } else if(score >= 7){
        message += 'Keep practicing!';
    } else {
        message += 'Try again!';
    }
    // List correct answers
    let answers = '';
    if(modeType==='fill'){
        answers = '<br><br>Correct answers:<br>' + fillQuestions.map((q,i)=>`${i+1}. ${q.answer}`).join('<br>');
    } else {
        answers = '<br><br>Correct answers:<br>' + orderQuestions.map((q,i)=>`${i+1}. ${q.answer}`).join('<br>');
    }
    feedback.innerHTML = message + answers;
    document.getElementById('next-btn').style.display='none';
}

function nextQuestion(){
    // Not used anymore, auto-advance is implemented
}
