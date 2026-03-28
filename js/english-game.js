// english-game.js
// Minden játéklogika és változó ide került át az index.html-ből

// ===================== ADATOK =====================
const subjects = ["I", "You", "He", "She", "We", "They", "My brother", "The dog", "Anna", "The children"];
const verbObjects = {
    go: ["to the park", "to school", "home", "to the garden", "to the piano", "with friends", "fast", "well", "every day", "yesterday", "now", "at school", "in the garden", "in the morning"],
    eat: ["a cake", "breakfast", "a letter", "homework"],
    play: ["music", "a song", "the piano", "the ball", "with friends", "in the garden"],
    read: ["a book", "a letter", "homework", "at school", "in the morning"],
    have: ["breakfast", "a book", "homework", "a cake", "a letter", "music", "a song", "the ball", "the piano", "friends"],
    like: ["music", "a book", "breakfast", "a song", "the ball", "the piano", "a letter", "the park", "friends", "playing", "reading", "eating", "going"]
};
const objects = Array.from(new Set(Object.values(verbObjects).flat()));
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

// ===================== KÉRDÉSEK GENERÁLÁSA =====================
    const totalQuestions = 20;
    let qIndex = current;
    let isFill = (mode==='fill');
    let q;
    if (isFill) {
        if (qIndex >= totalQuestions) { showFinalScore('fill'); return; }
        q = fillQuestions[qIndex];
        const sentence = q.sentence.replace('___','<span id="blank"></span>');
        area.innerHTML=`<p>${sentence}</p>`;
        q.options.forEach((opt,i)=>{
            const btn=document.createElement('button');
            btn.textContent=opt;
            btn.className="btn btn-"+btnColors[i]+" m-2";
            btn.onclick=()=>checkFillAnswer(opt);
            area.appendChild(btn);
        });
    } else if (mode==='order') {
        if (qIndex >= totalQuestions) { showFinalScore('order'); return; }
        q = orderQuestions[qIndex];
        const shuffled = [...q.words].sort(()=>Math.random()-0.5);
        area.innerHTML='<div id="word-bank"></div><div id="sentence"></div>';
        const bank = document.getElementById('word-bank');
        shuffled.forEach((word,i)=>{
            const btn=document.createElement('button');
            btn.textContent=word;
            btn.className="btn btn-"+btnColors[i]+" m-2";
            btn.onclick=()=>pickWord(btn);
            bank.appendChild(btn);
        });
    }
function generateFillQuestions(difficulty) {
    let questions = [];
    // Csak értelmes subject-verb-object hármasokat engedünk
    const combos = [
        // go
        {subj: ["I","You","He","She","We","They","Anna","My brother","The children"], verb: "go", objs: ["to the park", "to school", "home", "to the garden"]},
        // eat
        {subj: ["I","You","He","She","We","They","Anna","My brother","The dog"], verb: "eat", objs: ["a cake", "breakfast"]},
        // play (ember: minden, kutya: csak labda, kert, barátok)
        document.getElementById('next-btn').style.display=(current<20-1)?'inline':'none';
        if(current===20-1) showFinalScore('fill');
        // read
        {subj: ["I","You","He","She","We","They","Anna","My brother","The children"], verb: "read", objs: ["a book", "a letter", "homework"]},
        // have
        {subj: ["I","You","He","She","We","They","Anna","My brother","The children"], verb: "have", objs: ["breakfast", "a book", "homework", "a cake"]},
        {subj: ["The dog"], verb: "have", objs: ["a ball", "friends"]},
        // like
        {subj: ["I","You","He","She","We","They","Anna","My brother","The children"], verb: "like", objs: ["music", "a book", "breakfast", "a song", "the ball", "the piano", "the park", "friends"]}
    ];
    for (let i=0;i<20;i++){
        let subj, verb, obj, verbObj;
        let valid = false;
        while (!valid) {
            const combo = combos[Math.floor(Math.random()*combos.length)];
            subj = combo.subj[Math.floor(Math.random()*combo.subj.length)];
            verb = verbs.find(v => v.base === combo.verb);
            obj = combo.objs[Math.floor(Math.random()*combo.objs.length)];
            valid = true;
        }
            document.getElementById('next-btn').style.display=(current<20-1)?'inline':'none';
            if(current===20-1) showFinalScore('order');
        while(options.size<3){
            const forms = [verb.base, verb.past, verb.ing, verb.present[0], verb.present[1]];
            options.add(forms[Math.floor(Math.random()*forms.length)]);
        }
        questions.push({sentence:`${subj} <span class='blank-line'></span> ${obj}.`, options:Array.from(options), answer});
    }
    return questions;
}

    const total = 20;
    let questions = [];
    // Csak értelmes subject-verb-object hármasokat engedünk
    const combos = [
    if(score>=18){
        message += 'Congratulations!';
    } else {
        message += 'Keep practicing!';
    }
        {subj: ["I","You","He","She","We","They","Anna","My brother","The dog"], verb: "eat", objs: ["a cake", "breakfast"]},
        {subj: ["I","You","He","She","We","They","Anna","My brother","The children"], verb: "play", objs: ["music", "a song", "the piano", "the ball", "with friends", "in the garden"]},
        {subj: ["The dog"], verb: "play", objs: ["the ball", "with friends", "in the garden"]},
        {subj: ["I","You","He","She","We","They","Anna","My brother","The children"], verb: "read", objs: ["a book", "a letter", "homework"]},
        {subj: ["I","You","He","She","We","They","Anna","My brother","The children"], verb: "have", objs: ["breakfast", "a book", "homework", "a cake"]},
        {subj: ["The dog"], verb: "have", objs: ["a ball", "friends"]},
        {subj: ["I","You","He","She","We","They","Anna","My brother","The children"], verb: "like", objs: ["music", "a book", "breakfast", "a song", "the ball", "the piano", "the park", "friends"]}
    ];
    for (let i=0;i<20;i++){
        let subj, verb, obj;
        let valid = false;
        while (!valid) {
            const combo = combos[Math.floor(Math.random()*combos.length)];
            subj = combo.subj[Math.floor(Math.random()*combo.subj.length)];
            verb = combo.verb;
            obj = combo.objs[Math.floor(Math.random()*combo.objs.length)];
            valid = true;
        }
        const sentence = `${subj} ${verb} ${obj}.`;
        const words = sentence.replace('.','').split(' ');
        questions.push({words, answer:sentence});
    }
    return questions;
}

