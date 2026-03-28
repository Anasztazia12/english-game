// english-game.js
// Minden játéklogika és változó ide kerül át az index.html-ből

// Adatok
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

function generateFillQuestions(difficulty) {
    let questions = [];
    const allowed = [
        {subj: ["I","You","He","She","We","They"], verbs: ["go","eat","play","read","have","like"]},
        {subj: ["My brother","Anna"], verbs: ["eat","play","read","have","like"]},
        {subj: ["The dog"], verbs: ["eat","play","have"]},
        {subj: ["The children"], verbs: ["play","read","have","like"]}
    ];
    for (let i=0;i<20;i++){
        let subj, verb, obj;
        let valid = false;
        while (!valid) {
            subj = subjects[Math.floor(Math.random()*subjects.length)];
            verb = verbs[Math.floor(Math.random()*verbs.length)];
            const possibleObjs = verbObjects[verb.base];
            obj = possibleObjs[Math.floor(Math.random()*possibleObjs.length)];
            valid = allowed.some(rule => rule.subj.includes(subj) && rule.verbs.includes(verb.base));
        }
        const answer = (["He","She","Anna","My brother","The dog"].includes(subj) ? verb.present[1]:verb.present[0]);
        const options = new Set([answer]);
        while(options.size<3){
            const forms = [verb.base, verb.past, verb.ing, verb.present[0], verb.present[1]];
            options.add(forms[Math.floor(Math.random()*forms.length)]);
        }
        questions.push({sentence:`${subj} <span class='blank-line'></span> ${obj}.`, options:Array.from(options), answer});
    }
    return questions;
}

function generateOrderQuestions(difficulty) {
    let questions = [];
    const allowed = [
        {subj: ["I","You","He","She","We","They"], verbs: ["go","eat","play","read","have","like"]},
        {subj: ["My brother","Anna"], verbs: ["eat","play","read","have","like"]},
        {subj: ["The dog"], verbs: ["eat","play","have"]},
        {subj: ["The children"], verbs: ["play","read","have","like"]}
    ];
    for (let i=0;i<20;i++){
        let subj, verb, obj;
        let valid = false;
        while (!valid) {
            subj = subjects[Math.floor(Math.random()*subjects.length)];
            let verbObj = verbs[Math.floor(Math.random()*verbs.length)];
            verb = verbObj.base;
            const possibleObjs = verbObjects[verb];
            obj = possibleObjs[Math.floor(Math.random()*possibleObjs.length)];
            valid = allowed.some(rule => rule.subj.includes(subj) && rule.verbs.includes(verb));
        }
        const sentence = `${subj} ${verb} ${obj}.`;
        const words = sentence.replace('.','').split(' ');
        questions.push({words, answer:sentence});
    }
    return questions;
}

// A többi játéklogika (showModeSelect, chooseMode, stb.) is ide költöztethető ugyanígy.