// ===================== MEGJELENÍTÉS =====================
function showQuestion(){
    const area = document.getElementById('game-area');
    area.innerHTML='';
    const btnColors = [...colors].sort(()=>Math.random()-0.5);

    if(mode==='fill'){
        const q = fillQuestions[current];
        const sentence = q.sentence.replace('___','<span id="blank"></span>');
        area.innerHTML=`<p>${sentence}</p>`;
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
        area.innerHTML='<div id="word-bank"></div><div id="sentence"></div>';
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

function checkFillAnswer(selected){
    const q = fillQuestions[current];
    const feedback = document.getElementById('feedback');
    if(selected===q.answer){
        feedback.textContent='Correct!';
        feedback.style.color='green';
        fillScore++;
        if(current < 19){
            document.getElementById('next-btn').style.display='inline';
        } else {
            document.getElementById('next-btn').style.display='none';
            showFinalScore('fill');
        }
    } else {
        feedback.textContent='Try again!';
        feedback.style.color='red';
        return;
    }
}

function pickWord(btn){
    const sentenceDiv=document.getElementById('sentence');
    sentenceDiv.append(btn);
    btn.onclick=null;
    btn.style.margin='0 4px';
    btn.classList.remove('btn-outline-success');
    btn.classList.add('btn-warning');
    checkOrderAnswer();
}

function checkOrderAnswer(){
    const sentenceDiv=document.getElementById('sentence');
    const words=Array.from(sentenceDiv.children).map(b=>b.textContent);
    const q=orderQuestions[current];
    const feedback=document.getElementById('feedback');
    if(words.length===q.words.length){
        const userSentence=words.join(' ') + '.';
        if(userSentence===q.answer){
            feedback.textContent='Correct!';
            feedback.style.color='green';
            orderScore++;
            if(current < 19){
                document.getElementById('next-btn').style.display='inline';
            } else {
                document.getElementById('next-btn').style.display='none';
                showFinalScore('order');
            }
        } else {
            feedback.textContent='Try again!';
            feedback.style.color='red';
            setTimeout(()=>{ showQuestion(); feedback.textContent=''; },1000);
        }
    } else { feedback.textContent=''; }
}

function showFinalScore(modeType){
    const total = (modeType==='fill')?fillQuestions.length:orderQuestions.length;
    const score = (modeType==='fill')?fillScore:orderScore;
    const feedback = document.getElementById('feedback');
    let message = `Your score: ${score} / ${total}. `;
    message += (score>=total*0.8)?'Congratulations!':'Keep practicing!';
    feedback.textContent = message;
    document.getElementById('next-btn').style.display='none';
}

function nextQuestion(){
    if(current < 19){
        current++;
        document.getElementById('feedback').textContent='';
        showQuestion();
    }
}
